import { useEffect, useRef } from 'react'
import styles from './RulerBg.module.css'

/**
 * 尺子刻度线 hero 背景。
 *
 * 对齐原理：
 *   刻度画在一个与容器完全等宽的坐标系里（viewBox 宽 2400 = 4 列 × 600），
 *   用 SVG preserveAspectRatio="none" 按比例拉伸到容器内宽。
 *   每根线由一次仿射变换独立定位，不存在“背景平铺逐块取整累积漂移”的问题，
 *   所以任何视口宽度下都精确落在 5 条竖线（L0..L4）上，只有间距随宽度缩放。
 *   gutter（两侧边距）里的线靠 overflow 溢出显示，超出视口部分被 .ruler 裁掉。
 *
 * 5 排间距（每列被分成的段数）：row1=1, row2=3, row3=6, row4=30, row5=60。
 */

const COL = 600           // 每列的 viewBox 单位宽
const VB_W = COL * 4       // 2400，容器内宽对应的坐标宽度
const VB_H = 100
const EXT = COL * 3        // 向 gutter 外延伸的单位数（覆盖到超宽视口）

// 把 viewBox 与 .rowBox 同比例向两侧放大 EXT，让 gutter 里的线落在 viewBox 内，
// 从而无需依赖（浏览器并不可靠的）svg overflow:visible。比例不变 ⇒ 容器仍精确映射到 L0..L4。
// 对应 CSS：.rowBox { left: -75%; width: 250% }（= -EXT/VB_W、VB_FULLW/VB_W，相对 .inner）
const VB_MINX = -EXT               // -1800
const VB_FULLW = VB_W + 2 * EXT    // 6000

const BASE_OP = 0.26   // 更浅

// 横向彩色渐变（复用品牌生命周期色条配色：暖→冷）。
// 用 userSpaceOnUse 铺满容器内宽 [0, VB_W]，每根竖线按自身 x 取到对应渐变色。
const GRAD_STOPS = [
  { offset: '0%',   color: '#0953BA' },
  { offset: '25%',  color: '#8E5CFB' },
  { offset: '50%',  color: '#FF99ED' },
  { offset: '75%',  color: '#FF562E' },
  { offset: '100%', color: '#FFC662' },
]

// 按 t(0..1) 在刻度渐变里取色，返回 [r,g,b]
const GRAD_PTS = GRAD_STOPS.map((s) => {
  const h = s.color.replace('#', '')
  return { pos: parseFloat(s.offset) / 100, rgb: [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] }
})
function sampleColor(t) {
  t = Math.min(1, Math.max(0, t))
  for (let i = 1; i < GRAD_PTS.length; i++) {
    if (t <= GRAD_PTS[i].pos) {
      const a = GRAD_PTS[i - 1], b = GRAD_PTS[i]
      const f = (b.pos - a.pos) ? (t - a.pos) / (b.pos - a.pos) : 0
      return a.rgb.map((c, k) => c + (b.rgb[k] - c) * f)
    }
  }
  return GRAD_PTS[GRAD_PTS.length - 1].rgb
}
// 该处原色压暗（用于高亮线顶部深色）
function darkColorAt(t, k = 0.5) {
  const [r, g, b] = sampleColor(t)
  return `rgb(${Math.round(r * k)}, ${Math.round(g * k)}, ${Math.round(b * k)})`
}
// 该处原色「提纯」：同色相，饱和拉满、明度压到纯色区（用于浅色段的高亮，鲜艳而不发脏）
function vividColorAt(t, lMax = 0.5) {
  let [r, g, b] = sampleColor(t).map((c) => c / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h /= 6
  }
  const s = 1
  l = Math.min(l, lMax)
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hue2rgb = (pp, qq, tt) => {
    if (tt < 0) tt += 1
    if (tt > 1) tt -= 1
    if (tt < 1 / 6) return pp + (qq - pp) * 6 * tt
    if (tt < 1 / 2) return qq
    if (tt < 2 / 3) return pp + (qq - pp) * (2 / 3 - tt) * 6
    return pp
  }
  const R = hue2rgb(p, q, h + 1 / 3), G = hue2rgb(p, q, h), B = hue2rgb(p, q, h - 1 / 3)
  return `rgb(${Math.round(R * 255)}, ${Math.round(G * 255)}, ${Math.round(B * 255)})`
}

