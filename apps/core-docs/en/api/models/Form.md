# Form Model

> The top-level form container model, managing global state, field graph, and event bus

## Description

`Form` is the top-level aggregate model of `@silver-formily/core`. It aggregates `Graph` (field graph) and `Heart` (event bus), and provides entry points for field creation, querying, value operations, validation, and submission.

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

### Field Graph

| Method                                  | Description                  |
| --------------------------------------- | ---------------------------- |
| `getFormGraph()`                        | Export Form and field states |
| `setFormGraph(graph)`                   | Import Form and field states |
| `clearFormGraph(pattern?, forceClear?)` | Clear matched fields         |

### Value Operations

| Method                                | Description                        |
| ------------------------------------- | ---------------------------------- |
| `setValues(values, strategy?)`        | Set form values                    |
| `setValuesIn(path, value)`            | Set value at path                  |
| `getValuesIn(path)`                   | Get value at path                  |
| `deleteValuesIn(path)`                | Delete value at path               |
| `existValuesIn(path)`                 | Check whether value exists         |
| `setInitialValues(values, strategy?)` | Set initial values                 |
| `setInitialValuesIn(path, value)`     | Set initial value at path          |
| `getInitialValuesIn(path)`            | Get initial value at path          |
| `deleteInitialValuesIn(path)`         | Delete initial value at path       |
| `existInitialValuesIn(path)`          | Check whether initial value exists |

### Form Operations

| Method                      | Description             |
| --------------------------- | ----------------------- |
| `submit(onSubmit?)`         | Submit the form         |
| `validate(pattern?)`        | Validate matched fields |
| `reset(pattern?, options?)` | Reset matched fields    |

### Pattern & Display

| Method                | Description                       |
| --------------------- | --------------------------------- |
| `setPattern(pattern)` | Set form pattern                  |
| `setDisplay(display)` | Set form display                  |
| `readOnly = flag`     | Toggle read-only through setter   |
| `disabled = flag`     | Toggle disabled through setter    |
| `hidden = flag`       | Toggle hidden through setter      |
| `visible = flag`      | Toggle visible through setter     |
| `editable = flag`     | Toggle editable through setter    |
| `readPretty = flag`   | Toggle read-pretty through setter |

### Lifecycle

| Method                    | Description               |
| ------------------------- | ------------------------- |
| `onMount()`               | Mount the form            |
| `onUnmount()`             | Unmount the form          |
| `notify(type, payload?)`  | Publish lifecycle event   |
| `subscribe(subscriber)`   | Subscribe lifecycle event |
| `unsubscribe(id)`         | Unsubscribe               |
| `setEffects(effects)`     | Replace effects config    |
| `addEffects(id, effects)` | Add effects config        |
| `removeEffects(id)`       | Remove effects config     |
