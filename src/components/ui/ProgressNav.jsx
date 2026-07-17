import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProgressNav.module.css'

const SECTIONS = [
  { id: 'our-services', key: 'services' },
  { id: 'about', key: 'about' },
  { id: 'technology', key: 'technology' },
]

/**
 * 顶部进度条：随滚动填充的彩色细条。
 * 鼠标靠近进度条时，进度条下方浮出灰色背景条 + 三段文案，点击平滑滚动到对应模块。
 * 条的位置贴在导航栏真实底边（实测），标记默认隐藏；用鼠标 Y 判定"靠近"，不阻挡内容点击。
 */
export default function ProgressNav() {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0) // 0..1
  const [markers, setMarkers] = useState([]) // [{ id, key, pos }]
  const [near, setNear] = useState(false) // 鼠标是否靠近进度条
  const [navH, setNavH] = useState(58) // 导航栏真实高度（贴条用）
  const navHRef = useRef(58)
  const bandRef = useRef(null) // 用于实测标签中心位置

  useEffect(() => {
    const measureNav = () => {
      const nav = document.querySelector('nav')
      if (nav) {
        const h = Math.round(nav.getBoundingClientRect().height)
        navHRef.current = h
        setNavH(h)
      }
    }
    measureNav()

    let ticking = false
    const compute = () => {
      ticking = false
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0

      // 各模块的滚动位置（断点）
      const secFracs = []
      const ms = []
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el && scrollable > 0) {
          secFracs.push(Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / scrollable)))
          ms.push(s)
        }
      })
      setMarkers(ms)

      // 三个标签的中心位置（目标点）
      const targets = []
      const btns = bandRef.current ? bandRef.current.querySelectorAll('button') : []
      btns.forEach((b) => {
        const r = b.getBoundingClientRect()
        targets.push((r.left + r.width / 2) / window.innerWidth)
      })

      // 分段重映射：滚到某模块 ⇒ 填充推进到对应标签处（非线性，让进度与文案大致对齐）
      let fill = p
      if (secFracs.length > 0 && secFracs.length === targets.length) {
        const bp = [0, ...secFracs, 1]
        const tg = [0, ...targets, 1]
        for (let j = 0; j < bp.length - 1; j++) {
          if (p <= bp[j + 1] || j === bp.length - 2) {
            const span = bp[j + 1] - bp[j] || 1
            fill = tg[j] + ((p - bp[j]) / span) * (tg[j + 1] - tg[j])
            break
          }
        }
      }
      setProgress(Math.min(1, Math.max(0, fill)))
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute) } }
    const onResize = () => { measureNav(); onScroll() }
    const onMove = (e) => setNear(e.clientY >= navHRef.current - 12 && e.clientY <= navHRef.current + 44)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    compute()
    const t = setTimeout(() => { measureNav(); compute() }, 500)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      clearTimeout(t)
    }
  }, [])

  if (markers.length === 0) return null

  const go = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className={`${styles.bar} ${near ? styles.barNear : ''}`} style={{ top: navH }} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
      </div>
      <div ref={bandRef} className={`${styles.band} ${near ? styles.bandVisible : ''}`} style={{ top: navH }}>
        <div className={styles.bandInner}>
          {markers.map((m, i) => (
            <button key={m.id} type="button" className={styles.bandLabel} onClick={() => go(m.id)}>
              Chapter {i + 1} · {t(`bridges.${m.key}`)}{i < markers.length - 1 ? ' →' : ''}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
