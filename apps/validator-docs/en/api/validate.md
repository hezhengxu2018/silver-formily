# Validation Rules

Built-in rules, formats, and locale messages are registered when the module is loaded, so most projects can import and use the package directly.

```ts
import { validate } from '@silver-formily/validator'
```

## Built-in rules

Rule objects implement `IValidatorRules`:

```ts
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | string
  format?: string
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
}
```

Common rules fall into a few groups:

| Rule                                    | Behavior                                                          |
| --------------------------------------- | ----------------------------------------------------------------- |
| `required`                              | Checks empty strings, arrays, objects, and Draft.js empty content |
| `min` / `max`                           | Compare numeric values or string / array length                   |
| `minimum` / `maximum`                   | Aliases of `min` / `max`                                          |
| `minLength` / `maxLength`               | Reuse the same length logic                                       |
| `minItems` / `maxItems`                 | Reuse the same item-count logic                                   |
| `exclusiveMinimum` / `exclusiveMaximum` | Strict greater-than / less-than checks                            |
| `len`                                   | Requires an exact length or entry count                           |
| `pattern`                               | Tests a regular expression                                        |
| `enum` / `const`                        | Checks allowed values or equality                                 |
| `multipleOf`                            | Checks divisibility                                               |
| `uniqueItems`                           | Checks array uniqueness                                           |
| `maxProperties` / `minProperties`       | Checks object property counts                                     |
| `whitespace`                            | Rejects whitespace-only strings                                   |
| `validator`                             | Runs a custom sync or async rule                                  |

## format

When the description is a string, or a rule contains `format`, the package resolves a matcher from the format registry:

```ts
await validate('hello@example.com', 'email')
await validate('https://silver-formily.org', { format: 'url' })
```

Built-in `format` checks only run for non-empty values. Use `required` as well when the field must not be blank. The built-in formats are:

| Format    | Meaning                                                                                                                                                                                                                                                                                                               | Example                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `url`     | Accepts only `http://`, `https://`, `ftp://`, `rtmp://`, or protocol-relative `//` URLs. Hostnames must contain at least two labels and a top-level domain with at least 2 characters. Public IPv4 hosts are allowed, while private, loopback, link-local, multicast, and other reserved IPv4 addresses are rejected. | `https://silver-formily.org`, `//cdn.example.com/app.js` |
| `email`   | Regular-expression-based email validation. It requires a local part, `@`, and a domain part. The local part allows letters, digits, underscores, and internal `-`, `+`, `.` characters; the domain part also allows `-` and `.` separators.                                                                           | `hello@example.com`                                      |
| `ipv6`    | Validates IPv6 addresses, including full 8-group notation, `::` compression, mixed IPv6/IPv4 endings, and optional zone ids such as `%eth0`.                                                                                                                                                                          | `2001:db8::1`, `fe80::1%en0`, `::ffff:192.168.1.1`       |
| `ipv4`    | Validates IPv4 syntax only: exactly 4 decimal segments, each in the range `0-255`. Unlike `url`, this check does not distinguish public vs. private ranges.                                                                                                                                                           | `192.168.1.10`, `8.8.8.8`                                |
| `number`  | Decimal number with an optional sign and optional fractional part. It requires at least one digit before the decimal point, so `.5` does not pass, and scientific notation is not supported.                                                                                                                          | `123`, `-123.45`, `+8.0`                                 |
| `integer` | Integer with an optional sign. Decimal points are not allowed.                                                                                                                                                                                                                                                        | `0`, `-42`, `+7`                                         |
| `idcard`  | Basic mainland China ID-card shape validation: either 15 digits, or 17 digits plus a final digit / `X` / `x`. It does not verify region codes, birth dates, or checksum correctness.                                                                                                                                  | `11010519491231002X`                                     |
| `qq`      | QQ-number format validation. In practice this means a non-negative integer string: `0` is allowed, a leading `+` is also accepted, but negative numbers, decimals, and whitespace are not.                                                                                                                            | `0`, `123456789`                                         |
| `phone`   | Phone-number validation. Supports an 11-digit mobile number, or landline forms `3-digit area code-8-digit number` and `4-digit area code-7-digit number`.                                                                                                                                                             | `15934567899`, `010-12345678`, `0571-1234567`            |
| `money`   | Currency-format validation. An optional single currency symbol prefix is allowed (such as `$`, `¥`, `￥`, `€`). The integer part may be plain digits or comma-grouped thousands, and the fractional part is optional, but if a decimal point appears it must be followed by at least one digit.                       | `$12`, `¥ 1,234.56`, `1000`                              |
| `zh`      | Chinese-text validation. Only CJK Chinese characters are allowed; spaces, Latin letters, digits, and punctuation do not pass.                                                                                                                                                                                         | `中文`, `验证器`                                         |
| `date`    | Loose date-string validation. The date part must contain exactly 3 numeric segments separated by `-`, `/`, or `.`, and the optional time part must be `HH:mm:ss`. It checks structure only, not real calendar validity, so a structurally valid value like `2020-99-99` still passes.                                 | `2020-01-12`, `12/01/2020 11:23:33`                      |
| `zip`     | Exactly 6 digits, intended for postal codes.                                                                                                                                                                                                                                                                          | `310000`                                                 |

## Custom validators

The `validator` function receives the current value, current rule, runtime context, and a message renderer:

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

- `null` or an empty string for success
- `false` for failure with the current rule message
- a string for failure with template rendering
- `{ type, message }` for an explicit result bucket

## Result buckets

Each executed validator contributes to one of three message buckets:

```ts
const results = {
  error: ['The field value is required'],
  warning: [],
  success: [],
}
```
