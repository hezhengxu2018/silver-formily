# Validation System

Validation is mainly carried by fields, while Form provides aggregate entry points. A field declares rules, validates itself, and stores feedback. `form.validate()` / `form.submit()` aggregate data fields from the field tree and dispatch validation in batch.

Most validation capabilities depend on `@silver-formily/validator`. You can also read the validator guide chapter [Using in Formily](https://validator.silver-formily.org/en/guide/formily-validator) for reference.

## Validators

Fields use `validator` to describe validation rules.

### String Format

A string is treated as `format`, which is a shorthand for format validation:

```ts
field.validator = 'email' // same as { format: 'email' }
field.validator = 'url'
```

Custom formats can be registered through `registerValidateFormats`.

### Function Validator

A function can return a string, boolean, or feedback-like object:

```ts
field.validator = (value) => {
  return value ? '' : 'Required'
}

field.validator = {
  validator: value => value.length > 3,
  message: 'At least 3 characters',
}

field.validator = (value) => {
  return {
    type: 'warning',
    message: value?.endsWith('@company.com') ? '' : 'Company email is recommended',
  }
}
```

### Object Rule

Object rules can express richer constraints:

```ts
field.validator = {
  required: true,
  format: 'email',
  minLength: 3,
  maxLength: 20,
  message: 'Invalid format',
}
```

Custom rules can be registered through `registerValidateRules`.

### Rule Array

Arrays combine multiple rules. Different forms are normalized into a rule array:

```ts
field.validator = [
  'email',
  { required: true },
  value => value ? '' : 'Required',
]

field.validator = [
  { format: 'email' },
  { required: true },
  { validator: value => value ? '' : 'Required' },
]
```

## Trigger Timing

Each rule object can use `triggerType` to control when it is triggered:

| triggerType | Timing            |
| ----------- | ----------------- |
| `onInput`   | On input, default |
| `onBlur`    | On blur           |
| `onFocus`   | On focus          |

```ts
field.validator = [
  { required: true },
  { format: 'email', triggerType: 'onBlur' },
]
```

These field methods trigger matching rules:

```ts
field.onInput('silver')
field.onFocus()
field.onBlur()
```

Manual validation can target a trigger type. Without an argument, all rules are validated:

```ts
await field.validate()
await field.validate('onBlur')
```

## Validation Strategy

`validateFirst` controls whether validation stops after the first failed rule.

```ts
form.createField({
  name: 'username',
  validateFirst: true,
  validator: [
    { required: true },
    { minLength: 3 },
  ],
})
```

The default is `false`, so failed rules do not prevent later rules from running, and the field can return complete feedback.

## Feedback

Validation results are stored in `field.feedbacks`:

```ts
interface Feedback {
  path: string
  address: string
  type: 'error' | 'success' | 'warning'
  code: 'ValidateError' | 'ValidateSuccess' | 'ValidateWarning'
    | 'EffectError' | 'EffectSuccess' | 'EffectWarning'
  messages: string[]
}
```

Fields provide type-based feedback helpers:

```ts
field.feedbacks
field.errors
field.warnings
field.successes

field.selfErrors
field.selfWarnings
field.selfSuccesses
```

`self`-prefixed properties only read feedback from the current field. Non-`self` properties aggregate feedback from the field and all descendants.

## Writing Feedback

Business side effects can write feedback directly:

```ts
field.errors = ['Username already exists']
field.warnings = ['Company email is recommended']
field.successes = ['Passed']
```

Directly written feedback uses `Effect*` codes, keeping it separate from validator-generated `Validate*` codes.

Feedback can also be queried:

```ts
field.queryFeedbacks({ type: 'error' })
field.queryFeedbacks({ code: 'ValidateError' })
field.queryFeedbacks({ address: 'username' })
```

## Form-Level Validation

Form provides aggregate validation entry points:

```ts
await form.validate()

await form.submit(async (values) => {
  await request(values)
})
```

`form.validate()` gathers data fields from the field tree and dispatches field validation. `form.submit()` validates first, then passes form values to the submit callback.

```ts
form.errors
form.warnings
form.successes
form.valid
```

For lower-level validation registry APIs, see [FormValidatorRegistry API](/en/api/entry/FormValidatorRegistry).
