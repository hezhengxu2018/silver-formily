---
order: 0
---

# Form

The core [form model](/en/guide/form) API returned by [createForm](/en/api/entry/createForm). All model properties are listed below. Most writable properties can be assigned directly, and `@formily/reactive` will respond and trigger UI updates.

:::warning Note
For process states like `loading`, `validating`, and `submitting`, direct assignment is not fully equivalent to the corresponding `setXxx` method. Prefer using setters.
:::

## Properties

| Property      | Description              | Type                                  | Readonly | Default           |
| ------------- | ------------------------ | ------------------------------------- | -------- | ----------------- |
| initialized   | Form initialized         | Boolean                               | No       | `false`           |
| loading       | Form loading             | Boolean                               | No       | `false`           |
| validating    | Form validating          | Boolean                               | No       | `false`           |
| submitting    | Form submitting          | Boolean                               | No       | `false`           |
| modified      | Form value modified      | Boolean                               | No       | `false`           |
| pattern       | Form interaction pattern | [FormPatternTypes](#formpatterntypes) | No       | `"editable"`      |
| display       | Form display mode        | [FormDisplayTypes](#formdisplaytypes) | No       | `"visible"`       |
| mounted       | Form mounted             | Boolean                               | No       | `false`           |
| unmounted     | Form unmounted           | Boolean                               | No       | `false`           |
| values        | Form values              | Object                                | No       | `{}`              |
| initialValues | Form initial values      | Object                                | No       | `{}`              |
| valid         | Form valid               | Boolean                               | Yes      | `true`            |
| invalid       | Form invalid             | Boolean                               | Yes      | `false`           |
| errors        | Form error messages      | [IFormFeedback](#iformfeedback)       | Yes      | `[]`              |
| warnings      | Form warning messages    | [IFormFeedback](#iformfeedback)       | Yes      | `[]`              |
| successes     | Form success messages    | [IFormFeedback](#iformfeedback)       | Yes      | `[]`              |
| hidden        | Form hidden              | Boolean                               | No       | `false`           |
| visible       | Form visible             | Boolean                               | No       | `true`            |
| editable      | Form editable            | Boolean                               | No       | `true`            |
| readOnly      | Form read-only           | Boolean                               | No       | `false`           |
| disabled      | Form disabled            | Boolean                               | No       | `false`           |
| readPretty    | Form read-pretty         | Boolean                               | No       | `false`           |
| id            | Form ID                  | String                                | No       | `{RANDOM_STRING}` |
| displayName   | Model label              | String                                | No       | `"Form"`          |

## Methods

### createField

#### Description

Creates a Field instance. If the same path is used, repeated calls will reuse the same instance.

#### Signature

```ts
interface createField {
  (props: IFieldFactoryProps): Field | undefined
}
```

For function parameters, see [IFieldFactoryProps](#ifieldfactoryprops).

### createArrayField

#### Description

Creates an ArrayField instance. If the same path is used, repeated calls will reuse the same instance.

#### Signature

```ts
interface createArrayField {
  (props: IFieldFactoryProps): ArrayField | undefined
}
```

For function parameters, see [IFieldFactoryProps](#ifieldfactoryprops).

### createObjectField

#### Description

Creates an ObjectField instance. If the same path is used, repeated calls will reuse the same instance.

#### Signature

```ts
interface createObjectField {
  (props: IFieldFactoryProps): ObjectField | undefined
}
```

For function parameters, see [IFieldFactoryProps](#ifieldfactoryprops).

### createVoidField

#### Description

Creates a VoidField instance. If the same path is used, repeated calls will reuse the same instance.

#### Signature

```ts
interface createVoidField {
  (props: IVoidFieldFactoryProps): VoidField | undefined
}
```

For function parameters, see [IVoidFieldFactoryProps](#ivoidfieldfactoryprops).

### setValues

#### Description

Sets form values. Supports a merge strategy via [IFormMergeStrategy](#iformmergestrategy).

#### Signature

```ts
interface setValues {
  (values: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setInitialValues

#### Description

Sets form initial values. Supports a merge strategy.

#### Signature

```ts
interface setInitialValues {
  (initialValues: object, strategy: IFormMergeStrategy = 'merge'): void
}
```

### setValuesIn

#### Description

Sets a form value at a specific path.

#### Signature

```ts
interface setValuesIn {
  (path: FormPathPattern, value: any): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### setInitialValuesIn

#### Description

Sets an initial value at a specific path.

#### Signature

```ts
interface setInitialValuesIn {
  (path: FormPathPattern, initialValue: any): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### existValuesIn

#### Description

Checks whether a value exists at the specified path.

#### Signature

```ts
interface existValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### existInitialValuesIn

#### Description

Checks whether an initial value exists at the specified path.

#### Signature

```ts
interface existInitialValuesIn {
  (path: FormPathPattern): boolean
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### getValuesIn

#### Description

Gets a form value at the specified path.

#### Signature

```ts
interface getValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### getInitialValuesIn

#### Description

Gets an initial value at the specified path.

#### Signature

```ts
interface getInitialValuesIn {
  (path: FormPathPattern): any
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### deleteValuesIn

#### Description

Deletes a form value at the specified path.

#### Signature

```ts
interface deleteValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### deleteInitialValuesIn

#### Description

Deletes an initial value at the specified path.

#### Signature

```ts
interface deleteInitialValuesIn {
  (path: FormPathPattern): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### setSubmitting

#### Description

Sets the form submitting state. Unlike directly writing `form.submitting = true`, this method also handles runtime state and lifecycle notifications during submission.

#### Signature

```ts
interface setSubmitting {
  (submitting: boolean): void
}
```

### setValidating

#### Description

Sets the form validating state. Unlike directly writing `form.validating = true`, this method also handles runtime state and lifecycle notifications during validation.

#### Signature

```ts
interface setValidating {
  (validating: boolean): void
}
```

### setLoading

#### Description

Sets the form loading state. Unlike directly writing `form.loading = true`, this method also handles internal delay and lifecycle notifications.

#### Signature

```ts
interface setLoading {
  (loading: boolean): void
}
```

### setDisplay

#### Description

Sets the form display mode.

#### Signature

```ts
interface setDisplay {
  (display: FormDisplayTypes): void
}
```

For function parameters, see [FormDisplayTypes](#formdisplaytypes).

### setPattern

#### Description

Sets the form interaction pattern.

#### Signature

```ts
interface setPattern {
  (pattern: FormPatternTypes): void
}
```

For function parameters, see [FormPatternTypes](#formpatterntypes).

### addEffects

#### Description

Adds side effects.

#### Signature

```ts
interface addEffects {
  (id: string, effects: (form: Form) => void): void
}
```

### removeEffects

#### Description

Removes side effects. The `id` must match the one used in `addEffects`.

#### Signature

```ts
interface removeEffects {
  (id: string): void
}
```

### setEffects

#### Description

Overwrites side effects.

#### Signature

```ts
interface setEffects {
  (effects: (form: Form) => void): void
}
```

### clearErrors

#### Description

Clears error messages.

#### Signature

```ts
interface clearErrors {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### clearWarnings

#### Description

Clears warning messages.

#### Signature

```ts
interface clearWarnings {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### clearSuccesses

#### Description

Clears success messages.

#### Signature

```ts
interface clearSuccesses {
  (pattern?: FormPathPattern): void
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

### query

#### Description

Queries field nodes.

#### Signature

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

Query object API reference: [Query](/en/api/models/Query)

### queryFeedbacks

#### Description

Queries feedback messages.

#### Signature

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFormFeedback[]
}
```

ISearchFeedback reference: [ISearchFeedback](/en/api/models/Field#isearchfeedback)

IFormFeedback reference: [IFormFeedback](#iformfeedback)

### notify

#### Description

Broadcasts a message.

#### Signature

```ts
interface notify<T> {
  (type?: string, payload: T): void
}
```

### subscribe

#### Description

Subscribes to messages.

#### Signature

```ts
interface subscribe<T> {
  (callback: (payload: T) => void): number
}
```

### unsubscribe

#### Description

Unsubscribes from messages.

#### Signature

```ts
interface unsubscribe {
  (id: number): void
}
```

### onInit

#### Description

Triggers form initialization. Normally does not need to be called manually.

#### Signature

```ts
interface onInit {
  (): void
}
```

### onMount

#### Description

Triggers mounting.

#### Signature

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### Description

Triggers unmounting.

#### Signature

```ts
interface onUnmount {
  (): void
}
```

### setState

#### Description

Sets form state.

#### Signature

```ts
interface setState {
  (callback: (state: IFormState) => void): void
  (state: IFormState): void
}
```

IFormState reference: [IFormState](#iformstate)

### getState

#### Description

Gets form state.

#### Signature

```ts
interface getState<T> {
  (): IFormState
  (callback: (state: IFormState) => T): T
}
```

IFormState reference: [IFormState](#iformstate)

### setFormState

Same as `setState`.

### getFormState

Same as `getState`.

### setFieldState

#### Description

Sets field state.

#### Signature

```ts
interface setFieldState {
  (pattern: FieldMatchPattern, setter: (state: IGeneralFieldState) => void): void
  (pattern: FieldMatchPattern, setter: IGeneralFieldState): void
}
```

FieldMatchPattern reference: [FieldMatchPattern](/en/api/models/Field#fieldmatchpattern)

IGeneralFieldState reference: [IGeneralFieldState](/en/api/models/Field#igeneralfieldstate)

### getFieldState

#### Description

Gets field state.

#### Signature

```ts
interface getFieldState<T> {
  (pattern: FieldMatchPattern): IGeneralFieldState | undefined
  (pattern: FieldMatchPattern, callback: (state: IGeneralFieldState) => T): T | undefined
}
```

FieldMatchPattern reference: [FieldMatchPattern](/en/api/models/Field#fieldmatchpattern)

IGeneralFieldState reference: [IGeneralFieldState](/en/api/models/Field#igeneralfieldstate)

### getFormGraph

#### Description

Gets the form field graph.

#### Signature

```ts
interface getFormGraph {
  (): IFormGraph
}
```

IFormGraph reference: [IFormGraph](#iformgraph)

### setFormGraph

#### Description

Sets the form field graph.

#### Signature

```ts
interface setFormGraph {
  (graph: IFormGraph): void
}
```

IFormGraph reference: [IFormGraph](#iformgraph)

### clearFormGraph

#### Description

Clears the field graph.

#### Signature

```ts
interface clearFormGraph {
  (pattern?: FormPathPattern, forceClear?: boolean): void
}
```

### validate

#### Description

Form validation trigger. Can validate by specified path. On success nothing is returned; on failure the promise rejects with [IFormFeedback](#iformfeedback).

#### Signature

```ts
interface validate {
  (pattern: FormPathPattern): Promise<void>
}
```

### submit

#### Description

Form submit method. If the `onSubmit` callback returns a Promise, the form sets `submitting` to `true` at the start and to `false` when the Promise resolves. The view layer can consume `submitting` to prevent duplicate submissions.

#### Signature

```ts
interface submit<T> {
  (): Promise<Form['values']>
  (onSubmit?: (values: Form['values']) => Promise<T> | void): Promise<T>
}
```

### reset

#### Description

Form reset method. Can specify which fields to reset, and whether to auto-validate on reset.

#### Signature

```ts
interface reset {
  (pattern: FormPathPattern, options?: IFieldResetOptions): Promise<void>
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

IFieldResetOptions reference: [IFieldResetOptions](/en/api/models/Field#ifieldresetoptions)

## Types

When consuming types manually, simply export them from the package module.

### FormPatternTypes

```ts
type FormPatternTypes
  = | 'editable'
    | 'readOnly'
    | 'disabled'
    | 'readPretty'
    | ({} & string)
```

### FormDisplayTypes

```ts
type FormDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string)
```

### IFormFeedback

```ts
interface IFormFeedback {
  path?: string // validation field data path
  address?: string // validation field absolute path
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' // validation trigger type
  type?: 'error' | 'success' | 'warning' // feedback type
  code?: // feedback code
    | 'ValidateError'
    | 'ValidateSuccess'
    | 'ValidateWarning'
    | 'EffectError'
    | 'EffectSuccess'
    | 'EffectWarning'
    | (string & {})
  messages?: FeedbackMessage // feedback messages
}
```

### IFormState

```ts
interface IFormState {
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  hidden?: boolean
  visible?: boolean
  initialized?: boolean
  loading?: boolean
  validating?: boolean
  submitting?: boolean
  modified?: boolean
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  values?: any
  initialValues?: any
  mounted?: boolean
  unmounted?: boolean
  readonly valid?: boolean
  readonly invalid?: boolean
  readonly errors?: IFormFeedback[]
  readonly warnings?: IFormFeedback[]
  readonly successes?: IFormFeedback[]
}
```

### IFormGraph

```ts
type IFormGraph = Record<string, IGeneralFieldState | IFormState>
```

### IFormMergeStrategy

```ts
type IFormMergeStrategy = 'overwrite' | 'merge' | 'deepMerge' | 'shallowMerge'
```

### IFieldFactoryProps

```ts
interface IFieldFactoryProps {
  name: FormPathPattern // field name, the path name of the current node
  basePath?: FormPathPattern // base path
  title?: any // field title, determined by the TextType generic
  description?: any // field description, determined by the TextType generic
  loading?: boolean // field loading state
  value?: any // field value
  initialValue?: any // field initial value
  required?: boolean // field required
  display?: 'none' | 'hidden' | 'visible' // field display mode
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' // field interaction pattern
  hidden?: boolean // field hidden
  visible?: boolean // field visible
  editable?: boolean // field editable
  disabled?: boolean // field disabled
  readOnly?: boolean // field read-only
  readPretty?: boolean // field read-pretty
  dataSource?: FieldDataSource // field data source
  validateFirst?: boolean // stop validation on first error
  validatePattern?: ('editable' | 'disabled' | 'readOnly' | 'readPretty')[] // validator can run under which patterns
  validateDisplay?: ('none' | 'hidden' | 'visible')[] // validator can run under which displays
  validator?: FieldValidator // field validator
  decorator?: FieldDecorator // field decorator
  component?: FieldComponent // field component
  reactions?: FieldReaction[] | FieldReaction // field reactions
  content?: any // field content
  data?: any // field extended properties
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

FieldValidator reference: [FieldValidator](/en/api/models/Field#fieldvalidator)

FieldDataSource reference: [FieldDataSource](/en/api/models/Field#fielddatasource)

FieldDecorator reference: [FieldDecorator](/en/api/models/Field#fielddecorator)

FieldComponent reference: [FieldComponent](/en/api/models/Field#fieldcomponent)

FieldReaction reference: [FieldReaction](/en/api/models/Field#fieldreaction)

### IVoidFieldFactoryProps

```ts
interface IVoidFieldFactoryProps {
  name: FormPathPattern // field name, the path name of the current node
  basePath?: FormPathPattern // base path
  title?: any // field title, determined by the TextType generic
  description?: any // field description, determined by the TextType generic
  display?: 'none' | 'hidden' | 'visible' // field display mode
  pattern?: 'editable' | 'disabled' | 'readOnly' | 'readPretty' // field interaction pattern
  hidden?: boolean // field hidden
  visible?: boolean // field visible
  editable?: boolean // field editable
  disabled?: boolean // field disabled
  readOnly?: boolean // field read-only
  readPretty?: boolean // field read-pretty
  decorator?: FieldDecorator // field decorator
  component?: FieldComponent // field component
  reactions?: FieldReaction[] | FieldReaction // field reactions
  content?: any // field content
  data?: any // field extended properties
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/en/guide/patterns)

FieldDecorator reference: [FieldDecorator](/en/api/models/Field#fielddecorator)

FieldComponent reference: [FieldComponent](/en/api/models/Field#fieldcomponent)

FieldReaction reference: [FieldReaction](/en/api/models/Field#fieldreaction)

> Formily TypeScript Type Convention
>
> - Simple non-object data types or union types use `type` and must not start with an uppercase `I`.
> - Simple object types use `interface` and start with an uppercase `I`. Combinations of different interfaces (Intersection or Extends) use `type`, also starting with an uppercase `I`.
