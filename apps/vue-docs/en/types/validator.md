# Validator Types

Read this section from bottom to top; the basic building blocks live near the end, and the composite aliases appear first.

## String Formats

### ValidatorFormats

String-based format validators. Register custom formats via `registerValidateFormats` when needed.

```ts twoslash include ValidatorFormats
/** Built-in string-based format validators. Register extras via registerValidateFormats. */
// ---cut---
export type ValidatorFormats
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
    | (string & {})
```

## Object Validators

### IValidateResult

```ts twoslash include IValidateResult
/** Validation result structure for object-style validators. */
// ---cut---
export interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
```

### IValidatorRules

```ts twoslash include IValidatorRules
// @include: ValidatorFormats
// @include: IValidateResult
export type ValidatorFunctionResponse
  = | null
    | string
    | boolean
    | IValidateResult
export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string,
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null
/** Object-style validator rules. Extend via registerValidateRules for extra properties. */
// ---cut---
export interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | (string & {})
  format?: ValidatorFormats
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  maxItems?: number
  minItems?: number
  maxLength?: number
  minLength?: number
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
  message?: string
  [key: string]: any
}
```

## Function Validators

### ValidatorFunctionResponse

```ts twoslash include ValidatorFunctionResponse
// @include: IValidateResult
/** Return type for function validators. */
// ---cut---
export type ValidatorFunctionResponse
  = | null
    | string
    | boolean
    | IValidateResult
```

### ValidatorFunction

```ts twoslash include ValidatorFunction
// @include: ValidatorFunctionResponse
export interface IValidatorRules<Context = any> {}
/** Function validator definition. */
// ---cut---
export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string,
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null
```

## ValidatorDescription

```ts twoslash include ValidatorDescription
// @include: IValidatorRules
/** Non-array validator descriptor. */
// ---cut---
export type ValidatorDescription<Context = any>
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>
```

## MultiValidator

```ts twoslash include MultiValidator
// @include: ValidatorDescription
/** Array form of validator descriptors. */
// ---cut---
export type MultiValidator<Context = any> = ValidatorDescription<Context>[]
```

## FieldValidator

```ts twoslash include Validator
// @include: MultiValidator
/** Field-level validator that accepts single or multiple descriptors. */
// ---cut---
export type FieldValidator<Context = any>
  = | ValidatorDescription<Context>
    | MultiValidator<Context>
```
