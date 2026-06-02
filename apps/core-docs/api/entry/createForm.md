# createForm

> 创建一个 Form 实例，作为 ViewModel 供 UI 框架层消费

## 描述

`createForm` 是 `@silver-formily/core` 的核心入口函数，用于创建表单实例。

## 签名

```ts
interface createForm {
  (props?: IFormProps): Form
}
```

## IFormProps

| 属性            | 类型                                                     | 默认值       | 说明                             |
| --------------- | -------------------------------------------------------- | ------------ | -------------------------------- |
| `values`        | `Object`                                                 | `{}`         | 表单值                           |
| `initialValues` | `Object`                                                 | `{}`         | 表单默认值                       |
| `pattern`       | `'editable' \| 'disabled' \| 'readOnly' \| 'readPretty'` | `'editable'` | 表单交互模式                     |
| `display`       | `'visible' \| 'hidden' \| 'none'`                        | `'visible'`  | 表单显隐                         |
| `hidden`        | `boolean`                                                | `false`      | UI 隐藏                          |
| `visible`       | `boolean`                                                | `true`       | 显示/隐藏（数据隐藏）            |
| `editable`      | `boolean`                                                | `true`       | 是否可编辑                       |
| `disabled`      | `boolean`                                                | `false`      | 是否禁用                         |
| `readOnly`      | `boolean`                                                | `false`      | 是否只读                         |
| `readPretty`    | `boolean`                                                | `false`      | 是否优雅阅读态                   |
| `effects`       | `(form: Form) => void`                                   | —            | 副作用逻辑，用于实现各种联动逻辑 |
| `validateFirst` | `boolean`                                                | `false`      | 是否只校验第一个非法规则         |
| `designable`    | `boolean`                                                | `false`      | 是否设计态                       |

## 用例

```ts
import { createForm } from '@silver-formily/core'

const form = createForm({
  initialValues: {
    say: 'hello',
  },
})
```

### 带副作用的表单

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
