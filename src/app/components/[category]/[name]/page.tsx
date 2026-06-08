import { notFound } from 'next/navigation'
import { getComponentByName } from '@/data/components'
import propsData from '@/data/props-extracted.json'
import { PropsTable } from '@/components/PropsTable'
import { CodeBlock } from '@/components/CodeBlock'
import { InteractiveDemo } from '@/components/InteractiveDemo'
import { Changelog } from '@/components/Changelog'
import { MDXContent } from '@/components/MDXContent'

export default function ComponentDocPage({
  params,
}: {
  params: { category: string; name: string }
}) {
  const component = getComponentByName(params.name)

  if (!component) {
    notFound()
  }

  const props = (propsData[params.name as keyof typeof propsData] || []) as { name: string; type: string; defaultValue: string | undefined; required: boolean; description: string }[]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{component.title}</h1>
        <p className="mt-2 text-[var(--text-secondary)]">{component.description}</p>
        <span className="inline-flex items-center mt-3 text-xs font-mono text-[var(--text-tertiary)] bg-[var(--bg-secondary)] rounded-full px-3 py-1 border border-[var(--border-color)]">
          {component.sourcePath}
        </span>
      </div>

      {component.docPath && (
        <section className="mt-6">
          <MDXContent docPath={component.docPath} />
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">交互式演示</h2>
        <InteractiveDemo componentName={component.name} examples={component.examples} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">代码示例</h2>
        <div className="space-y-4">
          {component.examples.map((example, i) => (
            <div key={i}>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">{example.title}</h3>
              <CodeBlock code={example.code} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Props</h2>
        <PropsTable props={props} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">变更日志</h2>
        <Changelog entries={component.changelog} />
      </section>
    </div>
  )
}
