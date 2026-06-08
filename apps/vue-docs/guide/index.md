# 介绍

`@silver-formily/vue` 最初来自对官方 `@formily/vue` 的一次 Vue 3 重构，目的是移除为了兼容 Vue 2 而引入的 `vue-demi`、`vue-frag` 等历史包袱，并清理兼容层带来的额外 DOM 包裹。这样既能得到更干净的渲染结构，也让源码更容易维护。

从 `3.x` 开始，`@silver-formily/vue` 及其配套文档、demo、安装说明、依赖命名已经完全迁移到 Silver Formily 命名空间。也就是说，本指南默认使用 `@silver-formily/core`、`@silver-formily/json-schema`、`@silver-formily/reactive`、`@silver-formily/shared` 等包名，不再以 `@formily/*` 作为主线写法。

详细的基础概念仍可参考官方文档；当前文档更聚焦于 Silver Formily 这一分支的使用方式、差异点与迁移信息。

## 新特性

从 `2.2.0` 开始，`@silver-formily/vue` 提供了对 decorator 插槽的支持。这一能力并不来自上游，因此只暴露渲染出口，不能通过 `@silver-formily/core` 的字段协议反向改写插槽内容，也不会参与 Formily 的响应式链路。具体用法可以参考 FAQ 中的[相应章节](/questions/#如何向装饰器传递插槽)。

## 重大改动

- `@formily/vue` 对入参和事件的映射是 `value` / `onChange` 这样的设计对 react 默认行为的对齐。现在通过 Vue3 重构后入参的事件改为了 `modelValue` / `onUpdate:modelValue` 触发。对于大部分Vue3的组件库中的大部分组件，无需额外的封装即可满足最基础的使用。
- 从 `3.x` 开始，文档站、demo 和安装说明统一使用 `@silver-formily/*` 命名空间。若你仍在维护 `@formily/*` 的旧工程，请将这些包名视为迁移前的历史背景，而不是当前推荐写法。

::: tip 提示
如果你还没有做好升级的准备，可以使用 `@silver-formily/vue` 的 1.x 版本。这是一个与 `@formily/vue` 的 API 完全对齐的版本。
:::

- `@silver-formily/vue` 移除了对 Schema 的导出，请从 `@silver-formily/json-schema` 导入。完整的 Schema、`ISchema` 和联动协议文档请查看 [JSON Schema 重建文档站](https://json-schema.silver-formily.org/)。
