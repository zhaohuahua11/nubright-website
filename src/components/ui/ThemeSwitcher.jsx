import { useTheme } from '../../context/ThemeContext'
import styles from './ThemeSwitcher.module.css'

const THEMES = [
  { id: 'stripe',    label: 'Demo 1 · Stripe' },
  { id: 'carta',     label: 'Demo 2 · Carta' },
  { id: 'handdrawn', label: 'Demo 3 · Hand-drawn' },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.switcher} role="group" aria-label="Switch demo theme">
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`${styles.btn} ${theme === t.id ? styles.active : ''}`}
          onClick={() => setTheme(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
