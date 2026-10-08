# @silver-formily/react

[English README](./README.en.md)

## 概述

`@silver-formily/react` 是 Silver Formily 面向 React 18/19 的表单渲染层，迁移自 `@formily/react@2.3.7`。它在 `@silver-formily/core` 的表单领域模型之上提供字段组件、JSON Schema 渲染与组件接入（`connect`）能力。

## 运行时定位

该包位于表单内核与业务组件之间：

- 以下层 `@silver-formily/core` / `@silver-formily/json-schema` 为表单模型与 Schema 描述
- 通过 `@silver-formily/reactive-react` 的 `observer` 接入细粒度响应式更新
- 对上提供 React 组件与 hooks，可直接对接任意组件库

## 公开 API

- 组件：`FormProvider`、`FormConsumer`、`Field`、`ArrayField`、`ObjectField`、`VoidField`、`RecursionField`、`createSchemaField`（含 `SchemaField.String/Object/Array/...` 标记语法）、`ExpressionScope`、`RecordScope`、`RecordsScope`
- Hooks：`useForm`、`useField`、`useFieldSchema`、`useFormEffects`、`useParentForm`、`useExpressionScope`
- 共享能力：`connect`、`mapProps`、`mapReadPretty`、`observer` / `Observer` 再导出，以及 `FormContext` 等 7 个 Context
- 再导出 `@silver-formily/json-schema` 全量导出（`Schema`、`ISchema` 等）
- 类型：`IFieldProps`、`ISchemaFieldProps`、`IComponentMapper`、`IStateMapper`、`JSXComponent` 等

## 与上游 @formily/react 的差异

- 内部依赖全部替换为 `@silver-formily/*`，`FormPath` 从 `@silver-formily/path` 引入
- `useAttach` / `useFormEffects` 使用 `@silver-formily/reactive-react` 去掉 `unstable_` 前缀的 `useCompatEffect` / `useCompatFactory`
- peer 依赖为 `react` / `react-dom` `^18 || ^19`，移除了 `react-is`
- `shared/render.ts` 直接从 `react-dom` 顶层引入 `createPortal`，移除 `globalThisPolyfill` 与 `require` 动态兜底
- 不再发布 `global.d.ts` 的 `Formily.React` 全局命名空间（无 UMD 产物）
- 仅发布 ESM 产物（`dist/index.mjs` + `dist/index.d.ts`）

## 安装

```bash
pnpm add @silver-formily/react @silver-formily/core react react-dom
```

## 快速上手

```tsx
import { createForm } from '@silver-formily/core'
import { connect, Field, FormProvider, mapProps } from '@silver-formily/react'

const form = createForm()

const Input = connect(
  props => <input {...props} />,
  mapProps({ value: true, onChange: true }),
)

export default () => (
  <FormProvider form={form}>
    <Field name="name" component={[Input]} />
  </FormProvider>
)
```

## 文档

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
