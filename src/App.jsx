import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import GridOverlay from './components/layout/GridOverlay'
import ScrollToTop from './components/layout/ScrollToTop'
import ContactModal from './components/ui/ContactModal'
import ThemeSwitcher from './components/ui/ThemeSwitcher'
import LandingPage from './pages/LandingPage'
import TechnologyPage from './pages/TechnologyPage'
import AboutUsPage from './pages/AboutUsPage'
import DataProtectionPolicyPage from './pages/DataProtectionPolicyPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GridOverlay />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage onContactClick={() => setShowModal(true)} />} />
            <Route path="/technology" element={<TechnologyPage onContactClick={() => setShowModal(true)} />} />
            <Route path="/about" element={<AboutUsPage onContactClick={() => setShowModal(true)} />} />
            <Route path="/data-protection-policy" element={<DataProtectionPolicyPage onContactClick={() => setShowModal(true)} />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage onContactClick={() => setShowModal(true)} />} />
          </Routes>
        </div>
        {showModal && <ContactModal onClose={() => setShowModal(false)} />}
        {/* <ThemeSwitcher /> */}
      </BrowserRouter>
    </ThemeProvider>
  )
}
