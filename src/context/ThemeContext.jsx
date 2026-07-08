import { createContext, useContext, useEffect, useState } from 'react'

const VALID_THEMES = ['stripe', 'carta', 'handdrawn']
const VALID_BG_STYLES = ['aurora', 'mesh']

function getInitialTheme() {
  const params = new URLSearchParams(window.location.search)
  const t = params.get('theme')
  return VALID_THEMES.includes(t) ? t : 'stripe'
}

function getInitialBgStyle() {
  const params = new URLSearchParams(window.location.search)
  const b = params.get('bg')
  return VALID_BG_STYLES.includes(b) ? b : 'aurora'
}

const ThemeContext = createContext({
  theme: 'stripe',
  setTheme: () => {},
  bgStyle: 'aurora',
  setBgStyle: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [bgStyle, setBgStyle] = useState(getInitialBgStyle)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const url = new URL(window.location.href)
    url.searchParams.set('theme', theme)
    url.searchParams.set('bg', bgStyle)
    window.history.replaceState({}, '', url)
  }, [theme, bgStyle])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, bgStyle, setBgStyle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
