# Using with Formily

Most users do not call `@silver-formily/validator` directly. In real projects, validation is usually declared on Formily fields, and `@silver-formily/core` invokes this package during field events.

In other words, most application code works with `Field.validator`, not raw `validate(...)` calls.

## End-to-end flow

In Formily, field validation usually follows this path:

1. You declare `validator`, `required`, or other rule fragments on a field.
2. The field triggers `onInput`, `onBlur`, `onFocus`, or an explicit `validate()` call.
3. `@silver-formily/core` calls `@silver-formily/validator` to run the rules.
4. The result is written back into field feedback and exposed through `selfErrors`, `selfWarnings`, and `selfSuccesses`.

From the validator package perspective, it mainly does two jobs:

- normalize field rule declarations into executable validators
- normalize outputs into feedback messages that Formily can consume

Inside `@silver-formily/core`, field validation eventually looks like this:

```ts
const results = await validate(field.value, field.validator, {
  triggerType,
  validateFirst: field.props.validateFirst ?? field.form.props.validateFirst,
  context: { field, form: field.form },
})
```

Three details matter here:

- the current value is `field.value`
- the rules come from `field.validator`
- the validation context automatically includes `field` and `form`

That is why custom validators can read both the field instance and the form instance.

## How to add validation rules

The practical question is not how `validate` works internally. It is where validation should be declared in a Formily app.

The most common places are these:

### 1. Directly on a Field

```tsx
<Field
  name="username"
  title="Username"
  required
  validator={{
    minLength: 3,
    message: 'Please enter at least 3 characters',
  }}
/>
```

This is the most direct option and works well for local field rules.

### 2. In schema via `x-validator`

```tsx
<SchemaField.String
  name="username"
  title="Username"
  required
  x-validator={{
    minLength: 3,
    message: 'Please enter at least 3 characters',
  }}
  x-component="Input"
  x-decorator="FormItem"
/>
```

This is essentially the same capability as `validator` on a Field, only exposed through a different declaration entry.

### 3. Dynamically update `Field.validator` at runtime

```ts
field.setValidator({
  format: 'email',
})

field.setValidatorRule('minLength', 6)
field.setValidatorRule('required', true)
```

This is useful for effects, linkage, or rule switching at runtime.

## What `Field.validator` can be

From a user perspective, the most important shapes are these four.

### 1. A string

Strings are treated as `format`:

```ts
field.setValidator('email')
```

Equivalent to:

```ts
field.setValidator({
  format: 'email',
})
```

### 2. A rule object

```ts
field.setValidator({
  required: true,
  minLength: 3,
  message: 'Please enter at least 3 characters',
})
```

This is the best default shape for everyday use.

### 3. A function

```ts
field.setValidator((value) => {
  if (!value)
    return ''
  return value === 'silver' ? '' : 'Invalid username'
})
```

Use this when you need custom business logic for one field.

### 4. An array

```ts
field.setValidator([
  { required: true },
  { minLength: 3, message: 'Please enter at least 3 characters' },
  {
    triggerType: 'onBlur',
    validator(value) {
      return value === 'silver' ? '' : 'Value must be silver'
    },
  },
])
```

Arrays are usually the most practical shape in Formily because they let you separate base rules, trigger timing, and complex business logic. For the full rule surface, see the [Validation Rules](/en/api/validate) section.

