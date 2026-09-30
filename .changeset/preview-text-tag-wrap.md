---
'@silver-formily/element-plus': patch
---

PreviewText 多选预览（Select、TreeSelect、Cascader 等）在选中项过多时默认换行，不再撑出横向滚动。ElSpace 的 spaceProps 现在默认带 `wrap: true`，可通过全局 previewTextConfig 的 spaceProps 覆盖（如显式传 `wrap: false` 关闭）；同时预览容器增加 `min-width: 0`，保证在 flex 布局中能正常收缩换行。
