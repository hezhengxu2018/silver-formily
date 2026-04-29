---
mobileDemo: picker-group/index.vue
---

# PickerGroup

> `PickerGroup` 是基于 Vant 官方 `PickerGroup` 做的 Formily 字段封装，交互层面和 `Picker` 一样通过点击字段打开弹层，但弹层内部会按 tab 分步完成多项选择。

:::tip 提示

- `PickerGroup` 内部通过 `createPopup` 创建弹层，弹层内容复用 `PickerGroupPanel`。
- 默认插槽中推荐使用 `PickerPanel`、`DatePickerPanel`、`TimePickerPanel`、`AreaPanel` 这类 Panel 组件；如果直接使用 Vant 官方组件，需要自行处理字段值与 Vant 内部值结构之间的转换。
- 如果不需要字段触发区和 Popup，可以直接使用 [PickerGroupPanel](/component/picker-group-panel)。

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

### 封装补充 Props

| 属性名              | 类型                                                         | 描述                                                                       | 默认值         |
| ------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- | -------------- |
| `modelValue`        | `Array<string \| number \| Array<string \| number>> \| null` | 当前字段值                                                                 | `-`            |
| `dataSource`        | `PickerGroupDataSource`                                      | 分步数据；用于提供 tab 标题、展示文案，也可把 `options` 传给 `PickerPanel` | `[]`           |
| `tabs`              | `string[]`                                                   | 直接指定 tab 标题，优先级高于 `dataSource`                                 | `-`            |
| `columnsFieldNames` | ^[object]`{ text, value, children }`                         | 自定义选项字段名映射，用于 `dataSource` 展示解析                           | 官方默认值     |
| `placeholder`       | `string`                                                     | 未选择时的展示文案                                                         | `'请选择选项'` |
| `popupProps`        | `PickerGroupPopupProps`                                      | 传给内部 Popup 的配置                                                      | `{}`           |
| `separator`         | `string`                                                     | 字段展示区分隔符                                                           | `' / '`        |
| `displayFormatter`  | ^[Function]`(value) => string`                               | 自定义字段展示区文案；默认插槽模式建议显式提供                             | `-`            |
| `nextStepText`      | `string`                                                     | 中间步骤确认按钮文案                                                       | `'下一步'`     |
| `readonly`          | `boolean`                                                    | 只读态，阻止打开弹层                                                       | `false`        |
| `disabled`          | `boolean`                                                    | 禁用态，阻止打开弹层                                                       | `false`        |

### Panel 绑定 Props

默认插槽提供 `dataSource` 和 `panelProps`。其中 `dataSource[index].options` 可作为 `PickerPanel` 的 `columns`，`panelProps[index]` 可通过 `v-bind` 绑定给各类 panel。`panelProps` 会提供 `modelValue`、`onUpdate:modelValue`、`onConfirm`、`readonly`、`disabled`、`showToolbar: false`，以及以下通用 Picker 配置：

| 属性名             | 类型               | 描述               | 默认值     |
| ------------------ | ------------------ | ------------------ | ---------- |
| `optionHeight`     | `number \| string` | 选项高度           | 官方默认值 |
| `visibleOptionNum` | `number \| string` | 可见选项个数       | 官方默认值 |
| `swipeDuration`    | `number \| string` | 滚动惯性动画时长   | 官方默认值 |
| `allowHtml`        | `boolean`          | 是否渲染 HTML 文案 | 官方默认值 |

### PickerGroupPanel Props

`PickerGroupPanel` 是不带触发输入框和 Popup 的面板组件，`PickerGroup` 会在弹层中使用它承载分步选择逻辑。它支持上方 `modelValue`、`dataSource`、`tabs`、`columnsFieldNames`、`title`、`cancelButtonText`、`confirmButtonText`、`nextStepText`、`readonly`、`readOnly`、`disabled` 以及通用 Picker 配置，并提供和 `PickerGroup` 相同的默认插槽参数。

直接使用 `PickerGroupPanel` 时，`confirm` 和 `cancel` 事件会直接返回当前面板值：

| 事件名              | 描述                 | 回调参数                                                                                 |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `update:modelValue` | 最后一步确认后同步值 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |
| `confirm`           | 最后一步点击确认触发 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |
| `cancel`            | 点击取消按钮时触发   | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |

### Popup Props

参考[createPopup](/component/create-popup)。为了兼容已有写法，以下弹层属性仍可以直接写在 `PickerGroup` 上；如果同时传入 `popupProps`，`popupProps` 的优先级更高。

| 属性名                | 类型                                            | 描述                 | 默认值     |
| --------------------- | ----------------------------------------------- | -------------------- | ---------- |
| `position`            | ^[enum]`'bottom' \| 'top' \| 'left' \| 'right'` | 弹出位置             | `'bottom'` |
| `round`               | `boolean`                                       | 是否显示圆角         | `true`     |
| `overlay`             | `boolean`                                       | 是否显示遮罩层       | `true`     |
| `teleport`            | `string \| Element`                             | 指定挂载节点         | 官方默认值 |
| `closeOnPopstate`     | `boolean`                                       | 回退时是否自动关闭   | `true`     |
| `closeOnClickOverlay` | `boolean`                                       | 点击遮罩是否自动关闭 | `true`     |
| `safeAreaInsetTop`    | `boolean`                                       | 是否开启顶部安全区   | 官方默认值 |
| `safeAreaInsetBottom` | `boolean`                                       | 是否开启底部安全区   | `true`     |
| `lockScroll`          | `boolean`                                       | 是否锁定背景滚动     | `true`     |
| `lazyRender`          | `boolean`                                       | 是否延迟渲染内容     | `true`     |
| `zIndex`              | `number \| string`                              | 弹层层级             | 官方默认值 |
| `duration`            | `number \| string`                              | 动画时长             | 官方默认值 |
| `transition`          | `string`                                        | 自定义过渡动画       | 官方默认值 |

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

### 参考

- [Vant PickerGroup 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker-group)
- [Vant Picker 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker)
