---
mobileDemo: input/index.vue
---

# Input

> `Input` 是当前最薄的一层输入组件，用来承接 Formily 的值、只读态和预览态

:::tip 使用约定
虽然当前实现里真正承接 Vant `Field` 的是 `FormItem`，但从使用心智上，`clearable`、`showWordLimit`、`maxlength`、`formatter`、`leftIcon` 这类“输入行为”属性仍然应该写在 `Input` 上。

`@silver-formily/vant` 会在内部把这部分属性自动桥接到 `FormItem`，这样可以继续保持 `FormItem + Input` 的统一写法，同时让 Vant 的输入能力照常生效。
:::

## 推荐写法

- `x-component-props` / `:component="[Input, props]"`：放输入行为属性，例如 `placeholder`、`clearable`、`maxlength`、`showWordLimit`
- `x-decorator-props` / `:decorator="[FormItem, props]"`：放装饰器属性，例如 `labelWidth`、`feedbackStatus`、`feedbackText`

```vue
<Field
  name="description"
  title="详细描述"
  :decorator="[FormItem]"
  :component="[
    Input.TextArea,
    {
      rows: 4,
      maxlength: 120,
      showWordLimit: true,
      clearable: true,
      placeholder: '请输入详细描述',
    },
  ]"
/>
```

## 当前已桥接的常见属性

- `autofocus`
- `autosize`
- `clearable`
- `clearIcon`
- `clearTrigger`
- `formatter`
- `formatTrigger`
- `inputAlign`
- `leftIcon`
- `rightIcon`
- `maxlength`
- `max` / `min`
- `rows`
- `showWordLimit`
- `type`

## 基础输入

<<< @/zh/demos/input/basic.vue

## 预览态

<<< @/zh/demos/input/read-pretty.vue
