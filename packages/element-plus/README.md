# @silver-formily/element-plus

[![npm version](https://img.shields.io/npm/v/@silver-formily/element-plus)](https://www.npmjs.com/package/@silver-formily/element-plus)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/element-plus)](https://www.npmjs.com/package/@silver-formily/element-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/element-plus/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/element-plus/README.en.md)

`@silver-formily/element-plus` 是 Silver Formily 在 Element Plus 生态中的组件绑定层与场景组件集合。它将字段 runtime、schema 协议与 Element Plus 组件契约进行对齐，并提供数组字段、表单布局、弹层表单和预览态等高阶构件。

## 安装

```bash
pnpm add \
  @silver-formily/element-plus \
  @silver-formily/core \
  @silver-formily/grid \
  @silver-formily/json-schema \
  @silver-formily/reactive \
  @silver-formily/reactive-vue \
  @silver-formily/shared \
  @silver-formily/vue \
  @vueuse/core \
  'element-plus@^2.11.0' \
  'vue@^3.3.0'
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- 基础字段组件：`Input`、`Select`、`Checkbox`、`Radio`、`Switch`、`DatePicker`、`Upload` 等
- 数组字段组件：`ArrayTable`、`ArrayCards`、`ArrayTabs`、`ArrayCollapse`、`ArrayItems`
- 布局与结构组件：`FormItem`、`FormLayout`、`FormGrid`、`FormStep`、`FormTab`
- 场景组件：`FormDialog`、`FormDrawer`、`QueryForm`、`SelectTable`
- 预览态组件：`PreviewText.*`

## 定位

该包位于 Vue 渲染层和具体 UI 框架交汇处：

- 以上层 `@silver-formily/vue` 为渲染基础
- 依赖 `@silver-formily/core` 与 `@silver-formily/json-schema` 提供字段语义
- 通过 Element Plus 组件体系输出可直接落地的业务表单构件

## TypeScript 类型

组件 Props 采用统一的公开类型声明。`FooProps` 表示组件可接收的 Props，包含
Element Plus 的上游 Props、事件和 `v-model` 更新事件，以及 Silver Formily 的扩展属性：

```ts
import type { InputComponent, InputProps, SelectProps } from '@silver-formily/element-plus'
import { Input } from '@silver-formily/element-plus'

const inputComponent: InputComponent = Input
const inputProps: InputProps = { placeholder: '请输入内容' }
const selectProps: SelectProps = {
  options: [{ label: '选项一', value: 'one' }],
}
```

如果需要组件构造类型，请使用 `FooComponent`；旧的 `IFooProps` 名称暂时保留为
deprecated 兼容别名。通过 `connect` 创建包装组件时，可以使用第二个类型参数声明
包装组件的公开 Props，运行时 attrs、事件和插槽转发行为不变。

## 设计特点

- 统一 Silver Formily 字段契约与 Element Plus 属性模型
- 面向中后台复杂表单场景
- 提供可复用的数组字段与场景级表单 primitive
- 作为 `@formily/element-plus` 的 Silver Formily 命名空间实现

## 选择组件对象值

九个选择组件统一支持 `optionAsValue` 和 `optionValueKeys`。后者严格筛选输出属性，不修改数据源；使用者须保留回显标识。Tree 的 `optionFormatter` 已移除，请迁移到 `optionValueKeys`。Tree 路径模式不应用筛选。

## 文档

- [使用指南](https://element-plus.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/element-plus)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
