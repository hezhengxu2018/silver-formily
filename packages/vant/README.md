# @silver-formily/vant

[English README](./README.en.md)

## Overview

`@silver-formily/vant` 是 Silver Formily 面向 Vant 的移动端组件绑定层。它将字段 runtime、schema 协议与 Vant 的交互组件模型连接起来，用于构建移动端、H5 与触控优先的表单系统。

## Runtime Positioning

该包位于 Vue 渲染层与移动端 UI 框架之间：

- 依赖 `@silver-formily/vue` 提供渲染语义
- 依赖 `@silver-formily/core`、`@silver-formily/json-schema` 提供字段与 schema 语义
- 通过 Vant 组件体系输出移动端表单 primitive

## Public Surface

- 基础字段组件：`Input`、`Checkbox`、`Radio`、`Switch`、`Stepper`、`Slider`、`Signature`
- 选择类组件：`Picker`、`PickerGroup`、`DatePicker`、`TimePicker`、`Area`、`TreeSelect`
- 结构组件：`FormItem`、`Form`、`FormStep`、`FormPopup`、`FormButtonGroup`
- 动作组件：`Submit`、`Reset`
- 预览态组件：`PreviewText.*`

## TypeScript 类型

组件 Props 统一按公开组件接口声明。`FooProps` 表示消费者可以传入的属性、事件和
`v-model` 更新事件；需要组件构造类型时使用对应的 `FooComponent`：

```ts
import type { InputComponent, InputProps } from '@silver-formily/vant'
import { Input } from '@silver-formily/vant'

const inputComponent: InputComponent = Input
const inputProps: InputProps = {
  type: 'text',
  formatter: value => value.trim(),
}
```

通过 `connect` 创建自定义包装组件时，可以使用第二个类型参数声明其公开 Props。
此次调整只影响 TypeScript 类型推导，不改变 attrs、事件和插槽的运行时转发行为。

## Design Characteristics

- 面向移动端录入场景与触控交互
- 适合步骤表单、弹层表单和滚轮选择器工作流
- 作为 `@formily/*` 移动端绑定体系的 Silver Formily 替代实现

## Installation

```bash
pnpm add @silver-formily/vant @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared vant vue dayjs
```

## Documentation

- Docs: <https://vant.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
