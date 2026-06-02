# FormChecker

> 类型判断工具函数集合，用于运行时检查对象是否为特定的 Formily 模型或状态

## 描述

`@silver-formily/core` 导出了一组类型检查函数，用于在运行时安全地判断对象类型。

## 判断模型实例

### isForm

```ts
function isForm(node: any): node is Form
```

检查一个对象是否为 `Form` 实例：

```ts
import { createForm, isForm } from '@silver-formily/core'

const form = createForm()
console.log(isForm(form)) // true
console.log(isForm({})) // false
```

### isField

```ts
function isField(node: any): node is Field
```

检查是否为 `Field` 实例。

### isArrayField

```ts
function isArrayField(node: any): node is ArrayField
```

检查是否为 `ArrayField` 实例。

### isObjectField

```ts
function isObjectField(node: any): node is ObjectField
```

检查是否为 `ObjectField` 实例。

### isVoidField

```ts
function isVoidField(node: any): node is VoidField
```

检查是否为 `VoidField` 实例。

### isGeneralField

```ts
function isGeneralField(node: any): node is GeneralField
```

检查是否为任意字段实例 (Field | VoidField)：

```ts
import { isGeneralField, isVoidField } from '@silver-formily/core'

if (isGeneralField(node) && !isVoidField(node)) {
  // node 为数据类字段 (Field | ArrayField | ObjectField)
}
```

### isDataField

```ts
function isDataField(node: any): node is DataField
```

检查是否为数据字段 (Field | ArrayField | ObjectField)。

### isQuery

```ts
function isQuery(query: any): query is Query
```

检查是否为 `Query` 实例。

## 判断状态对象

除了模型实例，core 还提供了状态对象的类型检查：

| 函数                         | 说明                        |
| ---------------------------- | --------------------------- |
| `isFormState(state)`         | 检查是否为 FormState        |
| `isFieldState(state)`        | 检查是否为 FieldState       |
| `isArrayFieldState(state)`   | 检查是否为 ArrayFieldState  |
| `isObjectFieldState(state)`  | 检查是否为 ObjectFieldState |
| `isVoidFieldState(state)`    | 检查是否为 VoidFieldState   |
| `isGeneralFieldState(state)` | 检查是否为任意 FieldState   |
| `isDataFieldState(state)`    | 检查是否为数据类 FieldState |

```ts
import { isFieldState, isFormState } from '@silver-formily/core'

const state = field.getState()
console.log(isFieldState(state)) // true
console.log(isFormState(state)) // false
```

## 实际场景

```ts
import {
  isArrayField,
  isField,
  isObjectField,
  isVoidField,
} from '@silver-formily/core'

function handleField(field) {
  if (isField(field)) {
    // 处理数据字段
    console.log(field.value)
  }
  else if (isArrayField(field)) {
    // 处理数组字段
    field.push({})
  }
  else if (isObjectField(field)) {
    // 处理对象字段
    console.log(field.properties)
  }
  else if (isVoidField(field)) {
    // 处理虚字段
    console.log('虚字段')
  }
}
```
