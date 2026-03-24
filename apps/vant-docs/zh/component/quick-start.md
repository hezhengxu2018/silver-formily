# 快速开始

## 介绍

`@silver-formily/vant` 是基于 Vue3 的 Vant 4.x 封装的formily组件库。Vant的设计上其实没有明确的decorator和component的区分，其核心的布局组件VanField组件既是布局的组件也提供了输入的功能，两者是一体的。`@silver-formily/vant`还是将其做了区分，将其拆分为decorator和component，与官方的 `vant@2.x` 的封装有较大的差别。在其他的部分接口设计上也保留了部分`@silver-formily/element-plus`的影子。

::: warning 注意
`@silver-formily/vant` 的vue绑定库使用的是 `@silver-formily/vue`。除了需要注意使用时 Field、SchemaField等组件也需要从 `@silver-formily/vue` 中引入之外。使用自定义封装组件时也需要注意，默认的绑定行为已经改变，请不要再使用 `value` / `onChange` 的方式绑定自定义组件。详情请参考[官方文档](https://vue.silver-formily.org/)
:::

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
