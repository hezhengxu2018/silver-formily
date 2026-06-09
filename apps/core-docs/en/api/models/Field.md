---
order: 1
---

# Field

The Field model returned by [createField](/en/api/models/Form#createfield). All model properties are listed below. Most writable properties can be assigned directly, and `@formily/reactive` will respond and trigger UI updates.

:::warning Note
For process states like `loading`, `validating`, and `submitting`, direct assignment is not fully equivalent to the corresponding `setXxx` method. Prefer using setters.
:::

## Properties

| Property       | Description                             | Type                                                       | Readonly | Default      |
| -------------- | --------------------------------------- | ---------------------------------------------------------- | -------- | ------------ |
| initialized    | Field initialized                       | Boolean                                                    | No       | `false`      |
| mounted        | Field mounted                           | Boolean                                                    | No       | `false`      |
| unmounted      | Field unmounted                         | Boolean                                                    | No       | `false`      |
| address        | Field node path                         | [FormPath](https://path.silver-formily.org/api/path-class) | Yes      |              |
| path           | Field data path                         | [FormPath](https://path.silver-formily.org/api/path-class) | Yes      |              |
| title          | Field title                             | Any (determined by the `TextType` generic)                 | No       | `""`         |
| description    | Field description                       | Any (determined by the `TextType` generic)                 | No       | `""`         |
| loading        | Field loading state                     | Boolean                                                    | No       | `false`      |
| validating     | Field validating                        | Boolean                                                    | No       | `false`      |
| submitting     | Field submitting                        | Boolean                                                    | No       | `false`      |
| modified       | Field subtree manually modified         | Boolean                                                    | No       | `false`      |
| selfModified   | Field itself manually modified          | Boolean                                                    | No       | `false`      |
| active         | Field active (focused)                  | Boolean                                                    | No       | `false`      |
| visited        | Field visited                           | Boolean                                                    | No       | `false`      |
| inputValue     | Field input value                       | Any                                                        | No       | `null`       |
| inputValues    | Field input value set                   | Array                                                      | No       | `[]`         |
| dataSource     | Field data source                       | Array                                                      | No       | `[]`         |
| validator      | Field validator                         | [FieldValidator](#fieldvalidator)                          | No       | `null`       |
| decorator      | Field decorator                         | Any[]                                                      | No       | `null`       |
| component      | Field component                         | Any[]                                                      | No       | `null`       |
| feedbacks      | Field feedback info                     | [IFieldFeedback](#ifieldfeedback)                          | No       | `[]`         |
| parent         | Parent field                            | [GeneralField](#generalfield)                              | Yes      | `null`       |
| errors         | Field errors (aggregated + children)    | [IFormFeedback](/en/api/models/Form#iformfeedback)         | Yes      | `[]`         |
| warnings       | Field warnings (aggregated + children)  | [IFormFeedback](/en/api/models/Form#iformfeedback)         | Yes      | `[]`         |
| successes      | Field successes (aggregated + children) | [IFormFeedback](/en/api/models/Form#iformfeedback)         | Yes      | `[]`         |
| valid          | Field valid (children included)         | Boolean                                                    | Yes      | `true`       |
| invalid        | Field invalid (children included)       | Boolean                                                    | Yes      | `false`      |
| value          | Field value                             | Any                                                        | No       |              |
| initialValue   | Field initial value                     | Any                                                        | No       |              |
| display        | Field display mode                      | [FieldDisplayTypes](#fielddisplaytypes)                    | No       | `"visible"`  |
| pattern        | Field interaction pattern               | [FieldPatternTypes](#fieldpatterntypes)                    | No       | `"editable"` |
| required       | Field required                          | Boolean                                                    | No       | `false`      |
| hidden         | Field hidden                            | Boolean                                                    | No       | `false`      |
| visible        | Field visible                           | Boolean                                                    | No       | `true`       |
| disabled       | Field disabled                          | Boolean                                                    | No       | `false`      |
| readOnly       | Field read-only                         | Boolean                                                    | No       | `false`      |
| readPretty     | Field read-pretty                       | Boolean                                                    | No       | `false`      |
| editable       | Field editable                          | Boolean                                                    | No       | `true`       |
| validateStatus | Field validation status                 | [FieldValidateStatus](#fieldvalidatestatus)                | Yes      | `null`       |
| content        | Field content, usually child nodes      | any                                                        | No       | `null`       |
| data           | Field extended property                 | Object                                                     | No       | `null`       |
| selfErrors     | Field own error messages                | [FeedbackMessage](#feedbackmessage)                        | No       | `[]`         |
| selfWarnings   | Field own warning messages              | [FeedbackMessage](#feedbackmessage)                        | No       | `[]`         |
| selfSuccesses  | Field own success messages              | [FeedbackMessage](#feedbackmessage)                        | No       | `[]`         |
| selfValid      | Field own valid                         | Boolean                                                    | Yes      | `true`       |
| selfInvalid    | Field own invalid                       | Boolean                                                    | Yes      | `false`      |
| indexes        | Field numeric index set                 | Number[]                                                   | Yes      | `-`          |
| index          | Field numeric index, last of indexes    | Number                                                     | Yes      | `-`          |

### Detailed Explanations

**active**

Set to `true` on `onFocus`, set to `false` on `onBlur`.

**visited**

Once `onFocus` has been triggered, it stays `true` forever.

**inputValue**

The value collected when `onInput` is triggered.

**inputValues**

Multi-argument values collected when `onInput` is triggered.

**loading / validating / submitting**

These three states should preferably be updated via `setLoading`, `setValidating`, and `setSubmitting`. The corresponding setters handle internal timers and lifecycle events in addition to modifying the value; direct assignment only changes the current state value.

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

### setDataSource

#### Description

Sets the field data source.

#### Signature

```ts
interface setDataSource {
  (dataSource?: FieldDataSource): void
}
```

FieldDataSource reference: [FieldDataSource](#fielddatasource)

### setFeedback

#### Description

Sets field feedback messages.

#### Signature

```ts
interface setFeedback {
  (feedback?: IFieldFeedback): void
}
```

IFieldFeedback reference: [IFieldFeedback](#ifieldfeedback)

### setSelfErrors

#### Description

Sets the field's own error messages. Uses `EffectError` code for feedback updates to avoid polluting validator results. To force an override, use `setFeedback`.

#### Signature

```ts
interface setSelfErrors {
  (messages?: FeedbackMessage): void
}
```

### setSelfWarnings

#### Description

Sets the field's own warning messages. Uses `EffectWarning` code for feedback updates to avoid polluting validator results. To force an override, use `setFeedback`.

#### Signature

```ts
interface setSelfWarnings {
  (messages?: FeedbackMessage): void
}
```

### setSelfSuccesses

#### Description

Sets the field's own success messages. Uses `EffectSuccess` code for feedback updates to avoid polluting validator results. To force an override, use `setFeedback`.

#### Signature

```ts
interface setSelfSuccesses {
  (messages?: FeedbackMessage): void
}
```

### setValidator

#### Description

Sets the field validator.

#### Signature

```ts
interface setValidator {
  (validator?: FieldValidator): void
}
```

FieldValidator reference: [FieldValidator](#fieldvalidator)

### setRequired

#### Description

Sets whether the field is required.

#### Signature

```ts
interface setRequired {
  (required?: boolean): void
}
```

### setValidatorRule

#### Description

Sets a rule on the field validator. Similar to `setRequired`.

#### Signature

```ts
interface setValidatorRule {
  (ruleName?: string, ruleValue: any): void
}
```

### setValue

#### Description

Sets the field value.

#### Signature

```ts
interface setValue {
  (value?: FieldValue): void
}
```

FieldValue reference: [FieldValue](#fieldvalue)

### setInitialValue

#### Description

Sets the field initial value.

#### Signature

```ts
interface setInitialValue {
  (initialValue?: FieldValue): void
}
```

FieldValue reference: [FieldValue](#fieldvalue)

### setDisplay

#### Description

Sets the field display mode.

#### Signature

```ts
interface setDisplay {
  (display?: FieldDisplayTypes): void
}
```

FieldDisplayTypes reference: [FieldDisplayTypes](#fielddisplaytypes)

### setPattern

#### Description

Sets the field interaction pattern.

#### Signature

```ts
interface setPattern {
  (pattern?: FieldPatternTypes): void
}
```

FieldPatternTypes reference: [FieldPatternTypes](#fieldpatterntypes)

### setLoading

#### Description

Sets the field loading state. Unlike directly writing `field.loading = true`, this method also handles internal delay and lifecycle notifications.

#### Signature

```ts
interface setLoading {
  (loading?: boolean): void
}
```

### setValidating

#### Description

Sets the field validating state. Unlike directly writing `field.validating = true`, this method also handles runtime state and lifecycle notifications during validation.

#### Signature

```ts
interface setValidating {
  (validating?: boolean): void
}
```

### setSubmitting

#### Description

Sets the field submitting state. Unlike directly writing `field.submitting = true`, this method also handles runtime state and lifecycle notifications during submission.

#### Signature

```ts
interface setSubmitting {
  (submitting?: boolean): void
}
```

### setComponent

#### Description

Sets the field component.

#### Signature

```ts
interface setComponent {
  (component?: FieldComponent, props?: any): void
}
```

FieldComponent reference: [FieldComponent](#fieldcomponent)

### setComponentProps

#### Description

Sets field component properties.

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

FieldDecorator reference: [FieldDecorator](#fielddecorator)

### setDecoratorProps

#### Description

Sets field decorator properties.

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
  (state: IFieldState): void
  (callback: (state: IFieldState) => void): void
}
```

IFieldState reference: [IFieldState](#ifieldstate)

### getState

#### Description

Gets field state.

#### Signature

```ts
interface getState<T> {
  (): IFieldState
  (callback: (state: IFieldState) => T): T
}
```

IFieldState reference: [IFieldState](#ifieldstate)

### setData

#### Description

Sets the Data value.

#### Signature

```ts
interface setData {
  (data: any): void
}
```

### setContent

#### Description

Sets the Content value.

#### Signature

```ts
interface setContent {
  (content: any): void
}
```

### onInit

#### Description

Triggers field initialization. Normally does not need to be called manually.

#### Signature

```ts
interface onInit {
  (): void
}
```

### onMount

#### Description

Triggers field mounting.

#### Signature

```ts
interface onMount {
  (): void
}
```

### onUnmount

#### Description

Triggers field unmounting.

#### Signature

```ts
interface onUnmount {
  (): void
}
```

### onInput

#### Description

Triggers field input.

#### Signature

```ts
interface onInput {
  (...args: any[]): Promise<void>
}
```

### onFocus

#### Description

Triggers field focus.

#### Signature

```ts
interface onFocus {
  (...args: any[]): Promise<void>
}
```

### onBlur

#### Description

Triggers field blur.

#### Signature

```ts
interface onBlur {
  (...args: any[]): Promise<void>
}
```

### submit

#### Description

Triggers field submission (includes all child nodes, mainly for sub-form scenarios).

#### Signature

```ts
interface submit<T> {
  (): Promise<Field['value']>
  (onSubmit?: (values: Field['value']) => Promise<T> | void): Promise<T>
}
```

### validate

#### Description

Triggers field validation (includes all child nodes, mainly for sub-form scenarios).

#### Signature

```ts
interface validate {
  (triggerType?: 'onInput' | 'onFocus' | 'onBlur'): Promise<IValidateResults>
}
```

IValidateResults reference: [IValidateResults](#ivalidateresults)

### reset

#### Description

Triggers field reset (includes all child nodes, mainly for sub-form scenarios). If validation is set, the return is the validation result.

#### Signature

```ts
interface reset {
  (options?: IFieldResetOptions): Promise<IValidateResults>
}
```

IFieldResetOptions reference: [IFieldResetOptions](#ifieldresetoptions)

IValidateResults reference: [IValidateResults](#ivalidateresults)

### query

#### Description

Queries fields. Can query neighboring fields relative to the current field.

#### Signature

```ts
interface query {
  (pattern: FormPathPattern): Query
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/api/patterns)

Query object API reference: [Query](/en/api/models/Query)

### queryFeedbacks

#### Description

Queries the current field's feedback info.

#### Signature

```ts
interface queryFeedbacks {
  (search: ISearchFeedback): IFieldFeedback[]
}
```

ISearchFeedback reference: [ISearchFeedback](#isearchfeedback)

IFieldFeedback reference: [IFieldFeedback](#ifieldfeedback)

### dispose

#### Description

Releases the observer. Normally does not need to be called manually.

#### Signature

```ts
interface dispose {
  (): void
}
```

### destroy

#### Description

Releases the observer and removes the field model.

#### Signature

```ts
interface destroy {
  (): void
}
```

### match

#### Description

Matches fields by path pattern.

#### Signature

```ts
interface match {
  (pattern: FormPathPattern): boolean
}
```

FormPathPattern API reference: [FormPath](https://path.silver-formily.org/api/patterns)

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

Calls an executable method injected into the field model via `inject`.

#### Signature

```ts
interface invoke {
  (name: string, ...args: any[]): any
}
```

## Types

Note: if you want to consume these types manually, export them directly from the package module.

### FieldValidator

For complete documentation, see the [Validation Rules](https://validator.silver-formily.org/api/validate) chapter in the `@silver-formily/validator` docs.

```ts
// String format validator
type ValidatorFormats
  = | 'url'
    | 'email'
    | 'ipv6'
    | 'ipv4'
    | 'number'
    | 'integer'
    | 'idcard'
    | 'qq'
    | 'phone'
    | 'money'
    | 'zh'
    | 'date'
    | 'zip'
    | (string & {}) // other format validators must be registered via registerValidateFormats

// Object validation result
interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
// Object validator
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur'
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  const?: any
  multipleOf?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  maxItems?: number
  maxLength?: number
  minItems?: number
  minLength?: number
  message?: string
  [key: string]: any // other properties must be registered via registerValidateRules
}
// Function validator result type
type ValidatorFunctionResponse = null | string | boolean | IValidateResult

// Function validator
type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

// Non-array validator
type ValidatorDescription
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>

// Array validator
type MultiValidator<Context = any> = ValidatorDescription<Context>[]

type FieldValidator<Context = any>
  = | ValidatorDescription<Context>
    | MultiValidator<Context>
```

### FeedbackMessage

```ts
type FeedbackMessage = any[]
```

The feedback message collection in the current source code is defined directly as `any[]`. This means the core layer does not restrict message content to strings; the exact rendering strategy is determined by the upper UI adapter.

### FieldDataSource

```ts
type FieldDataSource = Array<{
  label?: any
  value?: any
  title?: any
  key?: any
  text?: any
  children?: FieldDataSource
  [key: string]: any
}>
```

The field data source is essentially an array; the content format is up to the user. We recommend using the `label`/`value` format. Note that in UI frameworks, setting it does not automatically take effect — the `dataSource` property must be bound to a specific UI component. For example, in `@formily/react`, use the `connect` function to bind state, or consume it directly inside a component via `useField`.

### FieldValue

The field value type is essentially `Any`. Note that in an ArrayField it is forced to be an array type, and in an ObjectField it is forced to be an object type.

### FieldComponent

```ts
type FieldComponent<Component extends JSXComponent, ComponentProps = any>
  = | [Component]
    | [Component, ComponentProps]
    | boolean
    | any[]
```

In the core layer, field components are stored as runtime configuration slots, typically passed as `[Component, Props]` tuples. They also accept `boolean` or other array forms for interpretation by upper adapters.

### FieldDecorator

```ts
type FieldDecorator<Decorator extends JSXComponent, DecoratorProps = any>
  = | [Decorator]
    | [Decorator, DecoratorProps]
    | boolean
    | any[]
```

The storage form of field decorators is the same as `FieldComponent` — runtime configuration data, not limited to strings or component constructors.

### FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```

### FieldDisplayTypes

```ts
type FieldDisplayTypes = 'none' | 'hidden' | 'visible' | ({} & string)
```

### FieldPatternTypes

```ts
type FieldPatternTypes
  = | 'editable'
    | 'readOnly'
    | 'disabled'
    | 'readPretty'
    | ({} & string)
```

### FieldValidateStatus

```ts
type FieldValidateStatus = 'error' | 'warning' | 'success' | 'validating'
```

### GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

VoidField reference: [VoidField](/en/api/models/VoidField)

ArrayField reference: [ArrayField](/en/api/models/ArrayField)

ObjectField reference: [ObjectField](/en/api/models/ObjectField)

### IFieldFeedback

```ts
interface IFieldFeedback {
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

### ISearchFeedback

```ts
interface ISearchFeedback {
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
  address?: FormPathPattern
  path?: FormPathPattern
  messages?: FeedbackMessage
}
```

### IFieldState

```ts
interface IFieldState {
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
  loading?: boolean
  validating?: boolean
  submitting?: boolean
  selfModified?: boolean
  modified?: boolean
  active?: boolean
  visited?: boolean
  inputValue?: FieldValue
  inputValues?: any[]
  initialized?: boolean
  dataSource?: FieldDataSource
  mounted?: boolean
  unmounted?: boolean
  validator?: FieldValidator
  decorator?: FieldDecorator
  component?: FieldComponent
  feedbacks?: IFieldFeedback[]
  errors?: IFormFeedback[]
  warnings?: IFormFeedback[]
  successes?: IFormFeedback[]
  selfErrors?: FeedbackMessage
  selfWarnings?: FeedbackMessage
  selfSuccesses?: FeedbackMessage
  selfValid?: boolean
  selfInvalid?: boolean
  valid?: boolean
  invalid?: boolean
  value?: FieldValue
  initialValue?: FieldValue
  display?: FieldDisplayTypes
  pattern?: FieldPatternTypes
  required?: boolean
  validateStatus?: 'error' | 'success' | 'warning' | 'validating'
  index?: number
  indexes?: number[]
}
```

### IGeneralFieldState

```ts
type IGeneralFieldState = IFieldState & IVoidFieldState
```

IVoidFieldState reference: [IVoidFieldState](/en/api/models/VoidField#ivoidfieldstate)

### FieldMatchPattern

```ts
type FieldMatchPattern = FormPathPattern | Query | GeneralField
```

Query reference: [Query](/en/api/models/Query)

### IFieldResetOptions

```ts
interface IFieldResetOptions {
  forceClear?: boolean // force clear
  validate?: boolean // validate
}
```

### IValidateResults

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

> Formily TypeScript Type Convention
>
> - Simple non-object data types or union types use `type` and must not start with an uppercase `I`.
> - Simple object types use `interface` and start with an uppercase `I`. Combinations of different interfaces (Intersection or Extends) use `type`, also starting with an uppercase `I`.
