# Editable

> 局部编辑器，对于一些空间要求较高的表单区域可以使用该组件
>
> Editable 组件相当于是 FormItem 组件的变体，所以通常放在 decorator 中

::: warning 注意
由于 readPretty 状态下无法触发 formily 的校验，本组件库中所有组件的阅读态映射没有使用官方的mapReadPretty，而是使用了内部改造过的mapReadPretty函数，该函数会额外读取Field模型中data对象上的readPretty属性，如果为`true`则同样会呈现阅读态，这种模拟的阅读态不会阻止formily的校验，如果自行封装的组件想使用Editable组件请使用`@silver-formily/element-plus/__builtins__`中引入`mapReadPretty`。不然会出现阅读态无法呈现的问题。
:::

::: tip 提示
`@formily/core`从[v2.3.3](https://github.com/alibaba/formily/releases/tag/v2.3.3)开始支持配置触发校验的状态。如果使用`2.3.3`以上版本可以通过该属性来使用内置的`mapReadPretty`，同样可以触发校验。
:::

::: tip 提示
Editable 组件现在切换状态时不会修改Field的`pattern`属性，而是修改Field字段模型中data对象上的`readPretty`属性，原因见上。
:::

## Markup Schema 案例

:::demo

editable/markup-schema

:::

## JSON Schema 案例

> 使用`editProps`属性控制编辑状态下的尺寸

:::demo

editable/json-schema

:::

## Template 案例

:::demo

editable/template

:::

## Template 校验案例

:::demo

editable/template-validator

:::

## API

### Editable

> 内联编辑

参考 [/component/form-item.html#api](./form-item.html#api)

| 参数      | 说明                   | 类型                           | 默认值 |
| --------- | ---------------------- | ------------------------------ | ------ |
| editProps | 编辑状态下的额外属性值 | ^[object]`参考form-item属性值` | `null` |

### Editable.Popover

> 浮层编辑

参考 [/component/form-item.html#api](./form-item.html#api)

参考 [https://cn.element-plus.org/zh-CN/component/popover.html](https://cn.element-plus.org/zh-CN/component/popover.html)

Editable.Popover同时支持FormItem及ElPopover的所有属性，两者应该没有冲突的属性值。如果存在则目前是以FormItem的属性优先。目前暂不支持两者组件的插槽。
