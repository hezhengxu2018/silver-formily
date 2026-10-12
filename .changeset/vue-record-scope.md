---
'@silver-formily/vue': minor
---

新增 RecordScope / RecordsScope 组件，向子树 Schema 表达式注入 `$record` / `$index` / `$lookup` / `$records` 变量，语义与 React 版对齐。同时修复 SchemaField 直接嵌套在这些作用域组件之下时，外层已注入的表达式作用域会被 SchemaField 切断的问题（SchemaField 现在会链式合并父级注入的作用域）。
