# 快速开始

`validator` 的公开 API 很集中，通常只需要记住下面四类能力：

- `validate`：执行校验并收集结果
- registry API：注册规则、格式、语言和模板引擎
- parser API：把描述对象转成可执行函数
- 类型定义：约束规则、触发时机和返回值

## 导入

```ts
import {
  registerValidateFormats,
  registerValidateRules,
  setValidateLanguage,
  validate,
} from '@silver-formily/validator'
```

## validate

最常见的用法是直接调用 `validate(value, validator, options)`：

```ts
const result = await validate('ab', {
  minLength: 3,
  message: '长度不能小于 {{minLength}}',
})

result.error
// ['长度不能小于 3']
```

返回值结构固定为：

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

## 校验描述

`validator` 参数既可以是一条描述，也可以是一组描述：

```ts
type Validator<Context = any>
  = | ValidatorDescription<Context>
    | ValidatorDescription<Context>[]
```

单条描述支持三种形式：

```ts
validate(value, 'email')

validate(value, (currentValue) => {
  return currentValue ? '' : '不能为空'
})

validate(value, {
  required: true,
  maxLength: 20,
})
```

其中：

- 字符串会被当成 `format`
- 函数会被当成 `validator`
- 对象会直接作为规则对象参与解析

## validateFirst

如果你只关心第一个失败结果，可以开启 `validateFirst`：

```ts
const result = await validate('', {
  required: true,
  validator() {
    return '第二条错误'
  },
}, {
  validateFirst: true,
})

result.error
// ['The field value is required']
```

## triggerType

规则可以声明自己的触发时机，解析阶段会根据 options 过滤：

```ts
await validate('ab', [
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', required: true },
], {
  triggerType: 'onInput',
})
```

默认触发时机是 `onInput`。

## 自定义上下文

`options.context` 会合并进模板渲染上下文，也会传给自定义校验函数：

```ts
const result = await validate('', {
  required: true,
  validator(value, rule, ctx, render) {
    return render('字段 {{title}} 不能为空', { title: ctx.title })
  },
}, {
  context: {
    title: '用户名',
  },
})
```
