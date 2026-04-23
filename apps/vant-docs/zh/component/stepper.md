---
mobileDemo: stepper/index.vue
---

# Stepper

> `Stepper` 是对 Vant 步进器组件的 Formily 适配，除了对空值修改之外，没有对官方的配置项做修改。

::: warning 注意

为了保持 Formily 字段“空值不自动写脏”的语义，字段初始值为空时不会自动回填 Vant 内建的 `defaultValue = 1`。如果需要默认值，优先通过 Formily 的 `initialValue` / `initialValues` 提供；只有在明确需要组件层默认值时，再显式传入 `defaultValue`。

:::

## 基础使用

<<< @/zh/demos/stepper/basic.vue

## 指定步长

通过 `step` 控制每次点击加减时的变动粒度。

<<< @/zh/demos/stepper/step.vue

## 限制范围

通过 `min` 和 `max` 约束可输入区间，到达边界后会自动禁用对应按钮。

<<< @/zh/demos/stepper/limit.vue

## 限制输入整数

通过 `integer` 限制只能输入整数。

<<< @/zh/demos/stepper/integer.vue

## 禁用状态

通过 `disabled` 禁用整个步进器。

<<< @/zh/demos/stepper/disabled.vue

## 禁止输入框编辑

通过 `disableInput` 保留加减按钮，只禁止手动输入。

<<< @/zh/demos/stepper/disable-input.vue

## 固定小数位数

通过 `decimalLength` 固定展示的小数位数。

<<< @/zh/demos/stepper/decimal-length.vue

## 自定义大小

通过 `inputWidth` 和 `buttonSize` 调整输入框和按钮尺寸。

<<< @/zh/demos/stepper/custom-size.vue

## 异步变更

通过 `beforeChange` 在值变更前做异步拦截。

<<< @/zh/demos/stepper/async-control.vue

## 圆角风格

通过 `theme="round"` 使用官方提供的圆角风格。

<<< @/zh/demos/stepper/round-theme.vue

## API

### 属性

本组件会透传所有的官方属性及事件，可以直接参考[Vant Stepper 官方文档](https://vant-ui.github.io/vant/#/zh-CN/stepper)。
