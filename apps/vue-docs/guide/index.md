# 介绍

`@silver-formily/vue` 是对官方的 `@formily/vue` 的一次重新封装，主要为了解决官方依赖中由于需要兼容 Vue2 所引入的 `vue-demi` `vue-frag`等依赖。同时也消除了兼容 Vue2 渲染时产生的额外的 template 标签和使用`display: content`样式包裹的div标签。`display: content`并不能解决所有的样式问题。精简后的代码当然也具有更好的可读性，易于维护。

详细的指南请参考官方文档，若精力允许会考虑重写指南。接口部分除了 [**重大改动**](#重大改动) 之外也几乎未做改动，本文档仅提供更好的阅读体验。

## 新特性

从`2.2.0` 开始，`@silver-formily/vue` 提供了对 decorator 插槽的支持，这不是官方的支持，因此只提供渲染的出口，没有办法使用 `@formily/core` 来改变插槽的内容，也不会被 formily 的响应式影响，具体的使用方式可以参考 FAQ 中的[相应章节](/questions/#如何向装饰器传递插槽)

## 重大改动

- `@formily/vue` 对入参和事件的映射是 `value` / `onChange` 这样的设计对 react 默认行为的对齐。现在通过 Vue3 重构后入参的事件改为了 `modelValue` / `onUpdate:modelValue` 触发。对于大部分Vue3的组件库中的大部分组件，无需额外的封装即可满足最基础的使用。

::: tip 提示
如果你还没有做好升级的准备，可以使用 `@silver-formily/vue` 的 1.x 版本。这是一个与 `@formily/vue` 的 API 完全对齐的版本。
:::

- `@silver-formily/vue` 移除了对 Schema 的导出，请从 `@formily/json-schema` 导入。
