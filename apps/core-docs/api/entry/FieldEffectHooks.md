# FieldEffectHooks

> 字段级别的副作用 Hook 集合，用于按路径模式监听字段生命周期事件

## 描述

FieldEffectHooks 用于在 Form effects 函数中监听特定字段级别的生命周期事件。与 Form 级别的 Hook 不同，FieldEffectHooks 需要指定**路径模式**来筛选目标字段。

## 所有 Field 副作用 Hook

### 生命周期类

| Hook             | 生命周期类型       | 触发时机   |
| ---------------- | ------------------ | ---------- |
| `onFieldInit`    | `ON_FIELD_INIT`    | 字段初始化 |
| `onFieldMount`   | `ON_FIELD_MOUNT`   | 字段挂载   |
| `onFieldUnmount` | `ON_FIELD_UNMOUNT` | 字段卸载   |

### 值变化类

| Hook                        | 生命周期类型                    | 触发时机               |
| --------------------------- | ------------------------------- | ---------------------- |
| `onFieldValueChange`        | `ON_FIELD_VALUE_CHANGE`         | 字段 value 变化        |
| `onFieldInitialValueChange` | `ON_FIELD_INITIAL_VALUE_CHANGE` | 字段 initialValue 变化 |
| `onFieldInputValueChange`   | `ON_FIELD_INPUT_VALUE_CHANGE`   | 字段 inputValue 变化   |

### 校验类

| Hook                     | 生命周期类型                | 触发时机 |
| ------------------------ | --------------------------- | -------- |
| `onFieldValidateStart`   | `ON_FIELD_VALIDATE_START`   | 校验开始 |
| `onFieldValidating`      | `ON_FIELD_VALIDATING`       | 正在校验 |
| `onFieldValidateEnd`     | `ON_FIELD_VALIDATE_END`     | 校验结束 |
| `onFieldValidateSuccess` | `ON_FIELD_VALIDATE_SUCCESS` | 校验成功 |
| `onFieldValidateFailed`  | `ON_FIELD_VALIDATE_FAILED`  | 校验失败 |

### 提交类

| Hook                   | 生命周期类型              | 触发时机 |
| ---------------------- | ------------------------- | -------- |
| `onFieldSubmit`        | `ON_FIELD_SUBMIT`         | 字段提交 |
| `onFieldSubmitStart`   | `ON_FIELD_SUBMIT_START`   | 提交开始 |
| `onFieldSubmitEnd`     | `ON_FIELD_SUBMIT_END`     | 提交结束 |
| `onFieldSubmitSuccess` | `ON_FIELD_SUBMIT_SUCCESS` | 提交成功 |
| `onFieldSubmitFailed`  | `ON_FIELD_SUBMIT_FAILED`  | 提交失败 |

### 其他

| Hook             | 生命周期类型       | 触发时机     |
| ---------------- | ------------------ | ------------ |
| `onFieldReset`   | `ON_FIELD_RESET`   | 字段重置     |
| `onFieldLoading` | `ON_FIELD_LOADING` | 加载状态变化 |

## 通用签名

所有 Field Hook 遵循统一的签名：

```txt
onFieldXxx(pattern: FormPathPattern, callback: (field: Field, form: Form) => void): void
```

- `pattern`: 路径模式（支持通配符 `*`）
- `callback`: 回调函数，接收匹配的 Field 和所属 Form

## 用法

### 监听特定字段

```ts
import { createForm, onFieldMount, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFieldValueChange('username', (field) => {
      console.log('username changed:', field.value)
    })

    onFieldMount('email', (field, form) => {
      // 字段挂载时自动聚焦
      console.log('email mounted')
    })
  },
})
```

### 使用通配符

```ts
onFieldValueChange('user.*', (field) => {
  // 匹配 user.username, user.email 等 user 的直接子字段
})

onFieldValueChange('**.name', (field) => {
  // 匹配任意层级的 name 字段
})
```

### 字段联动

```ts
import { createForm, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  effects() {
    // 当 source 字段变化时，联动更新 target 字段
    onFieldValueChange('source', (field) => {
      field.form.setValuesIn('target', `copy: ${field.value}`)
    })
  },
})
```

## onFieldInit 的特殊行为

`onFieldInit` 与其它 Hook 不同：

- 如果字段**已存在**于表单中，则**立即同步**调用回调
- 如果字段**尚未创建**，则在字段**初始化时**调用回调

```ts
onFieldInit('dynamic.*', (field) => {
  // 已有的 dynamic.* 字段会立即回调
  // 未来创建的 dynamic.* 字段会在创建时回调
})
```

## onFieldReact

响应式字段副作用，自动追踪字段状态变化：

```ts
onFieldReact('username', (field) => {
  // 自动追踪 field 上的 observable 属性
  console.log(field.value, field.valid)
})
```

## onFieldChange

监听字段特定属性的变化：

```ts
// 默认监听 value 变化
onFieldChange('username', (field) => {
  console.log('value changed:', field.value)
})

// 监听多个属性
onFieldChange('username', ['value', 'modified', 'valid'], (field) => {
  console.log('state changed:', field.value, field.modified, field.valid)
})
```

`onFieldChange` 与 `onFieldValueChange` 的区别在于：

- `onFieldValueChange` 是生命周期事件钩子，只在 value 确认变更时触发
- `onFieldChange` 基于 `reaction`，可监听任意属性的变化
