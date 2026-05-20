import { createContext, useContext, useEffect, useState } from 'react'

const VALID_THEMES = ['stripe', 'carta', 'handdrawn']

function getInitialTheme() {
  const params = new URLSearchParams(window.location.search)
  const t = params.get('theme')
  return VALID_THEMES.includes(t) ? t : 'stripe'
}

const ThemeContext = createContext({ theme: 'stripe', setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const url = new URL(window.location.href)
    url.searchParams.set('theme', theme)
    window.history.replaceState({}, '', url)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
