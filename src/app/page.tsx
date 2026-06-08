'use client'

import Link from 'next/link'
import { Code2, Play, Palette, ArrowRight } from 'lucide-react'
import { componentsConfig } from '@/data/components'

const features = [
  {
    icon: Code2,
    title: '自动 Props 提取',
    desc: '从 TypeScript 源码自动解析组件 Props 定义',
  },
  {
    icon: Play,
    title: '交互式演示',
    desc: '实时修改 Props 值，即时预览组件效果',
  },
  {
    icon: Palette,
    title: '主题定制',
    desc: '自定义主色调、字体、圆角等主题配置',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 px-8 py-16 text-white mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--primary-300)_0%,_transparent_60%)] opacity-20" />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-tight mb-3">DocGen</h1>
          <p className="text-2xl font-light text-primary-100 mb-4">组件库自动文档站点生成工具</p>
          <p className="text-primary-200 max-w-xl leading-relaxed">
            从 TypeScript 源码自动提取组件 Props，生成交互式文档和代码示例，支持主题定制与实时预览。
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href={`/components/${componentsConfig[0].category}/${componentsConfig[0].name}`}
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-5 py-2.5 rounded-lg font-medium hover:bg-primary-50 transition"
            >
              开始浏览 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/theme"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-white/10 transition"
            >
              主题配置
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">核心特性</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-color)] hover:shadow-lg transition"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">快速开始</h2>
        <div className="bg-[var(--code-bg)] rounded-xl p-6 border border-[var(--border-color)]">
          <pre className="text-sm font-mono overflow-x-auto">
            <code>
              <span className="text-[var(--text-tertiary)]">{'# 安装依赖\n'}</span>
              <span className="text-primary-400">npm </span>
              <span className="text-[var(--text-secondary)]">install docgen\n\n</span>
              <span className="text-[var(--text-tertiary)]">{'# 启动开发服务器\n'}</span>
              <span className="text-primary-400">npx </span>
              <span className="text-[var(--text-secondary)]">docgen dev</span>
            </code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">组件列表</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentsConfig.map((component) => (
            <Link
              key={component.name}
              href={`/components/${component.category}/${component.name}`}
              className="block bg-[var(--bg-primary)] rounded-xl p-5 border border-[var(--border-color)] hover:shadow-lg hover:border-primary-300 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-primary-600 transition">
                  {component.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-primary-500 transition" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{component.description}</p>
              <span className="inline-block mt-3 text-xs text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full px-2.5 py-0.5">
                {component.category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
