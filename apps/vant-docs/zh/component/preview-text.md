---
mobileDemo: preview-text/index.vue
---

# PreviewText

> 阅读态组件，主要用来实现 Input、Picker、DatePicker 这类表单组件的只读展示。

`PreviewText` 是无渲染配置组件。日常使用时不需要手动替换组件，只要字段或表单进入 `readPretty`，已经接入 `mapReadPretty` 的 Vant 表单组件会自动切换到对应的 `PreviewText.*` 展示组件。

## 阅读态

下面的示例把整个 `Form` 设置为 `readPretty`，集中展示当前 Vant 包中已经实现阅读态映射的组件。点击底部按钮可以像 Element Plus 封装库示例一样，通过 `form.setState` 在编辑态和阅读态之间切换。

:::tip 提示

Upload 组件的编辑态的文件预览来自 `dataSource/fileList`，如果需要编辑态回显，除了字段值本身，还需要同时准备 `dataSource/fileList`

:::

<<< @/zh/demos/preview-text/read-pretty.vue

## 组件映射

| 表单组件                               | 阅读态组件                | 说明                                   |
| -------------------------------------- | ------------------------- | -------------------------------------- |
| `Input` / `Input.TextArea` / `Stepper` | `PreviewText.Input`       | 以文本方式展示字段值，支持 `formatter` |
| `Radio.Group` / `Checkbox.Group`       | `PreviewText.Select`      | 根据 `dataSource` 展示选项文案         |
| `Switch`                               | `PreviewText.Switch`      | 以只读开关展示当前开关值               |
| `Rate`                                 | `PreviewText.Rate`        | 以只读评分展示当前分值                 |
| `Slider`                               | `PreviewText.Slider`      | 以只读滑块展示当前进度或区间           |
| `Signature`                            | `PreviewText.Signature`   | 回显已有签名图片                       |
| `Upload`                               | `PreviewText.Upload`      | 复用 Vant Uploader 预览样式展示文件    |
| `Cascader`                             | `PreviewText.Cascader`    | 根据路径值和选项展示完整路径文案       |
| `Area` / `AreaPanel`                   | `PreviewText.Area`        | 根据省市区编码展示区域文案             |
| `Picker` / `PickerPanel`               | `PreviewText.Picker`      | 支持单列、多列和级联选择结果           |
| `PickerGroup` / `PickerGroupPanel`     | `PreviewText.PickerGroup` | 展示分步选择后的组合结果               |
| `DatePicker` / `DatePickerPanel`       | `PreviewText.DatePicker`  | 根据日期选择配置格式化展示             |
| `TimePicker` / `TimePickerPanel`       | `PreviewText.TimePicker`  | 根据时间选择配置格式化展示             |
| `Calendar`                             | `PreviewText.Calendar`    | 支持单选、多选和区间日期展示           |

## 自定义占位符

可以用 `PreviewText` 包裹一组字段统一配置空值占位符。

```vue
<PreviewText placeholder="暂无数据">
  <Field name="name" read-pretty :component="[Input]" />
</PreviewText>
```

## API

### PreviewText

| 属性名        | 类型     | 描述             | 默认值 |
| ------------- | -------- | ---------------- | ------ |
| `placeholder` | `string` | 阅读态空值占位符 | `'-'`  |

### PreviewText.Input

| 属性名       | 类型                           | 描述             | 默认值 |
| ------------ | ------------------------------ | ---------------- | ------ |
| `modelValue` | `any`                          | 当前值           | `-`    |
| `formatter`  | ^[Function]`(value) => string` | 自定义文本格式化 | `-`    |

其余 `PreviewText.*` 组件会复用对应表单组件的展示相关属性，例如 `dataSource`、`columns`、`options`、`areaList`、`format`、`valueFormat`、`separator` 和 `displayFormatter`。
