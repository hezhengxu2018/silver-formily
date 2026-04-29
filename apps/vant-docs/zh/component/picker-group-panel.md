---
mobileDemo: picker-group-panel/index.vue
---

# PickerGroupPanel

> `PickerGroupPanel` 是非弹出框模式的分步选择面板组件，复用 Vant 官方 `PickerGroup` 的 tab 与工具栏交互，并通过默认插槽组合不同类型的 Panel。

:::tip 提示

- `PickerGroupPanel` 不包含字段触发输入框和 Popup；如果需要表单字段触发区，请使用 [PickerGroup](/component/picker-group)。
- 默认插槽中推荐传入 `PickerPanel`、`DatePickerPanel`、`TimePickerPanel`、`AreaPanel` 这类 Panel 组件。
- `panelProps[index]` 需要通过 `v-bind` 绑定给每个子 panel，用于同步临时值、只读态、禁用态和通用 Picker 配置。

:::

## 基础使用

<<< @/zh/demos/picker-group-panel/basic.vue

## API

### 使用约定

- `dataSource` 的 `title` 会用于生成 tab 标题
- `dataSource[index].options` 不会自动传入子 panel；使用 `PickerPanel` 时需要手动绑定到 `columns`
- 每个子 panel 的确认事件会先写入当前步骤的临时值；最后一步确认后，`PickerGroupPanel` 才会触发 `update:modelValue` 和 `confirm`
- `cancel` 会返回当前临时值，但不会自动写回 `modelValue`
- 当前不提供外部 `activeTab` prop / `v-model:active-tab` 控制模型

### Props

| 属性名              | 类型                                                         | 描述                                             | 默认值     |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------ | ---------- |
| `modelValue`        | `Array<string \| number \| Array<string \| number>> \| null` | 当前值                                           | `-`        |
| `dataSource`        | `PickerGroupDataSource`                                      | 分步数据，用于提供 tab 标题和插槽消费的数据      | `[]`       |
| `tabs`              | `string[]`                                                   | 直接指定 tab 标题，优先级高于 `dataSource`       | `-`        |
| `columnsFieldNames` | ^[object]`{ text, value, children }`                         | 自定义选项字段名映射，用于从 `dataSource` 取标题 | 官方默认值 |
| `title`             | `string`                                                     | 顶部标题                                         | `-`        |
| `cancelButtonText`  | `string`                                                     | 取消按钮文案                                     | 官方默认值 |
| `confirmButtonText` | `string`                                                     | 最后一步确认按钮文案                             | 官方默认值 |
| `nextStepText`      | `string`                                                     | 中间步骤确认按钮文案                             | `'下一步'` |
| `readonly`          | `boolean`                                                    | 只读态                                           | `false`    |
| `readOnly`          | `boolean`                                                    | 兼容只读态                                       | `false`    |
| `disabled`          | `boolean`                                                    | 禁用态                                           | `false`    |
| `optionHeight`      | `number \| string`                                           | 选项高度                                         | 官方默认值 |
| `visibleOptionNum`  | `number \| string`                                           | 可见选项个数                                     | 官方默认值 |
| `swipeDuration`     | `number \| string`                                           | 滚动惯性动画时长                                 | 官方默认值 |
| `allowHtml`         | `boolean`                                                    | 是否渲染 HTML 文案                               | 官方默认值 |

### Slots

| 插槽名    | 描述                                       | 插槽参数                                                   |
| --------- | ------------------------------------------ | ---------------------------------------------------------- |
| `default` | 自定义步骤内容，推荐传入各类 `*Panel` 组件 | `{ dataSource, modelValue, values, panelProps, setValue }` |
| `title`   | 自定义顶部标题                             | `-`                                                        |
| `cancel`  | 自定义取消按钮                             | `-`                                                        |
| `confirm` | 自定义确认按钮                             | `-`                                                        |
| `toolbar` | 自定义整个工具栏                           | `-`                                                        |

### Events

| 事件名              | 描述                 | 回调参数                                                                                 |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `update:modelValue` | 最后一步确认后同步值 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |
| `confirm`           | 最后一步点击确认触发 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |
| `cancel`            | 点击取消按钮时触发   | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void` |

### 参考

- [PickerGroup](/component/picker-group)
- [Vant PickerGroup 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker-group)
