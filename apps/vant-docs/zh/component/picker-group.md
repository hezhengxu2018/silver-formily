---
mobileDemo: picker-group/index.vue
---

# PickerGroup

> `PickerGroup` 是基于 Vant 官方 `PickerGroup` 做的 Formily 字段封装，交互层面和 `Picker` 一样通过点击字段打开弹层，但弹层内部会按 tab 分步完成多项选择。

:::tip 与当前封装的约定

- 当前封装固定通过 `Popup` 弹层承载，不需要手动维护 `show`
- `Field` 上的 `dataSource` 仍然使用对象数组，每一项对应一个 tab
- 不提供默认插槽时，会回退到内部 `VanPicker`，此时每个 tab 只支持单列选项，最终字段值会写回成扁平数组
- 提供默认插槽时，会优先渲染插槽里的 `Picker`、`Area`、`DatePicker`、`TimePicker` 或基于 `Picker` 封装的自定义组件
- `tabs`、`activeTab` 和弹层 `show` 依然是内部状态，但默认插槽会额外暴露 `activeTab` / `setActiveTab` / `values` / `setValue` 供高级场景使用
- 中间步骤的确认按钮会自动切到下一步，最后一步才真正写回字段值

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
- 不提供默认插槽时，`options` 作为对应步骤的单列选项
- 提供默认插槽时，`options` 可以省略，`dataSource` 仅用于提供 tab 标题
- 默认模式下最终字段值类型为 `Array<string | number> | null`
- 默认插槽模式下，最终字段值会按 tab 保留每个子组件自己的 `modelValue` 结构，例如 `['2026-03-30', ['09', '30']]`
- 触发区默认把每个 tab 的选中文案用 `separator` 拼接，默认值为 `' / '`
- `readPretty` 模式下会自动回显当前选项文案；如果使用默认插槽模式，推荐同时提供 `displayFormatter`
- 当前仍然不提供外部 `activeTab` prop / `v-model:active-tab` 控制模型

### 封装补充 Props

| 属性名              | 类型                                                         | 描述                                                                   | 默认值         |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------- |
| `modelValue`        | `Array<string \| number \| Array<string \| number>> \| null` | 当前字段值                                                             | `-`            |
| `dataSource`        | `PickerGroupDataSource`                                      | 分步数据；默认模式下提供 tab + 选项，默认插槽模式下只需要提供 tab 标题 | `[]`           |
| `columnsFieldNames` | ^[object]`{ text, value, children }`                         | 自定义选项字段名映射，仅默认模式生效                                   | 官方默认值     |
| `placeholder`       | `string`                                                     | 未选择时的展示文案                                                     | `'请选择选项'` |
| `separator`         | `string`                                                     | 字段展示区分隔符                                                       | `' / '`        |
| `displayFormatter`  | ^[Function]`(value, selectedOptions) => string`              | 自定义字段展示区文案；默认插槽模式建议显式提供                         | `-`            |
| `readonly`          | `boolean`                                                    | 只读态，阻止打开弹层                                                   | `false`        |
| `disabled`          | `boolean`                                                    | 禁用态，阻止打开弹层                                                   | `false`        |

### 内部 Picker Props

以下属性会统一透传到每个步骤内部的 `Picker`；如果使用默认插槽模式，也会在未显式声明同名 prop 时注入给子组件：

| 属性名              | 类型               | 描述               | 默认值     |
| ------------------- | ------------------ | ------------------ | ---------- |
| `title`             | `string`           | 顶部标题           | 官方默认值 |
| `cancelButtonText`  | `string`           | 取消按钮文案       | 官方默认值 |
| `confirmButtonText` | `string`           | 最后一步确认文案   | 官方默认值 |
| `optionHeight`      | `number \| string` | 选项高度           | 官方默认值 |
| `visibleOptionNum`  | `number \| string` | 可见选项个数       | 官方默认值 |
| `swipeDuration`     | `number \| string` | 滚动惯性动画时长   | 官方默认值 |
| `allowHtml`         | `boolean`          | 是否渲染 HTML 文案 | 官方默认值 |

### 内部 Popup Props

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

以下插槽已转发：

| 插槽名    | 描述                                                                           | 插槽参数                                                    |
| --------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `default` | 自定义步骤内容，可直接放 `Picker`、`Area`、`DatePicker`、`TimePicker` 等子组件 | `{ activeTab, modelValue, values, setValue, setActiveTab }` |
| `title`   | 自定义顶部标题                                                                 | `-`                                                         |
| `cancel`  | 自定义取消按钮                                                                 | `-`                                                         |
| `confirm` | 自定义确认按钮                                                                 | `-`                                                         |
| `toolbar` | 自定义整个工具栏                                                               | `-`                                                         |
| `option`  | 自定义默认模式下每个步骤里 Picker 的选项内容                                   | `option`                                                    |
| `empty`   | 自定义默认模式下的空状态内容                                                   | `-`                                                         |

### Events

| 事件名              | 描述                     | 回调参数                                                                                                              |
| ------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | 最后一步确认后同步字段值 | ^[Function]`(value: Array<string \| number \| Array<string \| number>> \| null) => void`                              |
| `change`            | 任一步骤的选项切换时触发 | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, tabIndex, field? }) => void`                |
| `confirm`           | 最后一步点击确认时触发   | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`                          |
| `cancel`            | 点击取消按钮时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`                          |
| `clickOption`       | 点击某个选项时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, tabIndex, currentOption, field? }) => void` |
| `scrollInto`        | 滚动到某个选项时触发     | ^[Function]`(payload: { tabIndex, currentOption, field? }) => void`                                                   |
| `open`              | 弹层打开时触发           | `-`                                                                                                                   |
| `close`             | 弹层关闭时触发           | `-`                                                                                                                   |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                                                                                                   |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                                                                                                   |
| `clickOverlay`      | 点击遮罩层时触发         | ^[Function]`(event: MouseEvent) => void`                                                                              |
| `update:show`       | 弹层开关变化时触发       | ^[Function]`(visible: boolean) => void`                                                                               |

### 参考

- [Vant PickerGroup 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker-group)
- [Vant Picker 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker)
