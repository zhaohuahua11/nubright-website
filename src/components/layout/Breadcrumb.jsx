import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.css'

export default function Breadcrumb({ items }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className={styles.inner}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>
            {i > 0 && <span className={styles.sep}>/</span>}
            {item.href ? (
              <Link to={item.href} className={styles.link}>{item.label}</Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
