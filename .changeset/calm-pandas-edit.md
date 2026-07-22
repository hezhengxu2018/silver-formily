---
'@silver-formily/element-plus': patch
'@silver-formily/vue': patch
---

统一 Editable 的阅读态映射实现。`mapReadPretty` 现在支持在不改变字段 `pattern` 的情况下切换阅读态展示，Element Plus 改为复用公共实现，在保持校验能力的同时移除私有实现。
