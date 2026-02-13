# Field

## Description

`@silver-formily/vue` ships the Vue adapter for [createField](https://core.formilyjs.org/api/models/form#createfield) from `@formily/core`. It wires the Formily ViewModel to your input components. Component props follow [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops).

The `name` prop is required.

## Usage

::: demo
api/components/field
:::

## API

### Field Props

| Prop             | Description                                                                                  | Type                                                                                                   | Default           |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------- |
| name             | Unique path of the field inside the form                                                     | [FormPathPattern](/types/path.html#formpathpattern)                                                    | —                 |
| basePath         | Base path used to resolve `name`, handy inside nested forms or arrays                        | [FormPathPattern](/types/path.html#formpathpattern)                                                    | Current form root |
| title            | Display label, usually forwarded to the decorator component’s `label` prop                   | `string` \| `VNode`                                                                                    | —                 |
| description      | Helper text displayed under the field                                                        | `string` \| `VNode`                                                                                    | —                 |
| value            | Controlled value                                                                             | `any`                                                                                                  | —                 |
| initialValue     | Initial value, only applied on first mount                                                   | `any`                                                                                                  | —                 |
| required         | Whether the field is required; also affects UI state                                         | `boolean`                                                                                              | `false`           |
| display          | Display state: `visible`, `hidden`, or `none`                                                | ^[enum]`visible \| hidden \| none`                                                                     | `visible`         |
| pattern          | Interaction mode: `editable`, `readOnly`, `disabled`, or `readPretty`                        | ^[enum]`editable \| readOnly \| disabled \| readPretty`                                                | `editable`        |
| hidden           | Force-hide the DOM node (`display: none`)                                                    | `boolean`                                                                                              | `false`           |
| visible          | Whether the component renders in the DOM tree                                                | `boolean`                                                                                              | `true`            |
| editable         | Controls if the user can edit the value                                                      | `boolean`                                                                                              | `true`            |
| disabled         | Disables the component                                                                       | `boolean`                                                                                              | `false`           |
| readOnly         | Read-only state (focusable but not mutable)                                                  | `boolean`                                                                                              | `false`           |
| readPretty       | Pretty-read mode, often paired with read-only presenters                                     | `boolean`                                                                                              | `false`           |
| dataSource       | Options consumed by the component; structure is component-specific                           | `any`                                                                                                  | —                 |
| validateFirst    | Stop validation on first failure                                                             | `boolean`                                                                                              | `false`           |
| validatePattern  | Only validate when the field is in specific interaction modes                                | ^[enum]`editable \| readOnly \| disabled \| readPretty`                                                | —                 |
| validateDisplay  | Only validate when the field is in specific display modes                                    | ^[enum]`visible \| hidden \| none`                                                                     | —                 |
| validator        | Custom validator that shares the Formily `validator` signature (loosely typed as `any` here) | [FieldValidator](/types/validator.html#fieldvalidator)                                                 | —                 |
| decorator        | Decorator component tuple `[Component, props]`, or `false` to disable                        | `[Component, Props?]` \| `false`                                                                       | `false`           |
| decoratorContent | Slot payload forwarded to the decorator (same shape as `x-content`)                          | `any`                                                                                                  | —                 |
| component        | Input component tuple `[Component, props]`, or `false` to disable                            | `[Component, Props?]` \| `false`                                                                       | `false`           |
| reactions        | Reactive effects, either a function or an array of functions                                 | [FieldReaction](/types/field.html#fieldreaction) \| [FieldReaction](/types/field.html#fieldreaction)[] | —                 |
| content          | Slot content passed to the input component (usually the `default` slot)                      | `any`                                                                                                  | —                 |
| data             | Free-form payload available to effects and renderers                                         | `any`                                                                                                  | —                 |

### Field Slots

| Slot    | Description  | Type                                    |
| ------- | ------------ | --------------------------------------- |
| default | Default slot | ^[object]`{ form: Form, field: Field }` |
