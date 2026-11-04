---
mobileDemo: picker/index.tsx
---

# Picker

> `Picker` 是 antd-mobile 多列选择器的 Formily 适配，内部使用声明式原生 `Picker`。

::: tip 提示
关于 Picker 组件的右侧箭头相关逻辑请参考 FormItem 中的[箭头与清除按钮](/component/form-item#箭头与清除按钮)
:::

## 基础使用

<<< @/zh/demos/picker/basic.tsx

## 两列选择

使用二维 `dataSource` 配置两列，每个子数组对应一列选项。两列独立选择，确认后保存为值数组。

<<< @/zh/demos/picker/columns.tsx

## 禁用、只读与预览

`displayRender` 用于编辑态和预览态。

::: tip 提示
`displayRender` 是所有Picker类型组件通用的配置项。
:::

<<< @/zh/demos/picker/patterns.tsx

## API

导出 `Picker`、`IPickerProps` 和底层受控组件 `BasePopupPicker`。底层组件无本地值状态，也不提供非受控 `defaultValue`；一般应通过 Formily Field 或 Schema 使用 `Picker`。

| 属性            | 说明                                      |
| --------------- | ----------------------------------------- |
| `placeholder`   | ReactNode，默认“请选择”                   |
| `displayRender` | `(value, props) => ReactNode`，自定义展示 |
| `aria-label`    | 入口名称，默认使用 Field 的字符串标题     |

原生 `Picker` 支持的其余参数与事件直接透传。不支持 `visible`、`children`、`trigger` 或清空配置。

原生接口参考 [antd-mobile Picker 文档](https://mobile.ant.design/zh/components/picker)。