// 生成一排的刻度线
function makeLines({ step, from, to, fadeInAt, fadeMult = 20, baseOp = BASE_OP, widthFrom = 2, widthTo = 2, widthEase = 1, leftDimOp = 1, leftDimEnd = VB_W }) {
  const out = []
  const fadeRange = step * fadeMult // 起点软淡入长度
  for (let x = from; x <= to + 1e-6; x += step) {
    let op = 1
    if (fadeInAt != null) {
      const d = x - fadeInAt
      if (d < fadeRange) op = 0.2 + 0.8 * Math.max(0, d / fadeRange)
    }
    // 左侧 gutter 里的线逐渐淡出（右侧不淡出，刻度延伸到视口右缘满色）
    if (x < 0) op *= Math.max(0, 1 + x / EXT)
    // 左端整体变淡：x=0 处乘 leftDimOp，到 leftDimEnd 回到 1
    if (leftDimOp < 1) {
      const r = Math.min(1, Math.max(0, x / leftDimEnd))
      op *= leftDimOp + (1 - leftDimOp) * r
    }
    if (op <= 0.001) continue
    // 线宽沿 [from, VB_W] 从 widthFrom 递增到 widthTo（越往右越粗）；
    // widthEase>1 时前段基本保持细、靠右才快速加粗
    const t = Math.min(1, Math.max(0, (x - from) / (VB_W - from)))
    const sw = +(widthFrom + (widthTo - widthFrom) * Math.pow(t, widthEase)).toFixed(2)
    out.push({ x: +x.toFixed(3), op: +(baseOp * op).toFixed(3), sw })
  }
  return out
}

const ROWS = [
  { cls: 'row1', step: COL,       from: -EXT, to: VB_W + EXT, baseOp: 0.45 },
  { cls: 'row2', step: COL / 3,   from: -EXT, to: VB_W + EXT, baseOp: 0.65 },
  { cls: 'row3', step: COL / 6,   from: -EXT, to: VB_W + EXT, baseOp: 0.8, leftDimOp: 0.45, leftDimEnd: COL },
  // row4：从第 2 条竖线（x=600）起，向右延伸到视口右缘
  { cls: 'row4', step: COL / 30,  from: COL,     to: VB_W + EXT, fadeInAt: COL, baseOp: 0.9, widthFrom: 1.5, widthTo: 3, widthEase: 14 },
  // row5：从第 4 条竖线（x=1800）起，向右延伸到视口右缘
  { cls: 'row5', step: COL / 60,  from: COL * 3, to: VB_W + EXT, fadeInAt: COL * 3, fadeMult: 60, baseOp: 1 },
]

// 被小球压到的 row3 刻度下沉：影响半径与最大下压量（均为 viewBox 单位）
const DIP_RADIUS = 28    // 影响范围（≈14px，约一个球宽，随小球缩小）
const DIP_MAX = 5        // 最大下压（5/100 × 90px ≈ 4.5px，轻微下沉）

