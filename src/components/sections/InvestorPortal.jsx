import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './InvestorPortal.module.css'
import Badge from '../ui/Badge'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import uiBgImg from '../../assets/ui-bg.webp'
import InvestorPortalDemoStyle2 from '../ui/InvestorPortalDemoStyle2'
import bg1   from '../../assets/investor-bg1.webp'
import bg2   from '../../assets/investor-bg2.webp'
import bg3   from '../../assets/investor-bg3.webp'
import icon1 from '../../assets/investor-icon1.svg'
import icon2 from '../../assets/investor-icon2.svg'
import icon3 from '../../assets/investor-icon3.svg'

const FEATURES = [
  { key: 'f1', bg: bg1, icon: icon3 },
  { key: 'f2', bg: bg2, icon: icon2 },
  { key: 'f3', bg: bg3, icon: icon1 },
]

export default function InvestorPortal({ onContactClick, embedded = false }) {
  const { t } = useTranslation()
  const sectionRef = useScrollAnimation()
  const replayRef = useRef(null)
  return (
    <section className={`${styles.section} ${embedded ? styles.embedded : ''}`} ref={sectionRef}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <p className={`${styles.eyebrow} animate-on-enter`}><Badge variant="label">{t('investorPortal.badge')}</Badge></p>
          <h2 className={`${styles.title} animate-on-enter`}>{t('investorPortal.title')}</h2>
          <p className={`${styles.headerSub} animate-on-enter`}>{t('investorPortal.sub')}</p>
          <button className={`${styles.cardBtn} animate-on-enter`} onClick={onContactClick}>{t('investorPortal.cardBtn')}</button>
        </header>

        {/* Main card */}
        <div className={styles.card} style={{ backgroundImage: `url(${uiBgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <button className={styles.replayBtn} ref={replayRef} aria-label="Replay demo">↺</button>
          <div className={styles.uiPlaceholder}>
            <InvestorPortalDemoStyle2 replayRef={replayRef} />
          </div>
        </div>

        {/* Feature cards */}
        <div className={styles.features}>
          {FEATURES.map(({ key, bg, icon }, i) => (
            <div key={i} className={styles.feature}>
              <div className={styles.featureIconWrap} style={{ backgroundImage: `url(${bg})` }}>
                <img src={icon} alt="" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>{t(`investorPortal.${key}.title`)}</h3>
              <p className={styles.featureBody}>{t(`investorPortal.${key}.body`)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
