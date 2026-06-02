# createForm

> Creates a Form instance to be consumed as a ViewModel by the UI framework layer

## Description

`createForm` is the core entry function of `@silver-formily/core` for creating form instances.

## Signature

```ts
interface createForm {
  (props?: IFormProps): Form
}
```

## IFormProps

| Property        | Type                                                     | Default      | Description                    |
| --------------- | -------------------------------------------------------- | ------------ | ------------------------------ |
| `values`        | `Object`                                                 | `{}`         | Form values                    |
| `initialValues` | `Object`                                                 | `{}`         | Form default values            |
| `pattern`       | `'editable' \| 'disabled' \| 'readOnly' \| 'readPretty'` | `'editable'` | Form interaction pattern       |
| `display`       | `'visible' \| 'hidden' \| 'none'`                        | `'visible'`  | Form display mode              |
| `hidden`        | `boolean`                                                | `false`      | UI hidden                      |
| `visible`       | `boolean`                                                | `true`       | Visible/hidden (data hidden)   |
| `editable`      | `boolean`                                                | `true`       | Editable                       |
| `disabled`      | `boolean`                                                | `false`      | Disabled                       |
| `readOnly`      | `boolean`                                                | `false`      | Read-only                      |
| `readPretty`    | `boolean`                                                | `false`      | Read-pretty mode               |
| `effects`       | `(form: Form) => void`                                   | —            | Side-effect logic for linkage  |
| `validateFirst` | `boolean`                                                | `false`      | Stop validation on first error |

## Usage

```ts
import { createForm } from '@silver-formily/core'

const form = createForm({
  initialValues: {
    say: 'hello',
  },
})
```

### With Side Effects

```ts
import { createForm, onFieldValueChange, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFieldValueChange('username', (field) => {
      console.log('changed:', field.value)
    })
    onFormSubmit((form) => {
      console.log('submitting:', form.values)
    })
  },
})
```
