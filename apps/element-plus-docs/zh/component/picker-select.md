# PickerSelect

> 弹窗版下拉选择框

## Template 弹窗表格选择

:::demo

picker-select/template-dialog-table

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/select.html](https://cn.element-plus.org/zh-CN/component/select.html)

### 扩展属性

| 属性名               | 类型                                                                                                                                                                                                                                      | 描述                                                                                     | 默认值 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| options              | `PickerSelectOption[]`                                                                                                                                                                                                                    | 候选项配置，一般情况下优先通过 `dataSource` 注入                                         | `[]`   |
| openPicker           | ^[function]`(ctx: { field?: Field, dataSource: PickerSelectOption[], multiple: boolean }) => Promise<PickerSelectOption \| PickerSelectOption[] \| null \| undefined> \| PickerSelectOption \| PickerSelectOption[] \| null \| undefined` | 点击选择器后触发的选择函数，通常返回 `FormDialog(...).open()` 处理后的 option / option[] | -      |
| cacheSelectedOptions | `boolean`                                                                                                                                                                                                                                 | 是否缓存 `openPicker` 返回的 option，用于在 `dataSource` 未同步更新时优先展示 label      | `true` |

:::tip 提示

- `openPicker` 返回的是一个对象[PickerSelectOption](#PickerSelectOption)而不直接是 `Field` 的值。

- 如果开启了 `cacheSelectedOptions` 则会缓存这些对象, `Field` 的值是对象中的 `value` 属性；如果关闭了则自行加载相应的 `dataSource` (如：还没有打开Dialog就已经有初始值的情况)。

- 当字段当前值在 `dataSource` 中找不到匹配项时，会回退显示对应的 `value`。

:::

### PickerSelectOption

```ts
interface PickerSelectOption {
  label: string
  value: any
  disabled?: boolean
  // 可扩展其他业务字段，组件内部不会读取
}
```

### 插槽

组件继承 `ElSelect` 的常用展示插槽，第一版主要保留 `prefix`、`empty`、`tag`、`loading`、`label` 的原始能力，不额外扩展作用域协议。
