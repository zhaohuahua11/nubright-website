import { useLocation } from 'react-router-dom'
import styles from './GridOverlay.module.css'

const COLS = 4

const HIDDEN_COLS_BY_PATH = {
  '/data-protection-policy': [1, 2, 3],
  '/terms-and-conditions': [1, 2, 3],
}

export default function GridOverlay() {
  const { pathname } = useLocation()
  const hiddenCols = HIDDEN_COLS_BY_PATH[pathname] ?? []

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.grid}>
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={i}
            className={styles.col}
            style={hiddenCols.includes(i + 1) ? { borderRight: 'none' } : {}}
          />
        ))}
      </div>
    </div>
  )
}
