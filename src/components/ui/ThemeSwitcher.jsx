import { useTheme } from '../../context/ThemeContext'
import styles from './ThemeSwitcher.module.css'

const THEMES = [
  { id: 'stripe',    label: 'Demo 1 · Stripe' },
  { id: 'carta',     label: 'Demo 2 · Carta' },
  { id: 'handdrawn', label: 'Demo 3 · Hand-drawn' },
]

const BG_STYLES = [
  { id: 'aurora', label: 'Aurora' },
  { id: 'mesh',   label: 'Mesh' },
]

export default function ThemeSwitcher() {
  const { theme, setTheme, bgStyle, setBgStyle } = useTheme()

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
      {theme === 'stripe' && (
        <>
          <span className={styles.divider} aria-hidden="true" />
          {BG_STYLES.map(b => (
            <button
              key={b.id}
              className={`${styles.btn} ${bgStyle === b.id ? styles.active : ''}`}
              onClick={() => setBgStyle(b.id)}
            >
              {b.label}
            </button>
          ))}
        </>
      )}
    </div>
  )
}
