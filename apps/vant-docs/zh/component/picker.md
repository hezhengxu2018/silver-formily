---
mobileDemo: picker/index.vue
---

# Picker

> `Picker` 是基于 `PickerPanel` 做的弹出式封装，大部分的属性值可以参考 `PickerPanel`。

:::tip 提示

`Field` 上的 `dataSource` 会自动映射到 `columns`

:::

## 基础使用

<<< @/zh/demos/picker/basic.vue

## 多列选择

当 `dataSource` 是二维数组时，会自动切换成多列 `Picker`，字段值也会同步变成数组。

<<< @/zh/demos/picker/multiple.vue

## 级联选择

带 `children` 的根列数据会自动识别为级联结构，但交互仍然保留 Vant 官方滚轮选择器的体验。

<<< @/zh/demos/picker/cascade.vue

## 自定义字段名

<<< @/zh/demos/picker/field-names.vue

## 自定义展示文案

<<< @/zh/demos/picker/display-format.vue

## 自定义插槽

<<< @/zh/demos/picker/slot.vue

## 自定义弹出位置

<<< @/zh/demos/picker/popup-position.vue

## API

- `Field` 上的 `dataSource` 会自动映射到 `columns`，额外支持 `{ label, value }`、`{ label, name }` 的选项形态，同时兼容[官方文档中的字段](https://vant-ui.github.io/vant/#/zh-CN/picker#pickeroption-shu-ju-jie-gou)。
- 单列字段值是 `string | number | null`，多列 / 级联字段值是 `Array<string | number> | null`。
- 触发区交互状态跟随 `Field` 的 `disabled` / `readOnly` / `readPretty`，不会透传到内部 Picker。

### 补充 Props

| 属性名              | 类型                                                  | 描述                             | 默认值         |
| ------------------- | ----------------------------------------------------- | -------------------------------- | -------------- |
| `modelValue`        | `string \| number \| Array<string \| number> \| null` | 当前字段值                       | `-`            |
| `columns`           | `PickerColumn \| PickerColumn[]`                      | 选项列，通常由 `dataSource` 提供 | `[]`           |
| `columnsFieldNames` | ^[object]`{ text, value, children }`                  | 自定义字段名映射                 | 官方默认值     |
| `placeholder`       | `string`                                              | 未选择时的展示文案               | `'请选择选项'` |
| `popupProps`        | `PickerPopupProps`                                    | 传给内部 Popup 的配置            | `-`            |
| `separator`         | `string`                                              | 字段展示区分隔符                 | `' / '`        |
| `displayFormatter`  | ^[Function]`(value, selectedOptions) => string`       | 自定义字段展示区文案             | `-`            |

除上述补充能力外，Picker 选项结构、滚轮交互和已透传的官方属性 / 插槽可参考 [Vant Picker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/picker)。当前封装固定通过 `Popup` 弹层承载，不需要手动维护 `show`；内部固定显示工具栏，不支持隐藏 `showToolbar`。

### Popup Props

参考[createPopup](/component/create-popup)
