import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 换页时立即置顶。
 * 必须走 Lenis 的 scrollTo(0, { immediate: true })：直接用 window.scrollTo 的话，
 * Lenis 内部记录的滚动位置仍是旧值，下一帧会把画面从底部补间回顶部；
 * 而 global.css 的 scroll-behavior: smooth 也会让原生 scrollTo 变成动画。
 */
export default function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = lenisRef?.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }
    // 兜底：Lenis 尚未就绪时，临时关掉 CSS 平滑再跳
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prev
  }, [pathname, lenisRef])

  return null
}
