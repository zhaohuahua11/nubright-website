import { useTranslation } from 'react-i18next'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './StatsBar.module.css'

const STATS = [
  { raw: 20,  prefix: '',  suffix: '+',  key: 'yearsExp' },
  { raw: 200, prefix: '',  suffix: '+',  key: 'fundsNav' },
  { raw: 10,  prefix: '$', suffix: 'B+', key: 'stages' },
  { raw: 15,  prefix: '',  suffix: '%',  key: 'platforms' },
]

function StatItem({ raw, prefix, suffix, label }) {
  const { ref, display } = useCountUp(raw, 1400)
  return (
    <div ref={ref} className={styles.stat}>
      <span className={`${styles.value} tabular-nums`}>{prefix}{display}{suffix}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default function StatsBar() {
  const { t } = useTranslation()
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <StatItem key={i} raw={s.raw} prefix={s.prefix} suffix={s.suffix} label={t(`statsBar.${s.key}`)} />
        ))}
      </div>
    </div>
  )
}
