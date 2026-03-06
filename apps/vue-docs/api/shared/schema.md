# Schema

`@silver-formily/vue` 不再导出 `Schema`。如果你在 Vue 侧 API 中看到 `Schema`、`ISchema`、`x-reactions`、`x-component-props` 等协议名，它们都属于 `@formily/json-schema`。

这个页面保留为 `vue-docs` 内部的稳定跳转入口；完整的 JSON Schema 协议文档已经迁移到重建后的官方文档站：

- [JSON Schema 重建文档站](https://json-schema.silver-formily.org/)

::: tip 迁移说明
请从 `@formily/json-schema` 导入 `Schema`、`ISchema` 及相关工具。`@silver-formily/vue` 文档只解释 Vue 侧如何消费 Schema，不重复维护 JSON Schema 协议本身。
:::

## 核心入口

- [快速上手](https://json-schema.silver-formily.org/)
- [构造器](https://json-schema.silver-formily.org/api/constructor)
- [属性](https://json-schema.silver-formily.org/api/properties)
- [方法](https://json-schema.silver-formily.org/api/methods)
- [静态方法](https://json-schema.silver-formily.org/api/static-methods)
- [类型](https://json-schema.silver-formily.org/api/types)
- [联动](https://json-schema.silver-formily.org/api/linkages)