:::tip Tip
`setValidator` is only one of the [three ways to add validation rules](/en/guide/formily-validator#how-to-add-validation-rules). These three approaches are equivalent. In real business code, rules are usually declared directly on `Field` or inside `x-validator` in Markup Schema. This guide uses `field.setValidator(...)` in a few examples mainly because it highlights more cleanly in code blocks.
:::

## When rules run

- if `triggerType` is omitted, the rule defaults to `onInput`
- `triggerType: 'onBlur'` means the rule only runs on blur
- `triggerType: 'onFocus'` means the rule only runs on focus
- `field.validate()` or `form.validate()` usually runs the full validation flow

Example:

```ts
field.setValidator([
  { required: true },
  {
    triggerType: 'onBlur',
    format: 'email',
  },
])
```

This means:

- required validation happens during input
- email format validation waits until blur

That is usually a better UX than running every expensive rule on each keystroke.

## Custom validator arguments

The function signature already shows how Formily passes context in:

```ts
const rule = {
  validator(value, rule, ctx, render) {
    const { field, form } = ctx

    if (!value)
      return ''

    if (form.values.confirmUsername && form.values.confirmUsername !== value) {
      return render('Username must match {{field.title}}')
    }

    return ''
  },
}
```

Here:

- `value` is the current field value
- `rule` is the current rule object
- `ctx` contains `field` and `form`
- `render` applies template rendering

Here, `render` is not React render and it is not a component render function. Its only job is to combine a message string with the current validation context and produce the final message string.

Its shape is effectively:

```ts
type MessageRenderer = (message: string, scope?: Record<string, any>) => string
```

Two common patterns are:

### 1. Use the existing context directly

```ts
return render('Field {{field.title}} is required')
```

This reads `field.title` from the current validation context.

### 2. Add temporary variables

```ts
return render('Field {{field.title}} must be greater than {{min}}', {
  min: 10,
})
```

The second argument is merged into the current context, so you can use both built-in values like `field` and `form`, and extra values such as `min`.

If you only need other field values, prefer `ctx.form.values`. Reach for `ctx.field` when you need the field instance itself.

## A more realistic custom validator example

The example below combines several common needs:

- cross-field validation based on other form values
- different branches returning errors and warnings
- `render(...)` used as the unified message builder
- extra variables passed through `scope`

```ts
const rule = {
  triggerType: 'onBlur',
  async validator(value, rule, ctx, render) {
    const { field, form } = ctx
    const role = form.values.role
    const domain = value?.split('@')[1]

    if (!value)
      return ''

    if (!value.includes('@')) {
      return render('Field {{field.title}} must be a valid email')
    }

    if (role === 'admin' && domain !== 'company.com') {
      return render('Admin accounts must use the {{expectedDomain}} domain', {
        expectedDomain: 'company.com',
      })
    }

    if (role === 'guest' && domain === 'company.com') {
      return {
        type: 'warning',
        message: render('Guest accounts usually should not use the {{currentDomain}} domain', {
          currentDomain: domain,
        }),
      }
    }

    if (field.required && value.length < 6) {
      return render('Field {{field.title}} must be at least {{min}} characters long', {
        min: 6,
      })
    }

    return ''
  },
}
```

In this example, `render(...)` is useful for two reasons:

- it keeps message templates consistent without manual string concatenation
- it can reuse both the built-in context (`field`, `form`) and temporary variables passed in at the call site

## Return value formats

The easiest way to understand return values is to group them by whether they carry an explicit feedback type.

### Empty value

```ts
return ''
return null
```

Validation passed and no message is produced.

### String

```ts
return 'Username is already taken'
```

Validation failed and the string becomes the error message.

### Boolean

```ts
return value === 'silver'
```

- `true` means pass
- `false` means fail and use the rule's `message`

### `{ type, message }`

```ts
return {
  type: 'warning',
  message: 'A company email is recommended',
}
```

This directly decides which feedback type the message goes into and depends on whether your wrapped component layer handles warning and success feedback correctly.

## Where to read validation results

In Formily, validator output is not just returned to the caller. It is also written into the field feedback system.

You will usually consume it through:

- `field.selfErrors`
- `field.selfWarnings`
- `field.selfSuccesses`

For example:

```ts
await field.onInput('321')
console.log(field.selfWarnings)

await field.onBlur()
console.log(field.selfErrors)
```

So in practice, a validator is not only a predicate. It is also a producer of field feedback state.

## Best practices for global and local rules

In practice, this split works well:

### Local rules

Keep them on the field when they are:

- specific to one page or one field
- temporary business constraints
- tightly coupled to one form context

### Global rules

Register them once through the functions re-exported from `@silver-formily/core`:

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : 'Username is already taken'
  },
})
```

Then declare them on fields:

```ts
const fieldProps = {
  validator: {
    usernameAvailable: true,
  },
}
```

This keeps field declarations concise while centralizing reusable validation logic.

If you are using this package through Formily, this is a good default structure:

1. Prefer objects or arrays for field rules before writing large custom functions.
2. Put instant feedback on `onInput` and more expensive checks on `onBlur`.
3. Register reusable business rules through `registerValidateRules`.
4. Only return `{ type, message }` when you really want non-error feedback.
5. Prefer `message` and `render(...)` for templated text instead of manual string assembly.

## A realistic example

```tsx
<Field
  name="email"
  title="Email"
  required
  validator={[
    { format: 'email', message: 'Invalid email format' },
    {
      triggerType: 'onBlur',
      validator(value) {
        if (!value)
          return ''
        return value.endsWith('@company.com')
          ? ''
          : 'Please use a company email'
      },
    },
  ]}
/>
```

In this configuration:

- required is handled as part of the field rule system
- email format is checked during input
- domain policy is checked after blur

That is the most typical Formily-side usage of validator.
