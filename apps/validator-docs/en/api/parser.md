# Rule Parsing

The parser converts strings, functions, rule objects, and arrays into a unified queue of executable functions. `validate()` performs this process internally, so normal Formily application code does not need to call the parser directly.

::: warning Intended audience
This page is mainly for form framework adapters, debugging tools, and validator internals. If you only need to configure field validation, start with [Quick Start](/en/guide/quick-start).
:::

## Parsing flow

A set of validation descriptions passes through these stages:

1. Normalize strings, functions, and objects into rule objects.
2. Normalize a single input or array into an array of rule objects.
3. Expand each rule object into ordered executable functions.
4. Filter by the current `triggerType` and produce the final queue.

```text
Validator
  → IValidatorRules[]
  → ValidatorParsedFunction[]
  → validate() executes and groups messages
```

## Import

```ts
import {
  parseValidator,
  parseValidatorDescription,
  parseValidatorDescriptions,
  parseValidatorRules,
} from '@silver-formily/validator'
```

## Normalize validation descriptions

### `parseValidatorDescription()`

Normalize one string, function, or rule object into `IValidatorRules`:

```ts
parseValidatorDescription('email')
// { format: 'email' }

parseValidatorDescription(value => value ? '' : 'Value is required')
// { validator: [Function] }

parseValidatorDescription({ required: true })
// { required: true }
```

An empty input returns an empty object. A rule object retains its rule fields.

### `parseValidatorDescriptions()`

Normalize one description or an array of descriptions into an array of rule objects:

```ts
parseValidatorDescriptions('email')
// [{ format: 'email' }]

parseValidatorDescriptions([
  'email',
  { required: true },
])
// [{ format: 'email' }, { required: true }]
```

This step only reshapes data. It does not resolve registered rules or execute validation.

## Compile a rule object

### `parseValidatorRules()`

Expand one rule object into an array of executable functions:

```ts
const validators = parseValidatorRules({
  required: true,
  minLength: 3,
  validator(value) {
    return value === 'silver' ? '' : 'Value must be silver'
  },
})
```

Execution order has two guarantees:

1. `required` always runs first.
2. The custom `validator` always runs last.

Other rules follow their property enumeration order. Only rule names that exist in the [registry](/en/api/registry) produce executable functions.

Each executable function also handles:

- boolean, string, and `{ type, message }` return values
- the current rule's default message and template rendering
- thrown exceptions, whose messages become error results

## Produce the final execution queue

### `parseValidator()`

`parseValidator()` connects the preceding stages and filters rules using the current execution options:

```ts
const queue = parseValidator([
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', format: 'email' },
], {
  triggerType: 'onInput',
})
```

This example only produces functions for the `onInput` rule. A rule without `triggerType` is treated as `onInput`; when `options.triggerType` is omitted, no trigger filtering occurs.

Each returned function receives the current value and context:

```ts
for (const run of queue) {
  const result = await run(value, context)
  // { type: 'error' | 'warning' | 'success', message?: string }
}
```

Normally, use [`validate()`](/en/api/validate) directly and let it execute the queue, apply `validateFirst`, and group all three message types.
