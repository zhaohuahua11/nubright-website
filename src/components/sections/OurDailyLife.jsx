import { useState, useEffect, useRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import HTMLFlipBook from 'react-pageflip'
import styles from './OurDailyLife.module.css'

import coverImg from '../../assets/our daily life/cover.png'
import illus01 from '../../assets/our daily life/01.png'
import illus02 from '../../assets/our daily life/02.png'
import illus03 from '../../assets/our daily life/03.png'
import illus04 from '../../assets/our daily life/04.png'
import illus05 from '../../assets/our daily life/05.png'
import illus06 from '../../assets/our daily life/06.png'
import illus07 from '../../assets/our daily life/07.png'
import illus08 from '../../assets/our daily life/08.png'

// Pages: 0=text, 1=illus01, 2=illus02 ... 8=illus08, 9=back  (10 total, 5 spreads)
const ILLUSTRATIONS = [illus01, illus02, illus03, illus04, illus05, illus06, illus07, illus08]
const TOTAL_SPREADS = 5

const Page = forwardRef(({ children, className }, ref) => (
  <div ref={ref} className={className}>{children}</div>
))
Page.displayName = 'Page'

export default function OurDailyLife() {
  const { t } = useTranslation()
  const sectionRef = useScrollAnimation()
  const bookRef = useRef()
  // currentPage = left-page index of visible spread (0, 2, 4, 6, 8)
  const [currentPage, setCurrentPage] = useState(0)

  const isFirst = currentPage === 0
  const isLast  = currentPage >= 8

  // currentPage=0→spread1, 2→spread2, …, 8→spread5
  const activeDot = currentPage / 2  // 0-indexed (0–4)

  const onFlip = (e) => setCurrentPage(e.data)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  bookRef.current?.pageFlip().flipPrev()
      if (e.key === 'ArrowRight') bookRef.current?.pageFlip().flipNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Label: illus numbers visible in each spread
  let pageLabel
  if (currentPage === 0)     pageLabel = '1 / 8'
  else if (currentPage >= 8) pageLabel = '8 / 8'
  else                       pageLabel = `${currentPage}–${currentPage + 1} / 8`

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={`${styles.title} animate-on-enter`}>{t('ourDailyLife.title')}</h2>
          <p className={`${styles.subtitle} animate-on-enter`}>
            {t('ourDailyLife.sub')}
          </p>
        </header>

        <div className={styles.book}>
          {/* Toolbar */}
          <div className={styles.bookBar}>
            <span className={styles.bookLabel}>{t('ourDailyLife.bookLabel')}</span>
            <div className={styles.bookNav}>
              <button
                className={styles.navBtn}
                onClick={() => bookRef.current?.pageFlip().flipPrev()}
                disabled={isFirst}
                aria-label="Previous spread"
              >←</button>

              <button
                className={styles.navBtn}
                onClick={() => bookRef.current?.pageFlip().flipNext()}
                disabled={isLast}
                aria-label="Next spread"
              >→</button>
            </div>
          </div>

          {/* Flip book — 10 pages, no hard cover */}
          <div className={styles.bookBody}>
          <HTMLFlipBook
            ref={bookRef}
            width={500}
            height={460}
            size="stretch"
            minWidth={300}
            maxWidth={700}
            minHeight={280}
            maxHeight={640}
            startPage={0}
            showCover={false}
            flippingTime={700}
            maxShadowOpacity={0.35}
            drawShadow={true}
            useMouseEvents={true}
            showPageCorners={true}
            usePortrait={false}
            onFlip={onFlip}
            className={styles.flipBook}
          >
            {/* Page 0: cover image (left of first spread) */}
            <Page className={styles.coverPage}>
              <div className={styles.coverInner}>
                <img src={coverImg} alt="Our Daily Life cover" className={styles.coverImg} />
                <p className={styles.coverAuthor}>{t('ourDailyLife.coverAuthor')}</p>
              </div>
            </Page>

            {/* Pages 1–8: illustrations */}
            {ILLUSTRATIONS.map((src, i) => {
              const pageNum = String(i + 1).padStart(2, '0')
              const isRight = (i + 1) % 2 === 1  // odd page index = right page
              return (
                <Page key={i} className={`${styles.illusPage} ${isRight ? '' : styles.illusLeft}`}>
                  <img src={src} alt={`Illustration ${i + 1}`} className={styles.illusImg} />
                  <span className={`${styles.pageNum} ${isRight ? styles.pageNumRight : styles.pageNumLeft}`}>
                    {pageNum}
                  </span>
                </Page>
              )
            })}

            {/* Page 9: back cover */}
            <Page className={styles.backPage}>
            </Page>
          </HTMLFlipBook>
          </div>

          {/* Footer */}
          <div className={styles.bookFooter}>
            <div className={styles.dots}>
              {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeDot ? styles.dotActive : ''}`}
                  onClick={() => bookRef.current?.pageFlip().flip(i * 2)}
                  aria-label={`Spread ${i + 1}`}
                />
              ))}
            </div>
            <span className={styles.flipHint}>{t('ourDailyLife.flipHint')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
