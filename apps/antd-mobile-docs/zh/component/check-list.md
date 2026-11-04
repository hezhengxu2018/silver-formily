---
mobileDemo: check-list/index.tsx
---

# CheckList

> `CheckList` 是对 antd-mobile 可勾选列表的 Formily 适配，支持单选和多选，字段值始终为数组。

## 基础单选

通过字段 `dataSource` 提供选项。默认单选，初始值使用数组；选项可单独设置 `disabled`。

<<< @/zh/demos/check-list/basic.tsx

## 多选

<<< @/zh/demos/check-list/multiple.tsx

## 自定义选中图标

通过 `activeIcon` 替换默认选中图标，未选中时不显示该图标。

<<< @/zh/demos/check-list/active-icon.tsx

## 自定义列表右侧区域

通过 `extra` 自定义右侧区域，回调接收当前项的选中状态 `active`。此示例分别使用实心和空心圆形图标展示选中与未选中状态；设置 `extra` 后不再使用 `activeIcon`。

<<< @/zh/demos/check-list/extra.tsx

## 整组只读

通过字段 `readOnly` 设置整组只读，保留选中值，无法修改选择。Formily 阅读态保留列表外观，并以禁用状态展示。

<<< @/zh/demos/check-list/read-only.tsx

## 禁用

在字段 `dataSource` 的选项中设置 `disabled` 可禁用单项，其余选项仍可选择；在字段上设置 `disabled` 可禁用整个列表。

<<< @/zh/demos/check-list/disabled.tsx

## 自定义列表项

没有数据源时，可通过 `CheckList.Item` 自定义标题、描述等内容。存在非空数据源时优先渲染数据源选项。

<<< @/zh/demos/check-list/children.tsx

## API

`ICheckListOption` 使用 `label: ReactNode` 作为列表项内容，`value` 支持字符串和数字，其余属性与原生 `CheckList.Item` 一致。基础值与对象选项可以混用，值需唯一，数字 `0` 与字符串 `"0"` 为不同选项。

`CheckList.Item` 直接使用原生列表项组件，`ICheckListItemProps` 对应其原生类型。

单选时再次点击已选项会取消选择。字段 `dataSource` 动态更新会同步刷新列表；没有数据源时显示 `children`。

其余配置参考 [antd-mobile CheckList 官方文档](https://mobile.ant.design/zh/components/check-list)。
