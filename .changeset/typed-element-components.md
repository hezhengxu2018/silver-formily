---
'@silver-formily/vue': major
'@silver-formily/element-plus': major
'@silver-formily/vant': major
---

统一 Vue 组件的公开 Props 类型声明，并通过 `connect` 保留上游组件的 Props 类型。
Element Plus 和 Vant 封装组件现在导出真实的 `FooProps` 类型，不再将组件构造类型
错误地作为 Props 类型使用；如需组件构造类型，请使用对应的 `FooComponent`。
