import { useTranslation } from 'react-i18next'
import Badge from '../ui/Badge'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './AboutHero.module.css'

export default function AboutHero() {
  const { t } = useTranslation()
  const heroRef = useScrollAnimation()

  return (
    <section id="about" className={styles.hero} ref={heroRef}>
      <div className={styles.heroMaskGrid} aria-hidden="true">
        <div className={styles.heroMask} />
      </div>
      <div className={styles.heroGrid} aria-hidden="true">
        <div className={styles.heroGridCol} />
        <div className={styles.heroGridCol} />
        <div className={styles.heroGridCol} />
        <div className={styles.heroGridCol} />
      </div>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}><Badge variant="neutral">{t('aboutHero.badge')}</Badge></p>
        <h1 className={`${styles.heroHeading} animate-on-enter`}>
          {t('aboutHero.heading')}
        </h1>
        <p className={`${styles.heroSub} animate-on-enter`}>
          {t('aboutHero.sub')}
        </p>
      </div>
    </section>
  )
}
