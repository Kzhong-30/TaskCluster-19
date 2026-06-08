## 1. 架构设计

```mermaid
flowchart TB
    "组件源码 (TSX)" --> "react-docgen-typescript"
    "react-docgen-typescript" --> "Props JSON 数据"
    "MDX 文档文件" --> "Next.js MDX 编译"
    "组件配置文件" --> "文档站点"
    "Props JSON 数据" --> "文档站点"
    "Next.js MDX 编译" --> "文档站点"
    "文档站点" --> "侧边栏导航"
    "文档站点" --> "组件文档页"
    "文档站点" --> "搜索功能"
    "文档站点" --> "主题系统"
```

## 2. 技术说明

- 前端框架：Next.js 14 (App Router) + TypeScript
- MDX 支持：@next/mdx + next-mdx-remote
- Props 解析：react-docgen-typescript
- 样式方案：Tailwind CSS + CSS 变量（主题）
- 状态管理：Zustand（主题配置）
- 图标：lucide-react
- 代码高亮：prism-react-renderer
- 初始化工具：create-next-app

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| / | 文档首页 |
| /components/[category]/[name] | 组件文档页 |
| /theme | 主题配置页 |

## 4. 数据模型

### 4.1 组件配置定义

```typescript
interface ComponentConfig {
  name: string
  category: string
  title: string
  description: string
  sourcePath: string
  examples: ExampleConfig[]
  changelog: ChangelogEntry[]
}

interface ExampleConfig {
  title: string
  description: string
  code: string
  props: Record<string, any>
}

interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}
```

### 4.2 主题配置定义

```typescript
interface ThemeConfig {
  primaryColor: string
  fontFamily: string
  borderRadius: number
}
```

## 5. 目录结构

```
/components/           # 示例组件源码
  /Button/
  /Input/
  /Card/
/src/
  /app/               # Next.js App Router 页面
  /components/        # 文档站 UI 组件
  /lib/               # 工具函数
    docgen.ts         # react-docgen-typescript 封装
    theme.ts          # 主题配置
  /data/              # 组件配置数据
  /store/             # Zustand 状态
```
