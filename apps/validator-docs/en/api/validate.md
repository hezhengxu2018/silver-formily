# Run Validation

`validate()` is the execution entry for `@silver-formily/validator`. It accepts the current value, validation descriptions, and execution options, then returns messages grouped by feedback type.

::: tip
Formily calls `validate()` automatically. Application code normally only declares field rules; see [Quick Start](/en/guide/quick-start). This page is primarily a complete rule reference and a guide to using validator outside Formily.
:::

## `validate()`

```ts
import { validate } from '@silver-formily/validator'
```

```ts
function validate<Context = any>(
  value: any,
  validator: Validator<Context>,
  options?: IValidatorOptions<Context>,
): Promise<IValidateResults>
```

| Parameter   | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `value`     | Current value to validate                                          |
| `validator` | One validation description or an array of descriptions             |
| `options`   | Per-run settings for first-message stopping, triggers, and context |

```ts
const results = await validate('ab', [
  { required: true },
  { minLength: 3, message: 'Enter at least 3 characters' },
])

results.error
// ['Enter at least 3 characters']
```

### Validation descriptions

`validator` accepts a string, function, rule object, or an array containing those forms:

```ts
await validate(value, 'email')

await validate(value, currentValue => currentValue ? '' : 'Value is required')

await validate(value, {
  required: true,
  maxLength: 20,
})

await validate(value, [
  { required: true },
  { format: 'email' },
])
```

- strings are parsed as `format`
- functions are parsed as custom `validator` functions
- objects execute as groups of rules
- descriptions in an array are expanded and executed in order

### Execution options

```ts
interface IValidatorOptions<Context = any> {
  validateFirst?: boolean
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | string
  context?: Context
}
```

When `validateFirst` is `true`, execution stops after the first non-empty message:

```ts
await validate(value, validators, {
  validateFirst: true,
})
```

When `triggerType` is provided, only rules with the same trigger type run. Rules without a declared `triggerType` are treated as `onInput`:

```ts
await validate('ab', [
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', format: 'email' },
], {
  triggerType: 'onInput',
})
```

`context` is passed to custom validator functions and participates in message template rendering:

```ts
await validate('ab', {
  validator(value, rule, ctx, render) {
    return value === ctx.expected
      ? ''
      : render('Value must equal {{expected}}')
  },
}, {
  context: {
    expected: 'silver',
  },
})
```

### Return value

Results are always grouped into `error`, `warning`, and `success`. A group with no messages is an empty array:

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

## Built-in rules {#built-in-rules}

A rule object implements `IValidatorRules`:

