import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CTASection from '../components/sections/CTASection'
import StatsBar from '../components/sections/StatsBar'
import LifecycleTimeline from '../components/sections/LifecycleTimeline'
import AboutHero from '../components/sections/AboutHero'
import OurSpirits from '../components/sections/OurSpirits'
import TechnologyHero from '../components/sections/TechnologyHero'
import InvestorPortal from '../components/sections/InvestorPortal'
import ManagerPortal from '../components/sections/ManagerPortal'
import AuroraBg from '../components/ui/AuroraBg'
import styles from './LandingPage.module.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'

export default function LandingPage({ onContactClick, onDemoClick }) {
  const heroRef = useScrollAnimation()
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <Navbar onContactClick={onContactClick} />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        {theme === 'stripe' && <AuroraBg veilShape="ellipse" />}
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

      {/* Our Services */}
      <LifecycleTimeline />

      {/* About (moved from the former About Us page) */}
      <AboutHero />

      <OurSpirits />

      {/* Technology (moved from the former Technology page) */}
      <TechnologyHero />

      <InvestorPortal onContactClick={onDemoClick || onContactClick} />
      <ManagerPortal />

      <CTASection onContactClick={onContactClick} />
      <Footer />
    </>
  )
}
