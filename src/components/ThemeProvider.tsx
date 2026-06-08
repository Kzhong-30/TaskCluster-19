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

  const cssVars = generateCSSVars(primaryColor, fontFamily, borderRadius)

  return (
    <div style={cssVars as React.CSSProperties}>
      {children}
    </div>
  )
}
