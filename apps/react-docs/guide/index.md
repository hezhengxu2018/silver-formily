# 介绍

`@silver-formily/react` 来自对官方 `@formily/react` 的迁移与重构，是 Silver Formily 体系在 React 侧的表单渲染层：字段组件、Schema 渲染、`connect` 接入工具都由本包提供，表单模型、校验与响应式能力则分别来自 `@silver-formily/core`、`@silver-formily/validator` 与 `@silver-formily/reactive`。

本指南默认使用 `@silver-formily/*` 命名空间。如果你还在维护 `@formily/*` 的旧工程，请将这些包名视为迁移前的历史背景，而不是当前推荐写法。

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/react @silver-formily/core react react-dom
```

```bash [npm]
npm install @silver-formily/react @silver-formily/core react react-dom
```

:::

## 快速上手

```tsx
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default function App() {
  return (
    <FormProvider form={form}>
      <Field name="input" component={[Input]} />
    </FormProvider>
  )
}

function Input(props: { value?: string, onChange?: (value: string) => void }) {
  return (
    <input
      value={props.value ?? ''}
      onChange={(event) => {
        props.onChange?.(event.target.value)
      }}
    />
  )
}
```

只要组件消费 `value` / `onChange` 这对受控属性，就可以直接作为 `component` 传入 Field，无需额外封装。

## 重大改动

- `@silver-formily/react` 仅兼容 `react` / `react-dom` `^18 || ^19`，且只发布 ESM 产物。
- 底层响应式依赖切换为 `@silver-formily/reactive` + `@silver-formily/reactive-react`，`observer` 从 `@silver-formily/reactive-react` re-export，API 与官方一致。
- `createSchemaField` 现在只返回一个 `SchemaField` 组件，Markup 子组件以静态属性的形式挂载：`SchemaField.Markup`、`SchemaField.String`、`SchemaField.Object` 等，不再返回独立的 `SchemaMarkupField` / `SchemaStringField` 组件。
- 字段挂载与副作用订阅（`useFormEffects` 等）基于 `useCompatEffect` / `useCompatFactory` 实现，在 StrictMode / ConcurrentMode 下 effect 重放不会误触发 `onMount` / `onUnmount`，也不会残留重复实例。
- `@silver-formily/react` 不导出 `Schema`。`Schema`、`ISchema`、`x-reactions`、`x-component-props` 等协议请从 `@silver-formily/json-schema` 导入，完整文档查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。

::: tip 提示
详细的基础概念（表单模型、字段生命周期、联动协议等）仍可参考官方文档；当前文档聚焦于 Silver Formily 这一分支的用法、差异点与迁移信息。
:::
