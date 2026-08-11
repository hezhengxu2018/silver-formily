# 快速开始

## 介绍

`@silver-formily/vant` 是基于 Vue 3 的 Vant 4.x Formily 组件库。Vant 本身并没有明确区分 decorator 和 component，像 `Field` 这样组件同时承担了表单项布局和输入能力。`@silver-formily/vant` 将这两层职责拆成了 `FormItem + Input` 这样的组合，以保持 Formily 更常见的 `decorator + component` 心智；视觉和属性命名会尽量参考 Vant，但并不等同于直接渲染官方 `Field` 组件。

::: warning 注意
`@silver-formily/vant` 的vue绑定库使用的是 `@silver-formily/vue`。除了需要注意使用时 Field、SchemaField等组件也需要从 `@silver-formily/vue` 中引入之外。使用自定义封装组件时也需要注意，默认的绑定行为已经改变，请不要再使用 `value` / `onChange` 的方式绑定自定义组件。详情请参考[官方文档](https://vue.silver-formily.org/)
:::

## TypeScript 类型

Vant 封装组件统一导出公开 Props 类型。`FooProps` 表示组件可以接收的属性、事件和
`v-model` 更新事件；如果需要组件构造类型，请使用对应的 `FooComponent`：

```ts
import type { InputComponent, InputProps } from '@silver-formily/vant'
import { Input } from '@silver-formily/vant'

const inputComponent: InputComponent = Input
const inputProps: InputProps = {
  type: 'text',
  formatter: value => value.trim(),
}
```

通过 `connect` 创建自定义包装组件时，可以使用第二个类型参数声明公开 Props。
该调整只影响 TypeScript 类型推导，不改变 attrs、事件和插槽的运行时转发行为。

## 安装

出于灵活组合的考虑，`@silver-formily/vant` 的大部分依赖都采用了peerDependencies，从npm 7版本开始，默认会自动安装 peerDependencies，无需手动安装。如果使用的是pnpm可能需要通过配置开启自动安装peerDependencies的配置项，不然会报错。
::: code-group

```shell [pnpm]
pnpm config set auto-install-peers true
pnpm install @silver-formily/vant
```

```shell [npm]
npm install --save @silver-formily/vant
```

:::

::: tip 提示

`@silver-formily/vant` 目前仅提供了esm格式的导出，没有提供cjs和umd格式的导出。如果你已经在使用Vue3了应该也不需要cjs了。

:::
