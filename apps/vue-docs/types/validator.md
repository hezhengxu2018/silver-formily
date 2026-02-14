# 校验器类型

由于类型声明限制，请从尾部倒序阅读：[FieldValidator](#FieldValidator)

## 字符串类型校验

### ValidatorFormats

字符串型格式校验器，其他格式校验器需要通过registerValidateFormats进行注册。

```ts twoslash include ValidatorFormats
/** 字符串型格式校验器，其他格式校验器需要通过registerValidateFormats进行注册 */
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

## 对象类型校验

### IValidateResult

对象型校验结果

```ts twoslash include IValidateResult
/** 对象型校验结果 */
// ---cut---
export interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}
```

### IValidatorRules

对象型校验器，其他属性需要通过registerValidateRules进行注册

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
/** 对象型校验器，其他属性需要通过registerValidateRules进行注册 */
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

## 函数类型校验

### ValidatorFunctionResponse

函数型校验器校验结果类型

```ts twoslash include ValidatorFunctionResponse
// @include: IValidateResult
/** 函数型校验器校验结果类型 */
// ---cut---
export type ValidatorFunctionResponse
  = | null
    | string
    | boolean
    | IValidateResult
```

### ValidatorFunction

函数型校验器

```ts twoslash include ValidatorFunction
// @include: ValidatorFunctionResponse
export interface IValidatorRules<Context = any> {}
/** 函数型校验器 */
// ---cut---
export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string,
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null
```

## ValidatorDescription

非数组型校验器

```ts twoslash include ValidatorDescription
// @include: IValidatorRules
/** 非数组型校验器 */
// ---cut---
export type ValidatorDescription<Context = any>
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>
```

## MultiValidator

数组型校验器

```ts twoslash include MultiValidator
// @include: ValidatorDescription
/** 数组型校验器 */
// ---cut---
export type MultiValidator<Context = any> = ValidatorDescription<Context>[]
```

## FieldValidator

表单项校验器

```ts twoslash include Validator
// @include: MultiValidator
/** 表单项校验器 */
// ---cut---
export type FieldValidator<Context = any>
  = | ValidatorDescription<Context>
    | MultiValidator<Context>
```
