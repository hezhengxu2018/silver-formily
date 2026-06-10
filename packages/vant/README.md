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
