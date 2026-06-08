export interface ExampleConfig {
  title: string
  description: string
  code: string
  props: Record<string, any>
}

export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export interface ComponentConfig {
  name: string
  category: string
  title: string
  description: string
  sourcePath: string
  docPath?: string
  examples: ExampleConfig[]
  changelog: ChangelogEntry[]
}

export const componentsConfig: ComponentConfig[] = [
  {
    name: "button",
    category: "通用",
    title: "Button 按钮",
    description: "用于触发一个即时操作，支持多种变体、尺寸和状态。",
    sourcePath: "components/Button/Button.tsx",
    docPath: "src/docs/button.mdx",
    examples: [
      {
        title: "基础用法",
        description: "最基础的按钮用法，使用 variant 属性设置按钮类型。",
        code: `<Button variant="primary">点击我</Button>`,
        props: { variant: "primary", size: "md", disabled: false, loading: false, fullWidth: false, children: "点击我" },
      },
      {
        title: "不同尺寸",
        description: "通过 size 属性设置按钮尺寸，支持 small、medium、large 三种大小。",
        code: `<Button variant="primary" size="small">小按钮</Button>
<Button variant="primary" size="medium">中等按钮</Button>
<Button variant="primary" size="large">大按钮</Button>`,
        props: { variant: "primary", size: "lg", disabled: false, loading: false, fullWidth: false, children: "大按钮" },
      },
      {
        title: "加载状态",
        description: "通过 loading 属性使按钮处于加载状态，加载状态下按钮不可点击。",
        code: `<Button loading>提交中</Button>`,
        props: { variant: "primary", size: "md", disabled: false, loading: true, fullWidth: false, children: "提交中" },
      },
    ],
    changelog: [
      {
        version: "1.2.0",
        date: "2024-12-01",
        changes: ["新增 loading 属性，支持加载状态"],
      },
      {
        version: "1.1.0",
        date: "2024-10-15",
        changes: ["新增 ghost 变体样式"],
      },
      {
        version: "1.0.0",
        date: "2024-08-01",
        changes: ["初始发布"],
      },
    ],
  },
  {
    name: "input",
    category: "表单",
    title: "Input 输入框",
    description: "用于接收用户文本输入，支持标签、错误提示和多种尺寸。",
    sourcePath: "components/Input/Input.tsx",
    docPath: "src/docs/input.mdx",
    examples: [
      {
        title: "基础用法",
        description: "最基础的输入框用法，通过 placeholder 设置占位文本。",
        code: `<Input placeholder="请输入内容" />`,
        props: { value: "", placeholder: "请输入内容", label: "", error: "", disabled: false, size: "md", type: "text" },
      },
      {
        title: "带标签",
        description: "通过 label 属性为输入框添加标签说明。",
        code: `<Input label="用户名" placeholder="请输入用户名" />`,
        props: { value: "", placeholder: "请输入用户名", label: "用户名", error: "", disabled: false, size: "md", type: "text" },
      },
      {
        title: "错误状态",
        description: "通过 error 属性设置错误提示信息，输入框将显示错误边框和提示文本。",
        code: `<Input label="邮箱" error="请输入有效的邮箱地址" placeholder="example@mail.com" />`,
        props: { value: "", placeholder: "example@mail.com", label: "邮箱", error: "请输入有效的邮箱地址", disabled: false, size: "md", type: "text" },
      },
    ],
    changelog: [
      {
        version: "1.1.0",
        date: "2024-11-20",
        changes: ["新增 number 类型输入支持"],
      },
      {
        version: "1.0.0",
        date: "2024-08-01",
        changes: ["初始发布"],
      },
    ],
  },
  {
    name: "card",
    category: "展示",
    title: "Card 卡片",
    description: "用于展示信息内容，支持多种变体和交互效果。",
    sourcePath: "components/Card/Card.tsx",
    docPath: "src/docs/card.mdx",
    examples: [
      {
        title: "基础卡片",
        description: "最基础的卡片用法，包含标题和描述内容。",
        code: `<Card title="项目介绍">
  这是一个用于构建现代界面的组件库，提供丰富的交互组件。
</Card>`,
        props: { title: "项目介绍", description: "这是一个现代组件库", variant: "default", padding: "md", hoverable: false, children: "这是一个用于构建现代界面的组件库，提供丰富的交互组件。" },
      },
      {
        title: "带图片",
        description: "通过 cover 属性为卡片添加封面图片。",
        code: `<Card
  title="风景摄影"
  cover="https://example.com/photo.jpg"
>
  记录旅途中的美好瞬间。
</Card>`,
        props: { title: "风景摄影", description: "记录旅途中的美好瞬间", imageUrl: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=landscape+photography+mountains&image_size=landscape_4_3", variant: "default", padding: "md", hoverable: false },
      },
      {
        title: "悬停效果",
        description: "通过 hoverable 属性使卡片在鼠标悬停时展示提升效果。",
        code: `<Card hoverable title="可点击卡片">
  鼠标悬停时卡片会浮起，适合用于可交互的内容展示。
</Card>`,
        props: { title: "可点击卡片", description: "鼠标悬停时卡片会浮起", variant: "bordered", padding: "md", hoverable: true, children: "鼠标悬停时卡片会浮起，适合用于可交互的内容展示。" },
      },
    ],
    changelog: [
      {
        version: "1.0.0",
        date: "2024-09-01",
        changes: ["初始发布"],
      },
    ],
  },
]

export function getComponentByCategory(): Record<string, ComponentConfig[]> {
  return componentsConfig.reduce<Record<string, ComponentConfig[]>>((acc, component) => {
    const { category } = component
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(component)
    return acc
  }, {})
}

export function getComponentByName(name: string): ComponentConfig | undefined {
  return componentsConfig.find((component) => component.name === name)
}

export function getAllSearchableText(): { title: string; text: string; path: string }[] {
  return componentsConfig.map((component) => ({
    title: component.title,
    text: [component.description, ...component.examples.map((e) => `${e.title} ${e.description}`)].join(" "),
    path: `/components/${component.category}/${component.name}`,
  }))
}
