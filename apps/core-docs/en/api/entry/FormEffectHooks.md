# FormEffectHooks

> Form-level side-effect hooks for subscribing to Form lifecycle events

## Description

FormEffectHooks are used inside the Form `effects` function to listen for form-level lifecycle events. Each hook corresponds to a lifecycle type in `LifeCycleTypes`.

## All Form Effect Hooks

### Lifecycle

| Hook            | Trigger          |
| --------------- | ---------------- |
| `onFormInit`    | Form initialized |
| `onFormMount`   | Form mounted     |
| `onFormUnmount` | Form unmounted   |

### Value Changes

| Hook                        | Trigger                |
| --------------------------- | ---------------------- |
| `onFormValuesChange`        | Form values changed    |
| `onFormInitialValuesChange` | Initial values changed |
| `onFormInputChange`         | Form input changed     |

### Submit

| Hook                  | Trigger                |
| --------------------- | ---------------------- |
| `onFormSubmit`        | Form submit            |
| `onFormSubmitStart`   | Submit started         |
| `onFormSubmitting`    | Submitting in progress |
| `onFormSubmitEnd`     | Submit ended           |
| `onFormSubmitSuccess` | Submit succeeded       |
| `onFormSubmitFailed`  | Submit failed          |

### Submit Validation

| Hook                          | Trigger                   |
| ----------------------------- | ------------------------- |
| `onFormSubmitValidateStart`   | Submit validation started |
| `onFormSubmitValidateSuccess` | Submit validation passed  |
| `onFormSubmitValidateFailed`  | Submit validation failed  |
| `onFormSubmitValidateEnd`     | Submit validation ended   |

### Validation

| Hook                    | Trigger                |
| ----------------------- | ---------------------- |
| `onFormValidateStart`   | Validation started     |
| `onFormValidating`      | Validating in progress |
| `onFormValidateSuccess` | Validation passed      |
| `onFormValidateFailed`  | Validation failed      |
| `onFormValidateEnd`     | Validation ended       |

### Other

| Hook                | Trigger               |
| ------------------- | --------------------- |
| `onFormGraphChange` | Field graph changed   |
| `onFormLoading`     | Loading state changed |
| `onFormReset`       | Form reset            |

## Usage

All form hooks follow a uniform signature:

```txt
onFormXxx(callback: (form: Form) => void): void
```

### Basic Usage

```ts
import { createForm, onFormMount, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormMount((form) => {
      console.log('Form mounted')
    })

    onFormSubmit((form) => {
      console.log('Submitting:', form.values)
    })
  },
})
```

## onFormReact

A special reactive side-effect that auto-tracks form state changes:

```ts
onFormReact((form) => {
  // Auto-tracks all observable properties read from form
  console.log(form.values, form.valid)
})
```

Equivalent to `onFormInit` + `autorun`.
