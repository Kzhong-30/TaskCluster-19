'use client'

import { useState } from 'react'
import { useThemeStore, generateCSSVars } from '@/store/theme'
import Button from '@components/Button/Button'
import Card from '@components/Card/Card'

const FONT_OPTIONS = [
  { label: 'System UI', value: 'system-ui' },
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Noto Sans SC', value: 'Noto Sans SC' },
]

export default function ThemePage() {
  const {
    primaryColor,
    fontFamily,
    borderRadius,
    setPrimaryColor,
    setFontFamily,
    setBorderRadius,
  } = useThemeStore()

  const [hexInput, setHexInput] = useState(primaryColor)

  const handleHexChange = (value: string) => {
    setHexInput(value)
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      setPrimaryColor(value)
    }
  }

  const handleColorPicker = (value: string) => {
    setHexInput(value)
    setPrimaryColor(value)
  }

  const handleReset = () => {
    const defaults = { primaryColor: '#4f46e5', fontFamily: 'system-ui', borderRadius: 8 }
    setPrimaryColor(defaults.primaryColor)
    setFontFamily(defaults.fontFamily)
    setBorderRadius(defaults.borderRadius)
    setHexInput(defaults.primaryColor)
  }

  const cssVars = generateCSSVars(primaryColor, fontFamily, borderRadius)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">主题配置</h1>
        <p className="mt-2 text-[var(--text-secondary)]">自定义文档站点的视觉风格，包括主色调、字体和圆角。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">主色调</h2>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handleColorPicker(e.target.value)}
                className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#4f46e5"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {['#4f46e5', '#059669', '#dc2626', '#d97706', '#7c3aed', '#0891b2'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorPicker(color)}
                  className="w-8 h-8 rounded-lg border-2 transition hover:scale-110"
                  style={{
                    backgroundColor: color,
                    borderColor: primaryColor === color ? 'var(--text-primary)' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">字体</h2>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              圆角 <span className="text-[var(--text-tertiary)] font-normal">{borderRadius}px</span>
            </h2>
            <input
              type="range"
              min={0}
              max={24}
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
            <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
              <span>0px</span>
              <span>12px</span>
              <span>24px</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition"
          >
            恢复默认
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">实时预览</h2>
          <div style={cssVars as React.CSSProperties} className="space-y-6">
            <div>
              <h3 className="text-sm text-[var(--text-tertiary)] mb-3">按钮组件</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[var(--text-tertiary)] mb-3">卡片组件</h3>
              <Card title="预览卡片" description="当前主题下的卡片样式" variant="bordered">
                <p className="text-sm text-[var(--text-secondary)]">这是卡片内容区域，展示当前主题的配色和圆角效果。</p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm text-[var(--text-tertiary)] mb-3">色板预览</h3>
              <div className="grid grid-cols-5 gap-2">
                {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="h-10 rounded-lg mb-1"
                      style={{ backgroundColor: cssVars[`--primary-${shade}`], borderRadius: `${borderRadius}px` }}
                    />
                    <span className="text-xs text-[var(--text-tertiary)]">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
