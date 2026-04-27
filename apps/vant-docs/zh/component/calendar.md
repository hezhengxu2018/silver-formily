---
mobileDemo: calendar/index.vue
---

# Calendar

:::tip 提示

- 传入与传出的值均经过dayjs转换，变为string。
- 由于 Calendar 组件内置了 `poppable` 属性，本组件没有通过 `createPopup` 进行封装。

:::

## 选择切换模式

<<< @/zh/demos/calendar/switch-mode.vue

## 选择单个日期 / 多个日期 / 日期区间

<<< @/zh/demos/calendar/basic.vue

## 快捷选择

<<< @/zh/demos/calendar/quick-select.vue

## 自定义颜色

<<< @/zh/demos/calendar/custom-color.vue

## 自定义日期范围

<<< @/zh/demos/calendar/custom-range.vue

## 自定义按钮文字

<<< @/zh/demos/calendar/button-text.vue

## 自定义日期文案

<<< @/zh/demos/calendar/formatter.vue

## 自定义插槽

<<< @/zh/demos/calendar/slot.vue

## 自定义弹出位置

<<< @/zh/demos/calendar/popup-position.vue

## 日期区间最大范围

<<< @/zh/demos/calendar/max-range.vue

## 自定义周起始日

<<< @/zh/demos/calendar/first-day.vue

## 平铺展示

官方文档里还有一个依赖 `poppable=false` 的“平铺展示”示例，但当前封装固定为弹层模式，因此这里不提供对应 demo。

## API

### 使用约定

- 由于官方的组件没有`readonly`/`disabled`属性，因此也不再提供`disableTriggerWhenInactive`配置项。 现在`readonly`/`disabled` 都会阻止弹层打开

### 封装补充 Props

| 属性名             | 类型                                 | 描述                 | 默认值                                     |
| ------------------ | ------------------------------------ | -------------------- | ------------------------------------------ |
| `modelValue`       | `string \| string[] \| null`         | 当前选中值           | `-`                                        |
| `format`           | `string`                             | 字段展示区日期格式   | `YYYY-MM-DD`                               |
| `valueFormat`      | `string`                             | 绑定值日期格式       | `YYYY-MM-DD`                               |
| `placeholder`      | `string`                             | 未选择时的展示文案   | 单选为“请选择日期”，区间为“请选择日期范围” |
| `displayFormatter` | ^[Function]`(value, type) => string` | 自定义字段展示区文案 | `-`                                        |
| `disabled`         | `boolean`                            | 禁用状态             | `false`                                    |

### Props

除了 `maxDate` `minDate` 改为字符串格式入参之外，其余的Props与插槽均可直接参考[Vant 官方文档页](https://vant-ui.github.io/vant/#/zh-CN/calendar)

### Events

| 事件名              | 描述                     | 回调参数                                                      |
| ------------------- | ------------------------ | ------------------------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值     | ^[Function]`(value: string \| string[] \| null) => void`      |
| `select`            | 选中任意日期时触发       | ^[Function]`(value: string \| string[] \| null) => void`      |
| `confirm`           | 日期选择完成后触发       | ^[Function]`(value: string \| string[] \| null) => void`      |
| `open`              | 弹层打开时触发           | `-`                                                           |
| `close`             | 弹层关闭时触发           | `-`                                                           |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                                           |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                                           |
| `unselect`          | 多选模式取消选中时触发   | ^[Function]`(value: string) => void`                          |
| `monthShow`         | 月份进入可视区域时触发   | ^[Function]`(payload: { date: Date; title: string }) => void` |
| `overRange`         | 超出最大范围时触发       | `-`                                                           |
| `clickSubtitle`     | 点击副标题时触发         | ^[Function]`(event: MouseEvent) => void`                      |
| `clickDisabledDate` | 点击禁用日期时触发       | ^[Function]`(item: CalendarDayItem) => void`                  |
| `clickOverlay`      | 点击遮罩层时触发         | ^[Function]`(event: MouseEvent) => void`                      |
| `panelChange`       | 面板切换时触发           | ^[Function]`(payload: { date: Date }) => void`                |
| `update:show`       | 弹层开关变化时触发       | ^[Function]`(visible: boolean) => void`                       |
