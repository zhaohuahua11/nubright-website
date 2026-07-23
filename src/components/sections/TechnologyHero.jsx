import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LoopSymbol from '../ui/LoopSymbol'
import DotGrid from '../ui/DotGrid'
import Badge from '../ui/Badge'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './TechnologyHero.module.css'

export default function TechnologyHero() {
  const { t } = useTranslation()
  const heroRef = useScrollAnimation()
  const heroTextRef = useRef(null)

  return (
    <section id="technology" className={styles.hero} ref={heroRef}>
      <DotGrid skipRef={heroTextRef} />
      <div className={styles.heroInner}>
        <div className={styles.heroText} ref={heroTextRef}>
          <span className={styles.heroBadge}><Badge variant="label">{t('technologyHero.badge')}</Badge></span>
          <h1 className={`${styles.heroHeading} animate-on-enter`}>
            {t('technologyHero.line1')}<br />{t('technologyHero.line2')}
          </h1>
          <p className={`${styles.heroSub} animate-on-enter`}>
            {t('technologyHero.sub')}
          </p>
        </div>
        <div className={styles.heroVisual}>
          <LoopSymbol
            strokeWidth={8}
            dotR={8}
            leftLabel={t('technologyHero.leftLabel')}
            rightLabel={t('technologyHero.rightLabel')}
            className={styles.heroLoop}
          />
        </div>
      </div>
    </section>
  )
}
