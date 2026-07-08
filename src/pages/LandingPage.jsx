import { lazy, Suspense } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CTASection from '../components/sections/CTASection'
import StatsBar from '../components/sections/StatsBar'
import LifecycleTimeline from '../components/sections/LifecycleTimeline'
import WhyNuBright from '../components/sections/WhyNuBright'
import AuroraBg from '../components/ui/AuroraBg'
import styles from './LandingPage.module.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'

const MeshGradient = lazy(() => import('../components/ui/MeshGradient'))

export default function LandingPage({ onContactClick }) {
  const heroRef = useScrollAnimation()
  const { theme, bgStyle } = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <Navbar onContactClick={onContactClick} />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        {theme === 'stripe' && bgStyle === 'aurora' && <AuroraBg veilShape="ellipse" />}
        {theme === 'stripe' && bgStyle === 'mesh' && (
          <Suspense fallback={null}>
            <MeshGradient />
          </Suspense>
        )}
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>{t('hero.badge')}</span>
          <h1 className={`text-display-2xl ${styles.heroHeading} animate-on-enter`}>
            {t('hero.heading').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className={`${styles.heroSub} animate-on-enter`}>
            {t('hero.sub')}
          </p>
          <div className={`${styles.heroCTAs} animate-on-enter`}>
            <button onClick={onContactClick} className={styles.heroBtnPrimary}>
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Full Lifecycle Coverage */}
      <LifecycleTimeline />

      {/* Why NuBright */}
      <WhyNuBright />

      <CTASection onContactClick={onContactClick} />
      <Footer />
    </>
  )
}