```ts
interface IValidatorRules<Context = any> {
  triggerType?: ValidatorTriggerType
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

The common rules behave as follows:

| Rule                                    | Behavior                                                          |
| --------------------------------------- | ----------------------------------------------------------------- |
| `required`                              | Checks empty strings, arrays, objects, and empty Draft.js content |
| `min` / `max`                           | Compares numeric values, or the length of strings and arrays      |
| `minimum` / `maximum`                   | Aliases of `min` / `max` with exactly the same behavior           |
| `minLength` / `maxLength`               | Aliases of `min` / `max` with exactly the same behavior           |
| `minItems` / `maxItems`                 | Aliases of `min` / `max` with exactly the same behavior           |
| `exclusiveMinimum` / `exclusiveMaximum` | Requires a strict greater-than / less-than comparison             |
| `len`                                   | Requires an exact length or item count                            |
| `pattern`                               | Tests the value against a regular expression                      |
| `enum` / `const`                        | Compares against allowed values or a constant                     |
| `multipleOf`                            | Checks divisibility                                               |
| `uniqueItems`                           | When `true`, requires array items to be unique by deep comparison |
| `maxProperties` / `minProperties`       | Checks the number of object properties                            |
| `whitespace`                            | Rejects strings containing only whitespace                        |
| `validator`                             | Runs a custom synchronous or asynchronous rule                    |

## Built-in formats {#built-in-formats}

When a description is a string, or a rule object contains `format`, the package resolves a matcher from the format registry:

```ts
await validate('hello@example.com', 'email')
await validate('https://silver-formily.org', { format: 'url' })
```

Built-in `format` checks only run for non-empty values. Combine them with `required` when the field must not be empty. The current built-in formats behave as follows:

| Format    | Exact behavior                                                                                                                                                                                                                                                                                                                                           | Example                                                  |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `url`     | Accepts `http://`, `https://`, `ftp://`, and `rtmp://` URLs, plus protocol-relative URLs beginning with `//`. A hostname needs at least two labels and a top-level domain of at least 2 characters. IPv4 hosts reject `10/8`, `127/8`, `169.254/16`, `172.16/12`, `192.168/16`, first octets of `0` or at least `224`, and final octets of `0` or `255`. | `https://silver-formily.org`, `//cdn.example.com/app.js` |
| `email`   | Regular-expression-based email validation requiring a local part, `@`, and a domain part. The local part supports letters, digits, underscores, and internal `-`, `+`, and `.` characters; the domain also allows `-` and `.` separators.                                                                                                                | `hello@example.com`                                      |
| `ipv6`    | Supports standard 8-group hexadecimal notation, `::` compression, mixed IPv6/IPv4 endings, and zone ids such as `%eth0`.                                                                                                                                                                                                                                 | `2001:db8::1`, `fe80::1%en0`, `::ffff:192.168.1.1`       |
| `ipv4`    | Requires exactly 4 decimal segments in the range `0-255`. This format checks syntax only and does not distinguish public from private addresses.                                                                                                                                                                                                         | `192.168.1.10`, `8.8.8.8`                                |
| `number`  | A decimal number with an optional sign and fractional part. At least one digit is required before the decimal point, so `.5` is rejected; scientific notation is unsupported.                                                                                                                                                                            | `123`, `-123.45`, `+8.0`                                 |
| `integer` | An integer with an optional sign and no decimal point.                                                                                                                                                                                                                                                                                                   | `0`, `-42`, `+7`                                         |
| `idcard`  | A basic Chinese ID-card shape check: either 15 digits, or 17 digits followed by a digit, `X`, or `x`. It does not validate region, birth date, or checksum authenticity.                                                                                                                                                                                 | `11010519491231002X`                                     |
| `qq`      | Checks only the digit structure: either `0`, or a positive integer beginning with `1-9` and optionally prefixed by one `+`. Other leading zeros, negative signs, decimal points, and whitespace are rejected. It does not verify that the QQ number exists.                                                                                              | `0`, `123456789`, `+123456789`                           |
| `phone`   | Checks only three digit structures: 11 consecutive digits, `3 digits-8 digits`, or `4 digits-7 digits`. It does not validate mobile prefixes, carriers, real area codes, or whether the number exists, so any 11 digits pass.                                                                                                                            | `15934567899`, `010-12345678`, `0571-1234567`            |
| `money`   | Allows an optional single currency-symbol prefix such as `$`, `¥`, `￥`, or `€`. The integer part may use plain digits or comma-separated thousands. A fractional part is optional, but a decimal point must be followed by at least one digit.                                                                                                          | `$12`, `¥ 1,234.56`, `1000`                              |
| `zh`      | Allows only characters from `U+4E00` through `U+9FA5`; whitespace, Latin letters, digits, and punctuation are rejected.                                                                                                                                                                                                                                  | `中文`, `验证器`                                         |
| `date`    | A loose date-string check. The date must contain 3 segments of 1-4 digits separated by `-`, `/`, or `.`. An optional time must contain 3 segments of 1-2 digits. It checks structure rather than real calendar or time validity.                                                                                                                         | `2020-01-12`, `12/01/2020 11:23:33`                      |
| `zip`     | Exactly 6 digits.                                                                                                                                                                                                                                                                                                                                        | `310000`                                                 |

## Custom validator functions

A `validator` function receives the current value, rule object, context, and message renderer:

```ts
await validate('123', {
  validator(value, rule, ctx, render) {
    if (value === ctx.expected)
      return ''

    return render('Value must equal {{expected}}', {
      expected: ctx.expected,
    })
  },
}, {
  context: {
    expected: '456',
  },
})
```

Supported return values are:

- `null`, an empty string, or `true`: pass
- `false`: fail with the current rule message
- a string: fail, then render the string as a message template
- `{ type, message }`: explicitly choose a result type

Return an explicit result to produce warning or success feedback:

```ts
return {
  type: 'warning',
  message: 'A company email is recommended',
}
```
