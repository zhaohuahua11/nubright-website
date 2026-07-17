import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CTASection from '../components/sections/CTASection'
import StatsBar from '../components/sections/StatsBar'
import LifecycleTimeline from '../components/sections/LifecycleTimeline'
import AboutHero from '../components/sections/AboutHero'
import OurSpirits from '../components/sections/OurSpirits'
import TechnologyHero from '../components/sections/TechnologyHero'
import PortalTabs from '../components/sections/PortalTabs'
import AuroraBg from '../components/ui/AuroraBg'
import RulerBg from '../components/ui/RulerBg'
import ChapterBridge from '../components/ui/ChapterBridge'
import ProgressNav from '../components/ui/ProgressNav'
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
      <ProgressNav />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        {/* {theme === 'stripe' && <AuroraBg veilShape="ellipse" />} */}
        {/* 只在 hero 内盖住中间 3 条竖线（L1/L2/L3），两侧 L0/L4 保留显示 */}
        <div className={styles.heroGridMask} aria-hidden="true">
          <div className={styles.heroGridMaskCols}>
            <span /><span /><span /><span />
          </div>
        </div>
        <RulerBg />
        {/* 贴刻度右端（“我们”这侧）的点题注释 */}
        <div className={styles.rulerCaption} aria-hidden="true">
          <div className={styles.rulerCaptionInner}>
            <span className={styles.rulerCaptionText}>{t('hero.rulerCaption')}</span>
          </div>
        </div>
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

        {/* Stats overlaid on the ruler ticks */}
        <StatsBar />
      </section>

      {/* 章节桥：hero 结尾 → Our Services */}
      <ChapterBridge href="#our-services" gapTop>{t('bridges.services')}</ChapterBridge>

      {/* Our Services */}
      <LifecycleTimeline />

      {/* 章节桥：Our Services 结尾 → About */}
      <ChapterBridge href="#about">{t('bridges.about')}</ChapterBridge>

      {/* About (moved from the former About Us page) */}
      <AboutHero />

      <OurSpirits />

      {/* 章节桥：About 结尾 → Technology */}
      <ChapterBridge href="#technology">{t('bridges.technology')}</ChapterBridge>

      {/* Technology (moved from the former Technology page) */}
      <TechnologyHero />

      <PortalTabs onContactClick={onDemoClick || onContactClick} />

      <CTASection onContactClick={onContactClick} />
      <Footer />
    </>
  )
}
