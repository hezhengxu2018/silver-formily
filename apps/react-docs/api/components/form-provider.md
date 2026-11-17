---
order: 6
---

# FormProvider

## 描述

入口组件，用于下发表单上下文给字段组件，负责整个表单状态的通讯，它相当于是一个通讯枢纽。

`FormProvider` 在一次挂载期间应持有同一个 form 实例。更换整个 form 时，应重新挂载 `FormProvider` 及其子树，例如使用 `<FormProvider key={form.id} form={form}>`。不要仅替换现有 Provider 的 `form` 属性并复用子树：`useFormEffects` 只在组件挂载时注册，不会随 form 属性变化重新绑定。旧子树卸载时清理订阅，新子树挂载时重新注册。

## 用例

::: tip 表单实例
示例统一在组件外调用 `createForm`，避免在每次渲染时重新创建表单。组件外的实例会被共享；如果需要每个组件拥有独立的表单（或在 SSR 中隔离请求），请在组件内使用 `const [form] = useState(() => createForm())`，也可以使用 `const form = useMemo(() => createForm(), [])`，并从 `react` 导入对应 Hook。优先使用 `useState` 保存实例；`useMemo` 是缓存优化，React 在特定情况下可能丢弃缓存。不要直接在组件函数体中调用 `createForm()`。
:::

:::demo
api/components/form-provider.tsx
:::

## API

| 属性 | 说明                                 | 类型                                                    | 默认值 |
| ---- | ------------------------------------ | ------------------------------------------------------- | ------ |
| form | Form 实例, `createForm` 函数的返回值 | [Form](https://core.silver-formily.org/api/models/Form) | -      |

`form` 必填，`children?: React.ReactNode` 可选。该组件仅提供上下文与生命周期管理，不渲染 HTML `<form>`，也不添加 submit/reset 事件处理；需要表单 UI 时另外使用相应组件。
