# Field

## 描述

作为 `@silver-formily/core` 中 [createField](https://core.silver-formily.org/api/models/Form#createfield) 的 React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，Field 组件属性参考 [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops)

name 属性必填。

## 用例

:::demo
api/components/field.tsx
:::

## API

### Field 属性

| 属性                      | 说明                                                                           | 类型                                                                                                                                                                 | 默认值         |
| ------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| name                      | 字段在 Form 中的路径，必须唯一                                                 | [FormPathPattern](/types/path.html#formpathpattern)                                                                                                                  | —              |
| basePath                  | 推导 `name` 的基准路径，常用于局部表单或数组项                                 | [FormPathPattern](/types/path.html#formpathpattern)                                                                                                                  | 当前表单根路径 |
| title                     | 字段展示标题，通常映射到装饰器组件的 `label`                                   | `string` \| `React.ReactNode`                                                                                                                                        | —              |
| description               | 字段辅助描述信息                                                               | `string` \| `React.ReactNode`                                                                                                                                        | —              |
| value                     | 字段当前值（受控模式）                                                         | `any`                                                                                                                                                                | —              |
| initialValue              | 字段初始值（只在首次挂载时生效）                                               | `any`                                                                                                                                                                | —              |
| required                  | 是否必填，会驱动校验与 UI 状态                                                 | `boolean`                                                                                                                                                            | `false`        |
| display                   | 展示状态：`visible`、`hidden`、`none`                                          | ^[enum]`'visible' \| 'hidden' \| 'none'`                                                                                                                             | `visible`      |
| pattern                   | 交互模式：`editable`、`readOnly`、`disabled`、`readPretty`                     | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`                                                                                                      | `editable`     |
| hidden                    | 强制隐藏 DOM（等价于 `display: none`）                                         | `boolean`                                                                                                                                                            | `false`        |
| visible                   | 控制是否渲染在 DOM 树中                                                        | `boolean`                                                                                                                                                            | `true`         |
| editable                  | 是否允许编辑                                                                   | `boolean`                                                                                                                                                            | `true`         |
| disabled                  | 是否禁用（组件不可交互）                                                       | `boolean`                                                                                                                                                            | `false`        |
| readOnly                  | 是否只读（仍可聚焦但不可修改）                                                 | `boolean`                                                                                                                                                            | `false`        |
| readPretty                | 是否进入只读展示态（常配合 [mapReadPretty](/api/shared/map-read-pretty) 使用） | `boolean`                                                                                                                                                            | `false`        |
| loading                   | 字段加载态                                                                     | `boolean`                                                                                                                                                            | `false`        |
| dataSource                | 组件可选项数据源，数据结构实际上并无要求，组件能消费即可                       | `any`                                                                                                                                                                | -              |
| validateFirst             | 校验失败时是否立即停止后续规则                                                 | `boolean`                                                                                                                                                            | `false`        |
| validatePattern           | 仅在指定 `pattern` 下触发的校验                                                | ^[enum]`'editable' \| 'readOnly' \| 'disabled' \| 'readPretty'`                                                                                                      | —              |
| validateDisplay           | 仅在指定 `display` 下触发的校验                                                | ^[enum]`'visible' \| 'hidden' \| 'none'`                                                                                                                             | —              |
| validator                 | 自定义校验器，签名与 Formily `validator` 一致                                  | [FieldValidator](/types/validator.html#fieldvalidator)                                                                                                               | —              |
| decorator                 | 装饰器组件及其 props，形如 `[Decorator, props]`                                | `[Component, Props?]` \| `false`                                                                                                                                     | `false`        |
| component                 | 输入组件及其 props，形如 `[Component, props]`                                  | `[Component, Props?]` \| `false`                                                                                                                                     | `false`        |
| reactions                 | 响应式副作用，支持函数或函数数组                                               | [FieldReaction[]](https://core.silver-formily.org/api/models/Field#fieldreaction) \| [FieldReaction](https://core.silver-formily.org/api/models/Field#fieldreaction) | —              |
| mountedReactions ^(3.2.0) | 表单首批字段全部挂载后启动、字段卸载时自动停止的响应式副作用                   | [FieldReaction[]](https://core.silver-formily.org/api/models/Field#fieldreaction) \| [FieldReaction](https://core.silver-formily.org/api/models/Field#fieldreaction) | —              |
| content                   | 传给输入组件的子节点                                                           | `React.ReactNode`                                                                                                                                                    | —              |
| data                      | 透传的扩展数据，可在副作用或组件中读取                                         | `any`                                                                                                                                                                | —              |
| children                  | 渲染函数或子节点，渲染函数接收 `(field, form)`                                 | ^[Function]`(field: Field, form: Form) => React.ReactNode` \| `React.ReactNode`                                                                                      | —              |

:::tip 提示
属性中未标明的值会透传给 decorator 或 component。输入组件会额外收到由字段模型推导的 `value`、`onChange`、`onFocus`、`onBlur`、`disabled`、`readOnly`，`disabled` / `readOnly` 由字段的 `pattern` 自动推导。
:::
