'use client'

import { useEffect } from 'react'
import { useThemeStore, generateCSSVars } from '@/store/theme'

const THEME_MODE_KEY = 'docgen-theme-mode'
const THEME_VARS_KEY = 'docgen-theme-vars'
const THEME_CSS_KEY = 'docgen-theme-css'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, primaryColor, fontFamily, borderRadius, setMode, setPrimaryColor, setFontFamily, setBorderRadius } = useThemeStore()

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem(THEME_MODE_KEY) as 'light' | 'dark' | null
      if (savedMode) {
        setMode(savedMode)
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setMode('dark')
      }

      const savedVars = localStorage.getItem(THEME_VARS_KEY)
      if (savedVars) {
        const { primaryColor: pc, fontFamily: ff, borderRadius: br } = JSON.parse(savedVars)
        if (pc) setPrimaryColor(pc)
        if (ff) setFontFamily(ff)
        if (br != null) setBorderRadius(br)
      }
    } catch {}
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(THEME_MODE_KEY, mode)
    } catch {}
  }, [mode])

  useEffect(() => {
    const root = document.documentElement
    const cssVars = generateCSSVars(primaryColor, fontFamily, borderRadius)
    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value)
    }
    try {
      localStorage.setItem(THEME_VARS_KEY, JSON.stringify({ primaryColor, fontFamily, borderRadius }))
      localStorage.setItem(THEME_CSS_KEY, JSON.stringify(cssVars))
    } catch {}
  }, [primaryColor, fontFamily, borderRadius])

  return <>{children}</>
}
