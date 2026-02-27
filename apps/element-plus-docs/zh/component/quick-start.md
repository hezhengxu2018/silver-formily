# 快速开始

## 介绍

`@silver-formily/element-plus` 是基于 `@formily/element-plus` 重新封装的组件库，提供了一套开箱即用的表单解决方案。在原来的基础上，我们还做了一大量的重构及优化，使得组件更加易用、灵活。

::: warning 注意
从 2.x 版本起，组件库的vue绑定库从 `@formily/vue` 迁移至 `@silver-formily/vue`。除了需要注意使用时 Field、SchemaField等组件也需要从 @silver-formily/vue 中引入之外。使用自定义封装组件时也需要注意，默认的绑定行为已经改变，请不要再使用 `value` / `onChange` 的方式绑定自定义组件。详情请参考[官方文档](https://vue.silver-formily.org/)
:::

## 安装

出于灵活组合的考虑，`@silver-formily/element-plus` 的所有依赖都采用了peerDependencies，不再有项目中的`element-plus`与 `@formily/element-plus` 使用的 `element-plus` 的版本不一致导致的渲染效果不一致的问题。

从npm 7版本开始，默认会自动安装 peerDependencies，无需手动安装。如果使用的是pnpm可能需要通过配置开启自动安装peerDependencies的配置项，不然会报错。
::: code-group

```shell [pnpm]
pnpm config set auto-install-peers true
pnpm install @silver-formily/element-plus
```

```shell [npm]
npm install --save @silver-formily/element-plus
```

:::

::: warning 注意

`@silver-formily/element-plus` 目前仅提供了esm格式的导出，没有提供cjs和umd格式的导出。

:::

## 响应式数据

:::demo

overview/index

:::
