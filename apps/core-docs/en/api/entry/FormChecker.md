---
outline: 2
---

# Form Checkers

> Type checkers are mainly used to determine the specific type of an object

## isForm

### Description

Checks whether an object is a [Form](/en/api/models/Form) object.

### Signature

```ts
interface isForm {
  (target: any): target is Form
}
```

### Usage

```ts
import { createForm, isForm } from '@silver-formily/core'

const form = createForm()

console.log(isForm(form)) // true
```

## isField

### Description

Checks whether an object is a [Field](/en/api/models/Field) object.

### Signature

```ts
interface isField {
  (target: any): target is Field
}
```

### Usage

```ts
import { createForm, isField } from '@silver-formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })

console.log(isField(field)) // true
```

## isArrayField

### Description

Checks whether an object is an [ArrayField](/en/api/models/ArrayField) object.

### Signature

```ts
interface isArrayField {
  (target: any): target is ArrayField
}
```

### Usage

```ts
import { createForm, isArrayField } from '@silver-formily/core'

const form = createForm()

const field = form.createArrayField({ name: 'target' })

console.log(isArrayField(field)) // true
```

## isObjectField

### Description

Checks whether an object is an [ObjectField](/en/api/models/ObjectField) object.

### Signature

```ts
interface isObjectField {
  (target: any): target is ObjectField
}
```

### Usage

```ts
import { createForm, isObjectField } from '@silver-formily/core'

const form = createForm()

const field = form.createObjectField({ name: 'target' })

console.log(isObjectField(field)) // true
```

## isVoidField

### Description

Checks whether an object is a [VoidField](/en/api/models/VoidField) object.

### Signature

```ts
interface isVoidField {
  (target: any): target is VoidField
}
```

### Usage

```ts
import { createForm, isVoidField } from '@silver-formily/core'

const form = createForm()

const field = form.createVoidField({ name: 'target' })

console.log(isVoidField(field)) // true
```

## isGeneralField

### Description

Checks whether an object is a Field / ArrayField / ObjectField / VoidField object.

### Signature

```ts
interface isGeneralField {
  (target: any): target is Field | ArrayField | ObjectField | VoidField
}
```

### Usage

```ts
import { createForm, isGeneralField } from '@silver-formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isGeneralField(field)) // true
console.log(isGeneralField(arr)) // true
console.log(isGeneralField(obj)) // true
console.log(isGeneralField(vod)) // true
console.log(isGeneralField({})) // false
```

## isDataField

### Description

Checks whether an object is a Field / ArrayField / ObjectField object.

### Signature

```ts
interface isDataField {
  (target: any): target is Field | ArrayField | ObjectField
}
```

### Usage

```ts
import { createForm, isDataField } from '@silver-formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isDataField(field)) // true
console.log(isDataField(arr)) // true
console.log(isDataField(obj)) // true
console.log(isDataField(vod)) // false
console.log(isDataField({})) // false
```

## isFormState

### Description

Checks whether an object is an [IFormState](/en/api/models/Form#iformstate) object.

### Signature

```ts
interface isFormState {
  (target: any): target is IFormState
}
```

### Usage

```ts
import { createForm, isFormState } from '@silver-formily/core'

const form = createForm()

console.log(isFormState(form)) // false
console.log(isFormState(form.getState())) // true
```

## isFieldState

### Description

Checks whether an object is an [IFieldState](/en/api/models/Field#ifieldstate) object.

### Signature

```ts
interface isFieldState {
  (target: any): target is IFieldState
}
```

### Usage

```ts
import { createForm, isFieldState } from '@silver-formily/core'

const form = createForm()
const field = form.createField({
  name: 'target',
})

console.log(isFieldState(field)) // false
console.log(isFieldState(field.getState())) // true
```

## isArrayFieldState

### Description

Checks whether an object is an [IArrayFieldState](/en/api/models/ArrayField#iarrayfieldstate) object.

### Signature

```ts
interface isArrayFieldState {
  (target: any): target is IArrayFieldState
}
```

### Usage

```ts
import { createForm, isArrayFieldState } from '@silver-formily/core'

const form = createForm()
const field = form.createArrayField({
  name: 'target',
})

console.log(isArrayFieldState(field)) // false
console.log(isArrayFieldState(field.getState())) // true
```

## isObjectFieldState

### Description

Checks whether an object is an [IObjectFieldState](/en/api/models/ObjectField#iobjectfieldstate) object.

### Signature

```ts
interface isObjectFieldState {
  (target: any): target is IObjectFieldState
}
```

### Usage

```ts
import { createForm, isObjectFieldState } from '@silver-formily/core'

const form = createForm()
const field = form.createObjectField({
  name: 'target',
})

console.log(isObjectFieldState(field)) // false
console.log(isObjectFieldState(field.getState())) // true
```

## isVoidFieldState

### Description

Checks whether an object is an [IVoidFieldState](/en/api/models/VoidField#ivoidfieldstate) object.

### Signature

```ts
interface isVoidFieldState {
  (target: any): target is IVoidFieldState
}
```

### Usage

```ts
import { createForm, isVoidFieldState } from '@silver-formily/core'

const form = createForm()
const field = form.createVoidField({
  name: 'target',
})

console.log(isVoidFieldState(field)) // false
console.log(isVoidFieldState(field.getState())) // true
```

## isGeneralFieldState

### Description

Checks whether an object is an IFieldState / IArrayFieldState / IObjectFieldState / IVoidFieldState object.

### Signature

```ts
interface isGeneralFieldState {
  (target: any): target is
  | IFieldState
  | IArrayFieldState
  | IObjectFieldState
  | IVoidFieldState
}
```

### Usage

```ts
import { createForm, isGeneralFieldState } from '@silver-formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isGeneralFieldState(field)) // false
console.log(isGeneralFieldState(arr)) // false
console.log(isGeneralFieldState(obj)) // false
console.log(isGeneralFieldState(vod)) // false
console.log(isGeneralFieldState(field.getState())) // true
console.log(isGeneralFieldState(arr.getState())) // true
console.log(isGeneralFieldState(obj.getState())) // true
console.log(isGeneralFieldState(vod.getState())) // true
console.log(isGeneralFieldState({})) // false
```

## isDataFieldState

### Description

Checks whether an object is an IFieldState / IArrayFieldState / IObjectFieldState object.

### Signature

```ts
interface isDataFieldState {
  (target: any): target is IFieldState | IArrayFieldState | IObjectFieldState
}
```

### Usage

```ts
import { createForm, isDataFieldState } from '@silver-formily/core'

const form = createForm()

const field = form.createField({ name: 'target' })
const arr = form.createArrayField({ name: 'array' })
const obj = form.createObjectField({ name: 'object' })
const vod = form.createVoidField({ name: 'void' })

console.log(isDataFieldState(field)) // false
console.log(isDataFieldState(arr)) // false
console.log(isDataFieldState(obj)) // false
console.log(isDataFieldState(vod)) // false
console.log(isDataFieldState(field.getState())) // true
console.log(isDataFieldState(arr.getState())) // true
console.log(isDataFieldState(obj.getState())) // true
console.log(isDataFieldState(vod.getState())) // false
console.log(isDataFieldState({})) // false
```

## isQuery

### Description

Checks whether an object is a Query object.

### Signature

```ts
interface isQuery {
  (target: any): target is Query
}
```

### Usage

```ts
import { createForm, isQuery } from '@silver-formily/core'

const form = createForm()
console.log(isQuery(form.query('target'))) // true
```
