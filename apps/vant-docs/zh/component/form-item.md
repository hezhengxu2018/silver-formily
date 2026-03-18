---
mobileDemo: form-item/index.vue
---

# FormItem

> `FormItem` 是当前 Vant 封装里的装饰器组件，内部复用了 Vant 的 `Field`，并把默认插槽放进 `#input`

:::tip 提示
Vant实际上并没有`FormItem`组件，在Vant的设计概念中`FormItem`和`Input`是绑定在一起的，即`Field`组件。这里强行拆成两个组件是因为在`formily`的设计体系中`component`和`decorator`是两个独立的概念。
:::

## 职责划分

为了兼容 Formily 的 `decorator + component` 结构，当前 Vant 适配采用了下面这套约定：

- `FormItem` 负责标签、额外说明、校验反馈、必填态等装饰器能力
- `Input` 负责值、只读态、预览态，以及 `clearable`、`showWordLimit` 这类输入行为
- 当输入行为属性写在 `Input` 上时，内部会自动桥接到 `FormItem` 对应的 `VanField`

这意味着日常使用里仍然推荐把输入相关属性写在 `Input` 上，而不是手动分散到 `FormItem`。

## 什么时候写在 FormItem 上

下面这些更适合放在 `FormItem`：

- `feedbackStatus`
- `feedbackText`
- `labelWidth`
- `labelAlign`
- `colon`
- `asterisk`
- `extra`

如果某个属性本身属于 Vant `Field` 的装饰层语义，而不是输入交互，也建议优先写在 `FormItem` 上。

## 基础使用

<<< @/zh/demos/form-item/basic.vue

## 直接使用

<<< @/zh/demos/form-item/manual-feedback.vue
