---
'@silver-formily/json-schema': patch
---

修复 React 19 生产环境中不含 `_owner` 的 React 元素被 Schema 编译递归拆解、丢失空 `props`，导致渲染报错的问题。同时清理遍历提前返回时的循环检测记录，确保同一 React 元素在多个属性中被引用时均能正确保留。
