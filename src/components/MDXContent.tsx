import { compileMDX } from 'next-mdx-remote/rsc'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface MDXContentProps {
  docPath: string
}

export async function MDXContent({ docPath }: MDXContentProps) {
  const fullPath = resolve(process.cwd(), docPath)
  let source: string
  try {
    source = readFileSync(fullPath, 'utf-8')
  } catch {
    return <p className="text-[var(--text-tertiary)] text-sm">文档内容加载失败</p>
  }

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  })

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert
      prose-headings:text-[var(--text-primary)]
      prose-p:text-[var(--text-secondary)]
      prose-strong:text-[var(--text-primary)]
      prose-code:text-primary-600 dark:prose-code:text-primary-400
      prose-code:bg-[var(--code-bg)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
      prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
      prose-ul:my-2 prose-li:my-0.5
      prose-p:my-2">
      {content}
    </div>
  )
}
