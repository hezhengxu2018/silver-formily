---
'@silver-formily/element-plus': patch
---

稳定 Element Plus 组件 attrs 继承：移除组件内通用 `useCleanAttrs` 清洗，改为按当前 Element Plus 组件运行时声明分流 root attrs 与内部组件 props/events，避免 `attrs/on` 等历史字段泄漏到 DOM。
