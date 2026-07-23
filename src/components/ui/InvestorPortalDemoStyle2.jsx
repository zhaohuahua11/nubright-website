import { useEffect, useRef, useCallback } from 'react'
import ReactECharts from 'echarts-for-react'
import styles from './InvestorPortalDemoStyle2.module.css'
import img1 from '../../assets/inverstor portal-ui-dashboard-1.webp'
import img2 from '../../assets/inverstor portal-ui-dashboard-2.webp'
import iconSecurity from '../../assets/code-security.svg'
import iconCheck from '../../assets/check.svg'
import imgSuccess from '../../assets/inverstor portal-ui-success.webp'

// 下拉里列出的是投资者「可直接认购」的基金（账户初始无持仓，不能写成已持有）。
// 第 2 项是 demo 中被选中的那只，与下方 dataSection 的 Fund Name 对应。
const FUND_OPTIONS = [
  'NuBright Absolute Return Class A SP',
  'NuBright Fixed Income SP',
  'NuBright Global Macro Opportunities Fund SP',
]
const SELECTED_FUND_INDEX = 1

// 全片速度系数：>1 加快，<1 放慢。所有时间戳都经 after() 换算，改这一个数即可整体调速。
// 注意 CSS 过渡时长（0.4s / 0.55s 等）不随之缩放，加得太多会让动作重叠，建议不超过 1.4。
const SPEED = 1.2

const EC_COLORS = ['#7c3aed', '#3b82f6', '#0ea5e9', '#14b8a6', '#22c55e']
const EC_FUND_DATA = [
  { value: 2736840.25, name: 'Fund0' },
  { value: 2051320.40, name: 'Fund1' },
  { value: 1587614.60, name: 'Fund2' },
  { value: 1036284.80, name: 'Fund3' },
  { value:  568129.35, name: 'Fund4' },
]
const EC_BASE_SERIES = {
  type: 'pie',
  radius: ['74%', '92%'],
  center: ['50%', '50%'],
  startAngle: 90,
  clockwise: false,
  itemStyle: { borderRadius: 3, borderColor: '#fff', borderWidth: 2 },
  label: { show: false },
  emphasis: { scale: false },
  silent: true,
}
const EC_INIT_OPTION = {
  animation: false,
  color: [EC_COLORS[0]],
  series: [{ ...EC_BASE_SERIES, data: [{ value: 1, name: 'Fund0' }] }],
}

const SKELETON_ROWS = [
  { labelW: 68, valueW: '55%' },
  { labelW: 68, valueW: '38%' },
  { labelW: 68, valueW: '28%' },
  { labelW: 68, valueW: '42%' },
  { labelW: 68, valueW: '33%' },
  { labelW: 68, valueW: '48%' },
  { labelW: 68, valueW: '36%' },
  { labelW: 68, valueW: '44%' },
  { labelW: 68, valueW: '30%' },
  { labelW: 68, valueW: '52%' },
]


