'use client'

interface PropData {
  name: string
  type: string
  defaultValue: string | undefined
  required: boolean
  description: string
}

interface PropsTableProps {
  props: PropData[]
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p className="text-[var(--text-tertiary)] text-sm">暂无 Props 定义</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--bg-secondary)]">
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">属性名</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">类型</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">默认值</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">必填</th>
            <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">说明</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-t border-[var(--border-color)]">
              <td className="px-4 py-3 font-mono text-primary-600 dark:text-primary-400 text-xs">{prop.name}</td>
              <td className="px-4 py-3 font-mono text-[var(--text-secondary)] text-xs">{prop.type}</td>
              <td className="px-4 py-3 font-mono text-[var(--text-tertiary)] text-xs">{prop.defaultValue ?? '-'}</td>
              <td className="px-4 py-3">
                {prop.required ? (
                  <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 rounded px-1.5 py-0.5">必填</span>
                ) : (
                  <span className="text-xs text-[var(--text-tertiary)]">可选</span>
                )}
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">{prop.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
