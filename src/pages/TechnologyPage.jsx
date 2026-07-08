import { useTranslation } from 'react-i18next'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CTASection from '../components/sections/CTASection'
import InvestorPortal from '../components/sections/InvestorPortal'
import ManagerPortal from '../components/sections/ManagerPortal'
import LoopSymbol from '../components/ui/LoopSymbol'
import DotGrid from '../components/ui/DotGrid'
import styles from './TechnologyPage.module.css'
import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function TechnologyPage({ onContactClick, onDemoClick }) {
  const { t } = useTranslation()
  const heroRef = useScrollAnimation()
  const heroTextRef = useRef(null)

  return (
    <>
      <Navbar onContactClick={onContactClick} />

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <DotGrid skipRef={heroTextRef} />
        <div className={styles.heroInner}>
          <div className={styles.heroText} ref={heroTextRef}>
            <span className={styles.heroBadge}>{t('technologyHero.badge')}</span>
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

      <InvestorPortal onContactClick={onDemoClick || onContactClick} />
      <ManagerPortal />

      <CTASection onContactClick={onContactClick} />
      <Footer />
    </>
  )
}
