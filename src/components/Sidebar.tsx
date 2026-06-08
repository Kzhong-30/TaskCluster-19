'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, FileCode2, FolderOpen, Folder, Home, Palette } from 'lucide-react'
import { getComponentByCategory } from '@/data/components'
import { useThemeStore } from '@/store/theme'

const categoryMap = getComponentByCategory()

export function Sidebar() {
  const pathname = usePathname()
  const { primaryColor } = useThemeStore()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    Object.keys(categoryMap).forEach((category) => {
      initial[category] = true
    })
    return initial
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const isActive = (category: string, name: string) => {
    return pathname === `/components/${category}/${name}`
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-[var(--sidebar-border)]">
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>组件库</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>浏览所有可用的 UI 组件</p>
      </div>

      <nav className="flex-1 p-2">
        <Link
          href="/"
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
            pathname === '/'
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
              : 'hover:bg-[var(--bg-tertiary)]'
          }`}
          style={pathname !== '/' ? { color: 'var(--text-primary)' } : { color: primaryColor }}
        >
          <Home size={16} />
          首页
        </Link>

        {Object.entries(categoryMap).map(([category, components]) => {
          const isOpen = openCategories[category]

          return (
            <div key={category} className="mt-2">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-primary)' }}
              >
                {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
                <span className="flex-1 text-left">{category}</span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {isOpen && (
                <div className="ml-2 mt-1 border-l border-[var(--sidebar-border)] pl-2">
                  {components.map((component) => {
                    const active = isActive(category, component.name)

                    return (
                      <Link
                        key={component.name}
                        href={`/components/${category}/${component.name}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                          active
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                            : 'hover:bg-[var(--bg-tertiary)]'
                        }`}
                        style={!active ? { color: 'var(--text-secondary)' } : { color: primaryColor }}
                      >
                        <FileCode2 size={14} />
                        {component.title}
                      </Link>
                    )
                  })}
                </div>
              )}

              <div className="my-2 border-t border-[var(--sidebar-border)]" />
            </div>
          )
        })}
      </nav>

      <div className="p-2 border-t border-[var(--sidebar-border)]">
        <Link
          href="/theme"
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
            pathname === '/theme'
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
              : 'hover:bg-[var(--bg-tertiary)]'
          }`}
          style={pathname !== '/theme' ? { color: 'var(--text-primary)' } : { color: primaryColor }}
        >
          <Palette size={16} />
          主题配置
        </Link>
      </div>
    </aside>
  )
}
