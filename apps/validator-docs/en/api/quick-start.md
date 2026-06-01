# Quick Start

Most workflows with `validator` revolve around four APIs:

- `validate` to run validation
- registry APIs to register rules, formats, locales, and template engines
- parser APIs to inspect or precompile descriptions
- exported types to model rule inputs and outputs

## Import

```ts
import {
  registerValidateFormats,
  registerValidateRules,
  setValidateLanguage,
  validate,
} from '@silver-formily/validator'
```

## validate

The usual entry is `validate(value, validator, options)`:

```ts
const result = await validate('ab', {
  minLength: 3,
  message: 'Length must be at least {{minLength}}',
})

result.error
// ['Length must be at least 3']
```

The return shape is always:

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

## Validation descriptions

The `validator` argument accepts either one description or an array:

```ts
type Validator<Context = any>
  = | ValidatorDescription<Context>
    | ValidatorDescription<Context>[]
```

A single description supports three forms:

```ts
validate(value, 'email')

validate(value, (currentValue) => {
  return currentValue ? '' : 'Value is required'
})

validate(value, {
  required: true,
  maxLength: 20,
})
```

## validateFirst

Use `validateFirst` when you only want the first failing message:

```ts
const result = await validate('', {
  required: true,
  validator() {
    return 'A second error'
  },
}, {
  validateFirst: true,
})

result.error
// ['The field value is required']
```

## triggerType

Rules can declare a trigger, and the parser filters by the current execution trigger:

```ts
await validate('ab', [
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', required: true },
], {
  triggerType: 'onInput',
})
```

The default trigger is `onInput`.

## Context

`options.context` is passed to custom validators and merged into template rendering:

```ts
await validate('', {
  validator(value, rule, ctx, render) {
    return render('Field {{title}} is required', {
      title: ctx.title,
    })
  },
}, {
  context: {
    title: 'Username',
  },
})
```
