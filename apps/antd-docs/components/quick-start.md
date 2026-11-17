# 快速开始

## 安装

```sh
pnpm add @silver-formily/antd @silver-formily/core @silver-formily/react @silver-formily/shared antd@^6.6.5 @ant-design/icons@^6 react@^19 react-dom@^19
```

::: warning 注意
仅支持`antd@^6`，react版本需高于 `react@^18`。
:::

::: tip 提示
文档站全局加载了 `prompts-js`，示例通过 `Prompts.alert` 展示提交结果。复制到自己的项目时，请自行加载该库，或替换为项目中的弹窗组件。
:::

## JSX 字段

::: tip 表单实例
示例统一在组件外调用 `createForm`，避免在每次渲染时重新创建表单。组件外的实例会被共享；如果需要每个组件拥有独立的表单（或在 SSR 中隔离请求），请在组件内使用 `const [form] = useState(() => createForm())`，也可以使用 `const form = useMemo(() => createForm(), [])`，并从 `react` 导入对应 Hook。优先使用 `useState` 保存实例；`useMemo` 是缓存优化，React 在特定情况下可能丢弃缓存。不要直接在组件函数体中调用 `createForm()`。
:::

用 `createForm` 创建稳定的表单实例，`Form` 负责提供上下文、布局和原生提交，字段通过 `FormItem` 展示标签与反馈。

:::demo
form.tsx
:::

## JSON Schema

`createSchemaField` 来自 `@silver-formily/react`。先注册需要使用的组件，再通过 `x-component` 和 `x-decorator` 引用。

:::demo
schema.tsx
:::

已有 `FormProvider` 时也可省略 `Form.form`，让它继承父级表单。表单实例需要替换时，请通过 React `key` 重新挂载整棵表单。
