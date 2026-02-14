# VoidField

## Description

Vue binding for [createVoidField](https://core.formilyjs.org/api/models/form#createvoidfield) from `@formily/core`. Void fields are layout-only nodes that let you control visibility, interaction modes, and decorators for their descendants while not carrying values themselves. Props follow [IVoidFieldFactoryProps](https://core.formilyjs.org/api/models/form#ivoidfieldfactoryprops).

## Usage

The example shows how a VoidField toggles its children. When the VoidField is hidden (`visible = false`), child values are cleared because the field effectively leaves the tree. Once it becomes visible again, Formily restores the previous state thanks to its snapshot mechanism.

::: demo
api/components/void-field
:::

## Props

::: tip
Ported from the [official definition](https://core.formilyjs.org/zh-CN/api/models/form#ivoidfieldfactoryprops). Because VoidField never holds a value, it will not track the value changes of its descendants, so reactions defined here should never fire.
:::

| Prop             | Description                                                              | Type                                                                 | Default              |
| ---------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------- |
| name             | Unique path of the layout node inside the form                           | [FormPathPattern](#formpathpattern)                                  | —                    |
| basePath         | Base path used when resolving `name`, useful in arrays/nested structures | [FormPathPattern](#formpathpattern)                                  | Current context path |
| title            | Layout label, usually wired to the decorator’s `label`                   | `string` \| `VNode`                                                  | —                    |
| description      | Extra helper text                                                        | `string` \| `VNode`                                                  | —                    |
| display          | Display state: `visible`, `hidden`, or `none`                            | ^[enum]`visible \| hidden \| none`                                   | `visible`            |
| pattern          | Interaction mode: `editable`, `disabled`, `readOnly`, or `readPretty`    | ^[enum]`editable \| readOnly \| disabled \| readPretty`              | `editable`           |
| hidden           | Whether to hide the node (`display: none`)                               | `boolean`                                                            | `false`              |
| visible          | Whether the node renders in the DOM                                      | `boolean`                                                            | `true`               |
| editable         | Controls editability of descendants                                      | `boolean`                                                            | `true`               |
| disabled         | Disables interaction                                                     | `boolean`                                                            | `false`              |
| readOnly         | Enables read-only mode                                                   | `boolean`                                                            | `false`              |
| readPretty       | Use a ReadPretty presenter                                               | `boolean`                                                            | `false`              |
| decorator        | Decorator component tuple `[Component, props]`, or `false`               | `[Component, Props?]` \| `false`                                     | `false`              |
| decoratorContent | Slot payload forwarded to the decorator                                  | `any`                                                                | —                    |
| component        | Layout renderer tuple `[Component, props]`, or `false`                   | `[Component, Props?]` \| `false`                                     | `false`              |
| reactions        | Side-effect handlers (single function or array)                          | [FieldReaction](#fieldreaction) \| [FieldReaction](#fieldreaction)[] | —                    |

#### FormPathPattern

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```

#### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```
