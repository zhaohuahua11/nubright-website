import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CTASection.module.css'
import AuroraBg from '../ui/AuroraBg'

export default function CTASection({ onContactClick }) {
  const [dark, setDark] = useState(false)
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
    <section className={`${styles.section} ${dark ? styles.sectionDark : ''}`}>
      {!dark && <AuroraBg noMask veilShape="none" />}
      {!dark && <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 110% at 50% 50%, rgba(250,250,248,1) 0%, rgba(250,250,248,0) 100%)',
        filter: 'blur(40px)',
      }} />}
      <button className={styles.variantToggle} onClick={() => setDark(d => !d)}>
        {dark ? 'Light' : 'Dark'}
      </button>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {t('cta.line1')}
        </h2>
        <p className={styles.sub}>
          {t('cta.sub')}
        </p>
        <button onClick={onContactClick} className={styles.btn}>
          {t('cta.btn')}
        </button>
      </div>
    </section>
    </div>
  )
}
