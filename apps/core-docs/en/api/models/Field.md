# Field Model

> Basic data field model carrying field values, validation rules, and interaction state

## Description

`Field` is the most commonly used field model, representing a data field in a form. It inherits all capabilities from `BaseField` and extends with value management, validation, and submission features.

## Constructor

```ts
const field = form.createField({
  name: 'username',
  value: '',
})
```

## Properties

### Value-Related

| Property       | Type        | Description         |
| -------------- | ----------- | ------------------- |
| `value`        | `ValueType` | Current field value |
| `inputValue`   | `ValueType` | Field input value   |
| `initialValue` | `ValueType` | Field initial value |

### Validation-Related

| Property                      | Type              | Description            |
| ----------------------------- | ----------------- | ---------------------- |
| `valid`                       | `boolean`         | Validated (aggregated) |
| `invalid`                     | `boolean`         | Invalid (aggregated)   |
| `selfValid`                   | `boolean`         | Own validity           |
| `errors`                      | `IFormFeedback[]` | Errors (aggregated)    |
| `selfErrors`                  | `FeedbackMessage` | Own errors             |
| `warnings` / `selfWarnings`   | —                 | Warnings               |
| `successes` / `selfSuccesses` | —                 | Success messages       |
| `validating`                  | `boolean`         | Validating             |
| `validateStatus`              | `string`          | Validation status      |

### Interaction

| Property       | Type      | Description   |
| -------------- | --------- | ------------- |
| `active`       | `boolean` | Focused       |
| `visited`      | `boolean` | Visited       |
| `selfModified` | `boolean` | Self-modified |
| `modified`     | `boolean` | Modified      |
| `loading`      | `boolean` | Loading       |
| `submitting`   | `boolean` | Submitting    |

### Base (inherited from BaseField)

| Property                                            | Type              | Description         |
| --------------------------------------------------- | ----------------- | ------------------- |
| `name`                                              | `string`          | Field name          |
| `path`                                              | `string`          | Full path           |
| `title` / `description`                             | `any`             | Title / description |
| `display` / `pattern`                               | —                 | Display / pattern   |
| `mounted` / `unmounted`                             | `boolean`         | Mount state         |
| `hidden` / `visible`                                | `boolean`         | Visibility          |
| `editable` / `disabled` / `readOnly` / `readPretty` | `boolean`         | Pattern states      |
| `required`                                          | `boolean`         | Required            |
| `index`                                             | `number`          | Index               |
| `address`                                           | `string`          | Field address       |
| `form`                                              | `Form`            | Parent form         |
| `parent`                                            | `GeneralField`    | Parent field        |
| `componentType` / `componentProps`                  | —                 | Component config    |
| `decoratorType` / `decoratorProps`                  | —                 | Decorator config    |
| `dataSource`                                        | `FieldDataSource` | Data source         |

## Methods

### Value Operations

| Method                   | Description         |
| ------------------------ | ------------------- |
| `setValue(value)`        | Set field value     |
| `onInput(value)`         | Simulate user input |
| `setInitialValue(value)` | Set initial value   |

### Validation

| Method                          | Description          |
| ------------------------------- | -------------------- |
| `validate()`                    | Validate the field   |
| `setValidator(validator)`       | Set validation rules |
| `setValidatorRule(name, value)` | Set a single rule    |

### State

| Method                | Description     |
| --------------------- | --------------- |
| `getState(selector?)` | Get field state |
| `setState(setter)`    | Set field state |

### Pattern & Display

`setPattern()` / `setDisplay()` / `setReadOnly()` / `setDisabled()` / `setHidden()` / `setEditable()` / `setReadPretty()` / `setRequired()`
