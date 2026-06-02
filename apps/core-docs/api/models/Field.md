# Field 模型

> 基础数据字段模型，承载字段值、校验规则和交互状态

## 描述

`Field` 是最常用的字段模型，对应表单中的一个数据字段。它继承了 `BaseField` 的所有能力，并扩展了值管理、校验、提交等数据字段特有的功能。

## 构造

```ts
const field = form.createField({
  name: 'username',
  value: '',
})
```

## 属性

### 值相关

| 属性           | 类型        | 说明       |
| -------------- | ----------- | ---------- |
| `value`        | `ValueType` | 字段当前值 |
| `inputValue`   | `ValueType` | 字段输入值 |
| `initialValue` | `ValueType` | 字段初始值 |

### 校验相关

| 属性             | 类型              | 说明                   |
| ---------------- | ----------------- | ---------------------- |
| `valid`          | `boolean`         | 是否校验通过           |
| `invalid`        | `boolean`         | 是否校验不通过         |
| `errors`         | `IFormFeedback[]` | 错误消息列表（含子孙） |
| `warnings`       | `IFormFeedback[]` | 警告消息列表（含子孙） |
| `successes`      | `IFormFeedback[]` | 成功消息列表（含子孙） |
| `selfErrors`     | `FeedbackMessage` | 自身错误消息           |
| `selfWarnings`   | `FeedbackMessage` | 自身警告消息           |
| `selfSuccesses`  | `FeedbackMessage` | 自身成功消息           |
| `selfValid`      | `boolean`         | 自身是否校验通过       |
| `selfInvalid`    | `boolean`         | 自身是否校验不通过     |
| `validating`     | `boolean`         | 是否正在校验           |
| `validateStatus` | `string`          | 校验状态               |

### 交互状态

| 属性           | 类型      | 说明           |
| -------------- | --------- | -------------- |
| `active`       | `boolean` | 是否焦点态     |
| `visited`      | `boolean` | 是否访问过     |
| `selfModified` | `boolean` | 是否本身被修改 |
| `modified`     | `boolean` | 是否被修改     |
| `loading`      | `boolean` | 是否加载中     |
| `submitting`   | `boolean` | 是否提交中     |

### 基础属性（继承自 BaseField）

| 属性             | 类型                | 说明         |
| ---------------- | ------------------- | ------------ |
| `name`           | `string`            | 字段名称     |
| `path`           | `string`            | 字段完整路径 |
| `title`          | `any`               | 字段标题     |
| `description`    | `any`               | 字段描述     |
| `display`        | `FieldDisplayTypes` | 显隐模式     |
| `pattern`        | `FieldPatternTypes` | 交互模式     |
| `mounted`        | `boolean`           | 是否挂载     |
| `unmounted`      | `boolean`           | 是否卸载     |
| `hidden`         | `boolean`           | 是否隐藏     |
| `visible`        | `boolean`           | 是否可见     |
| `editable`       | `boolean`           | 是否可编辑   |
| `disabled`       | `boolean`           | 是否禁用     |
| `readOnly`       | `boolean`           | 是否只读     |
| `readPretty`     | `boolean`           | 是否阅读态   |
| `required`       | `boolean`           | 是否必填     |
| `index`          | `number`            | 索引         |
| `address`        | `string`            | 字段地址     |
| `form`           | `Form`              | 所属表单     |
| `parent`         | `GeneralField`      | 父字段       |
| `componentType`  | `Component`         | 组件类型     |
| `componentProps` | `object`            | 组件参数     |
| `decoratorType`  | `Decorator`         | 装饰器类型   |
| `decoratorProps` | `object`            | 装饰器参数   |
| `dataSource`     | `FieldDataSource`   | 数据源       |

## 方法

### 值操作

| 方法              | 签名           | 说明         |
| ----------------- | -------------- | ------------ |
| `setValue`        | `(value: any)` | 设置字段值   |
| `onInput`         | `(value: any)` | 模拟用户输入 |
| `setInitialValue` | `(value: any)` | 设置初始值   |

### 校验

| 方法               | 签名            | 说明             |
| ------------------ | --------------- | ---------------- |
| `validate`         | `()`            | 校验字段         |
| `setValidator`     | `(validator)`   | 设置校验规则     |
| `setValidatorRule` | `(name, value)` | 设置单条校验规则 |

### 状态操作

| 方法       | 签名          | 说明         |
| ---------- | ------------- | ------------ |
| `getState` | `(selector?)` | 获取字段状态 |
| `setState` | `(setter)`    | 设置字段状态 |

### 模式与显隐

| 方法                  | 说明       |
| --------------------- | ---------- |
| `setPattern(pattern)` | 设置模式   |
| `setDisplay(display)` | 设置显隐   |
| `setReadOnly(flag)`   | 设置只读   |
| `setDisabled(flag)`   | 设置禁用   |
| `setHidden(flag)`     | 设置隐藏   |
| `setEditable(flag)`   | 设置可编辑 |
| `setReadPretty(flag)` | 设置阅读态 |
| `setRequired(flag)`   | 设置必填   |

## 字段操作完整示例

```ts
import { createForm } from '@silver-formily/core'

const form = createForm()
const field = form.createField({
  name: 'username',
  value: '',
  title: '用户名',
  required: true,
  validator: {
    minLength: 3,
    maxLength: 20,
  },
})

// 模拟用户输入
field.onInput('silver')

// 校验
await field.validate()
console.log(field.valid) // true
console.log(field.errors) // []

// 设置规则
field.setValidatorRule('minLength', 6)

// 状态管理
field.setState((state) => {
  state.loading = true
})

// 获取状态快照
const state = field.getState()
```
