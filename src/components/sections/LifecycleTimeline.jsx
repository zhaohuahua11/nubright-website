import { useState } from 'react'
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
import expandIcon from '../../assets/four stage/expand.svg'

/* ── Structure (icons + expand flags; text comes from i18n) ── */
const STAGES = [
  {
    num: '01',
    key: 's1',
    items: [
      { icon: icon01, itemKey: 'i1' },
      { icon: icon02, itemKey: 'i2' },
      { icon: icon03, itemKey: 'i3', expand: true, expKey: 'i3exp' },
    ],
  },
  {
    num: '02',
    key: 's2',
    items: [
      { icon: icon04, itemKey: 'i1' },
      { icon: icon05, itemKey: 'i2' },
      { icon: icon06, itemKey: 'i3' },
    ],
  },
  {
    num: '03',
    key: 's3',
    items: [
      { icon: icon07, itemKey: 'i1', expand: true, expKey: 'i1exp' },
      { icon: icon08, itemKey: 'i2' },
      { icon: icon09, itemKey: 'i3' },
      { icon: icon10, itemKey: 'i4' },
      { icon: icon11, itemKey: 'i5' },
    ],
  },
  {
    num: '04',
    key: 's4',
    items: [
      { icon: icon12, itemKey: 'i1' },
      { icon: icon13, itemKey: 'i2' },
      { icon: icon14, itemKey: 'i3', expand: true, expKey: 'i3exp' },
      { icon: icon15, itemKey: 'i4' },
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
  const [expandedKey, setExpandedKey] = useState(null)

  const toggleExpand = (key) => {
    setExpandedKey(prev => prev === key ? null : key)
  }

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>

        {/* Section header */}
        <header className={styles.header}>
          <p className={`${styles.headerLabel} animate-on-enter`}><Badge variant="label">{t('timeline.badge')}</Badge></p>
          <h2 className={`${styles.headerTitle} animate-on-enter`}>
            {t('timeline.heading')}
          </h2>
          <p className={`${styles.headerSub} animate-on-enter`}>{t('timeline.sub')}</p>
        </header>

        {/* Step numbers */}
        <div className={styles.numRow}>
          {STAGES.map(s => (
            <div key={s.num} className={styles.numCell}>
              <span className={styles.stepNum}>{t('timeline.phase')} {s.num}</span>
              <p className={styles.stepSub}><Lines text={t(`timeline.${s.key}.sub`)} /></p>
            </div>
          ))}
        </div>

        {/* Segmented gradient progress bar */}
        <div className={styles.barTrack}>
          <div className={styles.barSeg} data-stage="1" />
          <div className={styles.barSeg} data-stage="2" />
          <div className={styles.barSeg} data-stage="3" />
          <div className={styles.barSeg} data-stage="4" />
        </div>

        {/* Content columns */}
        <div className={styles.columns}>
          {STAGES.map((stage, i) => (
            <div key={stage.num} className={styles.col} data-stage={i + 1}>
              <h3 className={styles.colTitle}>
                <Lines text={t(`timeline.${stage.key}.title`)} />
              </h3>
              <p className={styles.colQuote}>{t(`timeline.${stage.key}.quote`)}</p>
              <ul className={styles.items}>
                {stage.items.map((item, j) => {
                  const key = `${stage.num}-${j}`
                  const isExpanded = expandedKey === key
                  const label = t(`timeline.${stage.key}.${item.itemKey}`)
                  const explanation = item.expKey ? t(`timeline.${stage.key}.${item.expKey}`) : null
                  return (
                    <li
                      key={j}
                      className={`${styles.item} ${isExpanded ? styles.itemExpanded : ''}`}
                      onClick={item.expand ? () => toggleExpand(key) : undefined}
                      style={item.expand ? { cursor: 'pointer' } : undefined}
                    >
                      <span className={styles.itemIcon}>
                        <img src={item.icon} width="18" height="18" alt="" />
                      </span>
                      <div className={styles.itemContent}>
                        <span>{label}</span>
                        {explanation && (
                          <div className={styles.itemExplanation}>
                            <p className={styles.itemExplanationText}>{explanation}</p>
                          </div>
                        )}
                      </div>
                      {item.expand && (
                        <img src={expandIcon} width="14" height="14" alt="" className={styles.expandIcon} />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
