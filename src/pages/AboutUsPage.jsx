import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import Badge from '../components/ui/Badge'
import Footer from '../components/layout/Footer'
import CTASection from '../components/sections/CTASection'
import OurSpirits from '../components/sections/OurSpirits'
import OurDailyLife from '../components/sections/OurDailyLife'
import styles from './AboutUsPage.module.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import heroBgImg from '../assets/about-us-bg.png'

export default function AboutUsPage({ onContactClick }) {
  const { t } = useTranslation()
  const heroRef = useScrollAnimation()

  return (
    <>
      <Navbar onContactClick={onContactClick} />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBgClip}>
          <img src={heroBgImg} alt="" className={styles.heroBg} />
          {/* <div className={styles.heroGlass} /> */}
        </div>
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

      <OurSpirits />

      <OurDailyLife />

      <CTASection onContactClick={onContactClick} />
      <Footer />
    </>
  )
}
