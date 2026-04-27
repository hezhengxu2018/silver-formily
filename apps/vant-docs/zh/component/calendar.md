---
mobileDemo: calendar/index.vue
---

# Calendar

> `Calendar` 是基于 Vant 官方 `Calendar` 做的表单封装，目标是尽量兼容官方 props / slots / events，同时保留“弹层状态内置、用户不用手动管理”的交互。

:::tip 与官方的差异

- 当前封装不需要也不建议手动传 `show`
- 当前固定使用弹层模式，不暴露 `poppable`
- 当前不对外暴露实例方法
- `modelValue` / `defaultDate` 使用字符串日期，默认格式为 `YYYY-MM-DD`
- 字段展示区默认格式为 `YYYY-MM-DD`，仅在点击确认后同步 `modelValue`
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

- 推荐和 `FormItem` 搭配使用，由 `FormItem` 负责 label、箭头、反馈等壳层展示
- 未确认的临时选择会在关闭弹层时回滚
- `readonly` / `readOnly` / `disabled` 都会阻止弹层打开
- 当前不支持通过组件 `ref` 调用官方 `Calendar` 实例方法

### 封装补充 Props

| 属性名             | 类型                                 | 描述                 | 默认值                                     |
| ------------------ | ------------------------------------ | -------------------- | ------------------------------------------ |
| `modelValue`       | `string \| string[] \| null`         | 当前选中值           | `-`                                        |
| `format`           | `string`                             | 字段展示区日期格式   | `YYYY-MM-DD`                               |
| `valueFormat`      | `string`                             | 绑定值日期格式       | `YYYY-MM-DD`                               |
| `placeholder`      | `string`                             | 未选择时的展示文案   | 单选为“请选择日期”，区间为“请选择日期范围” |
| `displayFormatter` | ^[Function]`(value, type) => string` | 自定义字段展示区文案 | `-`                                        |
| `disabled`         | `boolean`                            | 禁用状态             | `false`                                    |

### 官方基础 Props

以下官方属性已透传：

| 属性名                | 类型                                       | 描述                 | 默认值     |
| --------------------- | ------------------------------------------ | -------------------- | ---------- |
| `type`                | ^[enum]`'single' \| 'multiple' \| 'range'` | 选择类型             | 官方默认值 |
| `switchMode`          | ^[enum]`'none' \| 'month' \| 'year-month'` | 切换模式             | 官方默认值 |
| `title`               | `string`                                   | 日历标题             | 官方默认值 |
| `color`               | `string`                                   | 主题色               | 官方默认值 |
| `minDate`             | `Date`                                     | 可选择的最小日期     | 官方默认值 |
| `maxDate`             | `Date`                                     | 可选择的最大日期     | 官方默认值 |
| `defaultDate`         | `string \| string[] \| null`               | 默认选中的日期       | 官方默认值 |
| `rowHeight`           | `number \| string`                         | 日期行高             | 官方默认值 |
| `formatter`           | ^[Function]`(day) => day`                  | 日期格式化函数       | `-`        |
| `lazyRender`          | `boolean`                                  | 是否只渲染可视区域   | 官方默认值 |
| `showMark`            | `boolean`                                  | 是否显示月份背景水印 | 官方默认值 |
| `showTitle`           | `boolean`                                  | 是否展示标题         | 官方默认值 |
| `showSubtitle`        | `boolean`                                  | 是否展示副标题       | 官方默认值 |
| `showConfirm`         | `boolean`                                  | 是否展示确认按钮     | 官方默认值 |
| `readonly`            | `boolean`                                  | 只读状态             | 官方默认值 |
| `confirmText`         | `string`                                   | 确认按钮文字         | 官方默认值 |
| `confirmDisabledText` | `string`                                   | 确认按钮禁用时的文字 | 官方默认值 |
| `firstDayOfWeek`      | `number \| string`                         | 周起始日             | 官方默认值 |

### 官方弹层 Props

虽然这里固定是弹层模式，但下列官方弹层属性仍然可用：

| 属性名                | 类型                                            | 描述                   | 默认值     |
| --------------------- | ----------------------------------------------- | ---------------------- | ---------- |
| `position`            | ^[enum]`'bottom' \| 'top' \| 'left' \| 'right'` | 弹出位置               | 官方默认值 |
| `round`               | `boolean`                                       | 是否显示圆角弹窗       | 官方默认值 |
| `closeOnPopstate`     | `boolean`                                       | 回退时是否自动关闭     | 官方默认值 |
| `closeOnClickOverlay` | `boolean`                                       | 点击遮罩后是否关闭     | 官方默认值 |
| `safeAreaInsetTop`    | `boolean`                                       | 是否开启顶部安全区适配 | 官方默认值 |
| `safeAreaInsetBottom` | `boolean`                                       | 是否开启底部安全区适配 | 官方默认值 |
| `teleport`            | `string \| Element`                             | 指定挂载节点           | 官方默认值 |

### 官方 Range / Multiple Props

| 属性名            | 类型               | 描述                   | 默认值     |
| ----------------- | ------------------ | ---------------------- | ---------- |
| `maxRange`        | `number \| string` | 最多可选天数           | 官方默认值 |
| `rangePrompt`     | `string`           | 超范围提示文案         | 官方默认值 |
| `showRangePrompt` | `boolean`          | 是否展示超范围提示     | 官方默认值 |
| `allowSameDay`    | `boolean`          | 区间模式是否允许同一天 | 官方默认值 |

### 官方 Slots

以下官方插槽已转发：

| 插槽名         | 描述                   | 插槽参数                                 |
| -------------- | ---------------------- | ---------------------------------------- |
| `title`        | 自定义标题             | `-`                                      |
| `subtitle`     | 自定义日历副标题       | ^[object]`{ text: string; date?: Date }` |
| `month-title`  | 自定义每个月份的小标题 | ^[object]`{ text: string; date: Date }`  |
| `footer`       | 自定义底部区域内容     | `-`                                      |
| `confirm-text` | 自定义确认按钮内容     | ^[object]`{ disabled: boolean }`         |
| `top-info`     | 自定义日期上方提示信息 | `day`                                    |
| `bottom-info`  | 自定义日期下方提示信息 | `day`                                    |
| `text`         | 自定义日期内容         | `day`                                    |
| `prev-month`   | 自定义上个月按钮       | ^[object]`{ disabled: boolean }`         |
| `prev-year`    | 自定义上一年按钮       | ^[object]`{ disabled: boolean }`         |
| `next-month`   | 自定义下个月按钮       | ^[object]`{ disabled: boolean }`         |
| `next-year`    | 自定义下一年按钮       | ^[object]`{ disabled: boolean }`         |

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

### 参考

本页 props / slots / events 以 Vant 官方仓库当前 `main` 分支文档为参考：

- [Vant 官方文档页](https://vant-ui.github.io/vant/#/zh-CN/calendar)
- [官方文档源码 README.zh-CN.md](https://github.com/youzan/vant/blob/main/packages/vant/src/calendar/README.zh-CN.md)
