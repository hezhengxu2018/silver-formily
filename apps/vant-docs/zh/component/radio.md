---
mobileDemo: radio/index.vue
---

# Radio

> `Radio.Group` 是面向 Formily 单值字段的 Vant 单选框组封装，延续 `dataSource + option slot + readPretty` 这套现有组件习惯。

:::warning 使用建议
表单场景优先使用 `Radio.Group`，而不是单独的 `Radio`。当前 `Radio` 对外仍然直接暴露原始 `VanRadio`，真正和 Formily 字段值、`dataSource`、阅读态联动的是 `Radio.Group`。
:::

## 基础使用

<<< @/zh/demos/radio/basic.vue

## 排列方向与样式

其中纵向示例改成了 `CellGroup + Cell + Radio` 组合，视觉上会比纯纵向堆叠更适合移动端列表场景。

<<< @/zh/demos/radio/direction.vue

## 搭配单元格组件使用

<<< @/zh/demos/radio/cell.vue

## 配合 Grid 做宫格布局

当选项更像“卡片入口”而不是普通文案时，可以给 `Radio.Group` 传默认插槽，再在内部用 `Grid + Radio` 自己组织布局。

<<< @/zh/demos/radio/grid.vue

## 自定义选项内容

<<< @/zh/demos/radio/slot.vue

## 允许再次点击取消

当某个字段本身允许“不选任何项”时，可以给 `Radio.Group` 打开 `cancelable`，让用户再次点击当前已选项时直接清空值。

<<< @/zh/demos/radio/cancelable.vue

## 禁用状态

<<< @/zh/demos/radio/status.vue

## API

### 使用约定

- `Field` 上的 `dataSource` 会自动映射到 `Radio.Group` 的 `options`
- `readPretty` 模式下会自动显示当前选项的 `label`，找不到匹配项时回退显示原始值
- `cancelable` 开启后，点击当前已选中的选项会清空字段值，适合“可取消”的单选场景
- 对象选项推荐写成 `{ label, value }`，同时也兼容直接传字符串 / 数字 / 布尔值数组
- 如果要复刻 Vant 官方“搭配单元格组件使用”的布局，可以给 `Radio.Group` 传默认插槽，内部直接放原始 `Radio` 子节点
- 如果要做宫格/卡片式选择器，也可以给 `Radio.Group` 传默认插槽，在内部配合 `Grid` 组织布局

### Radio.Group 扩展属性

| 属性名          | 类型                                                | 描述                                   | 默认值  |
| --------------- | --------------------------------------------------- | -------------------------------------- | ------- |
| `options`       | `Array<RadioOption \| string \| number \| boolean>` | 选项列表，通常由 `dataSource` 自动映射 | `[]`    |
| `cancelable`    | `boolean`                                           | 是否允许再次点击已选项时取消选中       | `false` |
| `labelPosition` | ^[enum]`'left' \| 'right'`                          | 统一控制选项文字相对图标的位置         | `-`     |
| `labelDisabled` | `boolean`                                           | 是否禁用点击文字切换                   | `-`     |

### Radio.Group 官方透传属性

以下分组属性会直接透传给 Vant `RadioGroup`：

| 属性名         | 类型                                | 描述     | 默认值     |
| -------------- | ----------------------------------- | -------- | ---------- |
| `modelValue`   | `unknown`                           | 当前值   | `-`        |
| `shape`        | ^[enum]`'round' \| 'dot'`           | 图标形状 | 官方默认值 |
| `direction`    | ^[enum]`'horizontal' \| 'vertical'` | 排列方向 | 官方默认值 |
| `disabled`     | `boolean`                           | 是否禁用 | 官方默认值 |
| `iconSize`     | `number \| string`                  | 图标大小 | 官方默认值 |
| `checkedColor` | `string`                            | 选中颜色 | 官方默认值 |

### RadioOption

对象选项除了 `label` / `value` 之外，也支持透传 Vant 单个 `Radio` 的常见属性：

| 属性名          | 类型                       | 描述                     | 默认值 |
| --------------- | -------------------------- | ------------------------ | ------ |
| `label`         | `any`                      | 选项文案                 | `-`    |
| `value`         | `unknown`                  | 选项值                   | `-`    |
| `disabled`      | `boolean`                  | 单个选项禁用             | `-`    |
| `shape`         | ^[enum]`'round' \| 'dot'`  | 单个选项图标形状         | `-`    |
| `iconSize`      | `number \| string`         | 单个选项图标大小         | `-`    |
| `checkedColor`  | `string`                   | 单个选项选中颜色         | `-`    |
| `labelPosition` | ^[enum]`'left' \| 'right'` | 单个选项文案位置         | `-`    |
| `labelDisabled` | `boolean`                  | 单个选项是否禁用点击文案 | `-`    |

### Radio.Group Slots

| 插槽名    | 描述                                              | 插槽参数                                   |
| --------- | ------------------------------------------------- | ------------------------------------------ |
| `default` | 完全自定义分组内容，适合搭配 `Cell` / `CellGroup` | `-`                                        |
| `option`  | 基于 `options` 自定义每个选项的渲染内容           | ^[object]`{ option: ResolvedRadioOption }` |

### Events

| 事件名              | 描述             | 回调参数                              |
| ------------------- | ---------------- | ------------------------------------- |
| `update:modelValue` | 选中值变化时触发 | ^[Function]`(value: unknown) => void` |

### 参考

属性命名和交互能力主要参考 [Vant Radio 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/radio)。
