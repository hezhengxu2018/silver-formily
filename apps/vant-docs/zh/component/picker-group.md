---
mobileDemo: picker-group/index.vue
---

# PickerGroup

> `PickerGroup` 是基于 Vant 官方 `PickerGroup` 做的 Formily 字段封装，交互层面和 `Picker` 一样通过点击字段打开弹层，但弹层内部会按 tab 分步完成多项选择。

:::tip 提示

- `PickerGroup` 内部通过 `createPopup` 创建弹层，弹层内容复用 `PickerGroupPanel`。
- 默认插槽中推荐使用 `PickerPanel`、`DatePickerPanel`、`TimePickerPanel`、`AreaPanel` 这类 Panel 组件；如果直接使用 Vant 官方组件，需要自行处理字段值与 Vant 内部值结构之间的转换。

:::

## 基础使用

<<< @/zh/demos/picker-group/basic.vue

## 自定义步骤内容

<<< @/zh/demos/picker-group/content.vue

## Area 与 TimePicker 组合

<<< @/zh/demos/picker-group/area-time.vue

## 工具栏与选项插槽

<<< @/zh/demos/picker-group/slot.vue

## API

### 使用约定

- `dataSource` 的推荐结构如下：

```ts
interface PickerGroupDataSourceItem {
  title: string
  options?: PickerColumn
}

type PickerGroupDataSource = PickerGroupDataSourceItem[]
```

- `title` 用于生成内部 tab 标题
- `options` 可继续用于字段展示、readPretty 展示，以及传给 `PickerPanel`
- 最终字段值会按 tab 保留每个 panel 自己的 `modelValue` 结构，例如 `['2026-03-30', '09:30']`
- 触发区默认把每个 tab 的选中文案用 `separator` 拼接，默认值为 `' / '`
- `readPretty` 模式下会自动回显当前选项文案；组合日期、时间、地区等非 `dataSource.options` 场景时，推荐同时提供 `displayFormatter`
- 当前不提供外部 `activeTab` prop / `v-model:active-tab` 控制模型；步骤切换由内部 `PickerGroupPanel` 管理
- 默认插槽里的各个 panel 不会自动读取 `dataSource[index].options`，需要按需把 `dataSource[index].options` 传给 `PickerPanel` 的 `columns`

### 补充 Props

| 属性名             | 类型                           | 描述                                           | 默认值         |
| ------------------ | ------------------------------ | ---------------------------------------------- | -------------- |
| `placeholder`      | `string`                       | 未选择时的展示文案                             | `'请选择选项'` |
| `popupProps`       | `PickerGroupPopupProps`        | 传给内部 Popup 的配置                          | `{}`           |
| `separator`        | `string`                       | 字段展示区分隔符                               | `' / '`        |
| `displayFormatter` | ^[Function]`(value) => string` | 自定义字段展示区文案；默认插槽模式建议显式提供 | `-`            |

分步选择相关属性可直接参考 [PickerGroupPanel](/component/picker-group-panel)，例如 `modelValue`、`dataSource`、`tabs`、`columnsFieldNames`、`nextStepText`、`readonly`、`disabled` 等。

### Panel 绑定 Props

默认插槽提供 `dataSource` 和 `panelProps`。其中 `dataSource[index].options` 可作为 `PickerPanel` 的 `columns`，`panelProps[index]` 可通过 `v-bind` 绑定给各类 panel。`panelProps` 会提供 `modelValue`、`onUpdate:modelValue`、`onConfirm`、`readonly`、`disabled`、`showToolbar: false`，以及以下通用 Picker 配置：

| 属性名             | 类型               | 描述               | 默认值     |
| ------------------ | ------------------ | ------------------ | ---------- |
| `optionHeight`     | `number \| string` | 选项高度           | 官方默认值 |
| `visibleOptionNum` | `number \| string` | 可见选项个数       | 官方默认值 |
| `swipeDuration`    | `number \| string` | 滚动惯性动画时长   | 官方默认值 |
| `allowHtml`        | `boolean`          | 是否渲染 HTML 文案 | 官方默认值 |

### Popup Props

配置项与默认值可以直接参考[createPopup](/component/create-popup)。

### Slots

以下插槽已转发：

| 插槽名    | 描述                                       | 插槽参数                                                   |
| --------- | ------------------------------------------ | ---------------------------------------------------------- |
| `default` | 自定义步骤内容，推荐传入各类 `*Panel` 组件 | `{ dataSource, modelValue, values, panelProps, setValue }` |
| `title`   | 自定义顶部标题                             | `-`                                                        |
| `cancel`  | 自定义取消按钮                             | `-`                                                        |
| `confirm` | 自定义确认按钮                             | `-`                                                        |
| `toolbar` | 自定义整个工具栏                           | `-`                                                        |

### Events

| 事件名              | 描述                     | 回调参数                                                                                 |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| `update:modelValue` | 最后一步确认后同步字段值 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |
| `confirm`           | 最后一步点击确认时触发   | ^[Function]`(payload: { selectedValues, field? }) => void`                               |
| `cancel`            | 点击取消按钮时触发       | ^[Function]`(payload: { selectedValues, field? }) => void`                               |
| `open`              | 弹层打开时触发           | `-`                                                                                      |
| `close`             | 弹层关闭时触发           | `-`                                                                                      |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                                                                      |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                                                                      |
| `clickOverlay`      | 点击遮罩层时触发         | ^[Function]`(event: MouseEvent) => void`                                                 |
| `update:show`       | 弹层开关变化时触发       | ^[Function]`(visible: boolean) => void`                                                  |
