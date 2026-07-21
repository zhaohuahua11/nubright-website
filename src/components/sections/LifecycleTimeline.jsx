import { useTranslation } from 'react-i18next'
import styles from './LifecycleTimeline.module.css'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Badge from '../ui/Badge'

import icon01 from '../../assets/four stage/01.svg'
import icon02 from '../../assets/four stage/02.svg'
import icon03 from '../../assets/four stage/03.svg'
import icon04 from '../../assets/four stage/04.svg'
import icon05 from '../../assets/four stage/05.svg'
import icon06 from '../../assets/four stage/06.svg'
import icon07 from '../../assets/four stage/07.svg'
import icon08 from '../../assets/four stage/08.svg'
import icon09 from '../../assets/four stage/09.svg'
import icon10 from '../../assets/four stage/10.svg'
import icon11 from '../../assets/four stage/11.svg'
import icon12 from '../../assets/four stage/12.svg'
import icon13 from '../../assets/four stage/13.svg'
import icon14 from '../../assets/four stage/14.svg'
import icon15 from '../../assets/four stage/15.svg'

/* ── Structure (icons only; text comes from i18n).
   Each phase now has 5 items. The first 15 slots use icons 01–15;
   phase 04 reuses icons 01–05 as placeholders until new icons are added. ── */
const STAGES = [
  {
    num: '01',
    key: 's1',
    items: [
      { icon: icon01, itemKey: 'i1' },
      { icon: icon02, itemKey: 'i2' },
      { icon: icon03, itemKey: 'i3' },
      { icon: icon04, itemKey: 'i4' },
      { icon: icon05, itemKey: 'i5' },
    ],
  },
  {
    num: '02',
    key: 's2',
    items: [
      { icon: icon06, itemKey: 'i1' },
      { icon: icon07, itemKey: 'i2' },
      { icon: icon08, itemKey: 'i3' },
      { icon: icon09, itemKey: 'i4' },
      { icon: icon10, itemKey: 'i5' },
    ],
  },
  {
    num: '03',
    key: 's3',
    items: [
      { icon: icon11, itemKey: 'i1' },
      { icon: icon12, itemKey: 'i2' },
      { icon: icon13, itemKey: 'i3' },
      { icon: icon14, itemKey: 'i4' },
      { icon: icon15, itemKey: 'i5' },
    ],
  },
  {
    num: '04',
    key: 's4',
    items: [
      { icon: icon01, itemKey: 'i1' },
      { icon: icon02, itemKey: 'i2' },
      { icon: icon03, itemKey: 'i3' },
      { icon: icon04, itemKey: 'i4' },
      { icon: icon05, itemKey: 'i5' },
    ],
  },
]

function Lines({ text }) {
  const parts = text.split('\n')
  return parts.map((line, i) => (
    <span key={i}>{line}{i < parts.length - 1 && <br />}</span>
  ))
}

export default function LifecycleTimeline() {
  const sectionRef = useScrollAnimation()
  const { t } = useTranslation()

  return (
    <section id="our-services" className={styles.section} ref={sectionRef}>
      {/* 顶部让中间 3 条网格线自上而下淡入的遮罩 */}
      <div className={styles.gridFadeMask} aria-hidden="true">
        <div className={styles.gridFadeMaskCols}>
          <span /><span /><span /><span />
        </div>
      </div>
      <div className={styles.container}>

        {/* Section header */}
        <header className={styles.header}>
          <p className={`${styles.headerLabel} animate-on-enter`}><Badge variant="label">{t('timeline.badge')}</Badge></p>
          <h2 className={`${styles.headerTitle} animate-on-enter`}>
            {t('timeline.heading')}
          </h2>
          <p className={`${styles.headerSub} animate-on-enter`}>{t('timeline.sub')}</p>
        </header>

        {/* Chapter grid: each chapter is a vertical unit (header → gradient seg →
            ruler seg → content), aligned across chapters via subgrid. On ≤768px it
            wraps to 2 columns so the whole structure splits into stacked halves,
            each half keeping its own segment of the gradient bar. */}
        <div className={styles.grid}>
          {STAGES.map((stage, i) => (
            <div key={stage.num} className={styles.chapter} data-stage={i + 1}>
              <div className={styles.numCell}>
                <span className={styles.stepNum}>{t('timeline.phase')} {stage.num}</span>
                <h3 className={styles.stepTitle}>
                  <Lines text={t(`timeline.${stage.key}.title`)} />
                </h3>
              </div>
              <div className={styles.barSeg} data-stage={i + 1} />
              <div className={styles.rulerSeg} />
              <div className={styles.col} data-stage={i + 1}>
                <p className={styles.colQuote}><span>{`“${t(`timeline.${stage.key}.quote`)}”`}</span></p>
                <ul className={styles.items}>
                  {stage.items.map((item, j) => {
                    const label = t(`timeline.${stage.key}.${item.itemKey}`)
                    return (
                      <li key={j} className={styles.item}>
                        <span className={styles.itemIcon}>
                          <img src={item.icon} width="18" height="18" alt="" />
                        </span>
                        <div className={styles.itemContent}>
                          <span>{label}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Scope boundary statement */}
        <p className={styles.boundary}>
          {t('timeline.boundary')}
        </p>

      </div>
    </section>
  )
}
