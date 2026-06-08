import { create } from 'zustand'
import { generateShades, type ShadeMap } from '@/lib/theme'

interface ThemeState {
  mode: 'light' | 'dark'
  primaryColor: string
  fontFamily: string
  borderRadius: number
  toggleMode: () => void
  setPrimaryColor: (color: string) => void
  setFontFamily: (font: string) => void
  setBorderRadius: (radius: number) => void
}

export function generateCSSVars(primaryColor: string, fontFamily: string, borderRadius: number): Record<string, string> {
  const shades: ShadeMap = generateShades(primaryColor)

  return {
    '--primary-50': shades[50],
    '--primary-100': shades[100],
    '--primary-200': shades[200],
    '--primary-300': shades[300],
    '--primary-400': shades[400],
    '--primary-500': shades[500],
    '--primary-600': shades[600],
    '--primary-700': shades[700],
    '--primary-800': shades[800],
    '--primary-900': shades[900],
    '--font-family': fontFamily,
    '--border-radius': `${borderRadius}px`,
  }
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  primaryColor: '#4f46e5',
  fontFamily: 'system-ui',
  borderRadius: 8,
  toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setPrimaryColor: (color) => set({ primaryColor: color }),
  setFontFamily: (font) => set({ fontFamily: font }),
  setBorderRadius: (radius) => set({ borderRadius: radius }),
}))
