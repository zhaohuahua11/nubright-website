import { useState, useEffect, useRef } from 'react'
import styles from './Select.module.css'

export default function Select({ value, onChange, options, size = 'md' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  const current = options.find(o => o.value === value)

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${open ? styles.isOpen : ''} ${size === 'sm' ? styles.wrapSm : ''}`}
    >
      <button
        type="button"
        className={`${styles.trigger} ${size === 'sm' ? styles.triggerSm : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current?.label}
      </button>
      <div className={styles.icon} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.option} ${opt.value === value ? styles.isSelected : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
              <span className={styles.check} aria-hidden="true">✓</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
