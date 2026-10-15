---
'@silver-formily/element-plus': patch
---

QueryFormItemSelectedList 选中项过多时列表不再无限撑高，改用 ElScrollbar 滚动展示；列表区域默认与 QueryFormItem 内容区等高且底部对齐，超出后滚动。新增 `maxHeight` 属性（`number | string`）可显式限制滚动区域最大高度。
