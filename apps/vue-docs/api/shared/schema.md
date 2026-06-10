# Schema

`@silver-formily/vue` 不再导出 `Schema`。如果你在 Vue 侧 API 中看到 `Schema`、`ISchema`、`x-reactions`、`x-component-props` 等协议名，它们都属于 [`@silver-formily/json-schema`](https://json-schema.silver-formily.org/)。此处不再重复维护。

::: tip 迁移说明
从 `3.x` 开始，`vue-docs` 与 demo 中的 Schema 相关示例已经全部切换到 `@silver-formily/json-schema`。`@silver-formily/vue` 文档只解释 Vue 侧如何消费 Schema，不重复维护 JSON Schema 协议本身。
:::
