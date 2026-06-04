# 校验系统

校验系统主要由字段模型承载，Form 提供批量入口。字段负责声明规则、执行自身校验并维护反馈；Form 的 `validate()` / `submit()` 会聚合字段树中的数据字段，再批量调度校验。

## 校验器

字段通过 `validator` 描述校验规则。

### 字符串格式

字符串会被当成 `format`，是格式规则的简写：

```ts
field.validator = 'email' // 等价于 { format: 'email' }
field.validator = 'url'
```

内置格式之外，也可以通过 `registerValidateFormats` 注册自定义格式。

### 函数校验

函数可以返回字符串、布尔值或反馈对象：

```ts
field.validator = (value) => {
  return value ? '' : '不能为空'
}

field.validator = {
  validator: value => value.length > 3,
  message: '至少 3 个字符',
}

field.validator = (value) => {
  return {
    type: 'warning',
    message: value?.endsWith('@company.com') ? '' : '建议填写公司邮箱',
  }
}
```

### 对象规则

对象结构可以表达更完整的校验约束：

```ts
field.validator = {
  required: true,
  format: 'email',
  minLength: 3,
  maxLength: 20,
  message: '格式不正确',
}
```

也可以通过 `registerValidateRules` 注册自定义规则。

### 规则数组

数组用于组合多条规则。不同写法最终都会被归一成规则数组：

```ts
field.validator = [
  'email',
  { required: true },
  value => value ? '' : '不能为空',
]

field.validator = [
  { format: 'email' },
  { required: true },
  { validator: value => value ? '' : '不能为空' },
]
```

## 校验时机

规则对象可以通过 `triggerType` 控制触发时机：

| triggerType | 触发时机       |
| ----------- | -------------- |
| `onInput`   | 输入时，默认值 |
| `onBlur`    | 失焦时         |
| `onFocus`   | 聚焦时         |

```ts
field.validator = [
  { required: true },
  { format: 'email', triggerType: 'onBlur' },
]
```

这些字段方法会触发对应时机的校验：

```ts
field.onInput('silver')
field.onFocus()
field.onBlur()
```

手动调用 `field.validate()` 时可以指定触发类型；不指定则校验全部规则：

```ts
await field.validate()
await field.validate('onBlur')
```

## 校验策略

`validateFirst` 用于控制是否在首条规则失败后停止继续校验。

```ts
form.createField({
  name: 'username',
  validateFirst: true,
  validator: [
    { required: true },
    { minLength: 3 },
  ],
})
```

默认为 `false`，即使某条规则失败，也会继续执行后续规则并返回完整反馈。

## 校验反馈

校验结果存放在字段的 `feedbacks` 中：

```ts
interface Feedback {
  path: string
  address: string
  type: 'error' | 'success' | 'warning'
  code: 'ValidateError' | 'ValidateSuccess' | 'ValidateWarning'
    | 'EffectError' | 'EffectSuccess' | 'EffectWarning'
  messages: string[]
}
```

字段提供了按类型聚合的便捷属性：

```ts
field.feedbacks
field.errors
field.warnings
field.successes

field.selfErrors
field.selfWarnings
field.selfSuccesses
```

`self` 前缀只读取字段自身反馈；非 `self` 属性会聚合自身和所有子孙字段的反馈。

## 写入反馈

业务副作用也可以直接写入反馈：

```ts
field.errors = ['用户名已存在']
field.warnings = ['建议使用公司邮箱']
field.successes = ['校验通过']
```

直接写入的反馈会使用 `Effect*` code，以便和校验器产生的 `Validate*` code 分离。

也可以查询反馈：

```ts
field.queryFeedbacks({ type: 'error' })
field.queryFeedbacks({ code: 'ValidateError' })
field.queryFeedbacks({ address: 'username' })
```

## Form 级校验

Form 提供批量校验入口：

```ts
await form.validate()

await form.submit(async (values) => {
  await request(values)
})
```

`form.validate()` 会聚合字段树中的数据字段并调度字段校验；`form.submit()` 会先校验，再把表单值交给提交回调。

```ts
form.errors
form.warnings
form.successes
form.valid
```

更底层的校验规则能力请参考 [FormValidatorRegistry API](/api/entry/FormValidatorRegistry)。
