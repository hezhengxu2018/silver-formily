# @silver-formily/element-plus

[English README](./README.en.md)

## Overview

`@silver-formily/element-plus` 是 Silver Formily 在 Element Plus 生态中的组件绑定层与场景组件集合。它将字段 runtime、schema 协议与 Element Plus 组件契约进行对齐，并提供数组字段、表单布局、弹层表单和预览态等高阶构件。

## Runtime Positioning

该包位于 Vue 渲染层和具体 UI 框架交汇处：

- 以上层 `@silver-formily/vue` 为渲染基础
- 依赖 `@silver-formily/core` 与 `@silver-formily/json-schema` 提供字段语义
- 通过 Element Plus 组件体系输出可直接落地的业务表单构件

## Public Surface

- 基础字段组件：`Input`、`Select`、`Checkbox`、`Radio`、`Switch`、`DatePicker`、`Upload` 等
- 数组字段组件：`ArrayTable`、`ArrayCards`、`ArrayTabs`、`ArrayCollapse`、`ArrayItems`
- 布局与结构组件：`FormItem`、`FormLayout`、`FormGrid`、`FormStep`、`FormTab`
- 场景组件：`FormDialog`、`FormDrawer`、`QueryForm`、`SelectTable`
- 预览态组件：`PreviewText.*`

## Design Characteristics

- 统一 Silver Formily 字段契约与 Element Plus 属性模型
- 面向中后台复杂表单场景
- 提供可复用的数组字段与场景级表单 primitive
- 作为 `@formily/element-plus` 的 Silver Formily 命名空间实现

## Installation

```bash
pnpm add @silver-formily/element-plus @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/grid element-plus vue
```

## Documentation

- Docs: <https://element-plus.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
