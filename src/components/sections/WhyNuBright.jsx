import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './WhyNuBright.module.css'
import btnStyles from '../ui/Button.module.css'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Badge from '../ui/Badge'
import teamImg from '../../assets/team.png'
import gradient1 from '../../assets/gradient1.svg'
import gradient2 from '../../assets/gradient2.png'
import illus1 from '../../assets/Every Process Validated.png'
import illus2 from '../../assets/Every Permission Traceable.png'
import illus3 from '../../assets/Every Data Exchange Secured.png'
import LoopSymbol from '../ui/LoopSymbol'

/* ── Structure (assets + keys; text comes from i18n) ── */
const TABS = [
  {
    key: 't1',
    stats: [
      { type: 'dark',  statKey: 'dark' },
      { type: 'photo', image: teamImg },
      { type: 'light', statKey: 'light', bg: gradient1 },
    ],
  },
  {
    key: 't2',
    stats: [
      { type: 'illus', image: illus1, illusKey: 'illus1' },
      { type: 'illus', image: illus2, illusKey: 'illus2' },
      { type: 'illus', image: illus3, illusKey: 'illus3' },
    ],
  },
  {
    key: 't3',
    link: '/technology',
    stats: [
      { type: 'loop', bg: gradient2 },
    ],
  },
]

function StatCards({ stats, tabKey, t }) {
  const hasIllus = stats.some(s => s.type === 'illus')
  return (
    <div className={`${styles.stats} ${hasIllus ? styles.statsIllus : ''}`}>
      {stats.map((s, i) => {
        if (s.type === 'photo') {
          return (
            <div key={i} className={styles.statCardPhoto}>
              <img src={s.image} alt="" className={styles.statCardPhotoImg} />
            </div>
          )
        }
        if (s.type === 'loop') {
          return (
            <div key={i} className={styles.statCardLoop}>
              <img src={s.bg} aria-hidden="true" className={styles.statCardBg} />
              <div className={styles.statCardLoopSymbol}>
                <LoopSymbol
                  strokeWidth={5}
                  dotR={6}
                  leftLabel={t(`whyNuBright.${tabKey}.leftLabel`)}
                  rightLabel={t(`whyNuBright.${tabKey}.rightLabel`)}
                  nodeLabels={{
                    topLeft:     t(`whyNuBright.${tabKey}.topLeft`),
                    bottomLeft:  t(`whyNuBright.${tabKey}.bottomLeft`),
                    topRight:    t(`whyNuBright.${tabKey}.topRight`),
                    bottomRight: t(`whyNuBright.${tabKey}.bottomRight`),
                  }}
                  className={styles.statCardLoopSvg}
                />
              </div>
              <div className={styles.statCardLoopBody}>
                <p className={styles.statCardLoopDesc}>{t(`whyNuBright.${tabKey}.desc`)}</p>
              </div>
            </div>
          )
        }
        if (s.type === 'illus') {
          return (
            <div key={i} className={styles.statCardIllus}>
              <div className={styles.statCardIllusImg}>
                <img src={s.image} alt={t(`whyNuBright.${tabKey}.${s.illusKey}`)} />
              </div>
              <p className={styles.statCardIllusLabel}>{t(`whyNuBright.${tabKey}.${s.illusKey}`)}</p>
            </div>
          )
        }
        const cardClass = s.type === 'dark' ? styles.statCardDark : styles.statCard
        return (
          <div key={i} className={`${styles.statCard} ${cardClass}`}>
            {s.bg && <img src={s.bg} aria-hidden="true" className={styles.statCardBg} />}
            <p className={styles.statValue}>{t(`whyNuBright.${tabKey}.${s.statKey}.value`)}</p>
            <p className={styles.statLabel}>{t(`whyNuBright.${tabKey}.${s.statKey}.label`)}</p>
            <p className={styles.statSub}>{t(`whyNuBright.${tabKey}.${s.statKey}.sub`)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function WhyNuBright() {
  const [active, setActive] = useState(0)
  const { t } = useTranslation()
  const sectionRef = useScrollAnimation()
  const contentRefs = useRef([])
  const scrollingTo = useRef(false)

  const handleTabClick = useCallback((i) => {
    scrollingTo.current = true
    setActive(i)
    contentRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => { scrollingTo.current = false }, 800)
  }, [])

  useEffect(() => {
    const observers = []
    contentRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !scrollingTo.current) {
            setActive(i)
          }
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={`${styles.headerLabel} animate-on-enter`}><Badge variant="label">{t('whyNuBright.badge')}</Badge></p>
          <h2 className={`${styles.headerTitle} animate-on-enter`}>
            {t('whyNuBright.heading')}
          </h2>
          <p className={`${styles.headerSub} animate-on-enter`}>{t('whyNuBright.sub')}</p>
        </header>

        <div className={styles.layout}>
          {/* Sticky sidebar */}
          <div className={styles.sidebar}>
            {TABS.map((tab, i) => (
              <button
                key={i}
                className={`${styles.tabItem} ${i === active ? styles.active : ''}`}
                onClick={() => handleTabClick(i)}
              >
                {t(`whyNuBright.${tab.key}.label`)}
              </button>
            ))}
          </div>

          {/* All content sections stacked */}
          <div className={styles.contentStack}>
            {TABS.map((tab, i) => (
              <div
                key={i}
                ref={el => { contentRefs.current[i] = el }}
                className={`${styles.content} ${tab.link ? styles.contentHasLink : ''}`}
              >
                <h3 className={styles.contentTitle}>{t(`whyNuBright.${tab.key}.title`)}</h3>
                <p className={styles.contentBody}>{t(`whyNuBright.${tab.key}.body`)}</p>
                {tab.link && (
                  <Link
                    to={tab.link}
                    className={`${btnStyles.btn} ${btnStyles.ghost} ${btnStyles['size-sm']} ${styles.contentLink}`}
                  >
                    {t(`whyNuBright.${tab.key}.link`)}
                  </Link>
                )}
                <StatCards stats={tab.stats} tabKey={tab.key} t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
