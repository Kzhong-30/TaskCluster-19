'use client'

import { useState, createElement } from 'react'
import type { ExampleConfig } from '@/data/components'
import Button from '@components/Button/Button'
import Input from '@components/Input/Input'
import Card from '@components/Card/Card'

interface InteractiveDemoProps {
  componentName: string
  examples: ExampleConfig[]
}

const componentMap: Record<string, any> = {
  button: Button,
  input: Input,
  card: Card,
}

const enumOptions: Record<string, Record<string, string[]>> = {
  button: {
    variant: ['primary', 'secondary', 'outline', 'ghost'],
    size: ['sm', 'md', 'lg'],
  },
  input: {
    size: ['sm', 'md', 'lg'],
    type: ['text', 'password', 'email', 'number'],
  },
  card: {
    variant: ['default', 'bordered', 'elevated'],
    padding: ['none', 'sm', 'md', 'lg'],
  },
}

function PropControl({
  componentName,
  name,
  value,
  onChange,
}: {
  componentName: string
  name: string
  value: any
  onChange: (val: any) => void
}) {
  const options = enumOptions[componentName]?.[name]

  if (options) {
    return (
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-[var(--border-color)] text-primary-500 focus:ring-primary-500"
        />
        <span className="text-xs text-[var(--text-secondary)]">
          {value ? 'true' : 'false'}
        </span>
      </label>
    )
  }

  if (typeof value === 'number') {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-2 py-1.5 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
      />
    )
  }

  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-2 py-1.5 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
    />
  )
}

export function InteractiveDemo({ componentName, examples }: InteractiveDemoProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExample = examples[activeIndex]

  const [currentProps, setCurrentProps] = useState<Record<string, any>>(
    () => ({ ...examples[0]?.props })
  )

  if (!activeExample) return null

  const handleExampleChange = (index: number) => {
    setActiveIndex(index)
    setCurrentProps({ ...examples[index].props })
  }

  const handlePropChange = (key: string, value: any) => {
    setCurrentProps((prev) => ({ ...prev, [key]: value }))
  }

  const Component = componentMap[componentName]
  const renderProps = { ...currentProps }

  if (componentName === 'input') {
    renderProps.value = renderProps.value ?? ''
    renderProps.onChange = (val: string) => handlePropChange('value', val)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {examples.map((example, i) => (
          <button
            key={i}
            onClick={() => handleExampleChange(i)}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              i === activeIndex
                ? 'bg-primary-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-xl p-6 border border-[var(--border-color)]">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1">
          {activeExample.title}
        </h3>
        <p className="text-xs text-[var(--text-tertiary)] mb-4">
          {activeExample.description}
        </p>
        <div className="flex items-center justify-center p-6 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-color)] min-h-[100px]">
          {Component
            ? createElement(Component, renderProps)
            : <span className="text-sm text-[var(--text-secondary)]">组件未找到: {componentName}</span>
          }
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border-color)]">
        <h4 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
          Props 控制
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(currentProps).map(([key, value]) => {
            if (key === 'children' || key === 'onChange') return null
            return (
              <div key={key}>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                  {key}
                </label>
                <PropControl
                  componentName={componentName}
                  name={key}
                  value={value}
                  onChange={(val) => handlePropChange(key, val)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
