import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

export default function Navbar({ onContactClick }) {
  const { t } = useTranslation()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/Logo.svg" alt="NuBright" width={80} height={80} />
        </Link>

        <div className={styles.links} />

        <div className={styles.actions}>
          <a
            href="https://portal.nubright.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            {t('navbar.clientPortals')}
          </a>
          <button onClick={onContactClick} className={styles.btnPrimary}>
            {t('navbar.getIn')}
          </button>
        </div>
      </div>
    </nav>
  )
}
