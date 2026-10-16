# VoidField

## 描述

作为 `@silver-formily/core` 中 [createVoidField](https://core.silver-formily.org/api/models/Form#createvoidfield) 的 React 实现，它是专门用于将 ViewModel 与虚拟布局控件做绑定的桥接组件，可以用来控制数据型字段的显示隐藏、交互模式等，VoidField 组件属性参考 [IVoidFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ivoidfieldfactoryprops)

## 用例

该例子演示了如何用 VoidField 控制子节点显示隐藏，注意观察，VoidField 隐藏的时候，子节点的数据会同时被清空，因为 visible 为 false 代表 display 为 none，这种隐藏是不会保留字段值的。

但是再次显示的时候，又会恢复现场，这里是 Formily Core 内部的特性，支持完全恢复现场的能力。

:::demo
api/components/void-field.tsx
:::

## 属性

VoidField 不承载值，但 `reactions` 可以正常追踪其他字段或响应式状态。它不会注入数据字段的 `value` 或模型事件包装器；组件事件回调直接透传。

| 属性                      | 说明                                                                                                                                        | 类型                                                                                                                                                                 | 默认值                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| name                      | 节点在 Form 中的路径，必须唯一                                                                                                              | [FormPathPattern](/types/path.html#formpathpattern)                                                                                                                  | —                                |
| basePath                  | 计算 `name` 时的基路径，适合在数组/嵌套结构中复用                                                                                           | [FormPathPattern](/types/path.html#formpathpattern)                                                                                                                  | 父字段 address，否则为表单根路径 |
| title                     | 布局节点标题，通常映射到装饰器组件的 `label`                                                                                                | `any`                                                                                                                                                                | —                                |
| description               | 布局节点描述信息                                                                                                                            | `any`                                                                                                                                                                | —                                |
| display                   | 展示状态：`visible`、`hidden` 或 `none`                                                                                                     | ^[enum]`'visible' \| 'hidden' \| 'none'`                                                                                                                             | `visible`                        |
| pattern                   | 交互模式：`editable`、`disabled`、`readOnly`、`readPretty`                                                                                  | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`                                                                                                      | `editable`                       |
| hidden                    | 隐藏渲染但保留字段值（`display: hidden`）                                                                                                   | `boolean`                                                                                                                                                            | `false`                          |
| visible                   | `false` 设置 `display: none`；`true` 设置 `display: visible`                                                                                | `boolean`                                                                                                                                                            | `true`                           |
| editable                  | 是否允许编辑（通常影响子节点）                                                                                                              | `boolean`                                                                                                                                                            | `true`                           |
| disabled                  | 是否禁用交互                                                                                                                                | `boolean`                                                                                                                                                            | `false`                          |
| readOnly                  | 是否进入只读模式                                                                                                                            | `boolean`                                                                                                                                                            | `false`                          |
| readPretty                | 设置 readPretty 模式，后代可继承该模式                                                                                                      | `boolean`                                                                                                                                                            | `false`                          |
| decorator                 | 装饰器组件及其 props，形如 `[Decorator, props]`                                                                                             | `[]` \| `[D]` \| `[D, Partial<React.ComponentProps<D>>]`                                                                                                             | —                                |
| decoratorContent ^(beta)  | 装饰器内容：纯内容（字符串/ReactNode）作为约定 prop `content` 传给装饰器，对象映射展开为装饰器的多个 props，与 `decorator` props 同名时优先 | ^[string]`string` \| `React.ReactNode` \| `Record<string, React.ReactNode>`                                                                                          | —                                |
| component                 | 布局渲染组件及其 props，形如 `[Component, props]`                                                                                           | `[]` \| `[C]` \| `[C, Partial<React.ComponentProps<C>>]`                                                                                                             | —                                |
| reactions                 | 副作用响应器，支持单个函数或函数数组                                                                                                        | [FieldReaction[]](https://core.silver-formily.org/api/models/Field#fieldreaction) \| [FieldReaction](https://core.silver-formily.org/api/models/Field#fieldreaction) | —                                |
| mountedReactions ^(1.0.0) | 表单首批字段全部挂载后启动、字段卸载时自动停止的副作用响应器                                                                                | [FieldReaction[]](https://core.silver-formily.org/api/models/Field#fieldreaction) \| [FieldReaction](https://core.silver-formily.org/api/models/Field#fieldreaction) | —                                |
| children                  | 子节点或渲染函数                                                                                                                            | `React.ReactNode` ^[Function]`(field: VoidField, form: Form) => React.ReactNode`                                                                                     | —                                |

其他可选属性包括来自 Core 的 `content?: any`、`data?: any`，以及 `children?: RenderPropsChildren<VoidField>`。`name` 必填；生命周期行为与 [Field](./field) 相同。

Core 将 `title`、`description`、`content` 声明为 `any`，放入 React 渲染树的内容仍须是合法 ReactNode。表中 display/pattern 默认值以没有父字段或表单状态覆盖为前提。
