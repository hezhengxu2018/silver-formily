# Parser

The parser layer normalizes multiple description forms into executable validator functions.

```ts
import {
  parseValidator,
  parseValidatorDescription,
  parseValidatorDescriptions,
  parseValidatorRules,
} from '@silver-formily/validator'
```

## parseValidatorDescription

A single description becomes an `IValidatorRules` object:

```ts
parseValidatorDescription('email')
// { format: 'email' }

parseValidatorDescription(value => value ? '' : 'empty')
// { validator: [Function] }

parseValidatorDescription({ required: true })
// { required: true }
```

## parseValidatorDescriptions

Multiple descriptions are normalized into a rule array:

```ts
parseValidatorDescriptions([
  'email',
  { required: true },
])
```

This step only reshapes data. It does not execute validation.

## parseValidatorRules

Rule objects are expanded into ordered executable validators. Two ordering guarantees matter:

1. `required` always runs first.
2. `validator` always runs last.

```ts
const validators = parseValidatorRules({
  required: true,
  minLength: 3,
  validator(value) {
    return value === 'silver' ? '' : 'Value must be silver'
  },
})
```

## parseValidator

`parseValidator` is the high-level entry. It:

1. normalizes input into an array
2. converts each description into rules
3. filters rules by `triggerType`
4. returns the execution queue

```ts
const queue = parseValidator([
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', required: true },
], {
  triggerType: 'onInput',
})
```

## Errors and rendering

Each parsed validator applies the same fallback behavior:

- thrown errors become `error` messages
- returned strings go through template rendering
- returned `{ type, message }` objects preserve the explicit bucket

That is why `validate` can always collapse results into one stable shape.
