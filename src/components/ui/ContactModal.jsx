import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactModal.module.css'

export default function ContactModal({ onClose }) {
  const { t } = useTranslation()
  const overlayRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Contact NuBright">
        <div className={styles.header}>
          <div>
            <p className={styles.label}>{t('contact.label')}</p>
            <h2 className={styles.title}>{t('contact.title')}</h2>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-lastname">{t('contact.lastName.label')}</label>
              <input
                id="contact-lastname"
                type="text"
                className={styles.input}
                placeholder={t('contact.lastName.placeholder')}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-firstname">{t('contact.firstName.label')}</label>
              <input
                id="contact-firstname"
                type="text"
                className={styles.input}
                placeholder={t('contact.firstName.placeholder')}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-email">{t('contact.email.label')}</label>
              <input
                id="contact-email"
                type="email"
                className={styles.input}
                placeholder={t('contact.email.placeholder')}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-phone">{t('contact.phone.label')}</label>
              <input
                id="contact-phone"
                type="tel"
                className={styles.input}
                placeholder={t('contact.phone.placeholder')}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="contact-company">{t('contact.company.label')}</label>
            <input
              id="contact-company"
              type="text"
              className={styles.input}
              placeholder={t('contact.company.placeholder')}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="contact-message">{t('contact.message.label')}</label>
            <textarea
              id="contact-message"
              className={`${styles.input} ${styles.textarea}`}
              placeholder={t('contact.message.placeholder')}
              rows={4}
            />
          </div>

          <button type="submit" className={styles.submit}>
            {t('contact.submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
