import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GridOverlay from './components/layout/GridOverlay'
import ScrollToTop from './components/layout/ScrollToTop'
import ContactModal from './components/ui/ContactModal'
import LandingPage from './pages/LandingPage'
import DataProtectionPolicyPage from './pages/DataProtectionPolicyPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'

export default function App() {
  const [modalVariant, setModalVariant] = useState(null)
  const showModal = modalVariant !== null
  const openContact = () => setModalVariant('contact')
  const openDemo = () => setModalVariant('demo')

  // Lenis 实例交给 ScrollToTop 用：换页时必须走它的 API 立即归零，
  // 否则它内部记录的位置仍是旧值，下一帧会把画面从底部补间回顶部。
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis
    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop lenisRef={lenisRef} />
      <GridOverlay />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage onContactClick={openContact} onDemoClick={openDemo} />} />
          <Route path="/data-protection-policy" element={<DataProtectionPolicyPage onContactClick={openContact} />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage onContactClick={openContact} />} />
        </Routes>
      </div>
      {showModal && <ContactModal onClose={() => setModalVariant(null)} variant={modalVariant} lenisRef={lenisRef} />}
    </BrowserRouter>
  )
}
