---
mobileDemo: time-picker/index.vue
---

# TimePicker

> `TimePicker` 是基于 Vant 官方 `TimePicker` 做的 Formily 字段封装，保留滚轮时间选择体验，同时补上字段触发区、内置弹层和 `readPretty` 展示。

:::tip 与官方的差异

- 当前封装固定通过 `Popup` 弹层承载，不需要手动维护 `show`
- 字段值统一保存为字符串，例如 `'09:30'`、`'09:30:15'`
- `format` 控制字段展示格式，`value-format` 控制实际写回字段的字符串格式
- 关闭弹层时会回滚未确认的临时选择，只有点击确认按钮才会写回字段值
- 作为 `PickerGroup` 默认插槽子组件使用时，会自动切换成内联模式并复用 `PickerGroup` 的工具栏

:::

## 基础用法

<<< @/zh/demos/time-picker/basic.vue

## 选项类型

<<< @/zh/demos/time-picker/columns-type.vue

## 时间范围

<<< @/zh/demos/time-picker/time-range.vue

## 整体时间范围

<<< @/zh/demos/time-picker/overall-range.vue

## 格式化选项

<<< @/zh/demos/time-picker/formatter.vue

## 过滤选项

<<< @/zh/demos/time-picker/filter.vue

## 高级用法

<<< @/zh/demos/time-picker/advanced.vue

## API

### 使用约定

- 推荐和 `FormItem` 搭配使用，由 `FormItem` 负责标题、箭头和反馈状态
- 默认值类型为 `string | null`
- 内部会先按 `value-format` 解析字段值，再转换成 Vant `TimePicker` 需要的滚轮数组
- 如果未显式传 `value-format`，会按 `columnsType` 推导默认格式，例如 `['hour', 'minute'] -> 'HH:mm'`
- 如果未显式传 `format`，字段展示会默认复用 `value-format`
- `minTime` / `maxTime` 仍遵循官方格式，固定使用 `HH:mm:ss`
- `readonly` / `readOnly` / `disabled` 都会阻止弹层打开
- 当前不支持通过组件 `ref` 调用官方实例方法

### 封装补充 Props

| 属性名             | 类型                                            | 描述                                      | 默认值                 |
| ------------------ | ----------------------------------------------- | ----------------------------------------- | ---------------------- |
| `modelValue`       | `string \| null`                                | 当前字段值                                | `-`                    |
| `format`           | `string`                                        | 字段展示格式                              | 与 `value-format` 一致 |
| `valueFormat`      | `string`                                        | 字段值格式，对应模板里的 `value-format`   | `HH:mm`                |
| `placeholder`      | `string`                                        | 未选择时的展示文案                        | `'请选择时间'`         |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示区文案，优先级高于 `format` | `-`                    |
| `readonly`         | `boolean`                                       | 只读态，阻止打开弹层                      | `false`                |
| `disabled`         | `boolean`                                       | 禁用态，阻止打开弹层                      | `false`                |
| `separator`        | `string`                                        | 默认格式推导时使用的分隔符                | `':'`                  |

### 官方 TimePicker Props

以下属性会直接透传给 Vant `TimePicker`：

| 属性名              | 类型                                                    | 描述               | 默认值     |
| ------------------- | ------------------------------------------------------- | ------------------ | ---------- |
| `title`             | `string`                                                | 顶部标题           | 官方默认值 |
| `columnsType`       | `Array<'hour' \| 'minute' \| 'second'>`                 | 时间列类型         | 官方默认值 |
| `minHour`           | `number \| string`                                      | 可选最小小时       | 官方默认值 |
| `maxHour`           | `number \| string`                                      | 可选最大小时       | 官方默认值 |
| `minMinute`         | `number \| string`                                      | 可选最小分钟       | 官方默认值 |
| `maxMinute`         | `number \| string`                                      | 可选最大分钟       | 官方默认值 |
| `minSecond`         | `number \| string`                                      | 可选最小秒数       | 官方默认值 |
| `maxSecond`         | `number \| string`                                      | 可选最大秒数       | 官方默认值 |
| `minTime`           | `string`                                                | 最小可选时间       | 官方默认值 |
| `maxTime`           | `string`                                                | 最大可选时间       | 官方默认值 |
| `cancelButtonText`  | `string`                                                | 取消按钮文案       | 官方默认值 |
| `confirmButtonText` | `string`                                                | 确认按钮文案       | 官方默认值 |
| `loading`           | `boolean`                                               | 是否显示加载状态   | 官方默认值 |
| `optionHeight`      | `number \| string`                                      | 选项高度           | 官方默认值 |
| `visibleOptionNum`  | `number \| string`                                      | 可见选项个数       | 官方默认值 |
| `swipeDuration`     | `number \| string`                                      | 滚动惯性动画时长   | 官方默认值 |
| `allowHtml`         | `boolean`                                               | 是否渲染 HTML 文案 | 官方默认值 |
| `formatter`         | ^[Function]`(type, option) => option`                   | 自定义选项展示     | 官方默认值 |
| `filter`            | ^[Function]`(type, options, values) => filteredOptions` | 自定义选项过滤     | 官方默认值 |

### 官方 Popup Props

当前封装内部固定包了一层 `Popup`，以下弹层属性可直接使用：

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

以下官方插槽已转发：

| 插槽名           | 描述             | 插槽参数 |
| ---------------- | ---------------- | -------- |
| `title`          | 自定义标题       | `-`      |
| `cancel`         | 自定义取消按钮   | `-`      |
| `confirm`        | 自定义确认按钮   | `-`      |
| `toolbar`        | 自定义整个工具栏 | `-`      |
| `option`         | 自定义选项内容   | `option` |
| `columns-top`    | 选项区顶部内容   | `-`      |
| `columns-bottom` | 选项区底部内容   | `-`      |

### Events

| 事件名              | 描述                     | 回调参数                                                                                                  |
| ------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值     | ^[Function]`(value: string \| null) => void`                                                              |
| `change`            | 任意列发生切换时触发     | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, columnIndex, field? }) => void` |
| `confirm`           | 点击确认按钮时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`              |
| `cancel`            | 点击取消按钮时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`              |
| `open`              | 弹层打开时触发           | `-`                                                                                                       |
| `close`             | 弹层关闭时触发           | `-`                                                                                                       |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                                                                                       |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                                                                                       |
| `clickOverlay`      | 点击遮罩层时触发         | ^[Function]`(event: MouseEvent) => void`                                                                  |
| `update:show`       | 弹层开关变化时触发       | ^[Function]`(visible: boolean) => void`                                                                   |

### 参考

- [Vant TimePicker 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/time-picker)
