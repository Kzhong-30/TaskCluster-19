export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const cleaned = hex.replace('#', '')
  const r = parseInt(cleaned.substring(0, 2), 16) / 255
  const g = parseInt(cleaned.substring(2, 4), 16) / 255
  const b = parseInt(cleaned.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6
    } else {
      h = ((r - g) / delta + 4) / 6
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)

  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, '0')
  }

  return `#${f(0)}${f(8)}${f(4)}`
}

const SHADE_LIGHTNESS: Record<number, number> = {
  50: 97,
  100: 94,
  200: 86,
  300: 76,
  400: 64,
  500: 52,
  600: 42,
  700: 33,
  800: 24,
  900: 15,
}

export type ShadeMap = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>

export function generateShades(hex: string): ShadeMap {
  const { h, s } = hexToHSL(hex)

  return Object.entries(SHADE_LIGHTNESS).reduce((acc, [shade, lightness]) => {
    acc[Number(shade) as keyof ShadeMap] = hslToHex(h, s, lightness)
    return acc
  }, {} as ShadeMap)
}

export function getThemeCSS(primaryColor: string, fontFamily: string, borderRadius: number): string {
  const shades = generateShades(primaryColor)

  const lines = [
    ':root {',
    `  --primary-50: ${shades[50]};`,
    `  --primary-100: ${shades[100]};`,
    `  --primary-200: ${shades[200]};`,
    `  --primary-300: ${shades[300]};`,
    `  --primary-400: ${shades[400]};`,
    `  --primary-500: ${shades[500]};`,
    `  --primary-600: ${shades[600]};`,
    `  --primary-700: ${shades[700]};`,
    `  --primary-800: ${shades[800]};`,
    `  --primary-900: ${shades[900]};`,
    `  --font-family: ${fontFamily};`,
    `  --border-radius: ${borderRadius}px;`,
    '}',
  ]

  return lines.join('\n')
}
