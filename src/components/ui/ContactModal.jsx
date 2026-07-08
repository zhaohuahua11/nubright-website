import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import styles from './ContactModal.module.css'

const EMAILJS_SERVICE_ID  = 'service_jt6qq4i'
const EMAILJS_PUBLIC_KEY  = 'OiRLnSSTzFsXN5JCq'
const TEMPLATE_TO_CUSTOMER = 'template_9dqq3gd'
const TEMPLATE_TO_TEAM     = 'template_7hvofym'

export default function ContactModal({ onClose, variant = 'contact' }) {
  const { t } = useTranslation()
  const ns = variant === 'demo' ? 'demo' : 'contact'
  const overlayRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    const form = e.target
    const templateParams = {
      form_type:       variant === 'demo' ? 'Request a Demo' : 'Contact Us',
      user_first_name: form.firstName.value,
      user_last_name:  form.lastName.value,
      user_email:      form.email.value,
      user_phone:      form.phone.value,
      user_company:    form.company.value,
      user_message:    form.message.value,
    }

    try {
      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_CUSTOMER, templateParams, EMAILJS_PUBLIC_KEY),
        emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_TO_TEAM,     templateParams, EMAILJS_PUBLIC_KEY),
      ])
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly at info@nubright.com.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Contact NuBright">
        {!submitted && (
          <div className={styles.header}>
            <div>
              <p className={styles.label}>{t(`${ns}.label`)}</p>
              <h2 className={styles.title}>{t(`${ns}.title`)}</h2>
            </div>
            <button className={styles.close} onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="var(--color-purple)" strokeWidth="1.5"/>
                <path d="M10 16.5l4.5 4.5 7.5-8" stroke="var(--color-purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className={styles.successTitle}>{t(`${ns}.successTitle`)}</h2>
            <p className={styles.successBody}>{t(`${ns}.successBody`)}</p>
            <button className={styles.submit} onClick={onClose}>{t(`${ns}.successBtn`)}</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="contact-lastname">{t(`${ns}.lastName.label`)}</label>
                <input
                  id="contact-lastname"
                  name="lastName"
                  type="text"
                  className={styles.input}
                  placeholder={t(`${ns}.lastName.placeholder`)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="contact-firstname">{t(`${ns}.firstName.label`)}</label>
                <input
                  id="contact-firstname"
                  name="firstName"
                  type="text"
                  className={styles.input}
                  placeholder={t(`${ns}.firstName.placeholder`)}
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="contact-email">{t(`${ns}.email.label`)}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder={t(`${ns}.email.placeholder`)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="contact-phone">{t(`${ns}.phone.label`)}</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  className={styles.input}
                  placeholder={t(`${ns}.phone.placeholder`)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-company">{t(`${ns}.company.label`)}</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                className={styles.input}
                placeholder={t(`${ns}.company.placeholder`)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-message">{t(`${ns}.message.label`)}</label>
              <textarea
                id="contact-message"
                name="message"
                className={`${styles.input} ${styles.textarea}`}
                placeholder={t(`${ns}.message.placeholder`)}
                rows={4}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submit} disabled={sending}>
              {sending ? 'Sending...' : t(`${ns}.submit`)}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
