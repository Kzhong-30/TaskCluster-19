'use client'

import { useState } from 'react'
import { Search, Moon, Sun, Palette } from 'lucide-react'
import { useThemeStore } from '@/store/theme'
import { SearchDialog } from '@/components/SearchDialog'
import Link from 'next/link'

export function Header() {
  const { mode, toggleMode } = useThemeStore()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <Link href="/" className="font-bold text-lg text-[var(--text-primary)]">
          Doc<span className="text-[var(--primary-500)]">Gen</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            aria-label="搜索"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleMode}
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            aria-label="切换主题"
          >
            {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="/theme"
            className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            aria-label="主题设置"
          >
            <Palette className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
