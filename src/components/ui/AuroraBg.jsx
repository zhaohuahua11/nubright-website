import styles from './AuroraBg.module.css'

export default function AuroraBg({ noMask = false, veilShape = 'arch', opacity = 1 }) {
  return (
    <div className={`${styles.shell} ${noMask ? styles.shellNoMask : ''}`} aria-hidden="true">
      <div className={styles.canvas}>
        <div className={styles.root} style={{ '--aurora-opacity': opacity }}>
          <div className={`${styles.blob} ${styles.b1}`} />
          <div className={`${styles.blob} ${styles.b2}`} />
          <div className={`${styles.blob} ${styles.b3}`} />
          <div className={`${styles.blob} ${styles.b4}`} />
          <div className={`${styles.blob} ${styles.b5}`} />
          <div className={`${styles.blob} ${styles.b6}`} />
          <div className={`${styles.blob} ${styles.w1}`} />
          <div className={`${styles.blob} ${styles.w2}`} />
          <div className={`${styles.blob} ${styles.w3}`} />
          <div className={`${styles.blob} ${styles.w4}`} />
        </div>
        {veilShape === 'arch' && (
          /* preserveAspectRatio="xMidYMid meet" — 保持比例，底部对齐，不变形 */
          <svg className={styles.veil} viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <clipPath id="aurora-arch-clip">
                {/* 大圆 center(100,100) R=100 · 小圆 center(140,100) r=40 dx=40 */}
                <path d="M200 100C200 44.77 155.23 0 100 0C44.77 0 0 44.77 0 100H100C100 77.91 117.91 60 140 60C162.09 60 180 77.91 180 100H200Z"/>
              </clipPath>
            </defs>
            <rect width="200" height="100" fill="rgb(250,250,248)" fillOpacity="1" clipPath="url(#aurora-arch-clip)"/>
          </svg>
        )}
        {veilShape === 'ellipse' && (
          <div className={styles.veilEllipse} />
        )}
      </div>
    </div>
  )
}
