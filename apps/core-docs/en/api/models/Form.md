# Form Model

> The top-level form container model, managing global state, field graph, and event bus

## Description

`Form` is the core model class of `@silver-formily/core`. It aggregates `Graph` (field graph) and `Heart` (event bus), providing field creation, querying, validation, submission, and all form capabilities.

## Constructor

```txt
const form = new Form(options?: IFormProps)
```

Prefer the factory function:

```ts
import { createForm } from '@silver-formily/core'

const form = createForm(options)
```

## Properties

### State Properties

| Property                                            | Type              | Description            |
| --------------------------------------------------- | ----------------- | ---------------------- |
| `values`                                            | `T`               | Current form values    |
| `initialValues`                                     | `T`               | Initial form values    |
| `valid`                                             | `boolean`         | All validation passed  |
| `invalid`                                           | `boolean`         | Some validation failed |
| `validating`                                        | `boolean`         | Validating in progress |
| `submitting`                                        | `boolean`         | Submitting in progress |
| `loading`                                           | `boolean`         | Loading state          |
| `errors`                                            | `IFormFeedback[]` | Form-level errors      |
| `warnings`                                          | `IFormFeedback[]` | Form-level warnings    |
| `mounted`                                           | `boolean`         | Form mounted           |
| `modified`                                          | `boolean`         | Some field modified    |
| `hidden` / `visible`                                | `boolean`         | Display state          |
| `editable` / `disabled` / `readOnly` / `readPretty` | `boolean`         | Pattern states         |

### Model References

| Property     | Type          | Description        |
| ------------ | ------------- | ------------------ |
| `graph`      | `Graph`       | Field graph        |
| `heart`      | `Heart`       | Event bus          |
| `lifecycles` | `LifeCycle[]` | Lifecycle handlers |

## Methods

### Field Creation

| Method                     | Description            |
| -------------------------- | ---------------------- |
| `createField(props)`       | Create a data field    |
| `createVoidField(props)`   | Create a void field    |
| `createArrayField(props)`  | Create an array field  |
| `createObjectField(props)` | Create an object field |

### Field Querying

| Method           | Description                  |
| ---------------- | ---------------------------- |
| `query(pattern)` | Query fields by path pattern |

### Value Operations

| Method                         | Description          |
| ------------------------------ | -------------------- |
| `setValues(values, strategy?)` | Set form values      |
| `setValuesIn(path, value)`     | Set value at path    |
| `getValuesIn(path)`            | Get value at path    |
| `deleteValuesIn(path)`         | Delete value at path |

### Form Operations

| Method               | Description       |
| -------------------- | ----------------- |
| `submit(onSubmit?)`  | Submit the form   |
| `validate(pattern?)` | Validate the form |
| `reset(options?)`    | Reset the form    |

### Pattern & Display

| Method                | Description      |
| --------------------- | ---------------- |
| `setPattern(pattern)` | Set form pattern |
| `setDisplay(display)` | Set form display |
| `setReadOnly(flag)`   | Toggle read-only |
| `setDisabled(flag)`   | Toggle disabled  |
| `setHidden(flag)`     | Toggle hidden    |

### Lifecycle

| Method                   | Description             |
| ------------------------ | ----------------------- |
| `onMount()`              | Mount the form          |
| `onUnmount()`            | Unmount the form        |
| `notify(type, payload?)` | Publish lifecycle event |
