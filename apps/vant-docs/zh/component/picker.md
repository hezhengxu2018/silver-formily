---
mobileDemo: picker/index.vue
---

# Picker

> `Picker` 是基于 Vant 官方 `Picker` 做的 Formily 封装，补上了字段触发区、内置弹层、阅读态展示，以及更贴近表单字段心智的值形态适配。

:::tip 与官方的差异

- 当前封装固定通过 `Popup` 弹层承载，不需要手动维护 `show`
- `Field` 上的 `dataSource` 会自动映射到 `columns`
- 单列字段值保存为标量，多列 / 级联字段值保存为数组
- 关闭弹层时会回滚未确认选择，只有点击确认按钮才会写回字段值
- 内部固定显示工具栏，不支持隐藏 `showToolbar`

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

### 使用约定

- `Field` 上的 `dataSource` 会自动映射到 `columns`
- 单列字段值是 `string | number | null`，多列 / 级联字段值是 `Array<string | number> | null`
- 对象选项优先推荐写成 `{ label, value }`，同时兼容 `{ text, value }`、`{ label, name }`
- `readPretty` 模式下会自动回显当前选项文案，找不到匹配项时回退为空占位
- `readonly` / `readOnly` / `disabled` 都会阻止弹层打开
- 当前不支持通过组件 `ref` 调用官方实例方法

### 封装补充 Props

| 属性名              | 类型                                            | 描述                             | 默认值         |
| ------------------- | ----------------------------------------------- | -------------------------------- | -------------- |
| `modelValue`        | `string \| number \| Array<string \| number>`   | 当前字段值                       | `-`            |
| `columns`           | `PickerColumn \| PickerColumn[]`                | 选项列，通常由 `dataSource` 提供 | `[]`           |
| `columnsFieldNames` | ^[object]`{ text, value, children }`            | 自定义字段名映射                 | 官方默认值     |
| `placeholder`       | `string`                                        | 未选择时的展示文案               | `'请选择选项'` |
| `separator`         | `string`                                        | 字段展示区分隔符                 | `' / '`        |
| `displayFormatter`  | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示区文案             | `-`            |
| `readonly`          | `boolean`                                       | 只读态，阻止打开弹层             | `false`        |
| `disabled`          | `boolean`                                       | 禁用态，阻止打开弹层             | `false`        |

### 官方 Picker Props

以下属性会直接透传给 Vant `Picker`：

| 属性名              | 类型                       | 描述               | 默认值     |
| ------------------- | -------------------------- | ------------------ | ---------- |
| `title`             | `string`                   | 顶部标题           | 官方默认值 |
| `loading`           | `boolean`                  | 是否显示加载状态   | 官方默认值 |
| `toolbarPosition`   | ^[enum]`'top' \| 'bottom'` | 工具栏位置         | 官方默认值 |
| `cancelButtonText`  | `string`                   | 取消按钮文案       | 官方默认值 |
| `confirmButtonText` | `string`                   | 确认按钮文案       | 官方默认值 |
| `optionHeight`      | `number \| string`         | 选项高度           | 官方默认值 |
| `visibleOptionNum`  | `number \| string`         | 可见选项个数       | 官方默认值 |
| `swipeDuration`     | `number \| string`         | 滚动惯性动画时长   | 官方默认值 |
| `allowHtml`         | `boolean`                  | 是否渲染 HTML 文案 | 官方默认值 |

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
| `empty`          | 空状态内容       | `-`      |
| `columns-top`    | 选项区顶部内容   | `-`      |
| `columns-bottom` | 选项区底部内容   | `-`      |

### Events

| 事件名              | 描述                     | 回调参数                                                                                                                 |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `update:modelValue` | 点击确认后同步字段值     | ^[Function]`(value: string \| number \| Array<string \| number> \| null) => void`                                        |
| `change`            | 任意列发生切换时触发     | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, columnIndex, field? }) => void`                |
| `confirm`           | 点击确认按钮时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`                             |
| `cancel`            | 点击取消按钮时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, field? }) => void`                             |
| `clickOption`       | 点击某个选项时触发       | ^[Function]`(payload: { selectedValues, selectedOptions, selectedIndexes, columnIndex, currentOption, field? }) => void` |
| `scrollInto`        | 滚动到某个选项时触发     | ^[Function]`(payload: { columnIndex, currentOption, field? }) => void`                                                   |
| `open`              | 弹层打开时触发           | `-`                                                                                                                      |
| `close`             | 弹层关闭时触发           | `-`                                                                                                                      |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                                                                                                      |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                                                                                                      |
| `clickOverlay`      | 点击遮罩层时触发         | ^[Function]`(event: MouseEvent) => void`                                                                                 |
| `update:show`       | 弹层开关变化时触发       | ^[Function]`(visible: boolean) => void`                                                                                  |

### 参考

- [Vant Picker 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/picker)
