---
mobileDemo: area-panel/index.vue
---

# AreaPanel

> `AreaPanel` 是非弹出框模式的省市区滚轮字段组件，直接渲染 Vant `Area`，适合嵌入页面或自定义容器。

:::tip 提示

- `AreaPanel` 不包含触发输入框和 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。
- 字段值保存为区域编码字符串，例如 `'330102'`。

:::

## 基础使用

<<< @/zh/demos/area-panel/basic.vue

## API

### 使用约定

- `areaList` 与 Vant 官方 `Area` 保持一致，可以直接传入 `@vant/area-data` 的 `areaList`
- `dataSource` 会自动映射为 `areaList`
- 默认显示工具栏；滚轮变化不会立即写回，点击确认后才会触发 `update:modelValue`
- `readonly` / `disabled` 会让内部滚轮进入只读态

### Props

| 属性名               | 类型             | 描述                         | 默认值  |
| -------------------- | ---------------- | ---------------------------- | ------- |
| `modelValue`         | `string \| null` | 当前区域编码                 | `-`     |
| `areaList`           | `AreaList`       | 省市区数据                   | `{}`    |
| `columnsNum`         | `number`         | 显示列数，可选 `1`、`2`、`3` | `3`     |
| `columnsPlaceholder` | `string[]`       | 列占位提示                   | `[]`    |
| `readonly`           | `boolean`        | 只读态                       | `false` |
| `disabled`           | `boolean`        | 禁用态                       | `false` |
| `showToolbar`        | `boolean`        | 是否显示顶部工具栏           | `true`  |

### 官方 Area Props

除上述补充能力外，其他属性和插槽均可参考[Vant Area 官方文档](https://vant-ui.github.io/vant/#/zh-CN/area)。

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `confirm`           | 点击确认后触发       | ^[Function]`(value: string \| null) => void` |
| `cancel`            | 点击取消后触发       | `-`                                          |
