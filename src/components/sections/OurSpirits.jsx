import styles from './OurSpirits.module.css'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import spirits1Img from '../../assets/spirits1.png'
import spirits2Img from '../../assets/spirits2.png'
import spirits3Img from '../../assets/spirtis3.png'
import gradient1Img from '../../assets/spirits1-grad.png'
import gradient2Img from '../../assets/spirits2-grad.png'
import gradient3Img from '../../assets/spirits3-grad.png'

const ITEMS = [
  { key: 's1', image: spirits1Img, variant: 'pink', reverse: true, gradient: gradient1Img },
  { key: 's2', image: spirits2Img, variant: 'yellow', gradient: gradient2Img },
  { key: 's3', image: spirits3Img, variant: 'purple', reverse: true, gradient: gradient3Img },
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
        <div className={styles.rows}>
          {ITEMS.map((item, i) => (
            <div key={i} className={`${styles.row} ${item.reverse ? styles.rowReverse : ''}`}>
              <div className={styles.imageBox}>
                <img src={item.image} alt="" className={styles.image} />
              </div>
              <div
                className={`${styles.textBox} ${item.variant ? styles[`textBox_${item.variant}`] : ''}`}
                style={item.gradient ? { backgroundImage: `url(${item.gradient})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                <div className={styles.textBoxInner}>
                  <h3 className={styles.heading}>
                    {t(`ourSpirits.${item.key}.heading`)}
                    <span className={styles.headingNum}>{String(i + 1).padStart(2, '0')}</span>
                  </h3>
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
