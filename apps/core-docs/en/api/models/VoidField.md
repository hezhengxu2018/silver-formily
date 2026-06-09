---
order: 4
---

# VoidField

The `VoidField` model returned by [createVoidField](/en/api/models/Form#createvoidfield).

All model properties are listed below. If a property is writable, assigning to it directly will trigger `@formily/reactive` and update the UI.

## Properties

| Property    | Description                              | Type                                                       | Readonly | Default      |
| ----------- | ---------------------------------------- | ---------------------------------------------------------- | -------- | ------------ |
| initialized | Whether the field has been initialized   | Boolean                                                    | No       | `false`      |
| mounted     | Whether the field has been mounted       | Boolean                                                    | No       | `false`      |
| unmounted   | Whether the field has been unmounted     | Boolean                                                    | No       | `false`      |
| address     | Field node path                          | [FormPath](https://path.silver-formily.org/api/path-class) | Yes      |              |
| path        | Field data path                          | [FormPath](https://path.silver-formily.org/api/path-class) | Yes      |              |
| title       | Field title                              | Any (determined by the generic `TextType`)                 | No       | `""`         |
| description | Field description                        | Any (determined by the generic `TextType`)                 | No       | `""`         |
| data        | Extended field data                      | Object                                                     | No       | `null`       |
| content     | Field content                            | any                                                        | No       | `null`       |
| decorator   | Field decorator                          | Any[]                                                      | No       | `null`       |
| component   | Field component                          | Any[]                                                      | No       | `null`       |
| parent      | Parent field                             | [GeneralField](#generalfield)                              | Yes      | `null`       |
| display     | Field display state                      | [FieldDisplayTypes](#fielddisplaytypes)                    | No       | `"visible"`  |
| pattern     | Field interaction mode                   | [FieldPatternTypes](#fieldpatterntypes)                    | No       | `"editable"` |
| hidden      | Whether the field is hidden              | Boolean                                                    | No       | `false`      |
| visible     | Whether the field is visible             | Boolean                                                    | No       | `true`       |
| disabled    | Whether the field is disabled            | Boolean                                                    | No       | `false`      |
| readOnly    | Whether the field is read-only           | Boolean                                                    | No       | `false`      |
| readPretty  | Whether the field is in read-pretty mode | Boolean                                                    | No       | `false`      |
| editable    | Whether the field is editable            | Boolean                                                    | No       | `true`       |
| indexes     | Numeric index collection                 | Number[]                                                   | Yes      | `-`          |
| index       | Numeric index                            | Number                                                     | Yes      | `-`          |

### Detailed Explanations

**hidden**

When `true`, `display` is `hidden`; when `false`, `display` is `visible`.

**visible**

When `true`, `display` is `visible`; when `false`, `display` is `none`.

## Methods

### setTitle

#### Description

Sets the field title.

#### Signature

```ts
interface setTitle {
  (title?: any): void
}
```

### setDescription

#### Description

Sets the field description.

#### Signature

```ts
interface setDescription {
  (title?: any): void
}
```

### setDisplay

#### Description

Sets the field display state.

#### Signature

```ts
interface setDisplay {
  (display?: FieldDisplayTypes): void
}
```

`FieldDisplayTypes` reference: [FieldDisplayTypes](#fielddisplaytypes)

### setPattern

#### Description

Sets the field interaction mode.

#### Signature

```ts
interface setPattern {
  (pattern?: FieldPatternTypes): void
}
```

`FieldPatternTypes` reference: [FieldPatternTypes](#fieldpatterntypes)

### setComponent

#### Description

Sets the field component.

#### Signature

```ts
interface setComponent {
  (component?: FieldComponent, props?: any): void
}
```

`FieldComponent` reference: [FieldComponent](#fieldcomponent)

### setComponentProps

#### Description

Sets the field component props.

#### Signature

```ts
interface setComponentProps {
  (props?: any): void
}
```

### setDecorator

#### Description

Sets the field decorator.

#### Signature

```ts
interface setDecorator {
  (decorator?: FieldDecorator, props?: any): void
}
```

`FieldDecorator` reference: [FieldDecorator](#fielddecorator)

### setDecoratorProps

#### Description

Sets the field decorator props.

#### Signature

```ts
interface setDecoratorProps {
  (props?: any): void
}
```

### setState

#### Description

Sets field state.

#### Signature

```ts
interface setState {
  (state: IVoidFieldState): void
  (callback: (state: IVoidFieldState) => void): void
}
```

`IVoidFieldState` reference: [IVoidFieldState](#ivoidfieldstate)

### getState

#### Description

Gets field state.

#### Signature

```ts
interface getState<T> {
  (): IVoidFieldState
  (callback: (state: IVoidFieldState) => T): T
}
```

`IVoidFieldState` reference: [IVoidFieldState](#ivoidfieldstate)

### setData

#### Description

Sets the `data` value.

#### Signature

```ts
interface setData {
  (data: any): void
}
```

### setContent

#### Description

Sets the `content` value.

#### Signature

```ts
interface setContent {
  (content: any): void
}
```

### onInit

#### Description

Triggers field initialization. Usually there is no need to call it manually.

#### Signature

```ts
interface onInit {
  (): void
}
```

### onMount

#### Description

Triggers field mount.

#### Signature

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### Description

Triggers field unmount.

#### Signature

```ts
interface onUnmount {
  (): void
}
```

### query

#### Description

Queries fields. You can query neighboring fields relative to the current field.

#### Signature

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

For the `FormPathPattern` API, see [FormPath](https://path.silver-formily.org/api/patterns).

For the `Query` object API, see [Query](/en/api/models/Query).

### dispose

#### Description

Disposes the observer. Usually there is no need to call it manually.

#### Signature

```ts
interface dispose {
  (): void
}
```

### destroy

#### Description

Disposes the observer and removes the field model.

#### Signature

```ts
interface destroy {
  (): void
}
```

### match

#### Description

Matches the field by path.

#### Signature

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

For the `FormPathPattern` API, see [FormPath](https://path.silver-formily.org/api/patterns).

### inject

#### Description

Injects executable methods into the field model.

#### Signature

```ts
interface inject {
  (actions: Record<string, (...args: any[]) => any>): void
}
```

### invoke

#### Description

Calls an executable method that was injected into the field model via `inject`.

#### Signature

```ts
interface invoke {
  (name: string, ...args: any[]): any
}
```

## Types

<Alert>
Note: if you need to consume these types manually, export them directly from the package module.
</Alert>

### TextType

```ts
type TextType = any
```

At the core layer, `VoidField` does not independently constrain the message types for title and description. Instead, it delegates them upward through the generic `TextType`.

### FieldComponent

```ts
type FieldComponent = string | JSXComponentConstructor
```

Field component. In frameworks that support JSX, `FieldComponent` is best stored as a direct JSX component reference. Otherwise, it can store a component identifier string and be dispatched during rendering.

### FieldDecorator

```ts
type FieldDecorator = string | JSXComponentConstructor
```

Field decorator. In frameworks that support JSX, `FieldDecorator` is best stored as a direct JSX component reference. Otherwise, it can store a component identifier string and be dispatched during rendering.

### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```

### FieldDisplayTypes

```ts
type FieldDisplayTypes = 'none' | 'hidden' | 'visible'
```

### FieldPatternTypes

```ts
type FieldPatternTypes = 'editable' | 'disabled' | 'readOnly' | 'readPretty'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

`Field` reference: [Field](/en/api/models/Field)

`ArrayField` reference: [ArrayField](/en/api/models/ArrayField)

`ObjectField` reference: [ObjectField](/en/api/models/ObjectField)

### IVoidFieldState

```ts
interface IVoidFieldState {
  selfDisplay?: FieldDisplayTypes
  selfPattern?: FieldPatternTypes
  content?: any
  data?: any
  decoratorType?: any
  decoratorProps?: Record<string, any>
  componentType?: any
  componentProps?: Record<string, any>
  designable?: boolean
  hidden?: boolean
  visible?: boolean
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  title?: any
  description?: any
  initialized?: boolean
  mounted?: boolean
  unmounted?: boolean
  decorator?: FieldDecorator
  component?: FieldComponent
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  index?: number
  indexes?: number[]
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IVoidFieldState & IFieldState
```

`IFieldState` reference: [IFieldState](/en/api/models/Field#ifieldstate)
