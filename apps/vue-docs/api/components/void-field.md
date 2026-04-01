# VoidField

## 描述

作为@formily/core 的 [createVoidField](https://core.formilyjs.org/api/models/form#createvoidfield) Vue 实现，它是专门用于将 ViewModel 与虚拟布局控件做绑定的桥接组件，可以用来控制数据型字段的显示隐藏，交互模式等，VoidField 组件属性参考[IVoidFieldFactoryProps](https://core.formilyjs.org/api/models/form#ivoidfieldfactoryprops)

## 用例

该例子演示了如何用 VoidField 控制子节点显示隐藏，注意观察，VoidField 隐藏的时候，子节点的数据会同时被清空，因为 visible 为 false 代表 display 为 none，这种隐藏是不会保留字段值的。

但是再次显示的时候，又会恢复现场，这里是 Formily Core 内部的特性，支持完全恢复现场的能力。

::: demo
api/components/void-field
:::

## 属性

::: tip 提示
本章节文档拷贝自[官方定义](https://core.formilyjs.org/zh-CN/api/models/form#ivoidfieldfactoryprops)，实际上由于 VoidField 并不承载表单值，因此不会跟踪内部field值的变化， `reaction` 中定义的函数应该永远不会触发。
:::

| 属性                     | 说明                                                       | 类型                                                                                                   | 默认值         |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------- |
| name                     | 节点在 Form 中的路径，必须唯一                             | [FormPathPattern](/types/path.html#formpathpattern)                                                    | —              |
| basePath                 | 计算 `name` 时的基路径，适合在数组/嵌套结构中复用          | [FormPathPattern](/types/path.html#formpathpattern)                                                    | 当前上下文路径 |
| title                    | 布局节点标题，通常映射到装饰器组件的 `label`               | `string` \| `VNode`                                                                                    | —              |
| description              | 布局节点描述信息                                           | `string` \| `VNode`                                                                                    | —              |
| display                  | 展示状态：`visible`、`hidden` 或 `none`                    | ^[enum]`'visible' \| 'hidden' \| 'none'`                                                               | `visible`      |
| pattern                  | 交互模式：`editable`、`disabled`、`readOnly`、`readPretty` | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`                                        | `editable`     |
| hidden                   | 是否隐藏，等价于 `display: none`                           | `boolean`                                                                                              | `false`        |
| visible                  | 是否渲染在 DOM 中                                          | `boolean`                                                                                              | `true`         |
| editable                 | 是否允许编辑（通常影响子节点）                             | `boolean`                                                                                              | `true`         |
| disabled                 | 是否禁用交互                                               | `boolean`                                                                                              | `false`        |
| readOnly                 | 是否进入只读模式                                           | `boolean`                                                                                              | `false`        |
| readPretty               | 是否使用 ReadPretty 组件渲染                               | `boolean`                                                                                              | `false`        |
| decorator                | 装饰器组件及其 props，形如 `[Decorator, props]`            | `[Component, Props?]` \| `false`                                                                       | `false`        |
| decoratorContent ^(beta) | 装饰器插槽内容，避免使用default插槽。                      | `Slots`                                                                                                | —              |
| component                | 布局渲染组件及其 props，形如 `[Component, props]`          | `[Component, Props?]` \| `false`                                                                       | `false`        |
| reactions                | 副作用响应器，支持单个函数或函数数组                       | [FieldReaction](/types/field.html#fieldreaction) \| [FieldReaction](/types/field.html#fieldreaction)[] | —              |
