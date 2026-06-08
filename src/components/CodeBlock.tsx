'use client'

import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border-color)]">
      <div className="bg-[var(--bg-secondary)] px-4 py-2 border-b border-[var(--border-color)] flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-tertiary)]">{language.toUpperCase()}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition"
        >
          复制
        </button>
      </div>
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="p-4 overflow-x-auto text-sm" style={{ ...style, backgroundColor: 'var(--code-bg)' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
