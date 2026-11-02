---
'@silver-formily/json-schema': patch
---

修复 Schema 编译时递归拆解 Vue 3 VNode 的问题。完整保留 VNode 及其引用，不再对内部 `props`、`children` 中的表达式求值，并确保同一 VNode 在多个属性中被引用时均能正确保留。
