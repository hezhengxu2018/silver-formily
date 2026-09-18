# PickerSelect

> 弹窗版下拉选择框

## Template

### 弹窗表格选择

:::demo

picker-select/template-dialog-table

:::

### 返回完整选项值 ^(5.2.0)

开启 `optionAsValue` 后，`PickerSelect` 对外提交的是 `raw` 原始对象，内部仍使用 `value` 进行返显。

:::demo

picker-select/template-option-as-value

:::

- 开启了 `optionAsValue` 之后 `openPicker` 返回的 option 应提供 `raw`。
- 如果原始对象的主键不是 `id`，可以通过 `valueKey` 指定主键字段。

### 单选弹窗表格选择

单选时 `PickerSelect` 的字段值是单个字符串、数字或对象，不会包装成数组。

:::demo

picker-select/template-single

:::

## JSON Schema

### 标量值

:::demo

picker-select/json-schema-scalar

:::

### 完整对象 ^(5.2.0)

:::demo

picker-select/json-schema-object

:::

### 多选

:::demo

picker-select/json-schema-multiple

:::

## Markup Schema

### 标量值

:::demo

picker-select/markup-schema-scalar

:::

### 完整对象 ^(5.2.0)

:::demo

picker-select/markup-schema-object

:::

### 多选

:::demo

picker-select/markup-schema-multiple

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/select.html](https://cn.element-plus.org/zh-CN/component/select.html)

### 扩展属性

| 属性名               | 类型                                                                                                                                                                                                                                      | 描述                                                                                     | 默认值  |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- |
| options              | `PickerSelectOption[]`                                                                                                                                                                                                                    | 候选项配置，一般情况下优先通过 `dataSource` 注入                                         | `[]`    |
| openPicker           | ^[Function]`(ctx: { field?: Field, dataSource: PickerSelectOption[], multiple: boolean }) => Promise<PickerSelectOption \| PickerSelectOption[] \| null \| undefined> \| PickerSelectOption \| PickerSelectOption[] \| null \| undefined` | 点击选择器后触发的选择函数，通常返回 `FormDialog(...).open()` 处理后的 option / option[] | -       |
| cacheSelectedOptions | `boolean`                                                                                                                                                                                                                                 | 是否缓存 `openPicker` 返回的 option，用于在 `dataSource` 未同步更新时优先展示 label      | `true`  |
| optionAsValue        | `boolean`                                                                                                                                                                                                                                 | 是否将 `raw` 原始选项作为字段值，而不是使用 `value`                                      | `false` |
| valueKey             | `string`                                                                                                                                                                                                                                  | 完整值模式下从 `raw` 中提取内部返显值的字段名                                            | `'id'`  |

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

## 对象值与属性筛选

设置 `optionAsValue: true` 可将选项对象作为表单值；`optionValueKeys?: string[]` 仅保留指定的顶层属性。未配置时返回完整对象，空数组返回空对象，缺失属性忽略。默认 `optionAsValue` 为 `false`。

筛选只作用于表单输出，不修改 `dataSource`。请在白名单中保留选项标识（如 `value`、`nodeKey` 或 `rowKey` 对应属性），回显按标识从完整数据源读取标签。仅提供标识而不保存 label 也可以正常回显。

```ts
const componentProps = {
  optionAsValue: true,
  optionValueKeys: ['id'],
}
// dataSource: [{ id: 1, label: '选项一', extra: '业务属性' }]
// 表单值: { id: 1 }
```

白名单作用于 `raw ?? option`，请保留 `valueKey` 对应的属性。
