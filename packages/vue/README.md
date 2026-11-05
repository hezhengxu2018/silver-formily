# @silver-formily/vue

[![npm version](https://img.shields.io/npm/v/@silver-formily/vue)](https://www.npmjs.com/package/@silver-formily/vue)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/vue)](https://www.npmjs.com/package/@silver-formily/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vue/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vue/README.en.md)

`@silver-formily/vue` 是 Silver Formily 面向 Vue 3 的表单渲染层。它将核心 runtime、schema 协议与 Vue 组件系统连接起来，暴露字段组件、schema 渲染组件、组合式 API 与组件适配工具。

## 安装

```bash
pnpm add \
  @silver-formily/vue \
  @silver-formily/core \
  @silver-formily/json-schema \
  @silver-formily/path \
  @silver-formily/reactive \
  @silver-formily/reactive-vue \
  @silver-formily/shared \
  @silver-formily/validator \
  'vue@^3.3.0'
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- 字段组件：`Field`、`ArrayField`、`ObjectField`、`VoidField`
- 表单上下文组件：`FormProvider`、`FormConsumer`
- schema 组件：`SchemaField`、`RecursionField`、`ReactiveField`、`ExpressionScope`
- composables：`useForm`、`useField`、`useFieldSchema`、`useFormEffects`
- adapter helpers：`connect`、`mapProps`

## 定位

该包处于运行时与 UI 组件库之间：

- 依赖 `@silver-formily/core` 提供表单与字段语义
- 依赖 `@silver-formily/reactive-vue` 适配 Vue 生命周期
- 作为 `@silver-formily/element-plus` 与 `@silver-formily/vant` 的上游渲染层

## 组件类型

`connect` 会保留被包装组件的公开 Props、插槽和实例类型。可以使用
`VueComponentProps<T>` 从 Vue 组件中提取消费者可使用的 Props；当包装组件需要
补充或覆盖公开 Props 时，通过 `connect` 的第二个类型参数声明：

```ts
import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

type InputProps = VueComponentProps<typeof ElInput>

const ConnectedInput = connect<typeof ElInput, InputProps>(
  ElInput,
  mapProps({ readOnly: 'readonly' }),
)
```

该类型调整只影响 TypeScript 的公开类型推导，不改变 `connect`、`mapProps` 的
运行时行为或 attrs 转发逻辑。

## 设计特点

- 纯 Vue 3 运行时路径
- 对齐 `modelValue` / `onUpdate:modelValue` 契约
- 面向 schema-driven forms 和组件级字段建模
- 作为 `@formily/vue` 的 Silver Formily 命名空间替代实现

## 相关包

- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## 文档

- [使用指南](https://vue.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/vue)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
