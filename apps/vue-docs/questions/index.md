---
aside: true
outline: 2
---

# 常见问题

## 如何添加事件？

`x-component-props` 中可以用 `@` 来标识事件，同时也支持 `onXxx` 这种方式来标识事件。两者区别在于使用 `@` 标识的内容不会再作为 prop 传入组件，而 `onXxx` 这种会。这是为了兼容某些组件具有 `onXxx` 的 prop，如 ElementUI 中的 [upload 组件](https://element.eleme.cn/#/zh-CN/component/upload#attribute)。

::: warning
事件名冲突时，`@` 的优先级更高。例如同时设置了 `@change` 和 `onChange`，只有 `@change` 会生效。
:::

::: demo
questions/events
:::

## 如何使用插槽？

使用 `x-content` 可以在组件的 `default` 插槽中插入内容。可以传入文本或组件。

::: demo
questions/default-slot
:::

## 如何使用具名插槽？

`x-content` 中以键名来表示插槽名。

::: warning
注意键名不可包含 `template`、`render`、`setup` 三个关键字，否则整个 `x-content` 会被当做 vue 组件进行渲染。
:::

::: demo
questions/named-slot
:::

## 如何使用作用域插槽？

`x-content` 使用函数式组件时, 渲染函数增加第二个参数，通过其 `props` 成员访问作用域插槽传入属性，支持 observer() 和 connect() 接入组件。

::: demo
questions/scoped-slot
:::

你可能会觉得奇怪为什么`ScopedSlotComponent`这个组件定义了两个props来接收作用域插槽中应该获取的作用域。事实上应该使用下面这种更规范的写法，他是Vue3中的函数式组件，因为插槽只接收VNode，除了VNode之外只能使用函数式组件。

::: demo
questions/functional-scoped-slot
:::

更多信息请参考Vue3官方文档中的函数式组件。

## 如何向装饰器传递插槽？

`decorator` 对应的是像 `ElFormItem`、`ArrayCards.Item` 这样的布局包装器，现在可以使用两种方式透传它们的插槽：

- 在组件模式下（`Field`、`ArrayField`、`VoidField` 等），通过驼峰/短横线写法绑定 `decorator-content`，其值可以是字符串、组件或具名插槽映射。
- 在 Schema 模式下使用 `x-decorator-content`，语法与 `x-content` 保持一致。

:::demo
questions/decorator-slot
:::

```ts
export const schema = {
  type: object,
  properties: {
    email: {
      type: string,
      "x-decorator": FormItem,
      "x-component": Input,
      "x-decorator-content": {
        extra: 支持企业邮箱,
      },
    },
  },
};
```
