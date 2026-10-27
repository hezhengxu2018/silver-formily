---
mobileDemo: check-list/index.tsx
---

# CheckList

> `CheckList` 是对 antd-mobile 可勾选列表的 Formily 适配，支持单选和多选，字段值始终为数组。

## 基础单选

通过字段 `dataSource` 提供选项。默认单选，初始值使用数组；选项可单独设置 `disabled`。

<<< @/zh/demos/check-list/basic.tsx

## 多选

设置 `multiple` 开启多选，也可以通过 `options` 直接传入字符串选项。非空的字段 `dataSource` 优先于 `options`。

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

没有数据源和 `options` 时，可通过 `CheckList.Item` 自定义标题、描述等内容。存在非空数据源时优先渲染数据源选项。

<<< @/zh/demos/check-list/children.tsx

## API

| 属性名       | 类型                                       | 描述                                    | 默认值             |
| ------------ | ------------------------------------------ | --------------------------------------- | ------------------ |
| `value`      | `(string \| number)[]`                     | 已选值，单选也是数组                    | -                  |
| `options`    | `(string \| number \| ICheckListOption)[]` | 选项，可由字段 `dataSource` 提供        | -                  |
| `activeIcon` | `ReactNode`                                | 自定义选中图标                          | `<CheckOutline />` |
| `extra`      | `(active: boolean) => ReactNode`           | 自定义列表右侧区域，优先于 `activeIcon` | -                  |
| `multiple`   | `boolean`                                  | 是否多选                                | `false`            |
| `disabled`   | `boolean`                                  | 禁用整个列表                            | `false`            |
| `readOnly`   | `boolean`                                  | 整个列表只读                            | `false`            |
| `onChange`   | `(value: (string \| number)[]) => void`    | 选择变化回调                            | -                  |
| `children`   | `ReactNode`                                | 自定义列表项                            | -                  |

`ICheckListOption` 使用 `label: ReactNode` 作为列表项内容，`value` 支持字符串和数字，其余属性与 `CheckList.Item` 一致，例如 `title`、`description`、`prefix`、`disabled`、`readOnly`、`onClick`、`className` 和 `style`。基础值与对象选项可以混用，值需唯一，数字 `0` 与字符串 `"0"` 为不同选项。

`CheckList.Item` 直接使用原生列表项组件，`ICheckListItemProps` 对应其原生类型。`className`、`style` 和原生属性在选项模式与自定义列表项模式下均应用于列表根节点，支持原生 CSS 变量。列表使用原生纵向布局。

可脱离 Formily 独立使用：通过 `value` / `onChange` 受控，或使用 `defaultValue` 设置非受控初始值。单选时再次点击已选项会取消选择。字段 `dataSource` 动态更新会同步刷新列表；清空后回退到 `options`，两者均为空时显示 `children`。

其余配置参考 [antd-mobile CheckList 官方文档](https://mobile.ant.design/zh/components/check-list)。