export default function RulerBg() {
  const ballRef = useRef(null)
  const readoutRef = useRef(null)
  const rollerInnerRef = useRef(null)
  const row3SvgRef = useRef(null)
  const row4SvgRef = useRef(null)
  const row5SvgRef = useRef(null)
  // 高亮竖向渐变线（顶深→底透，叠在读数那根刻度上）
  const hlRefs = { row3: useRef(null), row4: useRef(null), row5: useRef(null) }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ball = ballRef.current
    const rollerInner = rollerInnerRef.current
    const svgs = { row3: row3SvgRef.current, row4: row4SvgRef.current, row5: row5SvgRef.current }
    if (!ball || !rollerInner || !svgs.row3) return

    // 预取每排的线及其 viewBox x（x 不变，只改 y1）
    const build = (svg) => svg ? Array.from(svg.querySelectorAll('line:not([data-hl])')).map((el) => ({ el, x: parseFloat(el.getAttribute('x1')) })) : []
    const lines = { row3: build(svgs.row3), row4: build(svgs.row4), row5: build(svgs.row5) }
    const refSvg = svgs.row3 // 各排 svg 屏幕盒一致，用它做屏幕↔viewBox 映射

    // 各排高亮线渐变的两个 stop（每帧把顶部/底部色改成该处原色的深色版）
    const hlStops = {}
    for (const key of ['row3', 'row4', 'row5']) {
      const g = svgs[key] && svgs[key].querySelector(`#hlGrad-${key}`)
      if (g) { const s = g.querySelectorAll('stop'); hlStops[key] = [s[0], s[1]] }
    }

    // 球心 viewBox x 决定所在排与落点高度：<L1→row3(270)，<L3→row4(360)，否则 row5(450)
    const rowAt = (vbx) => (vbx < COL ? 'row3' : vbx < COL * 3 ? 'row4' : 'row5')
    const bottomFor = (row) => (row === 'row3' ? 270 : row === 'row4' ? 360 : 450)

    let dipped = []       // 上一帧被压下的线，用于快速复位
    let hl = null         // 当前显示的高亮线元素，用于下一帧隐藏
    let following = false // 入场动画结束后转为跟随鼠标
    let mouseX = null
    let mouseY = null
    let curX = null       // 球心屏幕 x
    let targetX = null    // 跟随目标 x（出区间时冻结在最后值 ⇒ 滑行减速停下）
    let curBottom = 270
    let rotAcc = 0
    let prevX = null
    let raf

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMove)

    // 只有鼠标落在刻度带（高 450px）再往上多留一点的区间内才控制小球
    const BAND_PAD_TOP = 60
    const BAND_PAD_BOTTOM = 40

    // 入场动画结束 → 冻结 CSS 动画，改由 JS 控制位置
    const onEnd = (e) => {
      if (!e.animationName || !e.animationName.includes('ballRoll')) return
      const r = ball.getBoundingClientRect()
      curX = r.left + r.width / 2
      targetX = curX
      prevX = curX
      curBottom = 270
      rotAcc = 2400
      ball.style.animation = 'none'
      ball.style.opacity = '1'
      ball.style.left = (curX - rollerInner.getBoundingClientRect().left) + 'px'
      ball.style.bottom = curBottom + 'px'
      ball.style.transform = `rotate(${rotAcc}deg)`
      following = true
    }
    ball.addEventListener('animationend', onEnd)

    const px2vbx = (px, rect) => VB_MINX + ((px - rect.left) / rect.width) * VB_FULLW

    const frame = () => {
      const svgRect = refSvg.getBoundingClientRect()
      const rVbx = 5.5 * (VB_FULLW / svgRect.width) // 球半径换算成 viewBox 单位

      // 跟随鼠标：始终跑 lerp；只有在区间内才更新目标点，出区间则目标冻结 ⇒ 滑行减速到停。
      const innerRect = rollerInner.getBoundingClientRect()
      if (following) {
        const inBand = mouseX != null && mouseY != null &&
          mouseY >= innerRect.bottom - 450 - BAND_PAD_TOP &&
          mouseY <= innerRect.bottom + BAND_PAD_BOTTOM
        // 夹紧到主体范围 [L0, L4]（=0–1）：鼠标再靠外，小球也被禁锢在 0–1 内
        const L0x = svgRect.left + ((0 - VB_MINX) / VB_FULLW) * svgRect.width
        const L4x = svgRect.left + ((VB_W - VB_MINX) / VB_FULLW) * svgRect.width
        if (inBand) targetX = Math.max(L0x, Math.min(L4x, mouseX))
        curX += (targetX - curX) * 0.12
        if (Math.abs(targetX - curX) < 0.3) curX = targetX // 足够近就吸附到位，停止微动 ⇒ 读数不再闪
        // 骑在 footprint 内最高的台阶上（用右缘决定）：升立即、降平滑 ⇒ 永不压入更高刻度
        const targetBottom = bottomFor(rowAt(px2vbx(curX, svgRect) + rVbx))
        curBottom = targetBottom > curBottom ? targetBottom : curBottom + (targetBottom - curBottom) * 0.18
        rotAcc += ((curX - prevX) / 5.5) * (180 / Math.PI)
        prevX = curX
        ball.style.left = (curX - innerRect.left) + 'px'
        ball.style.bottom = curBottom + 'px'
        ball.style.transform = `rotate(${rotAcc}deg)`
      }

      // 下沉：把小球当前所骑那排、球心附近的刻度 y1 往下压（cos 衰减山谷）
      const visible = parseFloat(getComputedStyle(ball).opacity) > 0.5
      const ballRect = ball.getBoundingClientRect()
      // 跟随阶段用逻辑坐标 curX（无亚像素抖动），入场阶段用实测中心
      const ballCx = following && curX != null ? curX : ballRect.left + ballRect.width / 2
      const ballVbX = px2vbx(ballCx, svgRect)
      const active = rowAt(ballVbX + rVbx)
      for (const ln of dipped) ln.setAttribute('y1', '0')
      dipped = []
      if (visible) {
        for (const { el, x } of lines[active]) {
          const d = Math.abs(x - ballVbX)
          if (d < DIP_RADIUS) {
            const f = 0.5 + 0.5 * Math.cos((d / DIP_RADIUS) * Math.PI)
            el.setAttribute('y1', (DIP_MAX * f).toFixed(1))
            dipped.push(el)
          }
        }
      }

      // 只在主体范围（L0–L4）内显示读数/高亮，进入两侧页边距则隐藏
      const show = visible && ballVbX >= 0 && ballVbX <= VB_W

      // 找当前所骑排上离小球最近的刻度
      let near = null
      let nd = Infinity
      if (show) {
        for (const item of lines[active]) {
          const d = Math.abs(item.x - ballVbX)
          if (d < nd) { nd = d; near = item }
        }
      }
      // 读数：主体范围内一直显示，值取最近刻度的精确值（0→1，精度随排递增），并对齐到那根刻度
      const readout = readoutRef.current
      if (readout) {
        if (show && near) {
          const decimals = active === 'row3' ? 2 : active === 'row4' ? 4 : 8
          const value = Math.min(1, Math.max(0, near.x / VB_W))
          readout.textContent = value.toFixed(decimals)
          const ballBottom = following && curX != null ? curBottom : 270
          readout.style.left = (ballCx - innerRect.left) + 'px' // 跟随小球，与其居中对齐
          readout.style.bottom = (ballBottom + 11 + 3) + 'px'
          readout.style.opacity = '1'
        } else {
          readout.style.opacity = '0'
        }
      }

      // 高亮读数处那根刻度：叠一条竖向渐变线（顶深→底透，透出原刻度色），与该刻度对齐。
      if (hl) { hl.setAttribute('stroke-opacity', '0'); hl = null }
      if (show && near) {
        const ov = hlRefs[active].current
        if (ov) {
          // 顶部色：row3/row4 用压暗版；row5 原色偏浅，改用「提纯」版（鲜艳而不发脏）
          const dark = active === 'row5' ? vividColorAt(near.x / VB_W) : darkColorAt(near.x / VB_W, 0.72)
          const stops = hlStops[active]
          if (stops) { stops[0].setAttribute('stop-color', dark); stops[1].setAttribute('stop-color', dark) }
          ov.setAttribute('x1', near.x)
          ov.setAttribute('x2', near.x)
          ov.setAttribute('y1', near.el.getAttribute('y1') || '0') // 跟随该刻度当前（可能被压下的）顶端
          ov.setAttribute('stroke-width', near.el.getAttribute('stroke-width') || '2') // 跟随该刻度自身粗细
          ov.setAttribute('stroke-opacity', '1')
          hl = ov
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      ball.removeEventListener('animationend', onEnd)
    }
  }, [])

  // 渲染一层（一组排）：复用 GridOverlay 完全相同的盒模型，保证 L0..L4 与竖线取整一致。
  const renderLayer = (rows) => (
    <div className={styles.frame}>
      <div className={styles.inner}>
        {rows.map(({ cls, ...cfg }) => {
          const gradId = `rulerGrad-${cls}`
          const svgRef = cls === 'row3' ? row3SvgRef : cls === 'row4' ? row4SvgRef : cls === 'row5' ? row5SvgRef : undefined
          const hlRef = hlRefs[cls] // 仅 row3/4/5 有
          return (
            <div key={cls} className={`${styles.rowBox} ${styles[cls]}`}>
              <svg
                ref={svgRef}
                className={styles.rowSvg}
                viewBox={`${VB_MINX} 0 ${VB_FULLW} ${VB_H}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={gradId}
                    gradientUnits="userSpaceOnUse"
                    x1="0" y1="0" x2={VB_W} y2="0"
                  >
                    {GRAD_STOPS.map(({ offset, color }) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                  {/* 高亮线的竖向渐变：顶端（贴小球）深色不透明 → 底端透明（透出原刻度色） */}
                  <linearGradient
                    id={`hlGrad-${cls}`}
                    gradientUnits="userSpaceOnUse"
                    x1="0" y1="0" x2="0" y2={VB_H}
                  >
                    <stop offset="0" stopColor="#0a1628" stopOpacity="1" />
                    <stop offset="0.5" stopColor="#0a1628" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {makeLines(cfg).map(({ x, op, sw }, i) => (
                  <line
                    key={i}
                    x1={x}
                    x2={x}
                    y1="0"
                    y2={VB_H}
                    stroke={`url(#${gradId})`}
                    strokeOpacity={op}
                    strokeWidth={sw}
                    vectorEffect="non-scaling-stroke"
                    shapeRendering="crispEdges"
                  />
                ))}
                {/* 读数处的高亮线（默认隐藏，JS 每帧定位/显隐） */}
                {hlRef && (
                  <line
                    ref={hlRef}
                    data-hl="1"
                    x1="0" x2="0" y1="0" y2={VB_H}
                    stroke={`url(#hlGrad-${cls})`}
                    strokeOpacity="0"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
            </div>
          )
        })}
      </div>
    </div>
  )

  const backRows = ROWS.filter((r) => r.cls === 'row1' || r.cls === 'row2' || r.cls === 'row3')
  const frontRows = ROWS.filter((r) => r.cls === 'row4' || r.cls === 'row5')

  return (
    <>
    {/* 矮排（row1-3）：在小球之下 */}
    <div className={`${styles.ruler} ${styles.rulerBack}`} aria-hidden="true">
      {renderLayer(backRows)}
    </div>

    {/* 小球层：在矮排之上、高排之下 ⇒ 遇到更高的墙会藏到墙后。
        扫描结束后从左侧被踢入并停在 row3；入场动画结束后转为跟随鼠标，可爬上 row4/row5，所到之处刻度下沉。 */}
    <div className={styles.roller} aria-hidden="true">
      <div ref={rollerInnerRef} className={styles.rollerInner}>
        <div ref={ballRef} className={styles.ball} />
        <div ref={readoutRef} className={styles.readout} />
      </div>
    </div>

    {/* 高排（row4-5）：在小球之上 */}
    <div className={`${styles.ruler} ${styles.rulerFront}`} aria-hidden="true">
      {renderLayer(frontRows)}
    </div>

    {/* 入场校准扫描：一条发光测量线从左扫到右，与刻度显现边缘同步；扫到最右端落定脉冲一次。
        reduced-motion 下整层隐藏（刻度已完整显示）。 */}
    <div className={styles.sweep} aria-hidden="true">
      <div className={styles.sweepBar} />
      <div className={styles.sweepLock} />
    </div>
    </>
  )
}
