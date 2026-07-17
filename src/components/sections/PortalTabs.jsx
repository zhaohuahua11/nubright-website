import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PortalTabs.module.css'
import InvestorPortal from './InvestorPortal'
import ManagerPortal from './ManagerPortal'

const TABS = [
  { id: 'investor', labelKey: 'investorPortal.badge' },
  { id: 'manager', labelKey: 'managerPortal.badge' },
]

/**
 * 把 Investor / Manager Portal 收进一个统一外壳，用下划线式 tab 切换。
 * 默认 Investor；tab 标签作为唯一标题层（各 portal 的 badge/大标题在嵌入模式下隐藏）。
 */
export default function PortalTabs({ onContactClick }) {
  const { t } = useTranslation()
  const [active, setActive] = useState('investor')

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.tabs} role="tablist" aria-label="Portals">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel" key={active}>
          {active === 'investor'
            ? <InvestorPortal onContactClick={onContactClick} embedded />
            : <ManagerPortal embedded />}
        </div>
      </div>
    </section>
  )
}
