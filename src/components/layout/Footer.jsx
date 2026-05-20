import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const COLS = 4

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.gridLines} aria-hidden="true">
        <div className={styles.gridInner}>
          {Array.from({ length: COLS }).map((_, i) => (
            <div key={i} className={styles.gridCol} />
          ))}
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.colBrand}>
          <img src="/Logo.svg" alt="NuBright" className={styles.logo} />
        </div>

        <div className={styles.colInfo}>
          <p className={styles.colHeading}>{t('footer.contactHeading')}</p>
          <p className={styles.contactItem}>{t('footer.phone')}</p>
          <p className={styles.contactItem}>{t('footer.email')}</p>
          <address className={styles.address}>
            {t('footer.address').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </address>
        </div>

        <div className={styles.colLegal}>
          <p className={styles.colHeading}>{t('footer.legalHeading')}</p>
          <Link to="/terms-and-conditions" className={styles.legalLink}>{t('footer.terms')}</Link>
          <Link to="/data-protection-policy" className={styles.legalLink}>{t('footer.dataProtection')}</Link>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>{t('footer.copyright')}</p>
        <button className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {t('footer.backToTop')}
        </button>
      </div>
    </footer>
  )
}
