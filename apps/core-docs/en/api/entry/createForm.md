---
outline: 2
---

# createForm

## Description

Creates a Form instance to be consumed as a ViewModel by the UI framework layer.

## Signature

```ts
interface createForm {
  (props: IFormProps): Form
}
```

## IFormProps

| Property      | Description                    | Type                                                          | Default      |
| ------------- | ------------------------------ | ------------------------------------------------------------- | ------------ |
| values        | Form values                    | Object                                                        | `{}`         |
| initialValues | Form default values            | Object                                                        | `{}`         |
| pattern       | Form interaction pattern       | [FormPatternTypes](/en/api/models/Form.html#formpatterntypes) | `"editable"` |
| display       | Form display mode              | [FormDisplayTypes](/en/api/models/Form.html#formdisplaytypes) | `"visible"`  |
| hidden        | UI hidden                      | Boolean                                                       | `false`      |
| visible       | Visible/hidden (data hidden)   | Boolean                                                       | `true`       |
| editable      | Editable                       | Boolean                                                       | `true`       |
| disabled      | Disabled                       | Boolean                                                       | `false`      |
| readOnly      | Read-only                      | Boolean                                                       | `false`      |
| readPretty    | Read-pretty mode               | Boolean                                                       | `false`      |
| effects       | Side-effect logic for linkage  | `(form:Form)=>void`                                           |              |
| validateFirst | Stop on the first invalid rule | Boolean                                                       | `false`      |

## Usage

```ts
import { createForm } from '@silver-formily/core'

const form = createForm({
  initialValues: {
    say: 'hello',
  },
})
```
