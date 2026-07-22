---
'@silver-formily/core': minor
'@silver-formily/json-schema': minor
'@silver-formily/vue': minor
---

为字段新增 `decoratorContent` 状态和 `setDecoratorContent` API，并在 JSON Schema 中支持 `x-decorator-content`。Vue 渲染层现在统一从字段状态读取装饰器内容，使 `setFieldState`、reactions 和运行时 setter 能够更新装饰器插槽内容。
