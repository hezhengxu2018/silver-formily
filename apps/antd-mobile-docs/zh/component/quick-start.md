# 快速开始

`@silver-formily/antd-mobile` 是 Silver Formily 面向 [Ant Design Mobile](https://mobile.ant.design/)（antd-mobile v5）的移动端组件绑定层，用于构建移动端、H5 与触控优先的 React 表单系统。

::: tip 提示
由于 antd-mobile 本身就内置了一套轻量的表单管理，0基础使用本封装的意义并不大。主要面向已经习惯了formily封装写法的用户。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

```bash [npm]
npm install @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

```bash [yarn]
yarn add @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

:::

组件样式和 antd-mobile 自身样式会随组件自动加载，无需额外导入样式文件。

## 基础用法

::: tip 表单实例
示例统一在组件外调用 `createForm`，避免在每次渲染时重新创建表单。组件外的实例会被共享；如果需要每个组件拥有独立的表单（或在 SSR 中隔离请求），请在组件内使用 `const [form] = useState(() => createForm())`，也可以使用 `const form = useMemo(() => createForm(), [])`，并从 `react` 导入对应 Hook。优先使用 `useState` 保存实例；`useMemo` 是缓存优化，React 在特定情况下可能丢弃缓存。不要直接在组件函数体中调用 `createForm()`。
:::

与其他 formily 封装类似，使用 `createForm` 创建表单实例，`FormProvider` 注入上下文，`Field` 声明字段：`decorator` 指定 `FormItem`，`component` 指定交互组件。

<<< @/zh/demos/quick-start/basic.tsx
