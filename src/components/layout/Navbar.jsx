import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'

export default function Navbar({ onContactClick }) {
  const { t } = useTranslation()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          {/* 宽高比按 Logo.svg 的 473×194 给，避免加载时占位跳动 */}
          <img src="/Logo.svg" alt="NuBright" width={96} height={39} />
        </Link>

        <div className={styles.links} />

        <div className={styles.actions}>
          {/* 跳转地址未定，先禁用。确定后换回 <a href target="_blank" rel="noopener noreferrer"> */}
          <button type="button" className={styles.btnGhost} disabled>
            {t('navbar.clientPortals')}
            <svg className={styles.externalIcon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5.25 2.5H2.5v9h9V8.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 2.5h3v3M11.5 2.5L6.75 7.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={onContactClick} className={styles.btnPrimary}>
            {t('navbar.getIn')}
          </button>
        </div>
      </div>
    </nav>
  )
}
