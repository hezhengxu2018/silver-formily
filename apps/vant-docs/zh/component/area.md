---
mobileDemo: area/index.vue
---

# Area

> `Area` 是基于 Vant `Area` 封装的省市区选择字段，包含触发输入框和 Popup，并复用 `AreaPanel` 作为弹层内容。

:::tip 提示

- 点击触发区后打开 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。
- 字段值保存为区域编码字符串，例如 `'330102'`。

:::

## 基础使用

<<< @/zh/demos/area/basic.vue

## API

### 使用约定

- `areaList` 与 Vant 官方 `Area` 保持一致，可以直接传入 `@vant/area-data` 的 `areaList`
- `dataSource` 会自动映射为 `areaList`
- `readonly` / `disabled` 默认让弹层滚轮只读；如需同时禁用触发区，可开启 `disableTriggerWhenInactive`
- `displayFormatter` 可自定义触发区回显文本

### Props

| 属性名             | 类型             | 描述                         | 默认值   |
| ------------------ | ---------------- | ---------------------------- | -------- |
| `modelValue`       | `string \| null` | 当前区域编码                 | `-`      |
| `areaList`         | `AreaList`       | 省市区数据                   | `{}`     |
| `columnsNum`       | `number`         | 显示列数，可选 `1`、`2`、`3` | `3`      |
| `placeholder`      | `string`         | 触发输入框占位文本           | `请选择` |
| `separator`        | `string`         | 触发输入框回显分隔符         | `/`      |
| `popupProps`       | `object`         | 透传给 Popup 的属性          | `{}`     |
| `displayFormatter` | `Function`       | 自定义触发输入框回显         | `-`      |

### 官方 Area Props

除上述补充能力外，其他属性和插槽均可参考[Vant Area 官方文档](https://vant-ui.github.io/vant/#/zh-CN/area)。

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `opened`            | 弹层打开后触发       | `-`                                          |
| `closed`            | 弹层关闭后触发       | `-`                                          |
