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

Built-in formats include:

- `url`
- `email`
- `ipv6`
- `ipv4`
- `number`
- `integer`
- `idcard`
- `qq`
- `phone`
- `money`
- `zh`
- `date`
- `zip`

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
