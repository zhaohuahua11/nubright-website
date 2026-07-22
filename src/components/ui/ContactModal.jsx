import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import successIllustration from '../../assets/got your message.svg'
import styles from './ContactModal.module.css'

const EMAILJS_SERVICE_ID  = 'service_jt6qq4i'
const EMAILJS_PUBLIC_KEY  = 'OiRLnSSTzFsXN5JCq'
const TEMPLATE_TO_CUSTOMER = 'template_9dqq3gd'
const TEMPLATE_TO_TEAM     = 'template_7hvofym'

export default function ContactModal({ onClose, variant = 'contact', lenisRef }) {
  const { t } = useTranslation()
  // 两个入口（Get in Touch / Book a Live Walkthrough）共用同一套文案和同一封客户邮件，
  // variant 只用来区分发给内部的通知邮件标题
  const ns = 'contact'
  const overlayRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    // overflow:hidden 只挡住原生滚动。Lenis 是虚拟滚动，滚轮事件照收不误，
    // 内部位置会一路漂移，关闭弹窗恢复滚动时画面就会突然跳到漂移后的位置。
    lenisRef?.current?.stop()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      lenisRef?.current?.start()
    }
  }, [onClose, lenisRef])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    const form = e.target
    const templateParams = {
      // 只出现在发给团队的那封通知邮件里（客户版不用），故用中文
      form_type:       variant === 'demo' ? '预约演示' : '预约洽谈',
      // 表单已合并为单个「Full Name」；EmailJS 模板里仍引用旧的两个变量，
      // 故把全名填进 first_name（模板用它做称呼），last_name 留空占位。
      user_full_name:  form.fullName.value,
      user_first_name: form.fullName.value,
      user_last_name:  '',
      user_email:      form.email.value,
      user_phone:      form.phone.value,
      user_company:    form.company.value,
      // 留言可为空，内部邮件要显示「未填写」而不是留一片空白
      user_message:    form.message.value.trim() || '未填写',
      // 提交时间按香港时区生成，内部邮件用
      submitted_at:    new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Hong_Kong',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false,
      }).format(new Date()),
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
              {/* title 为空串时不渲染（contact 版已去掉副标题，demo 版仍有） */}
              {t(`${ns}.title`) && <h2 className={styles.title}>{t(`${ns}.title`)}</h2>}
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
            <img className={styles.successIcon} src={successIllustration} alt="" width="112" height="112" />
            <h2 className={styles.successTitle}>{t(`${ns}.successTitle`)}</h2>
            <p className={styles.successBody}>{t(`${ns}.successBody`)}</p>
            <button className={styles.submit} onClick={onClose}>{t(`${ns}.successBtn`)}</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="contact-fullname">{t(`${ns}.fullName.label`)}</label>
              <input
                id="contact-fullname"
                name="fullName"
                type="text"
                className={styles.input}
                placeholder={t(`${ns}.fullName.placeholder`)}
                required
              />
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
