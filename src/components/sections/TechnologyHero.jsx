import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LoopSymbol from '../ui/LoopSymbol'
import DotGrid from '../ui/DotGrid'
import Badge from '../ui/Badge'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import styles from './TechnologyHero.module.css'

export default function TechnologyHero() {
  const { t } = useTranslation()
  const heroRef = useScrollAnimation()
  const heroTextRef = useRef(null)

  return (
    <section id="technology" className={styles.hero} ref={heroRef}>
      {/* 背景色遮条：盖住穿过本区块的 L1/L3 两条竖线，保留 L2(中线)与外侧 L0/L4。
          与 GridOverlay 同盒模型 ⇒ 列边界精确对齐。放在 DotGrid 之前 ⇒ 点阵仍显示在其上。 */}
      <div className={styles.gridMask} aria-hidden="true">
        <div className={styles.gridMaskCols}><span /><span /><span /><span /></div>
      </div>
      <DotGrid skipRef={heroTextRef} />
      <div className={styles.heroInner}>
        <div className={styles.heroText} ref={heroTextRef}>
          <span className={styles.heroBadge}><Badge variant="label">{t('technologyHero.badge')}</Badge></span>
          <h1 className={`${styles.heroHeading} animate-on-enter`}>
            {t('technologyHero.line1')}<br />{t('technologyHero.line2')}
          </h1>
          <p className={`${styles.heroSub} animate-on-enter`}>
            {t('technologyHero.sub')}
          </p>
        </div>
        <div className={styles.heroVisual}>
          <LoopSymbol
            strokeWidth={8}
            dotR={8}
            leftLabel={t('technologyHero.leftLabel')}
            rightLabel={t('technologyHero.rightLabel')}
            className={styles.heroLoop}
          />
        </div>
      </div>
    </section>
  )
}
