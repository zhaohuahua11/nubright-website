import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const COLS = 4

function CopyButton({ copied, onClick, label }) {
  return (
    <button type="button" className={styles.copyBtn} onClick={onClick} aria-label={label}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="5.5" y="5.5" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M10.5 5.5V3A.5 .5 0 0010 2.5H3A.5 .5 0 002.5 3v7A.5 .5 0 003 10.5h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(null)

  const handleCopy = (key, value) => {
    navigator.clipboard?.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied((k) => (k === key ? null : k)), 1500)
  }

  const phone = t('footer.phone')
  const email = t('footer.email')
  const address = t('footer.address')

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
          <img src="/Logo-footer.svg" alt="NuBright" className={styles.logo} />
        </div>

        <div className={styles.colInfo}>
          <div className={styles.contactRow}>
            <p className={styles.contactItem}>{phone}</p>
            <CopyButton copied={copied === 'phone'} onClick={() => handleCopy('phone', phone)} label="Copy phone number" />
          </div>
          <div className={styles.contactRow}>
            <p className={styles.contactItem}>{email}</p>
            <CopyButton copied={copied === 'email'} onClick={() => handleCopy('email', email)} label="Copy email address" />
          </div>
          <div className={`${styles.contactRow} ${styles.contactRowAddress}`}>
            <address className={styles.address}>
              {address.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </address>
            <CopyButton copied={copied === 'address'} onClick={() => handleCopy('address', address.replace(/\n/g, ', '))} label="Copy address" />
          </div>
        </div>

        <div className={styles.colLegal}>
          <button className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('footer.backToTop')}
          </button>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>{t('footer.copyright')}</p>
        <div className={styles.legalGroup}>
          <Link to="/terms-and-conditions" className={`${styles.legalLink} ${styles.bottomLegalTerms}`}>{t('footer.terms')}</Link>
          <span className={styles.legalSep} aria-hidden="true">·</span>
          <Link to="/data-protection-policy" className={`${styles.legalLink} ${styles.bottomLegal}`}>{t('footer.dataProtection')}</Link>
        </div>
      </div>
    </footer>
  )
}
