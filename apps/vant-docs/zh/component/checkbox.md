---
mobileDemo: checkbox/index.vue
---

# Checkbox

> `Checkbox` 适合布尔值字段，`Checkbox.Group` 适合多选数组字段，整体延续 `dataSource + option slot + readPretty` 这套现有 Vant 封装习惯。

:::warning 使用建议
协议确认、订阅开关这类单值场景优先使用 `Checkbox`；需要把 `dataSource` 直接映射成多选列表时再使用 `Checkbox.Group`。
:::

## 单个复选框

<<< @/zh/demos/checkbox/single.vue

## 基础多选

<<< @/zh/demos/checkbox/basic.vue

## 排列方式与最多选择数量

<<< @/zh/demos/checkbox/max.vue

## 搭配单元格组件使用

<<< @/zh/demos/checkbox/cell.vue

## 自定义选项内容

<<< @/zh/demos/checkbox/slot.vue

## 禁用状态

<<< @/zh/demos/checkbox/status.vue

## API

### 使用约定

- `Field` 上的 `dataSource` 会自动映射到 `Checkbox.Group` 的 `options`
- `Checkbox.Group` 在 `readPretty` 模式下会自动显示已选选项的 `label`，找不到匹配项时回退显示原始值
- 对象选项推荐写成 `{ label, value }`，同时也兼容直接传字符串 / 数字 / 布尔值数组
- 如果要复刻 Vant 官方“搭配单元格组件使用”的布局，可以给 `Checkbox.Group` 传默认插槽，内部直接放原始 `Checkbox` 子节点

### Checkbox 官方透传属性

以下属性会直接透传给 Vant `Checkbox`：

| 属性名          | 类型                         | 描述                 | 默认值     |
| --------------- | ---------------------------- | -------------------- | ---------- |
| `modelValue`    | `unknown`                    | 当前勾选值           | `-`        |
| `name`          | `unknown`                    | 选项值               | `-`        |
| `shape`         | ^[enum]`'round' \| 'square'` | 图标形状             | 官方默认值 |
| `disabled`      | `boolean`                    | 是否禁用             | 官方默认值 |
| `iconSize`      | `number \| string`           | 图标大小             | 官方默认值 |
| `checkedColor`  | `string`                     | 选中颜色             | 官方默认值 |
| `labelPosition` | ^[enum]`'left' \| 'right'`   | 文字相对图标的位置   | 官方默认值 |
| `labelDisabled` | `boolean`                    | 是否禁用点击文字切换 | 官方默认值 |
| `indeterminate` | `boolean \| null`            | 是否显示半选状态     | 官方默认值 |
| `bindGroup`     | `boolean`                    | 是否绑定到分组上下文 | 官方默认值 |

### Checkbox.Group 扩展属性

| 属性名          | 类型                                                   | 描述                                   | 默认值 |
| --------------- | ------------------------------------------------------ | -------------------------------------- | ------ |
| `options`       | `Array<CheckboxOption \| string \| number \| boolean>` | 选项列表，通常由 `dataSource` 自动映射 | `[]`   |
| `labelPosition` | ^[enum]`'left' \| 'right'`                             | 统一控制选项文字相对图标的位置         | `-`    |
| `labelDisabled` | `boolean`                                              | 是否禁用点击文字切换                   | `-`    |

### Checkbox.Group 官方透传属性

以下分组属性会直接透传给 Vant `CheckboxGroup`：

| 属性名         | 类型                                | 描述         | 默认值     |
| -------------- | ----------------------------------- | ------------ | ---------- |
| `modelValue`   | `unknown[]`                         | 当前选中值   | `[]`       |
| `max`          | `number \| string`                  | 最大可选数量 | 官方默认值 |
| `shape`        | ^[enum]`'round' \| 'square'`        | 图标形状     | 官方默认值 |
| `direction`    | ^[enum]`'horizontal' \| 'vertical'` | 排列方向     | 官方默认值 |
| `disabled`     | `boolean`                           | 是否禁用     | 官方默认值 |
| `iconSize`     | `number \| string`                  | 图标大小     | 官方默认值 |
| `checkedColor` | `string`                            | 选中颜色     | 官方默认值 |

### CheckboxOption

对象选项除了 `label` / `value` 之外，也支持透传 Vant 单个 `Checkbox` 的常见属性：

| 属性名          | 类型                         | 描述                     | 默认值 |
| --------------- | ---------------------------- | ------------------------ | ------ |
| `label`         | `any`                        | 选项文案                 | `-`    |
| `value`         | `unknown`                    | 选项值                   | `-`    |
| `disabled`      | `boolean`                    | 单个选项禁用             | `-`    |
| `shape`         | ^[enum]`'round' \| 'square'` | 单个选项图标形状         | `-`    |
| `iconSize`      | `number \| string`           | 单个选项图标大小         | `-`    |
| `checkedColor`  | `string`                     | 单个选项选中颜色         | `-`    |
| `labelPosition` | ^[enum]`'left' \| 'right'`   | 单个选项文案位置         | `-`    |
| `labelDisabled` | `boolean`                    | 单个选项是否禁用点击文案 | `-`    |
| `indeterminate` | `boolean \| null`            | 单个选项是否显示半选状态 | `-`    |
| `bindGroup`     | `boolean`                    | 是否绑定到当前分组       | `-`    |

### Slots

#### Checkbox

| 插槽名    | 描述           | 插槽参数 |
| --------- | -------------- | -------- |
| `default` | 复选框文案内容 | `-`      |
| `icon`    | 自定义图标     | 官方参数 |

#### Checkbox.Group

| 插槽名    | 描述                                              | 插槽参数                                      |
| --------- | ------------------------------------------------- | --------------------------------------------- |
| `default` | 完全自定义分组内容，适合搭配 `Cell` / `CellGroup` | `-`                                           |
| `option`  | 基于 `options` 自定义每个选项的渲染内容           | ^[object]`{ option: ResolvedCheckboxOption }` |

### Events

| 事件名              | 描述              | 回调参数                                           |
| ------------------- | ----------------- | -------------------------------------------------- |
| `update:modelValue` | 勾选值变化时触发  | ^[Function]`(value: unknown \| unknown[]) => void` |
| `change`            | Vant 原生变更事件 | ^[Function]`(value: unknown \| unknown[]) => void` |

### 参考

属性命名和交互能力主要参考 [Vant Checkbox 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/checkbox)。
