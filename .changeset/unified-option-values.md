---
'@silver-formily/element-plus': major
---

统一 Select、TreeSelect、Cascader、Radio.Group、Checkbox.Group、Segmented、Tree、SelectTable 和 PickerSelect 的 optionAsValue 与 optionValueKeys 配置。属性筛选仅作用于输出，标识字段需要显式保留。

破坏性变更：移除 Tree 的 optionFormatter，请迁移到 optionValueKeys，例如 ['id', 'label']。Tree 的 valueType='path' 保留树形输出，不应用属性筛选。

补齐对象值回显、只读展示、懒加载和跨页选择；仅 Select 按 options 展开分组选项，其他组件保留同名业务字段。
