# FormChecker

> Type-checking utility functions for runtime identification of Formily models and states

## Description

`@silver-formily/core` exports a set of type-checking functions for safely identifying object types at runtime.

## Model Instance Checks

### isForm

```ts
function isForm(node: any): node is Form
```

```ts
import { createForm, isForm } from '@silver-formily/core'

const form = createForm()
console.log(isForm(form)) // true
console.log(isForm({})) // false
```

### isField / isArrayField / isObjectField / isVoidField

```ts
isField(node) // Field instance
isArrayField(node) // ArrayField instance
isObjectField(node) // ObjectField instance
isVoidField(node) // VoidField instance
```

### isGeneralField

```ts
function isGeneralField(node: any): node is GeneralField
```

Returns true for any field instance (Field | VoidField).

### isDataField

```ts
function isDataField(node: any): node is DataField
```

Returns true for data-carrying fields (Field | ArrayField | ObjectField).

### isQuery

```ts
function isQuery(query: any): query is Query
```

## State Checks

| Function                     | Description                |
| ---------------------------- | -------------------------- |
| `isFormState(state)`         | Checks if FormState        |
| `isFieldState(state)`        | Checks if FieldState       |
| `isArrayFieldState(state)`   | Checks if ArrayFieldState  |
| `isObjectFieldState(state)`  | Checks if ObjectFieldState |
| `isVoidFieldState(state)`    | Checks if VoidFieldState   |
| `isGeneralFieldState(state)` | Checks if any FieldState   |
| `isDataFieldState(state)`    | Checks if data FieldState  |

```ts
import { isFieldState, isFormState } from '@silver-formily/core'

const state = field.getState()
console.log(isFieldState(state)) // true
console.log(isFormState(state)) // false
```

## Practical Usage

```ts
import { isArrayField, isField, isVoidField } from '@silver-formily/core'

function handleField(field) {
  if (isField(field)) {
    console.log(field.value)
  }
  else if (isArrayField(field)) {
    field.push({})
  }
  else if (isVoidField(field)) {
    console.log('void field')
  }
}
```
