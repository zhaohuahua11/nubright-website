import { useTranslation } from 'react-i18next'
import styles from './ManagerPortal.module.css'
import Badge from '../ui/Badge'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import f1Img from '../../assets/manager-f1.png'
import f2Img from '../../assets/manager-f2.png'
import f3Img from '../../assets/manager-f3.png'

const FEATURES = [
  { key: 'f1', img: f1Img },
  { key: 'f2', img: f2Img },
  { key: 'f3', img: f3Img },
]

export default function ManagerPortal({ embedded = false }) {
  const { t } = useTranslation()
  const sectionRef = useScrollAnimation()
  return (
    <section className={`${styles.section} ${embedded ? styles.embedded : ''}`} ref={sectionRef}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <p className={`${styles.eyebrow} animate-on-enter`}><Badge variant="label">{t('managerPortal.badge')}</Badge></p>
          <h2 className={`${styles.title} animate-on-enter`}>{t('managerPortal.title')}</h2>
          <p className={`${styles.headerSub} animate-on-enter`}>{t('managerPortal.sub')}</p>
          <p className={`${styles.wip} animate-on-enter`}>
            <span className={styles.wipDot} />
            {t('managerPortal.wip')}
          </p>
        </header>

        {/* Feature cards */}
        <div className={styles.features}>
          {FEATURES.map(({ key, img }, i) => (
            <div key={i} className={styles.feature}>
              <div className={styles.featureImg}>
                <img src={img} alt="" className={styles.featureIllus} />
              </div>
              <h3 className={styles.featureTitle}>{t(`managerPortal.${key}.title`)}</h3>
              <p className={styles.featureBody}>{t(`managerPortal.${key}.body`)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
