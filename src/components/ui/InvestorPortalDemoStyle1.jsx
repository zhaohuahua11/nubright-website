import { useEffect, useRef, useCallback } from 'react'
import styles from './InvestorPortalDemoStyle1.module.css'
import img1 from '../../assets/inverstor portal-ui-dashboard-1.png'
import img2 from '../../assets/inverstor portal-ui-dashboard-2.png'

export default function InvestorPortalDemoStyle1({ replayRef }) {
  const wrapRef   = useRef(null)
  const cursorRef = useRef(null)
  const timers    = useRef([])
  const hasPlayed = useRef(false)

  const q = useCallback((key) =>
    wrapRef.current?.querySelector(`[data-demo="${key}"]`), [])

  const after = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }, [])

  const show = (el) => { if (el) { el.style.opacity = '1'; el.style.pointerEvents = 'auto' } }
  const hide = (el) => { if (el) { el.style.opacity = '0'; el.style.pointerEvents = 'none' } }

  const resetTyping = useCallback(() => {
    const input  = q('codeInput')
    const ph     = q('codePlaceholder')
    const typed  = q('codeTyped')
    const caret  = q('typeCaret')
    const verify = q('verifyBtn')
    if (input)  delete input.dataset.focused
    if (ph)     ph.style.display = ''
    if (typed)  { typed.style.display = 'none'; typed.textContent = '' }
    if (caret)  caret.style.display = 'none'
    if (verify) { delete verify.dataset.verified; verify.textContent = 'Verify Code' }
  }, [q])

  const resetAll = useCallback(() => {
    show(q('screenDashboard'))
    hide(q('screenSubscribe'))
    const tabDash  = q('tabDashboard')
    const tabTrans = q('tabTransactions')
    if (tabDash)  tabDash.dataset.active = 'true'
    if (tabTrans) delete tabTrans.dataset.active
    const btn = q('subscribeBtn')
    if (btn) delete btn.dataset.pressed
    const formSection = q('formSection')
    if (formSection) formSection.style.opacity = '0'
    const sc = q('screens')
    if (sc) { sc.style.transition = 'none'; sc.style.transform = 'translateY(0)' }
    const btn200k = q('quickBtn200k')
    if (btn200k) delete btn200k.dataset.pressed
    const amt = q('amountValue')
    if (amt) { amt.textContent = '0.00'; amt.style.color = '#d1d5db' }
    const d2 = q('screenDashboard2')
    if (d2) { d2.style.transition = 'none'; d2.style.opacity = '0'; d2.style.pointerEvents = 'none' }
    const successCard = q('successCard')
    if (successCard) { successCard.style.opacity = '0'; successCard.style.pointerEvents = 'none' }
    const nb = q('nextBtn')
    if (nb) delete nb.dataset.pressed
    const progressCard = q('progressCard')
    if (progressCard) { progressCard.style.opacity = '0'; progressCard.style.pointerEvents = 'none' }
    ;['checkAgreement','checkPayment','checkPrice','checkShares','checkNote'].forEach(k => {
      const el = q(k); if (el) delete el.dataset.checked
    })
    const txStatus = q('txStatus')
    if (txStatus) { txStatus.textContent = 'Pending Signature'; txStatus.style.color = '#d97706'; txStatus.style.background = '#fef3c7'; txStatus.style.opacity = '1'; txStatus.style.transform = ''; txStatus.style.transition = '' }
    const txStatusSub = q('txStatusSub')
    if (txStatusSub) { txStatusSub.textContent = 'Sign your agreement via email'; txStatusSub.style.opacity = '1'; txStatusSub.style.transition = '' }
    resetTyping()
  }, [q, resetTyping])

  const switchScreens = useCallback((fromKey, toKey, tabFrom, tabTo) => {
    hide(q(fromKey))
    setTimeout(() => {
      show(q(toKey))
      if (tabFrom) delete q(tabFrom)?.dataset.active
      if (tabTo)   { const t = q(tabTo); if (t) t.dataset.active = 'true' }
    }, 380)
  }, [q])

  const playDemo = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    const wrap   = wrapRef.current
    const cursor = cursorRef.current
    const replay = replayRef?.current
    if (!wrap || !cursor || !replay) return

    replay.onclick = () => playDemo()
    resetAll()
    cursor.style.transition    = 'none'
    cursor.style.opacity       = '0'
    replay.style.opacity       = '0'
    replay.style.pointerEvents = 'none'

    requestAnimationFrame(() => {
      const btn = q('subscribeBtn')
      if (!btn) return
      const wr = wrap.getBoundingClientRect()
      const br = btn.getBoundingClientRect()
      const tx = br.left - wr.left + br.width  / 2
      const ty = br.top  - wr.top  + br.height / 2

      cursor.style.transform = `translate(${tx - 140}px,${ty + 90}px)`

      after(() => { cursor.style.transition = 'opacity 0.3s'; cursor.style.opacity = '1' }, 350)
      after(() => {
        cursor.style.transition = 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)'
        cursor.style.transform  = `translate(${tx}px,${ty}px)`
      }, 580)
      after(() => {
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${tx}px,${ty}px) scale(0.78)`
      }, 1280)
      after(() => { btn.dataset.pressed = 'true' }, 1320)
      after(() => {
        cursor.style.transition = 'transform 0.15s'
        cursor.style.transform  = `translate(${tx}px,${ty}px) scale(1)`
      }, 1420)
      after(() => { delete btn.dataset.pressed }, 1470)
      after(() => { cursor.style.transition = 'opacity 0.4s'; cursor.style.opacity = '0' }, 1600)
      after(() => switchScreens('screenDashboard', 'screenSubscribe', 'tabDashboard', 'tabTransactions'), 1750)

      // Move cursor to input field
      after(() => {
        const input = q('codeInput')
        if (!input) return
        const ir = input.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const ix = ir.left - wr2.left + 80
        const iy = ir.top  - wr2.top  + ir.height / 2
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${ix - 100}px,${iy + 55}px)`
        cursor.style.opacity    = '1'
        setTimeout(() => {
          cursor.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)'
          cursor.style.transform  = `translate(${ix}px,${iy}px)`
        }, 60)
      }, 2300)

      after(() => {
        const input = q('codeInput')
        if (!input) return
        const ir = input.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const ix = ir.left - wr2.left + 80
        const iy = ir.top  - wr2.top  + ir.height / 2
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${ix}px,${iy}px) scale(0.78)`
      }, 2960)

      after(() => {
        const input = q('codeInput')
        if (!input) return
        const ir = input.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const ix = ir.left - wr2.left + 80
        const iy = ir.top  - wr2.top  + ir.height / 2
        cursor.style.transition = 'transform 0.15s'
        cursor.style.transform  = `translate(${ix}px,${iy}px) scale(1)`
        input.dataset.focused = 'true'
        const ph    = q('codePlaceholder')
        const typed = q('codeTyped')
        const caret = q('typeCaret')
        if (ph)    ph.style.display    = 'none'
        if (typed) typed.style.display = 'inline'
        if (caret) caret.style.display = 'inline'
      }, 3060)

      after(() => { cursor.style.transition = 'opacity 0.3s'; cursor.style.opacity = '0' }, 3180)

      for (let i = 0; i < 6; i++) {
        after(() => {
          const typed = q('codeTyped')
          if (typed) typed.textContent += '●'
        }, 3280 + i * 120)
      }
      const done = 3280 + 5 * 120

      after(() => {
        const caret  = q('typeCaret')
        const verify = q('verifyBtn')
        if (caret)  caret.style.display = 'none'
        if (verify) { verify.dataset.verified = 'true'; verify.textContent = '✓  Verified' }
      }, done + 200)

      after(() => {
        const formSection = q('formSection')
        if (formSection) formSection.style.opacity = '1'
        const sc = q('screens')
        if (sc) { sc.style.transition = 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)'; sc.style.transform = 'translateY(-280px)' }
      }, done + 600)

      // Move cursor to USD 200,000 quick button — wait for scroll to settle (scroll ends at done+1250)
      let pos200k = { bx: 0, by: 0 }
      after(() => {
        const btn200k = q('quickBtn200k')
        if (!btn200k) return
        const br  = btn200k.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        pos200k.bx = br.left - wr2.left + br.width  / 2
        pos200k.by = br.top  - wr2.top  + br.height / 2
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${pos200k.bx - 80}px,${pos200k.by + 40}px)`
        cursor.style.opacity    = '1'
        setTimeout(() => {
          cursor.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)'
          cursor.style.transform  = `translate(${pos200k.bx}px,${pos200k.by}px)`
        }, 60)
      }, done + 1350)

      after(() => {
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${pos200k.bx}px,${pos200k.by}px) scale(0.78)`
      }, done + 1950)

      after(() => {
        const btn200k = q('quickBtn200k')
        if (btn200k) btn200k.dataset.pressed = 'true'
      }, done + 1990)

      after(() => {
        const btn200k = q('quickBtn200k')
        if (btn200k) {
          cursor.style.transition = 'transform 0.15s'
          cursor.style.transform  = `translate(${pos200k.bx}px,${pos200k.by}px) scale(1)`
          delete btn200k.dataset.pressed
        }
        const amt = q('amountValue')
        if (amt) { amt.textContent = '200,000'; amt.style.color = '#1a1a1a' }
      }, done + 2090)

      after(() => { cursor.style.transition = 'opacity 0.3s'; cursor.style.opacity = '0' }, done + 2230)

      // Move cursor to Next button
      after(() => {
        const nb = q('nextBtn')
        if (!nb) return
        const br  = nb.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const bx  = br.left - wr2.left + br.width  / 2
        const by  = br.top  - wr2.top  + br.height / 2
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${bx + 80}px,${by + 65}px)`
        cursor.style.opacity    = '1'
        setTimeout(() => {
          cursor.style.transition = 'transform 0.48s cubic-bezier(0.25,0.46,0.45,0.94)'
          cursor.style.transform  = `translate(${bx}px,${by}px)`
        }, 60)
      }, done + 2400)

      after(() => {
        const nb = q('nextBtn')
        if (!nb) return
        const br  = nb.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const bx  = br.left - wr2.left + br.width  / 2
        const by  = br.top  - wr2.top  + br.height / 2
        cursor.style.transition = 'transform 0.08s'
        cursor.style.transform  = `translate(${bx}px,${by}px) scale(0.78)`
      }, done + 2910)

      after(() => {
        const nb = q('nextBtn')
        if (nb) nb.dataset.pressed = 'true'
      }, done + 2950)

      after(() => {
        const nb = q('nextBtn')
        if (nb) {
          const br  = nb.getBoundingClientRect()
          const wr2 = wrap.getBoundingClientRect()
          const bx  = br.left - wr2.left + br.width  / 2
          const by  = br.top  - wr2.top  + br.height / 2
          cursor.style.transition = 'transform 0.15s'
          cursor.style.transform  = `translate(${bx}px,${by}px) scale(1)`
          delete nb.dataset.pressed
        }
      }, done + 3050)

      after(() => { cursor.style.transition = 'opacity 0.3s'; cursor.style.opacity = '0' }, done + 3170)

      // Show success card
      after(() => {
        const card = q('successCard')
        if (card) { card.style.opacity = '1' }
      }, done + 3250)

      // Hide success card, reset screens transform, fade dashboard2 in slowly (1.2s)
      after(() => {
        const card = q('successCard')
        if (card) { card.style.opacity = '0' }
      }, done + 4450)

      after(() => {
        const sc = q('screens')
        if (sc) { sc.style.transition = 'none'; sc.style.transform = 'translateY(0)' }
        hide(q('screenSubscribe'))
        const tabTrans = q('tabTransactions')
        const tabDash  = q('tabDashboard')
        if (tabTrans) delete tabTrans.dataset.active
        if (tabDash)  tabDash.dataset.active = 'true'
        setTimeout(() => {
          const d2 = q('screenDashboard2')
          if (d2) { d2.style.transition = 'opacity 1.2s ease'; d2.style.opacity = '1'; d2.style.pointerEvents = 'auto' }
        }, 380)
      }, done + 4850)

      // Show progress card together with dashboard2 fade-in
      after(() => {
        const card = q('progressCard')
        if (card) { card.style.opacity = '1'; card.style.pointerEvents = 'auto' }
      }, done + 5230)

      // Park cursor next to status badge as visual guide
      after(() => {
        const s = q('txStatus')
        if (!s) return
        const br  = s.getBoundingClientRect()
        const wr2 = wrap.getBoundingClientRect()
        const cx  = br.right - wr2.left + 40
        const cy  = br.top   - wr2.top  + br.height / 2 + 36
        cursor.style.transition = 'none'
        cursor.style.transform  = `translate(${cx + 30}px,${cy}px)`
        cursor.style.opacity    = '0'
        setTimeout(() => {
          cursor.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease'
          cursor.style.transform  = `translate(${cx}px,${cy}px)`
          cursor.style.opacity    = '1'
        }, 60)
      }, done + 5230)

      // Status cycling — dramatic spring-pop, starts 2s after dashboard fully visible
      const animateStatus = (label, bg, color, subText, at) => {
        // Throw current badge off to upper-right (ease-in = starts slow, accelerates away)
        after(() => {
          const s = q('txStatus'); const sub = q('txStatusSub')
          if (!s) return
          s.style.transition  = 'transform 0.4s ease-in, opacity 0.14s ease'
          s.style.transform   = 'translateY(-52px) scale(0.82)'
          s.style.opacity     = '0'
          if (sub) { sub.style.transition = 'opacity 0.08s ease'; sub.style.opacity = '0' }
        }, at)
        // Place new badge below, hidden
        after(() => {
          const s = q('txStatus'); const sub = q('txStatusSub')
          if (!s) return
          s.style.transition  = 'none'
          s.style.transform   = 'translateY(18px) scale(0.82)'
          s.style.opacity     = '0'
          s.textContent       = label
          s.style.background  = bg
          s.style.color       = color
          if (sub) { sub.style.transition = 'none'; sub.style.opacity = '0'; sub.textContent = subText }
        }, at + 190)
        // Snap in with spring overshoot
        after(() => {
          const s = q('txStatus')
          if (!s) return
          s.style.transition  = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease'
          s.style.transform   = 'translateY(0) scale(1)'
          s.style.opacity     = '1'
        }, at + 205)
        // Sub text fades in shortly after
        after(() => {
          const sub = q('txStatusSub')
          if (sub) { sub.style.transition = 'opacity 0.28s ease'; sub.style.opacity = '1' }
        }, at + 380)
      }

      animateStatus('Pending Payment',    '#fef3c7', '#d97706', 'Upload payment confirmation',  done + 8430)
      after(() => { const el = q('checkAgreement'); if (el) el.dataset.checked = 'true' }, done + 8630)

      animateStatus('Registering Shares', '#f3f4f6', '#6b7280', 'Processing your subscription', done + 9430)
      after(() => { const el = q('checkPayment'); if (el) el.dataset.checked = 'true' }, done + 9630)

      animateStatus('Completed',          '#dcfce7', '#16a34a', 'Subscription confirmed',        done + 10430)
      after(() => { const el = q('checkPrice');  if (el) el.dataset.checked = 'true' }, done + 10630)
      after(() => { const el = q('checkShares'); if (el) el.dataset.checked = 'true' }, done + 10790)
      after(() => { const el = q('checkNote');   if (el) el.dataset.checked = 'true' }, done + 10950)

      after(() => { cursor.style.transition = 'opacity 0.4s ease'; cursor.style.opacity = '0' }, done + 11200)

      after(() => { replay.style.opacity = '1'; replay.style.pointerEvents = 'auto' }, done + 11600)
    })
  }, [q, after, resetAll, switchScreens])

  const handleReplay = useCallback(() => { playDemo() }, [playDemo])

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
    }
  }, [playDemo])

  const LockIcon = () => (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
      <rect x="2" y="5" width="8" height="6" rx="1" stroke="#6b7280" strokeWidth="1.2"/>
      <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="#6b7280" strokeWidth="1.2"/>
    </svg>
  )

  const Stepper = () => (
    <div className={styles.stepper}>
      <div className={styles.step}>
        <div className={`${styles.stepNum} ${styles.stepNumActive}`}>1</div>
        <span className={styles.stepLabel}>Submit Application</span>
      </div>
      <div className={styles.stepConnector} />
      <div className={styles.step}>
        <div className={styles.stepNum}>2</div>
        <span className={styles.stepLabelOff}>Review &amp; Confirm</span>
      </div>
    </div>
  )

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.frame}>

        <div className={styles.tabBar}>
          <span className={styles.tab} data-active="true" data-demo="tabDashboard">Dashboard</span>
          <span className={styles.tab} data-demo="tabProfile">Profile</span>
          <span className={styles.tab} data-demo="tabTransactions">Transactions</span>
          <span className={styles.tab} data-demo="tabPortfolio">Portfolio</span>
        </div>

        <div className={styles.contentWrap} data-demo="contentWrap">
          <div className={styles.screens} data-demo="screens">

            {/* Screen 1: Dashboard */}
            <div className={styles.screen} data-demo="screenDashboard">
              <div className={styles.alert}>
                <span>🎉</span>
                <span>Your profile has been successfully verified! Start trading funds now.</span>
                <span className={styles.alertClose}>✕</span>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Transactions</p>
                <div className={styles.cardEmpty}>
                  <img src={img1} alt="" style={{ width: 110 }} />
                  <p className={styles.cardEmptyTitle}>Your investor profile is ready!</p>
                  <p className={styles.cardEmptySub}>Submit your first subscription application to populate this dashboard.</p>
                  <button className={styles.subscribeBtn} data-demo="subscribeBtn">+ &nbsp;Subscribe Now</button>
                </div>
              </div>
              <div className={styles.panels}>
                <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', minHeight: 240 }}>
                  <p className={styles.cardTitle}>NAV</p>
                  <div className={styles.navEmpty}>
                    <p className={styles.navEmptyLabel}>Enter Fund Access Code to view fund profile &nbsp;ⓘ</p>
                    <div className={styles.navInputRow}>
                      <div className={styles.navInput}><LockIcon /><span>6 – characters Fund Access Code</span></div>
                      <div className={styles.navVerify}>Verify Code</div>
                    </div>
                  </div>
                </div>
                <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', minHeight: 240 }}>
                  <p className={styles.cardTitle}>Portfolio</p>
                  <div className={styles.cardEmpty} style={{ flex: 1 }}>
                    <img src={img2} alt="" style={{ width: 80 }} />
                    <p className={styles.cardEmptySub}>Your portfolio will appear here upon first subscription confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 2: Subscribe (code + form combined) */}
            <div className={`${styles.screen} ${styles.screenNarrow}`} style={{ opacity: 0, pointerEvents: 'none' }} data-demo="screenSubscribe">
              <h2 className={styles.screenTitle}>Subscribe</h2>
              <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
                <Stepper />
                <div style={{ padding: '28px 40px 32px' }}>
                  {/* Code section */}
                  <div className={styles.innerCard}>
                    <p className={styles.innerTitle}>Fund Access Code</p>
                    <p className={styles.innerDesc}>You can find your Fund Access Code in the welcome / invitation email we sent you, or by reaching out to your fund manager directly.</p>
                    <div className={styles.divider} />
                    <div className={styles.inputRow}>
                      <div className={styles.codeInput} data-demo="codeInput">
                        <LockIcon />
                        <span data-demo="codePlaceholder" style={{ color: '#9ca3af' }}>Enter 6-characters Fund Access Code</span>
                        <span data-demo="codeTyped" style={{ display: 'none', color: '#1a1a1a', letterSpacing: '0.08em' }} />
                        <span data-demo="typeCaret" className={styles.typeCaret} style={{ display: 'none' }}>|</span>
                      </div>
                      <button className={styles.verifyBtn} data-demo="verifyBtn" style={{ display: 'none' }}>Verify Code</button>
                    </div>
                  </div>
                  {/* Form section — hidden until code verified */}
                  <div data-demo="formSection" style={{ opacity: 0, marginTop: 28, transition: 'opacity 0.6s ease' }}>
                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>Fund Name</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className={styles.bar} style={{ width: 150 }} />
                        <span style={{ fontSize: 12, color: '#2563eb', cursor: 'default' }}>Click to view Fund Details</span>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>Class<span style={{ color: '#ef4444', fontSize: 10, verticalAlign: 'super' }}>*</span></span>
                      <div className={styles.formSelect}>
                        <span>please select</span>
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>Subscription Frequency</span>
                      <span style={{ fontSize: 12.5, color: '#1a1a1a' }}>Monthly</span>
                    </div>
                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>Next Dealing Day</span>
                      <div className={styles.bar} style={{ width: 70 }} />
                    </div>
                    <div className={styles.formRow} style={{ alignItems: 'flex-start' }}>
                      <span className={styles.formLabel}>Subscription Amount<span style={{ color: '#ef4444', fontSize: 10, verticalAlign: 'super' }}>*</span></span>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div className={styles.formAmountBox}>
                          <span style={{ fontSize: 17, fontWeight: 500, color: '#1a1a1a' }}>USD</span>
                          <span data-demo="amountValue" style={{ fontSize: 17, color: '#d1d5db' }}>0.00</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className={styles.formQuickBtn}>Minimum</button>
                          <button className={styles.formQuickBtn} data-demo="quickBtn200k">USD 200,000</button>
                          <button className={styles.formQuickBtn}>USD 300,000</button>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 24 }}>
                      <button className={styles.nextBtn} data-demo="nextBtn">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen 3: Dashboard after subscription */}
            <div className={styles.screen} style={{ opacity: 0, pointerEvents: 'none' }} data-demo="screenDashboard2">
              <div className={styles.card} style={{ padding: '20px 24px' }}>
                <div className={styles.txHeader}>
                  <p className={styles.cardTitle} style={{ margin: 0 }}>Transactions</p>
                  <div className={styles.txTabs}>
                    <span className={styles.txTabActive}>Pending</span>
                    <span className={styles.txTabOff}>Completed</span>
                  </div>
                </div>
                <div className={styles.txTableHead}>
                  <span>Fund Name</span>
                  <span>Amount/Shares</span>
                  <span>Status &amp; Action</span>
                </div>
                <div className={styles.txTableRow}>
                  <div>
                    <p className={styles.txFundType}>Subscription</p>
                    <p className={styles.txFundName}>Newport All Weather Fund SPC · Hudson Fortune SP · Class A</p>
                  </div>
                  <div className={styles.txAmount}>USD 200,000.00</div>
                  <div>
                    <span className={styles.txStatusBadge} data-demo="txStatus" style={{ background: '#fef3c7', color: '#d97706' }}>Pending Signature</span>
                    <p className={styles.txStatusSub} data-demo="txStatusSub">Sign your agreement via email</p>
                  </div>
                </div>
              </div>
              <div className={styles.panels}>
                <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', minHeight: 240 }}>
                  <p className={styles.cardTitle}>NAV</p>
                  <div className={styles.navEmpty}>
                    <p className={styles.navEmptyLabel}>Enter Fund Access Code to view fund profile &nbsp;ⓘ</p>
                    <div className={styles.navInputRow}>
                      <div className={styles.navInput}><LockIcon /><span>6 – characters Fund Access Code</span></div>
                      <div className={styles.navVerify}>Verify Code</div>
                    </div>
                  </div>
                </div>
                <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', minHeight: 240 }}>
                  <p className={styles.cardTitle}>Portfolio</p>
                  <div className={styles.cardEmpty} style={{ flex: 1 }}>
                    <img src={img2} alt="" style={{ width: 80 }} />
                    <p className={styles.cardEmptySub}>Your portfolio will appear here upon first subscription confirmation</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Success card — floats over subscribe screen after Next is clicked */}
      <div className={styles.successCard} data-demo="successCard" style={{ opacity: 0, pointerEvents: 'none' }}>
        <div className={styles.successIcon}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M7 13.5l4 4 8-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className={styles.successTitle}>Application Submitted Successfully!</p>
        <p className={styles.successSub}>Process Number: #R1000001234</p>
      </div>

      {/* Progress card — floats over demo during status cycling */}
      <div className={styles.progressCard} data-demo="progressCard" style={{ opacity: 0, pointerEvents: 'none' }}>
        {[
          { key: 'checkAgreement', label: 'Subscription\nAgreement' },
          { key: 'checkPayment',   label: 'Payment\nRecord' },
          { key: 'checkPrice',     label: 'Subscription\nPrice' },
          { key: 'checkShares',    label: 'Shares' },
          { key: 'checkNote',      label: 'Contract\nNote' },
        ].map(({ key, label }) => (
          <div key={key} className={styles.progressItem}>
            <div className={styles.progressIcon} data-demo={key}>
              <svg className={styles.clockSvg} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5"/>
                <path d="M12 7v5l3 3" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <svg className={styles.checkSvg} width="20" height="20" viewBox="0 0 26 26" fill="none">
                <circle cx="13" cy="13" r="13" fill="#16a34a"/>
                <path d="M8 13.5l3.5 3.5 6.5-7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.progressLabel}>{label}</span>
          </div>
        ))}
      </div>

      <div className={styles.cursor} ref={cursorRef} />
    </div>
  )
}
