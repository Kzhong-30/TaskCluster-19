'use client'

import { useEffect } from 'react'
import { useThemeStore, generateCSSVars } from '@/store/theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, primaryColor, fontFamily, borderRadius } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [mode])

  useEffect(() => {
    const root = document.documentElement
    const cssVars = generateCSSVars(primaryColor, fontFamily, borderRadius)
    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value)
    }
  }, [primaryColor, fontFamily, borderRadius])

  return <>{children}</>
}
