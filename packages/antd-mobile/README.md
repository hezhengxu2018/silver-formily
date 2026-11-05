# @silver-formily/antd-mobile

[![npm version](https://img.shields.io/npm/v/@silver-formily/antd-mobile)](https://www.npmjs.com/package/@silver-formily/antd-mobile)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/antd-mobile)](https://www.npmjs.com/package/@silver-formily/antd-mobile)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/README.en.md)

`@silver-formily/antd-mobile` 是 Silver Formily 面向 Ant Design Mobile（antd-mobile v5）的移动端组件绑定层。它将字段 runtime、schema 协议与 antd-mobile 的交互组件模型连接起来，用于构建移动端、H5 与触控优先的 React 表单系统。

源码迁移自 formilyjs/antd-mobile（`@formily/antd-mobile`），并将全部 formily 依赖替换为 `@silver-formily/*` fork，日期能力基于 dayjs。

## 安装

```bash
pnpm add \
  @silver-formily/antd-mobile \
  @silver-formily/core \
  @silver-formily/json-schema \
  @silver-formily/path \
  @silver-formily/react \
  @silver-formily/reactive \
  @silver-formily/reactive-react \
  @silver-formily/shared \
  'antd-mobile@^5.43.0' \
  'antd-mobile-icons@^0.3.0' \
  'dayjs@^1' \
  'react@^18 || ^19' \
  'react-dom@^18 || ^19'
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- 基础字段组件：`Input`（含 `Input.TextArea`）、`Checkbox`、`CheckList`、`Switch`、`Stepper`、`Selector`、`Radio`、`Rate`、`Slider`、`Segmented`、`PasscodeInput`
- 选择类组件：`DatePicker`（支持 quarter 精度）、`Cascader`、`CascadePicker`、`Picker`、`CalendarPicker`、`CheckListPicker`
- 结构组件：`Form`、`FormPopup`、`FormLayout`、`FormItem`、`FormGrid`、`FormButtonGroup`、`List`、`Space`
- 数组组件：`ArrayItems`、`ArrayBase` 及其 `Addition` / `Remove` / `MoveUp` / `MoveDown` / `Index` 等 mixin
- 分步表单：`FormStep`（含 `StepPane`、`createFormStep`、`useFormStep`）
- 动作组件：`Submit`、`Reset`
- 预览态组件：`PreviewText.*`

## 快速上手

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

## 定位

该包位于 React 渲染层与移动端 UI 框架之间：

- 依赖 `@silver-formily/react` 提供渲染语义（`connect` / `mapProps` / `mapReadPretty` / `observer`）
- 依赖 `@silver-formily/core`、`@silver-formily/json-schema` 提供字段与 schema 语义
- 通过 antd-mobile v5 组件体系输出移动端表单 primitive

## 使用说明

组件样式和 antd-mobile 自身样式会随组件自动加载，无需额外导入样式文件。

`Picker` 使用 antd-mobile 声明式 `Picker`，支持打开期间刷新数据源且不自动写回字段，由 Formily 管理字段值，点击 FormItem 整行打开并联动右侧箭头。

`FormPopup` 的 `forOpen` 异步中间件执行超过 100ms 时自动显示 Loading，可通过 `loadingText` 自定义文案；完成、失败或等待期间关闭弹层时自动清理。

- 函数组件不使用 `defaultProps`（React 19 已移除支持）。
- 维护约定见[包指南](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/antd-mobile/AGENTS.md)。

## createPopup

`createPopup` 是独立的函数式弹层工厂，不依赖 Formily 上下文：

```tsx
const popup = createPopup(ThemeContent, { closeOnMaskClick: true })
const result = await popup.prompt({ defaultValue: currentTheme })
if (result !== null)
  setTheme(result)
popup.close()
```

内容组件通过 `PopupContentCallbacks<TResult>` 声明 `onConfirm(value)` 和 `onCancel()`。
确认返回结果，取消或主动关闭返回 `null`；同一工厂的活动会话复用同一个 Promise。
关闭动画结束后自动卸载内容和挂载节点。独立 React root 不会继承调用位置的 Context。

## 文档

- [使用指南](https://antd-mobile.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/antd-mobile)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
