/**
 * Supported built-in async-validator format keys; extend via `registerValidateFormats`.
 * 支持的内置格式校验器字符串，可通过 `registerValidateFormats` 扩展。
 */
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

/**
 * Structured response object returned by function validators, with customizable `type`.
 * 函数式校验器的结构化返回对象，允许自定义 `type`。
 */
export interface IValidateResult {
  type: 'error' | 'warning' | 'success' | (string & {})
  message: string
}

/**
 * Union of all acceptable return values for a validator function.
 * 函数式校验器可返回的联合类型。
 */
export type ValidatorFunctionResponse = null | string | boolean | IValidateResult

/**
 * Rule configuration object consumed by Formily validators.
 * 与 Formily 核心一致的对象式校验规则配置。
 */
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

/**
 * Signature for function-style validators (sync or async) with `render` helper.
 * 函数式校验器的签名，支持同步或异步返回并透传 `render` 辅助函数。
 */
export type ValidatorFunction<Context = any> = (
  value: any,
  rule: IValidatorRules<Context>,
  ctx: Context,
  render: (message: string, scope?: any) => string,
) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null

/**
 * Single `x-validator` entry: built-in format string, function, or rule object.
 * 单个 `x-validator` 描述：内置格式字符串、函数或规则对象。
 */
export type ValidatorDescription<Context = any>
  = | ValidatorFormats
    | ValidatorFunction<Context>
    | IValidatorRules<Context>

/**
 * Ordered collection of validator descriptions executed in sequence.
 * 以顺序执行的 `ValidatorDescription` 数组组合校验器。
 */
export type MultiValidator<Context = any> = ValidatorDescription<Context>[]

/**
 * Top-level union accepted by `x-validator`: single description or array combination.
 * `x-validator` 参数可接受的最终联合类型：单个描述或描述数组。
 */
export type Validator<Context = any> = ValidatorDescription<Context> | MultiValidator<Context>
