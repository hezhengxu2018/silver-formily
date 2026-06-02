# FormEffectHooks

> 表单级别的副作用 Hook 集合，用于在 Form 生命周期事件中注册回调

## 描述

FormEffectHooks 是一组在 Form effects 函数中使用的 Hook，用于监听表单级别的生命周期事件。每个 Hook 对应 `LifeCycleTypes` 中的一个生命周期类型。

## 所有 Form 副作用 Hook

### 生命周期类

| Hook            | 生命周期类型      | 触发时机   |
| --------------- | ----------------- | ---------- |
| `onFormInit`    | `ON_FORM_INIT`    | 表单初始化 |
| `onFormMount`   | `ON_FORM_MOUNT`   | 表单挂载   |
| `onFormUnmount` | `ON_FORM_UNMOUNT` | 表单卸载   |

### 值变化类

| Hook                        | 生命周期类型                    | 触发时机                |
| --------------------------- | ------------------------------- | ----------------------- |
| `onFormValuesChange`        | `ON_FORM_VALUES_CHANGE`         | 表单 values 变化        |
| `onFormInitialValuesChange` | `ON_FORM_INITIAL_VALUES_CHANGE` | 表单 initialValues 变化 |
| `onFormInputChange`         | `ON_FORM_INPUT_CHANGE`          | 表单输入变化            |

### 提交类

| Hook                  | 生命周期类型             | 触发时机     |
| --------------------- | ------------------------ | ------------ |
| `onFormSubmit`        | `ON_FORM_SUBMIT`         | 表单提交     |
| `onFormSubmitStart`   | `ON_FORM_SUBMIT_START`   | 表单提交开始 |
| `onFormSubmitting`    | `ON_FORM_SUBMITTING`     | 表单正在提交 |
| `onFormSubmitEnd`     | `ON_FORM_SUBMIT_END`     | 表单提交结束 |
| `onFormSubmitSuccess` | `ON_FORM_SUBMIT_SUCCESS` | 表单提交成功 |
| `onFormSubmitFailed`  | `ON_FORM_SUBMIT_FAILED`  | 表单提交失败 |

### 提交校验类

| Hook                          | 生命周期类型                      | 触发时机     |
| ----------------------------- | --------------------------------- | ------------ |
| `onFormSubmitValidateStart`   | `ON_FORM_SUBMIT_VALIDATE_START`   | 提交校验开始 |
| `onFormSubmitValidateSuccess` | `ON_FORM_SUBMIT_VALIDATE_SUCCESS` | 提交校验成功 |
| `onFormSubmitValidateFailed`  | `ON_FORM_SUBMIT_VALIDATE_FAILED`  | 提交校验失败 |
| `onFormSubmitValidateEnd`     | `ON_FORM_SUBMIT_VALIDATE_END`     | 提交校验结束 |

### 校验类

| Hook                    | 生命周期类型               | 触发时机     |
| ----------------------- | -------------------------- | ------------ |
| `onFormValidateStart`   | `ON_FORM_VALIDATE_START`   | 表单校验开始 |
| `onFormValidating`      | `ON_FORM_VALIDATING`       | 表单正在校验 |
| `onFormValidateSuccess` | `ON_FORM_VALIDATE_SUCCESS` | 表单校验成功 |
| `onFormValidateFailed`  | `ON_FORM_VALIDATE_FAILED`  | 表单校验失败 |
| `onFormValidateEnd`     | `ON_FORM_VALIDATE_END`     | 表单校验结束 |

### 其他

| Hook                | 生命周期类型           | 触发时机         |
| ------------------- | ---------------------- | ---------------- |
| `onFormGraphChange` | `ON_FORM_GRAPH_CHANGE` | 表单字段图变化   |
| `onFormLoading`     | `ON_FORM_LOADING`      | 表单加载状态变化 |
| `onFormReset`       | `ON_FORM_RESET`        | 表单重置         |

## 用法

所有 Form Hook 遵循统一签名：

```txt
onFormXxx(callback: (form: Form) => void): void
```

### 基本用法

```ts
import { createForm, onFormMount, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormMount((form) => {
      console.log('表单已挂载', form.mounted)
    })

    onFormSubmit((form) => {
      console.log('表单提交:', form.values)
    })
  },
})
```

### 完整的提交流程监听

```ts
import {
  createForm,
  onFormSubmitEnd,
  onFormSubmitFailed,
  onFormSubmitStart,
  onFormSubmitSuccess,
  onFormSubmitValidateFailed,
  onFormSubmitValidateStart,
  onFormSubmitValidateSuccess,
} from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmitStart((form) => {
      console.log('submit start')
    })

    onFormSubmitValidateStart((form) => {
      console.log('validate start')
    })

    onFormSubmitValidateSuccess((form) => {
      console.log('validate success')
    })

    onFormSubmitValidateFailed((form) => {
      console.log('validate failed:', form.errors)
    })

    onFormSubmitSuccess((form) => {
      console.log('submit success:', form.values)
    })

    onFormSubmitFailed((form) => {
      console.log('submit failed:', form.errors)
    })

    onFormSubmitEnd((form) => {
      console.log('submit end')
    })
  },
})
```

## onFormReact

特殊的响应式副作用，会自动追踪表单状态变化：

```ts
onFormReact((form) => {
  // 自动追踪 form 上读取的所有 observable 属性
  // 任意属性变化时重新执行
  console.log(form.values)
  console.log(form.valid)
})
```

等价于 `onFormInit` + `autorun` 的组合。
