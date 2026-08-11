# @silver-formily/vue

[English README](./README.en.md)

## Overview

`@silver-formily/vue` 是 Silver Formily 面向 Vue 3 的表单渲染层。它将核心 runtime、schema 协议与 Vue 组件系统连接起来，暴露字段组件、schema 渲染组件、组合式 API 与组件适配工具。

## Runtime Positioning

该包处于运行时与 UI 组件库之间：

- 依赖 `@silver-formily/core` 提供表单与字段语义
- 依赖 `@silver-formily/reactive-vue` 适配 Vue 生命周期
- 作为 `@silver-formily/element-plus` 与 `@silver-formily/vant` 的上游渲染层

## Public Surface

- 字段组件：`Field`、`ArrayField`、`ObjectField`、`VoidField`
- 表单上下文组件：`FormProvider`、`FormConsumer`
- schema 组件：`SchemaField`、`RecursionField`、`ReactiveField`、`ExpressionScope`
- composables：`useForm`、`useField`、`useFieldSchema`、`useFormEffects`
- adapter helpers：`connect`、`mapProps`

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

## Design Characteristics

- 纯 Vue 3 运行时路径
- 对齐 `modelValue` / `onUpdate:modelValue` 契约
- 面向 schema-driven forms 和组件级字段建模
- 作为 `@formily/vue` 的 Silver Formily 命名空间替代实现

## Installation

```bash
pnpm add @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/validator vue
```

## Related Packages

- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- Docs: <https://vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
