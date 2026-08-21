---
'@silver-formily/core': minor
'@silver-formily/json-schema': minor
'@silver-formily/vue': minor
---

新增 `mountedReactions` 与 `x-mounted-reactions`，支持在表单首批同步字段全部挂载后启动响应式联动。表单挂载后新增的动态字段会在自身挂载时启动，字段卸载时自动停止、重新挂载时恢复。
