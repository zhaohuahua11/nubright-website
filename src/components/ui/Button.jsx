import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  target,
  disabled,
  type = 'button',
  className = '',
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[`size-${size}`],
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
