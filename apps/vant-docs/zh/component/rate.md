---
mobileDemo: rate/index.vue
---

# Rate

> `Rate` 是对 Vant 评分组件的 Formily 适配，适配了阅读态，没有对Vant组件的封装做任何修改。

## 基础使用

<<< @/zh/demos/rate/basic.vue

## 自定义图标

通过 `icon` 设置选中图标，`voidIcon` 设置未选中图标。

<<< @/zh/demos/rate/custom-icon.vue

## 自定义样式

通过 `size`、`color`、`voidColor` 等属性调整评分组件样式。

<<< @/zh/demos/rate/custom-style.vue

## 半星

设置 `allowHalf` 后可以选中半星。

<<< @/zh/demos/rate/allow-half.vue

## 自定义数量

通过 `count` 设置评分总数。

<<< @/zh/demos/rate/custom-count.vue

## 可清空

设置 `clearable` 后，再次点击相同的值可以将评分重置为 `0`。

<<< @/zh/demos/rate/clearable.vue

## 禁用状态

通过 `disabled` 禁用评分。

<<< @/zh/demos/rate/disabled.vue

## 只读状态

通过 `readonly` 将评分设置为只读。

<<< @/zh/demos/rate/readonly.vue

## 只读状态显示小数

设置 `readonly` 和 `allowHalf` 后，评分组件可以展示任意小数结果。

<<< @/zh/demos/rate/readonly-decimal.vue

## API

API配置参考 [Vant Rate 官方文档](https://vant-ui.github.io/vant/#/zh-CN/rate)。
