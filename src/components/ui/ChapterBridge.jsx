import { useScrollAnimationSingle } from '../../hooks/useScrollAnimation'
import styles from './ChapterBridge.module.css'

/**
 * 章节桥：放在某个模块结尾，用一句话预告并链接到下一个模块。
 * 点击平滑滚动到 href 对应的锚点；滚入视口时淡入上移。
 */
export default function ChapterBridge({ href, children, gapTop = false, noGapBottom = false }) {
  const revealRef = useScrollAnimationSingle()

  const onClick = (e) => {
    e.preventDefault()
    const t = document.querySelector(href)
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={`${styles.bridge} ${gapTop ? styles.gapTop : ''} ${noGapBottom ? styles.noGapBottom : ''}`}>
      <a href={href} onClick={onClick} className={styles.link}>
        <span ref={revealRef} className={styles.inner}>
          <span className={styles.prefix}>Next&nbsp;·</span>
          {/* 箭头放进句子里、跟在文字末尾，句子换行时它就贴着最后一个词走。
              用不换行空格把箭头和末词绑住，避免箭头单独掉到下一行。 */}
          <span className={styles.sentence}>{children}<span className={styles.arrow} aria-hidden="true">&nbsp;↓</span></span>
        </span>
      </a>
    </section>
  )
}
