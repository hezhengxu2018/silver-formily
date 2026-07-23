# Quick Start

Most application projects do not call `@silver-formily/validator` directly. Declare validation rules on Formily fields instead. The field model runs them at the appropriate time and synchronizes the results to form components.

This is the most common form:

```vue
<Field
  name="email"
  title="Email"
  required
  :validator="[
    { format: 'email', message: 'Invalid email format' },
    { maxLength: 200, message: 'Keep the length within 200 characters' },
    {
      triggerType: 'onBlur',
      validator(value) {
        if (!value)
          return ''
        return value.endsWith('@company.com') ? '' : 'Use a company email'
      },
    },
  ]"
  :decorator="[FormItem]"
  :component="[Input]"
/>
```

This configuration checks the email format while the user types and checks the domain when the field loses focus. In everyday use, rules normally live in the `validator` prop of `Field` or in `x-validator` on a Schema.

::: tip
In the example above:

- `'email'` is a [built-in format](/en/api/validate#built-in-formats)
- `maxLength` is a [built-in rule](/en/api/validate#built-in-rules)

:::

::: tip
If you are building a Formily form, start with this chapter and refer to the Core documentation on the [validation system](https://core.silver-formily.org/guide/validation) for complete field- and form-level behavior. Call [`validate()`](/en/api/validate) directly only when building a lower-level adapter or using the validator outside Formily.
:::

## Configure validation rules

The same rule can be declared on a Vue Field, in Markup Schema, or in JSON Schema. Use the entry that matches how your form is authored:

::: code-group

```vue [Field]
<Field
  name="username"
  title="Username"
  required
  :validator="{
    minLength: 3,
    message: 'Enter at least 3 characters',
  }"
  :decorator="[FormItem]"
  :component="[Input]"
/>
```

```vue [Markup Schema]
<SchemaField.String
  name="username"
  title="Username"
  required
  :x-validator="{
    minLength: 3,
    message: 'Enter at least 3 characters',
  }"
  x-component="Input"
  x-decorator="FormItem"
/>
```

```ts [JSON Schema]
const schema = {
  type: 'object',
  properties: {
    username: {
      'type': 'string',
      'title': 'Username',
      'required': true,
      'x-validator': {
        minLength: 3,
        message: 'Enter at least 3 characters',
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
```

:::

`Field.validator` and Schema `x-validator` both become validation rules on the field. Choose the declaration style that matches your form; there is no need to call `validate()` manually.

## Validation rule forms

`validator` and `x-validator` accept the same four forms.

### String

A string is treated as `format` (see [Built-in formats](/en/api/validate#built-in-formats)):

```vue
<Field name="email" title="Email" validator="email" />
```

It is equivalent to:

```vue
<Field name="email" title="Email" :validator="{ format: 'email' }" />
```

### Object

```vue
<Field
  name="username"
  title="Username"
  :validator="{
    required: true,
    minLength: 3,
    message: 'Enter at least 3 characters',
  }"
/>
```

An object works best for a set of constraints that share a message and trigger time. `minLength` in this example is a [built-in rule](/en/api/validate#built-in-rules).

### Function

```vue
<script setup lang="ts">
function validateUsername(value: string) {
  if (!value)
    return ''
  return value === 'silver' ? '' : 'Invalid username'
}
</script>

<template>
  <Field
    name="username"
    title="Username"
    :validator="validateUsername"
  />
</template>
```

The function form is suitable for simple business rules used by only one field.

### Array

```vue
<Field
  name="username"
  title="Username"
  :validator="[
    { required: true, message: 'Enter a username' },
    { minLength: 3, message: 'Enter at least 3 characters' },
    {
      triggerType: 'onBlur',
      validator(value) {
        return value === 'silver' ? '' : 'The value must be silver'
      },
    },
  ]"
/>
```

Arrays are the most common combination in real projects. Each rule can have its own message, trigger time, and custom function. See [Run Validation](/en/api/validate#built-in-rules) for every built-in rule.

## Control when rules run

A rule object can specify its execution time through `triggerType`:

- the default is `onInput`
- `onBlur` runs when the field loses focus
- `onFocus` runs when the field receives focus
- `field.validate()` or `form.validate()` runs all rules when no trigger type is specified

```vue
<Field
  name="email"
  title="Email"
  :validator="[
    { required: true, message: 'Enter an email' },
    {
      format: 'email',
      triggerType: 'onBlur',
      message: 'Invalid email format',
    },
  ]"
/>
```

Required validation now runs while the user types, while format validation waits until blur. Expensive asynchronous checks that call an API are also usually better placed on `onBlur`.

## Write a custom validator

A custom validator receives four arguments:

```ts
function validator(value, rule, ctx, render) {
  // Return a validation result or a Promise of one
}
```

| Argument | Description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| `value`  | Current field value                                                              |
| `rule`   | Current rule object                                                              |
| `ctx`    | Context injected by Formily, including the current `field` and `form`            |
| `render` | Combines a message template with context; it is unrelated to component rendering |

For example, a confirmation field can read another field:

```vue
<Field
  name="confirmPassword"
  title="Confirm password"
  :validator="{
    required: true,
    validator(value, rule, ctx, render) {
      if (!value || value === ctx.form.values.password)
        return ''

      return render('{{field.title}} does not match the password')
    },
  }"
/>
```

`render` can read `field` and `form` from `ctx`, and it can receive temporary template variables:

```ts
return render('Field {{field.title}} must contain at least {{min}} characters', {
  min: 6,
})
```

Prefer `ctx.form.values` when you only need values from other fields. Use `ctx.field` when you need field instance methods or state.

### Asynchronous validation

A custom function may return a Promise. This rule checks username availability only on blur:

```vue
<script setup lang="ts">
const usernameValidator = {
  triggerType: 'onBlur',
  async validator(value: string) {
    if (!value)
      return ''

    const available = await checkUsernameAvailable(value)
    return available ? '' : 'Username is already taken'
  },
}
</script>

<template>
  <Field
    name="username"
    title="Username"
    :validator="usernameValidator"
  />
</template>
```

## Return validation results

Custom functions support these return values:

| Return value            | Meaning                                             |
| ----------------------- | --------------------------------------------------- |
| `''`, `null`, or `true` | Passes without producing feedback                   |
| `false`                 | Fails with the current rule's `message`             |
| String                  | Fails with the returned string as the error message |
| `{ type, message }`     | Produces feedback of the specified type             |

A string is the most common failure result:

```ts
return 'Username is already taken'
```

Use an explicit type for warning or success feedback:

```ts
return {
  type: 'warning',
  message: 'A company email is recommended',
}
```

Whether non-error feedback is displayed depends on how the component library consumes field feedback.

## Read validation feedback

Validation results are written to field feedback state, which form components consume to display messages. Common properties include:

- `field.selfErrors`
- `field.selfWarnings`
- `field.selfSuccesses`

```ts
await field.onInput('321')
console.log(field.selfWarnings)

await field.onBlur()
console.log(field.selfErrors)
```

`field.validate()` validates the current field and its descendant data fields. `form.validate()` and `form.submit()` schedule validation for data fields in the form.

## Reuse global rules

Keep rules used by only one field directly on that field. Register a global rule when it needs to be reused across pages:

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

The field still uses declarative configuration:

```vue
<Field
  name="username"
  title="Username"
  :validator="{ usernameAvailable: true }"
/>
```

This keeps field configuration clear while centralizing reusable logic. See [Registry and Configuration](/en/api/registry) to register custom formats, locales, and message templates.

## Update rules at runtime

Operate on a field instance only when linkage state needs to change its rules dynamically:

```ts
field.setValidator({
  format: 'email',
})

field.setValidatorRule('minLength', 6)
field.setValidatorRule('required', true)
```

`setValidator()` replaces the entire validation configuration. `setValidatorRule()` adds or updates one rule. Prefer declarations on `Field.validator` or `x-validator` for static rules.

## How Formily runs rules

After a field triggers `onInput`, `onBlur`, `onFocus`, or an explicit `validate()`, `@silver-formily/core` eventually calls `@silver-formily/validator`:

```ts
const results = await validate(field.value, field.validator, {
  triggerType,
  validateFirst: field.props.validateFirst ?? field.form.props.validateFirst,
  context: { field, form: field.form },
})
```

This lower-level call explains three behaviors:

- the value comes from `field.value`
- the rules come from `field.validator`
- custom validator `ctx` automatically includes `field` and `form`

Application code does not need to repeat this call. The Formily field model triggers validation, filters rules for the current trigger, and writes results back to feedback state.
