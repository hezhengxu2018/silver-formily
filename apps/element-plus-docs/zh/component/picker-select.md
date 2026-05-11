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

### PickerSelectOption

```ts
interface PickerSelectOption {
  label: string
  value: any
  disabled?: boolean
  // 业务扩展字段，组件内部不会读取
  raw?: any
}
```

其中 `raw` 用于附带原始业务对象，方便 `openPicker` 返回 option 后由业务层继续使用；`PickerSelect` 组件内部不会读取 `raw`，也不会把它写回字段值。

### 使用说明

1. 组件展示 `label`，表单字段只保存 `value`。
2. 当字段当前值在 `dataSource` 中找不到匹配项时，会回退显示对应的 `value`。
3. `raw` 只是可选的业务扩展字段，常用于保存原始行数据，不参与组件内部渲染、匹配或提交。
4. 第一版不内置 `request`，推荐通过 `field.dataSource`、Formily effects 或业务层请求先把数据归一化成 `{ label, value, raw }` 再传入。

### 插槽

组件继承 `ElSelect` 的常用展示插槽，第一版主要保留 `prefix`、`empty`、`tag`、`loading`、`label` 的原始能力，不额外扩展作用域协议。
