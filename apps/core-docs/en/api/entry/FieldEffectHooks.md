# FieldEffectHooks

> Field-level side-effect hooks for listening to field lifecycle events by path pattern

## Description

FieldEffectHooks listen for lifecycle events on specific fields. Unlike Form-level hooks, they require a **path pattern** to filter target fields.

## All Field Effect Hooks

### Lifecycle

| Hook             | Trigger           |
| ---------------- | ----------------- |
| `onFieldInit`    | Field initialized |
| `onFieldMount`   | Field mounted     |
| `onFieldUnmount` | Field unmounted   |

### Value Changes

| Hook                        | Trigger               |
| --------------------------- | --------------------- |
| `onFieldValueChange`        | Field value changed   |
| `onFieldInitialValueChange` | Initial value changed |
| `onFieldInputValueChange`   | Input value changed   |

### Validation

| Hook                     | Trigger            |
| ------------------------ | ------------------ |
| `onFieldValidateStart`   | Validation started |
| `onFieldValidating`      | Validating         |
| `onFieldValidateEnd`     | Validation ended   |
| `onFieldValidateSuccess` | Validation passed  |
| `onFieldValidateFailed`  | Validation failed  |

### Submit

| Hook                   | Trigger          |
| ---------------------- | ---------------- |
| `onFieldSubmit`        | Field submit     |
| `onFieldSubmitStart`   | Submit started   |
| `onFieldSubmitEnd`     | Submit ended     |
| `onFieldSubmitSuccess` | Submit succeeded |
| `onFieldSubmitFailed`  | Submit failed    |

### Other

| Hook             | Trigger               |
| ---------------- | --------------------- |
| `onFieldReset`   | Field reset           |
| `onFieldLoading` | Loading state changed |

## Common Signature

```txt
onFieldXxx(pattern: FormPathPattern, callback: (field: Field, form: Form) => void): void
```

## Usage

### Listen to Specific Fields

```ts
import { createForm, onFieldMount, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFieldValueChange('username', (field) => {
      console.log('changed:', field.value)
    })

    onFieldMount('email', (field, form) => {
      console.log('email mounted')
    })
  },
})
```

### Wildcard Patterns

```ts
onFieldValueChange('user.*', (field) => {
  // matches user.username, user.email, etc.
})

onFieldValueChange('**.name', (field) => {
  // matches name at any depth
})
```

### Field Linkage

```ts
onFieldValueChange('source', (field) => {
  field.form.setValuesIn('target', `copy: ${field.value}`)
})
```

## onFieldInit Special Behavior

If the field already exists in the form, the callback fires **immediately**; otherwise it fires when the field is created.

```ts
onFieldInit('dynamic.*', (field) => {
  // fires immediately for existing fields
  // fires on creation for future fields
})
```

## onFieldReact & onFieldChange

```ts
// Reactive: auto-tracks observable reads
onFieldReact('username', (field) => {
  console.log(field.value, field.valid)
})

// Watch specific properties
onFieldChange('username', ['value', 'modified'], (field) => {
  console.log('state changed')
})
```
