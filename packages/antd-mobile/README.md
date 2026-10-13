# @silver-formily/antd-mobile

## Overview

`@silver-formily/antd-mobile` 是 Silver Formily 面向 Ant Design Mobile（antd-mobile v5）的移动端组件绑定层。它将字段 runtime、schema 协议与 antd-mobile 的交互组件模型连接起来，用于构建移动端、H5 与触控优先的 React 表单系统。

源码迁移自 formilyjs/antd-mobile（`@formily/antd-mobile`），并将全部 formily 依赖替换为 `@silver-formily/*` fork，日期能力基于 dayjs。

## Runtime Positioning

该包位于 React 渲染层与移动端 UI 框架之间：

- 依赖 `@silver-formily/react` 提供渲染语义（`connect` / `mapProps` / `mapReadPretty` / `observer`）
- 依赖 `@silver-formily/core`、`@silver-formily/json-schema` 提供字段与 schema 语义
- 通过 antd-mobile v5 组件体系输出移动端表单 primitive

## Public Surface

- 基础字段组件：`Input`（含 `Input.TextArea`）、`Checkbox`、`CheckList`、`Switch`、`Stepper`、`Selector`
- 选择类组件：`DatePicker`（支持 quarter 精度）、`Cascader`、`CascadePicker`
- 结构组件：`FormLayout`、`FormItem`、`FormGrid`、`FormButtonGroup`、`List`、`Space`
- 数组组件：`ArrayBase` 及其 `Addition` / `Remove` / `Copy` / `MoveUp` / `MoveDown` / `Index` 等 mixin
- 动作组件：`Submit`、`Reset`
- 预览态组件：`PreviewText.*`

## 安装

```bash
pnpm add @silver-formily/antd-mobile antd-mobile antd-mobile-icons dayjs
```

样式随组件自动注入（less 覆盖样式构建进产物）；antd-mobile 自身样式通过各组件的 `style` 子路径透传，按需引入：

```ts
import { FormItem, Input } from '@silver-formily/antd-mobile'
// 如需按需引入样式：
import '@silver-formily/antd-mobile/esm/input/style'
```

## 基本用法

```tsx
import { FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

export default () => (
  <FormProvider form={form}>
    <FormLayout>
      <Field name="username" title="用户名" required component={[Input]} decorator={[FormItem]} />
      <Submit onSubmit={console.log}>提交</Submit>
    </FormLayout>
  </FormProvider>
)
```

## 维护说明

- 函数组件不使用 `defaultProps`（React 19 已移除支持）。
- `ArrayBase.SortHandle` 仅为图标占位，不提供拖拽排序。
- 详细约定见本包 `AGENTS.md`。
