import { useEffect, useRef, useCallback } from 'react'

const SPACING = 20
const DOT_R   = 1.5
const BASE    = [234, 236, 242]   // #eaecf2
const REACH   = 100               // px radius of influence

const STOPS = [
  [255, 230,   0],   // bright yellow
  [255, 140,   0],   // orange
  [255,  59,  46],   // red-pink
  [255, 133, 187],   // pink
  [204,  61, 180],   // purple-pink
  [114,  51, 212],   // purple
]

function lerpColor(t) {
  const s = Math.max(0, Math.min(1, t)) * (STOPS.length - 1)
  const i = Math.min(Math.floor(s), STOPS.length - 2)
  const f = s - i
  return STOPS[i].map((c, j) => Math.round(c + (STOPS[i + 1][j] - c) * f))
}

// skipRef: ref to an element whose x-range should have no dots drawn
export default function DotGrid({ skipRef }) {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x: -9999, y: -9999 })
  const skipRegion = useRef({ x1: 0, x2: 0 })
  const dirtyRef   = useRef(true)
  const rafRef     = useRef(null)

  const measureSkip = useCallback(() => {
    if (!skipRef?.current || !canvasRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const textRect   = skipRef.current.getBoundingClientRect()
    skipRegion.current = {
      x1: textRect.left  - canvasRect.left,
      x2: textRect.right - canvasRect.left,
    }
  }, [skipRef])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx  = canvas.getContext('2d')
    const dpr  = window.devicePixelRatio || 1
    const cw   = canvas.width
    const ch   = canvas.height
    const mx   = mouseRef.current.x * dpr
    const my   = mouseRef.current.y * dpr
    const sp   = SPACING * dpr
    const r    = DOT_R * dpr
    const reach = REACH * dpr
    const hueT  = mouseRef.current.x / (canvas.offsetWidth || 1)
    const sx1   = skipRegion.current.x1 * dpr
    const sx2   = skipRegion.current.x2 * dpr

    ctx.clearRect(0, 0, cw, ch)

    const cols = Math.ceil(cw / sp) + 1
    const rows = Math.ceil(ch / sp) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * sp
        const y = row * sp

        // skip text columns — canvas stays transparent so grid lines show through
        if (sx2 > sx1 && x >= sx1 && x <= sx2) continue

        const dist = Math.hypot(x - mx, y - my)
        let rgb
        if (dist < reach) {
          const intensity = (1 - dist / reach) ** 1.5
          const brand = lerpColor(hueT)
          rgb = BASE.map((c, j) => Math.round(c + (brand[j] - c) * intensity))
        } else {
          rgb = BASE
        }

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        ctx.fill()
      }
    }
  }, [])

  const loop = useCallback(() => {
    if (dirtyRef.current) {
      draw()
      dirtyRef.current = false
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [draw])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr  = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    measureSkip()
    dirtyRef.current = true
  }, [measureSkip])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      dirtyRef.current = true
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [resize, loop])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
