# Editable

> 局部编辑器，对于一些空间要求较高的表单区域可以使用该组件
>
> Editable 组件相当于是 FormItem 组件的变体，所以通常放在 decorator 中

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

参考 [/component/form-item#api](./form-item#api)

| 参数      | 说明                   | 类型                           | 默认值 |
| --------- | ---------------------- | ------------------------------ | ------ |
| editProps | 编辑状态下的额外属性值 | ^[object]`参考form-item属性值` | `null` |

### Editable.Popover

> 浮层编辑

参考 [/component/form-item#api](./form-item#api)

参考 [https://cn.element-plus.org/zh-CN/component/popover.html](https://cn.element-plus.org/zh-CN/component/popover.html)

Editable.Popover同时支持FormItem及ElPopover的所有属性，两者应该没有冲突的属性值。如果存在则目前是以FormItem的属性优先。目前暂不支持两者组件的插槽。
