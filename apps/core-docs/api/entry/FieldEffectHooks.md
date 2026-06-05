---
outline: 2
---

# Field Effect Hooks

## onFieldInit

### 描述

用于监听某个字段初始化的副作用钩子，我们在调用 createField 的时候就会触发字段初始化事件

### 签名

```ts
interface onFieldInit {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

FormPathPattern的语法格式请参考 [FormPath](https://path.silver-formily.org/api/patterns)

### 用例

::: demo

api/entry/field-effect-hooks/on-field-init

:::

## onFieldMount

### 描述

用于监听某个字段已挂载的副作用钩子，我们在调用 onMount 的时候就会触发字段挂载事件

### 签名

```ts
interface onFieldMount {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-mount

:::

## onFieldUnmount

### 描述

用于监听某个字段已卸载的副作用钩子，我们在调用 onUnmount 的时候就会触发卸载事件

### 签名

```ts
interface onFieldUnmount {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-unmount

:::

## onFieldReact

用于实现字段响应式逻辑的副作用钩子，它的核心原理就是字段初始化的时候会执行回调函数，同时自动追踪依赖，依赖数据发生变化时回调函数会重复执行

### 签名

```ts
interface onFieldReact {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-react

:::

> 该示例会追踪 values.other 的变化，如果等于 123，就会控制 target 显示，否则隐藏

## onFieldChange

### 描述

用于监听某个字段的属性变化的副作用钩子

### 签名

```ts
interface onFieldChange {
  (
    pattern: FormPathPattern,
    watches?: string[],
    callback: (field: Field, form: Form) => void
  )
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

可以传入具体要监听的的属性集合，也可以不传，默认是监听 value 变化

### 用例

::: demo

api/entry/field-effect-hooks/on-field-change

:::

## onFieldValueChange

用于监听某个字段值变化的副作用钩子

### 签名

```ts
interface onFieldValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-value-change

:::

## onFieldInitialValueChange

用于监听某个字段默认值变化的副作用钩子

### 签名

```ts
interface onFieldInitialValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-initial-value-change

:::

## onFieldInputValueChange

用于监听某个字段 onInput 触发的副作用钩子

### 签名

```ts
interface onFieldInputValueChange {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-input-value-change

:::

## onFieldValidateStart

### 描述

监听某个字段校验触发开始的副作用钩子

### 签名

```ts
interface onFieldValidateStart {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-validate-start

:::

## onFieldValidateEnd

### 描述

监听某个字段校验触发结束的副作用钩子

### 签名

```ts
interface onFieldValidateEnd {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-validate-end

:::

## onFieldValidateFailed

### 描述

监听某个字段校验触发失败的副作用钩子

### 签名

```ts
interface onFieldValidateFailed {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-validate-failed

:::

## onFieldValidateSuccess

### 描述

监听某个字段校验触发成功的副作用钩子

### 签名

```ts
interface onFieldValidateSuccess {
  (pattern: FormPathPattern, callback: (field: Field, form: Form) => void)
}
```

### 用例

::: demo

api/entry/field-effect-hooks/on-field-validate-success

:::
