import styles from './OurSpirits.module.css'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import spirits1Img from '../../assets/spirits1.png'
import spirits2Img from '../../assets/spirits2.png'
import spirits3Img from '../../assets/spirtis3.png'
import gradient3Img from '../../assets/gradient3.svg'

const ITEMS = [
  { key: 's1', image: spirits1Img, variant: 'pink' },
  { key: 's2', image: spirits2Img, variant: 'yellow', reverse: true, gradient: gradient3Img },
  { key: 's3', image: spirits3Img, variant: 'purple' },
]

export default function OurSpirits() {
  const { t } = useTranslation()
  const sectionRef = useScrollAnimation()
  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.sectionGrid} aria-hidden="true">
        <div className={styles.sectionGridCol} />
        <div className={styles.sectionGridCol} />
        <div className={styles.sectionGridCol} />
        <div className={styles.sectionGridCol} />
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={`${styles.title} animate-on-enter`}>{t('ourSpirits.title')}</h2>
          <p className={`${styles.subtitle} animate-on-enter`}>
            {t('ourSpirits.sub')}
          </p>
        </header>

        <div className={styles.rows}>
          {ITEMS.map((item, i) => (
            <div key={i} className={`${styles.row} ${item.reverse ? styles.rowReverse : ''}`}>
              <div className={styles.imageBox}>
                <img src={item.image} alt="" className={styles.image} />
              </div>
              <div className={`${styles.textBox} ${item.variant ? styles[`textBox_${item.variant}`] : ''}`}>
                {item.gradient && (
                  <img src={item.gradient} aria-hidden="true" className={styles.textBoxGradientImg} />
                )}
                <div className={styles.textBoxInner}>
                  <p className={styles.eyebrow}>{t(`ourSpirits.${item.key}.eyebrow`)}</p>
                  <h3 className={styles.heading}>{t(`ourSpirits.${item.key}.heading`)}</h3>
                  <p className={styles.body}>{t(`ourSpirits.${item.key}.body`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
