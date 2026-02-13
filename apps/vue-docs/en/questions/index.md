---
aside: true
outline: 2
---

# Frequently Asked Questions

## How do I register events?

Inside `x-component-props` you can register events with the `@event` shorthand as well as the classic `onXxx` props. The difference is that handlers registered with `@` are not forwarded as props to the underlying component, which keeps compatibility with libraries that already ship `onXxx` props (for example the Element Plus [Upload component](https://element-plus.org/en-US/component/upload.html#attributes)).

::: warning
When both syntaxes target the same event, the `@` form wins. For example, declaring both `@change` and `onChange` will only trigger the `@change` handler.
:::

::: demo
questions/events
:::

## How do I use slots?

Use `x-content` to inject nodes into the component’s `default` slot. You can pass VNodes or renderless components.

::: demo
questions/default-slot
:::

## How do I use named slots?

Map keys inside `x-content` to the slot names.

::: warning
Avoid the reserved keys `template`, `render`, and `setup`. When any of them shows up, the entire `x-content` payload will be treated as a Vue component instead of a slot map.
:::

::: demo
questions/named-slot
:::

## How do I use scoped slots?

When `x-content` contains a functional component, the render function receives a second argument whose `props` bag exposes the scope payload. Both `observer()` and `connect()` wrappers are supported inside these components.

::: demo
questions/scoped-slot
:::

The `ScopedSlotComponent` example defines two props to show the expected shape, but the idiomatic pattern is to rely on a Vue 3 functional component so that only VNodes are rendered.

::: demo
questions/functional-scoped-slot
:::

Check the Vue 3 documentation on functional components for more background.

## How do I pass slots to a decorator?

Decorators wrap your real input with components such as `ElFormItem`. They can now receive slots via two entry points:

- In component mode (`Field`, `ArrayField`, `VoidField`, etc.) bind `decorator-content` (kebab or camel case). Its shape mirrors `x-content`: pass a string, a component, or a map of slot names to components.
- In schema mode declare `x-decorator-content`, reusing the same structure.

:::demo
questions/decorator-slot
:::

```ts
export const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-decorator-content": {
        extra: "Corporate domains are supported",
      },
    },
  },
};
```
