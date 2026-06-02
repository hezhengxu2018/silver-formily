# Form 模型

> 表单的顶层容器模型，管理全局状态、字段图和事件总线

## 描述

`Form` 是 `@silver-formily/core` 的核心模型类。它聚合了 `Graph`（字段图）和 `Heart`（事件总线），提供字段创建、查询、校验、提交等全部表单能力。

通常不直接 `new Form()`，而是通过 `createForm()` 创建。

## 构造

```txt
const form = new Form(options?: IFormProps)
```

推荐使用工厂函数：

```ts
import { createForm } from '@silver-formily/core'

const form = createForm(options)
```

## 属性

### 状态属性

| 属性            | 类型               | 说明             |
| --------------- | ------------------ | ---------------- |
| `values`        | `T`                | 表单当前值       |
| `initialValues` | `T`                | 表单初始值       |
| `valid`         | `boolean`          | 是否全部校验通过 |
| `invalid`       | `boolean`          | 是否有校验不通过 |
| `validating`    | `boolean`          | 是否正在校验     |
| `submitting`    | `boolean`          | 是否正在提交     |
| `loading`       | `boolean`          | 是否加载中       |
| `errors`        | `IFormFeedback[]`  | 表单级错误消息   |
| `warnings`      | `IFormFeedback[]`  | 表单级警告消息   |
| `successes`     | `IFormFeedback[]`  | 表单级成功消息   |
| `mounted`       | `boolean`          | 是否已挂载       |
| `unmounted`     | `boolean`          | 是否已卸载       |
| `modified`      | `boolean`          | 是否有修改       |
| `hidden`        | `boolean`          | 是否隐藏         |
| `visible`       | `boolean`          | 是否可见         |
| `editable`      | `boolean`          | 是否可编辑       |
| `readOnly`      | `boolean`          | 是否只读         |
| `readPretty`    | `boolean`          | 是否阅读态       |
| `disabled`      | `boolean`          | 是否禁用         |
| `pattern`       | `FormPatternTypes` | 表单模式         |
| `display`       | `FormDisplayTypes` | 表单显隐         |
| `initialized`   | `boolean`          | 是否已初始化     |

### 模型引用

| 属性         | 类型          | 说明                       |
| ------------ | ------------- | -------------------------- |
| `graph`      | `Graph`       | 字段图，管理字段拓扑关系   |
| `heart`      | `Heart`       | 事件总线，管理生命周期事件 |
| `lifecycles` | `LifeCycle[]` | 生命周期处理器列表         |

## 方法

### 字段创建

| 方法                       | 说明         |
| -------------------------- | ------------ |
| `createField(props)`       | 创建数据字段 |
| `createVoidField(props)`   | 创建虚字段   |
| `createArrayField(props)`  | 创建数组字段 |
| `createObjectField(props)` | 创建对象字段 |

### 字段查询

| 方法             | 说明                                |
| ---------------- | ----------------------------------- |
| `query(pattern)` | 按路径模式查询字段，返回 Query 对象 |

### 值操作

| 方法                           | 说明             |
| ------------------------------ | ---------------- |
| `setValues(values, strategy?)` | 设置表单值       |
| `setValuesIn(path, value)`     | 设置指定路径的值 |
| `getValuesIn(path)`            | 获取指定路径的值 |
| `deleteValuesIn(path)`         | 删除指定路径的值 |
| `existValuesIn(path)`          | 判断路径是否存在 |

### 表单操作

| 方法                 | 说明     |
| -------------------- | -------- |
| `submit(onSubmit?)`  | 提交表单 |
| `validate(pattern?)` | 校验表单 |
| `reset(options?)`    | 重置表单 |

### 模式与显隐

| 方法                  | 说明         |
| --------------------- | ------------ |
| `setPattern(pattern)` | 设置表单模式 |
| `setDisplay(display)` | 设置表单显隐 |
| `setReadOnly(flag)`   | 设置只读     |
| `setDisabled(flag)`   | 设置禁用     |
| `setHidden(flag)`     | 设置隐藏     |
| `setEditable(flag)`   | 设置可编辑   |
| `setReadPretty(flag)` | 设置阅读态   |

### 生命周期

| 方法                     | 说明             |
| ------------------------ | ---------------- |
| `onMount()`              | 挂载表单         |
| `onUnmount()`            | 卸载表单         |
| `notify(type, payload?)` | 发布生命周期事件 |

## 用例

```ts
import { createForm } from '@silver-formily/core'

const form = createForm({
  values: { username: '', email: '' },
  pattern: 'editable',
})

// 创建字段
const field = form.createField({ name: 'username', value: '' })

// 查询字段
const queryResult = form.query('*.email').take()

// 操作值
form.setValuesIn('username', 'silver')
console.log(form.getValuesIn('username')) // 'silver'

// 提交
await form.submit((values) => {
  console.log('提交的值:', values)
})

// 校验
await form.validate()
console.log(form.valid, form.errors)
```
