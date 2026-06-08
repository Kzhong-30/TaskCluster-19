'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { getAllSearchableText } from '@/data/components'
import { useRouter } from 'next/navigation'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const items = getAllSearchableText()

  const results = query.trim()
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.text.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  function handleSelect(path: string) {
    onClose()
    router.push(path)
  }

  function highlightMatch(text: string, q: string) {
    if (!q) return text
    const idx = text.toLowerCase().indexOf(q.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-[var(--primary-200)] text-[var(--primary-900)] rounded px-0.5">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[var(--bg-primary)] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          <Search className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索组件..."
            className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {query.trim() && (
          <ul className="max-h-72 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-4 py-6 text-center text-[var(--text-secondary)] text-sm">
                未找到匹配结果
              </li>
            )}
            {results.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleSelect(item.path)}
                  className="w-full text-left px-4 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div className="font-medium text-[var(--text-primary)] text-sm">
                    {item.title}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    {highlightMatch(item.text, query.trim())}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
