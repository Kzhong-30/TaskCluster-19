'use client'

import { Clock, Tag } from 'lucide-react'
import type { ChangelogEntry } from '@/data/components'

interface ChangelogProps {
  entries: ChangelogEntry[]
}

export function Changelog({ entries }: ChangelogProps) {
  if (entries.length === 0) {
    return (
      <p className="text-[var(--text-tertiary)] text-sm">暂无变更日志</p>
    )
  }

  return (
    <div className="space-y-0">
      {entries.map((entry) => (
        <div key={entry.version} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-[var(--border-color)]">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-500)] border-2 border-[var(--bg-primary)]" />
          <div className="flex items-center gap-4 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full px-3 py-0.5 text-xs font-medium">
              <Tag className="w-3 h-3" />
              {entry.version}
            </span>
            <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              <Clock className="w-3.5 h-3.5" />
              {entry.date}
            </span>
          </div>
          <ul className="space-y-1">
            {entry.changes.map((change, i) => (
              <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary-400)] shrink-0" />
                {change}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