export default function InvestorPortalDemoStyle2({ replayRef }) {
  const wrapRef     = useRef(null)
  const cursorRef   = useRef(null)
  const timers      = useRef([])
  const hasPlayed   = useRef(false)
  const echartsRef  = useRef(null)
  const rafIds      = useRef([])  // 平滑滚动的 rAF 句柄，重播时需取消
  const viewportRef = useRef(null)

  const q = useCallback((key) =>
    wrapRef.current?.querySelector(`[data-demo="${key}"]`), [])

  const after = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms / SPEED)
    timers.current.push(id)
    return id
  }, [])

  // 与 after() 对称：登记 rAF 句柄，重播时统一取消。
  // 平滑滚动是逐帧写 scrollTop 的循环，不取消会覆盖掉 resetAll() 的归零。
  const raf = useCallback((fn) => {
    const id = requestAnimationFrame(fn)
    rafIds.current.push(id)
    return id
  }, [])

  const show = (el) => { if (el) { el.style.opacity = '1'; el.style.pointerEvents = 'auto' } }
  const hide = (el) => { if (el) { el.style.opacity = '0'; el.style.pointerEvents = 'none' } }

  const resetAll = useCallback(() => {
    show(q('screenDashboard'))
    hide(q('screenSubscribe'))

    const tabDash  = q('tabDashboard')
    const tabTrans = q('tabTransactions')
    if (tabDash)  tabDash.dataset.active  = 'true'
    if (tabTrans) delete tabTrans.dataset.active

    const btn = q('subscribeBtn')
    if (btn) delete btn.dataset.pressed

    const fundSelect  = q('fundSelect')
    const placeholder = q('fundSelectPlaceholder')
    const selValue    = q('fundSelectValue')
    const dropdown    = q('fundDropdown')
    const badge       = q('verifyBadge')
    const spinner     = q('verifySpinner')
    const badgeText   = q('verifyText')
    if (fundSelect)  delete fundSelect.dataset.active
    if (placeholder) { placeholder.style.display = ''; placeholder.style.opacity = '1' }
    if (selValue)    { selValue.style.display = 'none'; selValue.textContent = '' }
    if (dropdown)    { dropdown.style.display = 'none'; dropdown.style.opacity = '0' }
    FUND_OPTIONS.forEach((_, i) => {
      const opt = q(`fundOption${i}`)
      if (opt) delete opt.dataset.hover
    })
    if (badge)       { badge.style.opacity = '0'; delete badge.dataset.state }
    if (spinner)     delete spinner.dataset.check
    if (badgeText)   badgeText.textContent = 'Loading...'

    const skelSection = q('skeletonSection')
    const dataSect    = q('dataSection')
    const actionBtn   = q('actionBtn')
    if (skelSection) { skelSection.style.display = ''; skelSection.style.opacity = '1' }
    if (dataSect) {
      dataSect.style.display = 'none'
      Array.from(dataSect.children).forEach(row => {
        row.style.opacity = ''
        row.style.transform = ''
        row.style.filter = ''
        row.style.transition = ''
      })
    }
    if (actionBtn)   { actionBtn.style.display = 'none'; actionBtn.textContent = 'Next'; delete actionBtn.dataset.active }

    const qb = q('quickBtn200')
    const az = q('amountZero')
    if (qb) { delete qb.dataset.pressed; delete qb.dataset.selected }
    if (az) { az.style.transition = ''; az.style.color = ''; az.style.fontWeight = ''; az.textContent = '0.00' }

    const formBody    = q('formBody')
    const successSect = q('successSection')
    if (formBody)    { formBody.style.display = ''; formBody.style.opacity = '1' }
    if (successSect) { successSect.style.display = 'none'; successSect.style.opacity = '0' }

    const scrollEl = q('subscribeBody')
    if (scrollEl) scrollEl.scrollTop = 0

    const kycBar = q('kycBar')
    if (kycBar) { kycBar.style.display = '' }

    const txEmpty  = q('transactionsEmpty')
    const txFilled = q('transactionsFilled')
    if (txEmpty)  txEmpty.style.display = ''
    if (txFilled) { txFilled.style.display = 'none'; txFilled.style.opacity = '0' }

    const txBadge    = q('txStatusBadge')
    const txBadgeSub = q('txStatusSub')
    if (txBadge)    { txBadge.style.transition = ''; txBadge.style.transform = ''; txBadge.style.opacity = ''; txBadge.textContent = 'Pending Signature'; txBadge.style.background = '#fef3c7'; txBadge.style.color = '#d97706' }
    if (txBadgeSub) { txBadgeSub.style.transition = ''; txBadgeSub.style.opacity = ''; txBadgeSub.textContent = 'Sign your agreement via email' }

    const txPending = q('txPendingContent')
    const txNoPend  = q('txNoPending')
    const txTabBdg  = q('txTabBadge')
    if (txPending) { txPending.style.display = ''; txPending.style.opacity = '' }
    if (txNoPend)  { txNoPend.style.display = 'none'; txNoPend.style.opacity = '0' }
    if (txTabBdg)  { txTabBdg.style.display = 'none'; txTabBdg.style.transition = ''; txTabBdg.style.transform = ''; txTabBdg.style.opacity = ''; txTabBdg.textContent = '+1' }

    const navEmp  = q('navEmpty')
    const navFld  = q('navFilled')
    if (navEmp) { navEmp.style.display = ''; navEmp.style.opacity = '' }
    if (navFld) { navFld.style.display = 'none'; navFld.style.opacity = '0' }

    const portEmp  = q('portfolioEmpty')
    const portFld  = q('portfolioFilled')
    const portCurr = q('portfolioCurrencyRow')
    if (portEmp)  { portEmp.style.display = ''; portEmp.style.opacity = '' }
    if (portFld)  { portFld.style.display = 'none'; portFld.style.opacity = '0' }
    if (portCurr) { portCurr.style.display = 'none'; portCurr.style.opacity = '' }

    const ec = echartsRef.current?.getEchartsInstance()
    if (ec) ec.setOption(EC_INIT_OPTION, { notMerge: true })
    const navRow0 = q('navRow0')
    if (navRow0) { navRow0.style.transform = ''; navRow0.style.transition = '' }
    for (let i = 1; i <= 4; i++) {
      const navRow = q(`navRow${i}`)
      if (navRow) { navRow.style.display = 'none'; navRow.style.opacity = '0'; navRow.style.transform = ''; navRow.style.filter = ''; navRow.style.transition = '' }
      const legRow = q(`portLegRow${i}`)
      if (legRow) { legRow.style.display = 'none'; legRow.style.opacity = '0'; legRow.style.transform = ''; legRow.style.filter = ''; legRow.style.transition = '' }
    }
    const portTotal = q('portDonutTotal')
    if (portTotal) portTotal.textContent = '2,736,840.25'
  }, [q])

  const playDemo = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    rafIds.current.forEach(cancelAnimationFrame)
    rafIds.current = []

    const wrap   = wrapRef.current
    const cursor = cursorRef.current
    const replay = replayRef?.current
    if (!wrap || !cursor || !replay) return

    replay.onclick = () => playDemo()

    // wrap 带 transform: scale()，getBoundingClientRect() 返回的是缩放后的视觉尺寸，
    // 而光标的 translate 写在被缩放的元素内部会再缩放一次（变成 s²）。
    // 这里把量到的值除回布局坐标系；relRect 返回的 x/y/w/h 均已消除缩放。
    const scaleOf = () => (wrap.getBoundingClientRect().width / wrap.offsetWidth) || 1
    const relRect = (el) => {
      const wr0 = wrap.getBoundingClientRect()
      const r   = el.getBoundingClientRect()
      const s   = scaleOf()
      return { x: (r.left - wr0.left) / s, y: (r.top - wr0.top) / s, w: r.width / s, h: r.height / s }
    }

    resetAll()
    cursor.style.transition = 'none'
    cursor.style.opacity    = '0'

    requestAnimationFrame(() => {
      const btn = q('subscribeBtn')
      const ci  = q('fundSelect')
      if (!btn || !ci) return

      const R = relRect(btn)

      const tx = R.x + R.w / 2

      const ty = R.y + R.h / 2

      // 基金选择器位置（screen2 虽隐藏，此时仍可计算）
      const CR  = relRect(ci)
      const cx  = CR.x + CR.w * 0.62
      const cy  = CR.y + CR.h / 2
      // 光标入场点：选择框右下方（相对其自身尺寸，不写死像素）
      const enterX = CR.x + CR.w * 0.72
      const enterY = cy + 80

      // ── Phase 1: click Subscribe Now ──────────────────────────────

      cursor.style.transform = `translate(${tx - 120}px,${ty + 80}px)`
      after(() => { cursor.style.transition = 'opacity 0.3s'; cursor.style.opacity = '1' }, 350)

      after(() => {
        cursor.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${tx}px,${ty}px)`
      }, 580)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${tx}px,${ty}px) scale(0.78)`
      }, 1250)
      after(() => { btn.dataset.pressed = 'true' }, 1290)

      after(() => {
        cursor.style.transition = 'transform 0.15s'
        cursor.style.transform  = `translate(${tx}px,${ty}px) scale(1)`
      }, 1390)
      after(() => { delete btn.dataset.pressed }, 1440)

      after(() => { cursor.style.transition = 'opacity 0.35s'; cursor.style.opacity = '0' }, 1560)

      // ── Switch to Screen 2 ────────────────────────────────────────
      after(() => {
        hide(q('screenDashboard'))
        const tabDash  = q('tabDashboard')
        const tabTrans = q('tabTransactions')
        if (tabDash)  delete tabDash.dataset.active
        if (tabTrans) tabTrans.dataset.active = 'true'
        after(() => show(q('screenSubscribe')), 80)
      }, 1700)

      // ── Phase 2: 打开基金下拉框 ────────────────────────────────────
      // 本段（2100–7100ms）替换了原「输入 Fund Access Code」流程。
      // 起止时刻保持不变，因此 Phase 5 及之后的时间戳无需调整。

      after(() => {
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${enterX}px,${enterY}px)`
        cursor.style.opacity    = '0'
        requestAnimationFrame(() => {
          cursor.style.transition = 'opacity 0.3s'
          cursor.style.opacity    = '1'
        })
      }, 2100)

      after(() => {
        cursor.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${cx}px,${cy}px)`
      }, 2350)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${cx}px,${cy}px) scale(0.78)`
      }, 2820)

      // 展开下拉：整体一次性淡入
      after(() => {
        const sel  = q('fundSelect')
        const drop = q('fundDropdown')
        if (sel) sel.dataset.active = 'true'
        if (drop) {
          drop.style.display = ''
          requestAnimationFrame(() => { drop.style.opacity = '1' })
        }
      }, 2860)

      after(() => {
        cursor.style.transition = 'transform 0.15s'
        cursor.style.transform  = `translate(${cx}px,${cy}px) scale(1)`
      }, 2940)

      // ── Phase 3: 移到目标基金并悬停 ───────────────────────────────
      // 下拉此时才可见，选项坐标必须在回调内实测（展开前 rect 为 0）

      after(() => {
        const opt = q(`fundOption${SELECTED_FUND_INDEX}`)
        if (!opt) return
        const OR  = relRect(opt)
        const ox  = OR.x + OR.w * 0.62
        const oy  = OR.y + OR.h / 2
        cursor.dataset.ox = String(ox)
        cursor.dataset.oy = String(oy)
        cursor.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${ox}px,${oy}px)`
      }, 3400)

      after(() => {
        const opt = q(`fundOption${SELECTED_FUND_INDEX}`)
        if (opt) opt.dataset.hover = 'true'
      }, 4000)

      // ── Phase 4: 选中 → 加载基金档案 ──────────────────────────────

      after(() => {
        const ox = cursor.dataset.ox, oy = cursor.dataset.oy
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${ox}px,${oy}px) scale(0.78)`
      }, 4120)

      // 落选：收起下拉、填入基金名
      after(() => {
        const sel   = q('fundSelect')
        const ph    = q('fundSelectPlaceholder')
        const val   = q('fundSelectValue')
        const drop  = q('fundDropdown')
        if (ph)  ph.style.display = 'none'
        if (val) { val.style.display = ''; val.textContent = FUND_OPTIONS[SELECTED_FUND_INDEX] }
        if (drop) {
          drop.style.opacity = '0'
          after(() => { drop.style.display = 'none' }, 180)
        }
        if (sel) delete sel.dataset.active
        FUND_OPTIONS.forEach((_, i) => {
          const opt = q(`fundOption${i}`)
          if (opt) delete opt.dataset.hover
        })
      }, 4220)

      after(() => {
        const ox = cursor.dataset.ox, oy = cursor.dataset.oy
        // 一条过渡同时管 transform 与 opacity，避免下面的淡出把它覆盖掉
        cursor.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease'
        cursor.style.transform  = `translate(${ox}px,${oy}px) scale(1)`
      }, 4320)

      // 淡出时轻微缩小，读作"抬手离开"而非凭空消失（不重设 transition）
      after(() => {
        const ox = cursor.dataset.ox, oy = cursor.dataset.oy
        cursor.style.opacity   = '0'
        cursor.style.transform = `translate(${ox}px,${oy}px) scale(0.82)`
      }, 4600)

      after(() => {
        const badge = q('verifyBadge')
        if (badge) { badge.style.opacity = '1'; badge.dataset.state = 'verifying' }
      }, 4220)

      after(() => {
        const badge   = q('verifyBadge')
        const spinner = q('verifySpinner')
        const text    = q('verifyText')
        if (badge)   badge.dataset.state   = 'verified'
        if (spinner) spinner.dataset.check = 'true'
        if (text)    text.textContent      = 'Success'
      }, 5900)

      // ── In-place: fade skeleton out, fade real data in ───────────
      after(() => {
        const skelSection = q('skeletonSection')
        const dataSect    = q('dataSection')
        const actionBtn   = q('actionBtn')
        if (skelSection) skelSection.style.opacity = '0'
        after(() => {
          if (skelSection) skelSection.style.display = 'none'
          if (dataSect) {
            dataSect.style.display = ''
            const rows = Array.from(dataSect.children)
            rows.forEach((row) => {
              row.style.opacity = '0'
              row.style.transform = 'scale(0.94)'
              row.style.filter = 'blur(4px)'
              row.style.transition = 'none'
            })
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                rows.forEach((row, i) => {
                  after(() => {
                    row.style.transition = 'opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease'
                    row.style.opacity = '1'
                    row.style.transform = 'scale(1)'
                    row.style.filter = 'blur(0px)'
                  }, i * 80)
                })
              })
            })
          }
          if (actionBtn) { actionBtn.style.display = ''; actionBtn.textContent = 'Submit Application'; actionBtn.dataset.active = 'true' }
          after(() => {
            const scrollEl  = q('subscribeBody')
            const amountRow = q('amountRow')
            if (!scrollEl || !amountRow) return
            // rect 差为视觉像素，scrollTop/clientHeight 为布局像素 → 先除回布局坐标系
            const elemTop  = (amountRow.getBoundingClientRect().top - scrollEl.getBoundingClientRect().top) / scaleOf() + scrollEl.scrollTop
            const target   = elemTop - scrollEl.clientHeight / 2 + amountRow.clientHeight / 2
            const start    = scrollEl.scrollTop
            const distance = target - start
            const duration = 1400
            const t0       = performance.now()
            const ease     = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            const step     = (now) => {
              const p = Math.min((now - t0) / duration, 1)
              scrollEl.scrollTop = start + distance * ease(p)
              if (p < 1) raf(step)
            }
            raf(step)
          }, 100)
        }, 350)
      }, 6300)

      // ── Phase 5: cursor from right → click USD 200,000 ───────────
      after(() => {
        const qb = q('quickBtn200')
        if (!qb) return
        const R = relRect(qb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        // appear from bottom-right
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${bx + 100}px,${by + 80}px)`
        cursor.style.opacity    = '0'
        requestAnimationFrame(() => {
          cursor.style.transition = 'opacity 0.3s'
          cursor.style.opacity    = '1'
        })
      }, 8400)

      after(() => {
        const qb = q('quickBtn200')
        if (!qb) return
        const R = relRect(qb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${bx}px,${by}px)`
      }, 8650)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        const qb = q('quickBtn200')
        if (!qb) return
        const R = relRect(qb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform  = `translate(${bx}px,${by}px) scale(0.78)`
      }, 9150)
      after(() => {
        const qb = q('quickBtn200')
        if (qb) qb.dataset.pressed = 'true'
      }, 9190)
      after(() => {
        cursor.style.transition = 'transform 0.15s'
        const qb = q('quickBtn200')
        if (!qb) return
        const R = relRect(qb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform  = `translate(${bx}px,${by}px) scale(1)`
      }, 9280)
      after(() => {
        const qb  = q('quickBtn200')
        const az  = q('amountZero')
        if (qb) { delete qb.dataset.pressed; qb.dataset.selected = 'true' }
        if (az) { az.style.transition = 'color 0.3s'; az.style.color = '#111827'; az.style.fontWeight = '600'; az.textContent = '200,000.00' }
      }, 9350)
      after(() => { cursor.style.transition = 'opacity 0.35s'; cursor.style.opacity = '0' }, 9480)

      // ── Scroll to Submit button ───────────────────────────────────
      after(() => {
        const scrollEl  = q('subscribeBody')
        const submitBtn = q('actionBtn')
        if (!scrollEl || !submitBtn) return
        const target   = scrollEl.scrollHeight - scrollEl.clientHeight
        const start    = scrollEl.scrollTop
        const distance = target - start
        const duration = 1200
        const t0       = performance.now()
        const ease     = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        const step     = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          scrollEl.scrollTop = start + distance * ease(p)
          if (p < 1) raf(step)
        }
        raf(step)
      }, 9700)

      // ── Phase 6: cursor clicks Submit ────────────────────────────
      after(() => {
        const sb = q('actionBtn')
        if (!sb) return
        const R = relRect(sb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${bx + 80}px,${by - 60}px)`
        cursor.style.opacity    = '0'
        requestAnimationFrame(() => {
          cursor.style.transition = 'opacity 0.3s'
          cursor.style.opacity    = '1'
        })
      }, 11100)

      after(() => {
        const sb = q('actionBtn')
        if (!sb) return
        const R = relRect(sb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${bx}px,${by}px)`
      }, 11350)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        const sb = q('actionBtn')
        if (!sb) return
        const R = relRect(sb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform = `translate(${bx}px,${by}px) scale(0.78)`
      }, 11800)
      after(() => {
        const sb = q('actionBtn')
        if (sb) sb.dataset.pressed = 'true'
      }, 11840)
      after(() => {
        cursor.style.transition = 'transform 0.15s'
        const sb = q('actionBtn')
        if (!sb) return
        const R = relRect(sb)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform = `translate(${bx}px,${by}px) scale(1)`
      }, 11940)
      after(() => {
        const sb = q('actionBtn')
        if (sb) delete sb.dataset.pressed
        cursor.style.transition = 'opacity 0.35s'
        cursor.style.opacity = '0'
      }, 12020)

      // ── Transition to success screen ─────────────────────────────
      after(() => {
        const formBody = q('formBody')
        if (formBody) formBody.style.opacity = '0'
        after(() => {
          if (formBody) formBody.style.display = 'none'
          const successSect = q('successSection')
          if (successSect) {
            successSect.style.display = ''
            requestAnimationFrame(() => {
              requestAnimationFrame(() => { successSect.style.opacity = '1' })
            })
          }
          const scrollEl = q('subscribeBody')
          if (scrollEl) scrollEl.scrollTop = 0
        }, 380)
      }, 12200)

      // ── Phase 7: cursor clicks Dashboard nav ─────────────────────
      after(() => {
        const tabDash = q('tabDashboard')
        if (!tabDash) return
        const R = relRect(tabDash)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${bx + 60}px,${by + 50}px)`
        cursor.style.opacity    = '0'
        requestAnimationFrame(() => {
          cursor.style.transition = 'opacity 0.3s'
          cursor.style.opacity    = '1'
        })
      }, 13700)

      after(() => {
        const tabDash = q('tabDashboard')
        if (!tabDash) return
        const R = relRect(tabDash)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${bx}px,${by}px)`
      }, 13950)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        const tabDash = q('tabDashboard')
        if (!tabDash) return
        const R = relRect(tabDash)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform = `translate(${bx}px,${by}px) scale(0.78)`
      }, 14400)
      after(() => {
        const tabDash  = q('tabDashboard')
        const tabTrans = q('tabTransactions')
        if (tabDash)  tabDash.dataset.active = 'true'
        if (tabTrans) delete tabTrans.dataset.active
      }, 14440)
      after(() => {
        cursor.style.transition = 'transform 0.15s'
        const tabDash = q('tabDashboard')
        if (!tabDash) return
        const R = relRect(tabDash)
        const bx = R.x + R.w / 2
        const by = R.y + R.h / 2
        cursor.style.transform = `translate(${bx}px,${by}px) scale(1)`
      }, 14520)
      after(() => {
        cursor.style.transition = 'opacity 0.35s'
        cursor.style.opacity    = '0'
      }, 14620)

      // ── Switch back to Dashboard with updated Transactions ────────
      after(() => {
        hide(q('screenSubscribe'))
        const txEmpty  = q('transactionsEmpty')
        const txFilled = q('transactionsFilled')
        if (txEmpty)  txEmpty.style.display  = 'none'
        if (txFilled) { txFilled.style.display = ''; txFilled.style.opacity = '0' }
        show(q('screenDashboard'))
        const kycBar = q('kycBar')
        if (kycBar) { kycBar.style.display = 'none' }
      }, 14760)

      after(() => {
        const txFilled = q('transactionsFilled')
        if (!txFilled) return
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { txFilled.style.opacity = '1' })
        })
      }, 14920)

      // ── Park cursor beside status badge as visual guide ──────────
      after(() => {
        const s = q('txStatusBadge')
        if (!s) return
        const R  = relRect(s)
        const cx = R.x + R.w + 36
        const cy = R.y + R.h / 2 + 30
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${cx + 24}px,${cy}px)`
        cursor.style.opacity    = '0'
        requestAnimationFrame(() => {
          cursor.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease'
          cursor.style.transform  = `translate(${cx}px,${cy}px)`
          cursor.style.opacity    = '1'
        })
      }, 15600)

      // ── Status cycling ───────────────────────────────────────────
      const animateTxStatus = (label, bg, color, subText, at) => {
        after(() => {
          const s   = q('txStatusBadge')
          const sub = q('txStatusSub')
          if (!s) return
          s.style.transition = 'transform 0.4s ease-in, opacity 0.14s ease'
          s.style.transform  = 'translateY(-52px) scale(0.82)'
          s.style.opacity    = '0'
          if (sub) { sub.style.transition = 'opacity 0.08s ease'; sub.style.opacity = '0' }
        }, at)
        after(() => {
          const s   = q('txStatusBadge')
          const sub = q('txStatusSub')
          if (!s) return
          s.style.transition = 'none'
          s.style.transform  = 'translateY(18px) scale(0.82)'
          s.style.opacity    = '0'
          s.textContent      = label
          s.style.background = bg
          s.style.color      = color
          if (sub) { sub.style.transition = 'none'; sub.style.opacity = '0'; sub.textContent = subText }
        }, at + 190)
        after(() => {
          const s = q('txStatusBadge')
          if (!s) return
          s.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease'
          s.style.transform  = 'translateY(0) scale(1)'
          s.style.opacity    = '1'
        }, at + 205)
        after(() => {
          const sub = q('txStatusSub')
          if (sub) { sub.style.transition = 'opacity 0.28s ease'; sub.style.opacity = '1' }
        }, at + 380)
      }

      // 时间戳单独提出来：写成函数参数的形式容易在整体平移时被漏掉（曾漏过一次）
      const TX_STATUS_AT = [16000, 16800, 17600]
      animateTxStatus('Pending Payment',    '#eff6ff', '#3b82f6', 'Upload payment confirmation',  TX_STATUS_AT[0])
      animateTxStatus('Registering Shares', '#f3f4f6', '#6b7280', 'Processing your subscription', TX_STATUS_AT[1])
      animateTxStatus('Completed',          '#dcfce7', '#16a34a', 'Subscription confirmed',       TX_STATUS_AT[2])

      after(() => { cursor.style.transition = 'opacity 0.4s ease'; cursor.style.opacity = '0' }, 18000)

      // ── Cards update after Completed ─────────────────────────────
      after(() => {
        // Transaction: fade pending content, pop +1 badge
        const txPending = q('txPendingContent')
        const txTabBdg  = q('txTabBadge')
        if (txPending) { txPending.style.transition = 'opacity 0.25s'; txPending.style.opacity = '0' }
        if (txTabBdg) {
          txTabBdg.style.display = 'flex'
          txTabBdg.style.transform = 'scale(0.3)'
          txTabBdg.style.opacity = '0'
          after(() => {
            txTabBdg.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease'
            txTabBdg.style.transform = 'scale(1)'
            txTabBdg.style.opacity = '1'
          }, 60)
        }
        // NAV: fade empty
        const navEmp = q('navEmpty')
        if (navEmp) { navEmp.style.transition = 'opacity 0.25s'; navEmp.style.opacity = '0' }
        // Portfolio: fade empty + show currency selector
        const portEmp  = q('portfolioEmpty')
        const portCurr = q('portfolioCurrencyRow')
        if (portEmp) { portEmp.style.transition = 'opacity 0.25s'; portEmp.style.opacity = '0' }
        if (portCurr) {
          portCurr.style.display = 'flex'
          portCurr.style.opacity = '0'
          after(() => { portCurr.style.transition = 'opacity 0.3s'; portCurr.style.opacity = '1' }, 80)
        }
        // After fade-out: swap to filled content
        after(() => {
          if (txPending) txPending.style.display = 'none'
          const txNoPend = q('txNoPending')
          if (txNoPend) { txNoPend.style.display = ''; requestAnimationFrame(() => requestAnimationFrame(() => { txNoPend.style.opacity = '1' })) }

          if (navEmp) navEmp.style.display = 'none'
          const navFld = q('navFilled')
          if (navFld) { navFld.style.display = ''; requestAnimationFrame(() => requestAnimationFrame(() => { navFld.style.opacity = '1' })) }

          if (portEmp) portEmp.style.display = 'none'
          const portFld = q('portfolioFilled')
          if (portFld) {
            portFld.style.display = ''
            requestAnimationFrame(() => requestAnimationFrame(() => {
              portFld.style.opacity = '1'
              echartsRef.current?.getEchartsInstance()?.resize()
            }))
          }

        }, 300)
      }, 18100)

      // ── Badge ghost floats (live-stream effect) ──────────────────
      after(() => {
        const badge = q('txTabBadge')
        if (!badge) return

        const STEP = 200

        const updateDonut = (count) => {
          const ec = echartsRef.current?.getEchartsInstance()
          if (!ec) return
          const data   = EC_FUND_DATA.slice(0, count).slice().reverse()
          const colors = EC_COLORS.slice(0, count).slice().reverse()
          ec.setOption({ animation: true, color: colors, series: [{ data }] })
        }

        const variants = [
          { label: '+2', portIdx: 1, total: '4,788,160.65' },
          { label: '+3', portIdx: 2, total: '6,375,775.25' },
          { label: '+4', portIdx: 3, total: '7,412,060.05' },
          { label: '+5', portIdx: 4, total: '7,980,189.40' },
        ]

        // Reveal all NAV + legend rows as one fluid staggered cascade
        after(() => {
          // Set all rows to initial hidden state first
          // FLIP: record row 0 position before other rows take space
          const flipRow0 = q('navRow0')
          const firstTop = flipRow0 ? flipRow0.getBoundingClientRect().top : 0
          ;[1,2,3,4].forEach(idx => {
            const nr = q(`navRow${idx}`)
            if (nr) { nr.style.display = ''; nr.style.opacity = '0'; nr.style.transform = 'translateY(10px)'; nr.style.transition = 'none' }
            const lr = q(`portLegRow${idx}`)
            if (lr) { lr.style.display = ''; lr.style.opacity = '0'; lr.style.transform = 'translateY(-10px)'; lr.style.transition = 'none' }
          })
          // FLIP row 0 back to original position, then animate down
          if (flipRow0) {
            const lastTop = flipRow0.getBoundingClientRect().top
            // diff 作为 translateY 写入被缩放的元素内部，需除回布局坐标系
            const diff = (lastTop - firstTop) / scaleOf()
            if (diff > 0) {
              flipRow0.style.transition = 'none'
              flipRow0.style.transform = `translateY(${-diff}px)`
              flipRow0.getBoundingClientRect()
              flipRow0.style.transition = 'transform 1.3s cubic-bezier(0.16,1,0.3,1)'
              flipRow0.style.transform = 'translateY(0)'
            }
          }
          requestAnimationFrame(() => requestAnimationFrame(() => {
            // NAV: cascade navRow1→4, stagger 120ms each
            ;[1,2,3,4].forEach((idx, i) => {
              const nr = q(`navRow${idx}`)
              if (!nr) return
              nr.style.transition = `opacity 0.65s ease ${i*120}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i*120}ms`
              nr.style.opacity = '1'
              nr.style.transform = 'translateY(0)'
            })
            // Portfolio legend: cascade portLegRow4→1 (top-down), stagger 65ms each
            ;[4,3,2,1].forEach((idx, i) => {
              const lr = q(`portLegRow${idx}`)
              if (!lr) return
              lr.style.transition = `opacity 0.45s ease ${i*65}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i*65}ms`
              lr.style.opacity = '1'
              lr.style.transform = 'translateY(0)'
            })
          }))
        }, 200)

        // Donut + total update per-variant (stays synced with badge rolls)
        variants.forEach(({ portIdx, total }, gi) => {
          after(() => {
            updateDonut(portIdx + 1)
            const portDt = q('portDonutTotal')
            if (portDt) portDt.textContent = total
          }, gi * STEP + 200)
        })

        // Badge roll per-variant
        variants.forEach(({ label }, gi) => {
          after(() => {
            const bdg = q('txTabBadge')
            if (!bdg) return
            bdg.style.transition = 'transform 0.12s ease-in, opacity 0.1s'
            bdg.style.transform  = 'scale(0.65)'
            bdg.style.opacity    = '0.4'
            after(() => {
              bdg.textContent      = label
              bdg.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s'
              bdg.style.transform  = 'scale(1)'
              bdg.style.opacity    = '1'
            }, 130)
          }, gi * STEP)
        })
      }, 19250)

    })
  }, [q, after, resetAll, replayRef, raf])

  // demo 是 1000x560 的固定尺寸桌面界面，窄屏下整体等比缩小而非重排布局。
  // 缩放写在 CSS 变量里，viewport 自身尺寸也跟着收，避免底部留白。
  useEffect(() => {
    const el = viewportRef.current
    const host = el?.parentElement
    if (!host) return
    const update = () => {
      // ≤1200：卡片 padding 已归 0，demo 放大铺满整块（允许 >1 倍）；
      // >1200：桌面维持原样——封顶 1 倍、卡片留白里居中。
      const raw = host.clientWidth / 1000
      const s = window.innerWidth <= 1200 ? raw : Math.min(1, raw)
      el.style.setProperty('--demo-scale', String(s))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(host)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true
          setTimeout(playDemo, 400)
        }
      },
      { threshold: 0.3 }
    )
    if (wrapRef.current) observer.observe(wrapRef.current)
    return () => {
      observer.disconnect()
      timers.current.forEach(clearTimeout)
      rafIds.current.forEach(cancelAnimationFrame)
    }
  }, [playDemo])


  return (
    <div className={styles.viewport} ref={viewportRef}>
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.frame}>

        {/* ── Nav bar ── */}
        <nav className={styles.navBar}>
          <span className={styles.navItem} data-active="true" data-demo="tabDashboard">Dashboard</span>
          <span className={styles.navItem} data-demo="tabProfile">Profile</span>
          <span className={styles.navItem} data-demo="tabTransactions">Transactions</span>
          <span className={styles.navItem} data-demo="tabPortfolio">Portfolio</span>
        </nav>

        {/* ── Content area ── */}
        <div className={styles.contentArea}>
          <div className={styles.screensWrap}>

            {/* ── Screen 1: Dashboard (empty) ── */}
            <div className={styles.screen} data-demo="screenDashboard">
              <div className={styles.kycBar} data-demo="kycBar" style={{ transition: 'opacity 0.4s' }}>
                <span className={styles.kycEmoji}>🎉</span>
                <span className={styles.kycText}>Your profile has been successfully verified!</span>
                <span className={styles.kycClose}>✕</span>
              </div>

              <div className={styles.card}>
                <div className={styles.txEmptyWrap} data-demo="transactionsEmpty">
                  <p className={styles.cardTitle}>Transactions</p>
                  <div className={styles.emptyState}>
                    <img src={img1} alt="" className={styles.emptyImg} />
                    <p className={styles.emptyTitle}>Your investor profile is ready!</p>
                    <p className={styles.emptySub}>Submit your first subscription application to populate this dashboard.</p>
                    <button className={styles.subscribeBtn} data-demo="subscribeBtn">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                      </svg>
                      Subscribe Now
                    </button>
                  </div>
                </div>
                <div data-demo="transactionsFilled" style={{ display: 'none', opacity: 0, transition: 'opacity 0.4s' }}>
                  <div className={styles.txHeader}>
                    <p className={styles.txTitle}>Transactions</p>
                    <div className={styles.txTabs}>
                      <span className={styles.txTabActive}>Pending</span>
                      <span className={styles.txTabInactive}>
                        Completed
                        <span className={styles.txTabBadge} data-demo="txTabBadge" style={{ display: 'none' }}>+1</span>
                      </span>
                    </div>
                  </div>
                  <div data-demo="txPendingContent">
                    <div className={styles.txTableHead}>
                      <span>Fund Name</span>
                      <span>Dealing Day</span>
                      <span>Amount/Shares</span>
                      <span>Status &amp; Action</span>
                    </div>
                    <div className={styles.txDataRow}>
                      <div className={styles.txCellFund}>
                        <span className={styles.txType}>
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1v7M1.5 5l3 3 3-3" stroke="#15803d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Subscription
                        </span>
                        {/* 基金名与 FUND_OPTIONS[SELECTED_FUND_INDEX] 一致，仅此处附份额类别 */}
                        <p className={styles.txFundCell}>NuBright Fixed Income SP - Class A</p>
                      </div>
                      <div className={styles.txCellDay}>15 Feb 2026</div>
                      <div className={styles.txCellAmount}>USD 200,000.00</div>
                      <div className={styles.txCellStatus}>
                        <span className={styles.txPendingSig} data-demo="txStatusBadge">Pending Signature</span>
                        <p className={styles.txPendingHint} data-demo="txStatusSub">Sign your agreement via email</p>
                      </div>
                    </div>
                  </div>
                  <div data-demo="txNoPending" style={{ display: 'none', opacity: 0, transition: 'opacity 0.4s' }}>
                    <div className={styles.txNoPendingWrap}>
                      <img src={img1} alt="" className={styles.txNoPendingImg} />
                      <p className={styles.txNoPendingText}>No Pending Transaction</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.panels}>
                <div className={styles.card}>
                  <p className={styles.cardTitle}>NAV</p>
                  <div className={styles.navEmptyState} data-demo="navEmpty">
                    <p className={styles.navEmptyText}>Search for a fund to view its profile</p>
                    <div className={styles.navInput}>
                      <img src={iconSecurity} alt="" width="16" height="16" style={{ flexShrink: 0 }} />
                      <span className={styles.navInputPlaceholder}>Search Fund</span>
                    </div>
                  </div>
                  <div data-demo="navFilled" style={{ display: 'none', opacity: 0, transition: 'opacity 0.4s' }}>
                    <div className={styles.navFilledHead}>
                      <span>Fund Name</span>
                      <span>Latest NAV Updates</span>
                    </div>
                    {(() => {
                      const navRows = [
                        { name: 'NuBright Fixed Income SP - Class A', date: 'As of 15 Mar 2026', value: '$1,024.73826541', change: '+4.17%',  pos: true  },
                        { name: 'NuBright Asia Pacific Offshore SP',  date: 'As of 28 Feb 2026', value: '$987.46213809',   change: '-2.38%',  pos: false },
                        { name: 'NuBright Global Macro SP',           date: 'As of 31 Jan 2026', value: '$1,156.92047381', change: '+8.63%',  pos: true  },
                        { name: 'NuBright Multi-Asset Balanced SP',   date: 'As of 14 Apr 2026', value: '$1,003.18764520', change: '+3.52%',  pos: true  },
                        { name: 'NuBright Absolute Return Class A SP',date: 'As of 01 May 2026', value: '$1,289.50413762', change: '+15.84%', pos: true  },
                      ]
                      return [4, 3, 2, 1, 0].map(i => {
                        const row = navRows[i]
                        return (
                          <div key={i} className={styles.navFilledRow}
                            {...(i > 0 ? { 'data-demo': `navRow${i}` } : { 'data-demo': 'navRow0' })}
                            style={i > 0 ? { display: 'none', opacity: 0, willChange: 'opacity, transform' } : { willChange: 'transform' }}
                          >
                            <p className={styles.navFilledFundName}>{row.name.split('\n').map((l, j) => j === 0 ? l : <><br key={j}/>{l}</>)}</p>
                            <div className={styles.navFilledRight}>
                              <p className={styles.navFilledDate}>{row.date}</p>
                              <div className={styles.navFilledValueRow}>
                                <span className={styles.navFilledValue}>{row.value}</span>
                                <span className={styles.navFilledChange} style={{ color: row.pos ? '#16a34a' : '#ef4444' }}>{row.change}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    })()}
                    <p className={styles.navFilledFooter}>All data loaded</p>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.portfolioCardHdr}>
                    <p className={styles.cardTitle} style={{ margin: 0 }}>Portfolio</p>
                    <div data-demo="portfolioCurrencyRow" className={styles.portfolioCurrencyRow} style={{ display: 'none' }}>
                      <span className={styles.portfolioCurrencyDivider}>|</span>
                      <span className={styles.portfolioCurrencyText}>USD</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 3.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className={styles.emptyState} style={{ paddingTop: 0 }} data-demo="portfolioEmpty">
                    <img src={img2} alt="" className={styles.emptyImgSm} />
                    <p className={styles.emptySub} style={{ maxWidth: 300 }}>
                      Your portfolio will appear here upon first subscription confirmation
                    </p>
                  </div>
                  <div data-demo="portfolioFilled" style={{ display: 'none', opacity: 0, transition: 'opacity 0.4s' }}>
                    <div className={styles.portfolioDonutWrap}>
                      <div className={styles.portfolioDonut}>
                        <ReactECharts
                          ref={echartsRef}
                          option={EC_INIT_OPTION}
                          style={{ width: 140, height: 140 }}
                          notMerge={false}
                          opts={{ renderer: 'canvas' }}
                        />
                        <div className={styles.portfolioDonutCenter}>
                          <p className={styles.portfolioDonutAmount} data-demo="portDonutTotal">2,736,840.25</p>
                          <p className={styles.portfolioDonutLabel}>Total USD Assets</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.portfolioLegend}>
                      {[
                        { color: '#22c55e', name: 'NuBright Absolute Return Class A Fund SP',    amount: '568,129.35',   pct: '7.1%'  },
                        { color: '#14b8a6', name: 'NuBright Multi-Asset Balanced Portfolio SP',  amount: '1,036,284.80', pct: '13.0%' },
                        { color: '#0ea5e9', name: 'NuBright Investment Grade Fixed Income SP',   amount: '1,587,614.60', pct: '19.9%' },
                        { color: '#3b82f6', name: 'NuBright Asia Pacific Offshore Growth SP',    amount: '2,051,320.40', pct: '25.7%' },
                        { color: '#7c3aed', name: 'NuBright Global Macro Opportunities Fund SP', amount: '2,736,840.25', pct: '34.3%' },
                      ].map((item, i) => (
                        <div key={i} className={styles.portfolioLegendRow}
                          {...(i < 4 ? { 'data-demo': `portLegRow${4 - i}` } : {})}
                          style={i < 4 ? { display: 'none', opacity: 0, willChange: 'opacity, transform' } : undefined}
                        >
                          <div className={styles.portfolioLegendLeft}>
                            <span className={styles.portfolioLegendDot} style={{ background: item.color }} />
                            <span className={styles.portfolioLegendName}>{item.name}</span>
                          </div>
                          <span className={styles.portfolioLegendAmount}>{item.amount}</span>
                          <span className={styles.portfolioLegendPct}>{item.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Screen 2: Subscribe (code input) ── */}
            <div
              className={`${styles.screen} ${styles.screen2}`}
              data-demo="screenSubscribe"
              style={{ opacity: 0, pointerEvents: 'none' }}
            >
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Subscribe</h1>
              </div>

              <div className={styles.subscribeBody} data-demo="subscribeBody">
                <div className={styles.subscribeCard}>

                  <div data-demo="formBody" style={{ transition: 'opacity 0.35s' }}>
                  <div className={styles.formSection}>

                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>Select Fund</span>
                      <div className={styles.codeInputCol}>
                        <div className={styles.codeInputRow}>
                          <div className={styles.fundSelectWrap}>
                            <div className={styles.codeInput} data-demo="fundSelect">
                              <span className={styles.codeInputPlaceholder} data-demo="fundSelectPlaceholder">
                                Select a fund
                              </span>
                              <span
                                className={styles.fundSelectValue}
                                data-demo="fundSelectValue"
                                style={{ display: 'none' }}
                              />
                              <svg
                                className={styles.fundSelectChevron}
                                width="12" height="12" viewBox="0 0 12 12"
                                fill="none" aria-hidden="true"
                              >
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748d" strokeWidth="1.3"
                                      strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>

                            <div className={styles.fundDropdown} data-demo="fundDropdown" style={{ display: 'none' }}>
                              <div className={styles.fundGroupLabel}>Available to Subscribe</div>
                              {FUND_OPTIONS.map((fund, i) => (
                                <div
                                  key={fund}
                                  className={styles.fundOption}
                                  data-demo={`fundOption${i}`}
                                >
                                  {fund}
                                </div>
                              ))}
                              {/* 纯展示：光标不会点它，用于传达"列表之外的基金可另行申请" */}
                              <div className={styles.fundDropdownFooter} data-demo="fundDropdownFooter">
                                <span className={styles.fundFooterPlus} aria-hidden="true">+</span>
                                New Fund
                              </div>
                            </div>
                          </div>

                          <div className={styles.verifyBadge} data-demo="verifyBadge" style={{ opacity: 0 }}>
                            <span className={styles.verifySpinner} data-demo="verifySpinner">
                              {Array.from({ length: 12 }).map((_, i) => (
                                <span key={i} className={styles.spinnerBlade} />
                              ))}
                              <img src={iconCheck} alt="" className={styles.spinnerCheck} />
                            </span>
                            <span data-demo="verifyText" className={styles.verifyText}>Loading...</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div data-demo="skeletonSection" style={{ transition: 'opacity 0.3s' }}>
                      {SKELETON_ROWS.map((row, i) => {
                        const fadeStart = 4
                        const fadeSteps = SKELETON_ROWS.length - fadeStart
                        const opacity = i < fadeStart ? 1 : Math.max(0.05, 1 - ((i - fadeStart + 1) / fadeSteps) * 0.98)
                        return (
                          <div key={i} className={styles.skeletonRow} style={{ opacity }}>
                            <div className={styles.skeletonLabelWrap}>
                              <div className={styles.skeletonLabel} style={{ width: row.labelW }} />
                            </div>
                            <div className={styles.skeletonValue} style={{ width: row.valueW }} />
                          </div>
                        )
                      })}
                    </div>

                    <div data-demo="dataSection" style={{ display: 'none' }}>
                      <div className={styles.dataRow}>
                        <span className={styles.formLabel}>Fund Name</span>
                        <div className={styles.fundNameRow}>
                          {/* 与 FUND_OPTIONS[SELECTED_FUND_INDEX] 保持一致 */}
                          <span className={styles.dataValue}>NuBright Fixed Income SP</span>
                          <span className={styles.detailsLink}>Details</span>
                        </div>
                      </div>

                      <div className={styles.dataRow}>
                        <span className={styles.formLabel}>Class<span className={styles.required}>*</span></span>
                        <div className={styles.classDropdown}>
                          <span className={styles.dropdownValue}>Class A</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                            <path d="M3 4.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>

                      <div className={styles.dataRow}>
                        <span className={styles.formLabel}>Subscription Frequency</span>
                        <span className={styles.dataValue}>Monthly</span>
                      </div>

                      <div className={styles.dataRow}>
                        <span className={styles.formLabel}>Next Dealing Day</span>
                        <span className={styles.dataValue}>15 Feb 2026</span>
                      </div>

                      <div className={`${styles.dataRow} ${styles.dataRowTop}`} data-demo="amountRow">
                        <span className={styles.formLabel}>Subscription Amount<span className={styles.required}>*</span></span>
                        <div className={styles.amountSection}>
                          <div className={styles.amountLargeInput}>
                            <span className={styles.amountUSD}>USD</span>
                            <span className={styles.amountZero} data-demo="amountZero">0.00</span>
                          </div>
                          <div className={styles.quickSelectBtns}>
                            <button className={styles.quickSelectBtn}>Minimum</button>
                            <button className={styles.quickSelectBtn} data-demo="quickBtn200">USD 200,000</button>
                            <button className={styles.quickSelectBtn}>USD 300,000</button>
                          </div>
                        </div>
                      </div>

                      <div className={styles.procedureSection}>
                        <p className={styles.procedureTitle}>Subscription Procedure</p>
                        <div className={styles.procedureTimeline}>
                          <div className={styles.timelineLabels}>
                            <span>Application Deadline</span>
                            <span>Payment Deadline</span>
                            <span>Dealing Day</span>
                            <span>Redeemable</span>
                          </div>
                          <div className={styles.timelineTrack}>
                            <div className={styles.timelineLine} />
                            <div className={styles.timelineTick} style={{ left: '0%' }} />
                            <div className={styles.timelineTick} style={{ left: '33.33%' }} />
                            <div className={styles.timelineTick} style={{ left: '66.66%' }} />
                            <div className={styles.timelineTick} style={{ left: '100%' }} />
                            <div className={styles.softLockupBar}>
                              <span className={styles.softLockupText}>🔒 Soft Lock-up</span>
                            </div>
                          </div>
                          <div className={styles.timelineDates}>
                            <span>12 Jan 2026 14:30</span>
                            <span>15 Jan 2026 14:30</span>
                            <span>3 Feb 2026</span>
                            <span>1 May 2026</span>
                          </div>
                        </div>
                        <div className={styles.skeletonRow} style={{ marginTop: 10, padding: '4px 0' }}>
                          <div className={styles.skeletonValue} style={{ width: '100%', height: 12 }} />
                        </div>
                        <div className={styles.skeletonRow} style={{ padding: '4px 0' }}>
                          <div className={styles.skeletonValue} style={{ width: '70%', height: 12 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formFooter}>
                    <button className={styles.nextBtn} data-demo="actionBtn" style={{ display: 'none' }}>Next</button>
                  </div>
                  </div>{/* /formBody */}

                  {/* ── Success screen ── */}
                  <div data-demo="successSection" style={{ display: 'none', opacity: 0, transition: 'opacity 0.4s' }}>
                    <div className={styles.successTop}>
                      <img src={imgSuccess} alt="" className={styles.successImg} />
                      <p className={styles.successTitle}>Application Submitted Successfully!</p>
                      <p className={styles.successProcess}>Process Number: #S2874-09351</p>
                    </div>
                    <div className={styles.successDivider} />
                    <div className={styles.successBottom}>
                      <p className={styles.stepsHeading}>Just <span className={styles.stepsNum}>2</span> steps left to complete your subscription</p>
                      <div className={styles.stepRow}>
                        <div className={styles.stepInfo}>
                          <div className={styles.skeletonValue} style={{ width: '100%', height: 14, marginBottom: 12, opacity: 1 }} />
                          <div className={styles.skeletonValue} style={{ width: '62%', height: 14, opacity: 0.6 }} />
                        </div>
                      </div>
                      <div className={styles.stepRow}>
                        <div className={styles.stepInfo}>
                          <div className={styles.skeletonValue} style={{ width: '100%', height: 14, marginBottom: 12, opacity: 0.3 }} />
                          <div className={styles.skeletonValue} style={{ width: '48%', height: 14, opacity: 0.12 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


          </div>
        </div>

      </div>

      {/* 虚拟光标 */}
      <div className={styles.cursor} ref={cursorRef} />
    </div>
    </div>
  )
}
