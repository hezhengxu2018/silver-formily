# 规则解析

解析器把字符串、函数、规则对象和数组统一转换为可执行函数队列。`validate()` 会在内部完成这套流程，普通 Formily 业务不需要直接调用解析器。

::: warning 适用范围
本页主要面向表单框架适配、调试工具和 validator 内部开发。如果只是配置字段校验，请从[快速上手](/guide/quick-start)开始。
:::

## 解析流程

一组校验描述会依次经过以下阶段：

1. 把字符串、函数和对象标准化为规则对象。
2. 把单条或数组输入统一为规则对象数组。
3. 将每个规则对象拆成有序的执行函数。
4. 根据本次 `triggerType` 过滤规则并生成最终队列。

```text
Validator
  → IValidatorRules[]
  → ValidatorParsedFunction[]
  → validate() 执行并汇总消息
```

## 导入

```ts
import {
  parseValidator,
  parseValidatorDescription,
  parseValidatorDescriptions,
  parseValidatorRules,
} from '@silver-formily/validator'
```

## 标准化校验描述

### `parseValidatorDescription()`

将一条字符串、函数或规则对象标准化为 `IValidatorRules`：

```ts
parseValidatorDescription('email')
// { format: 'email' }

parseValidatorDescription(value => value ? '' : '不能为空')
// { validator: [Function] }

parseValidatorDescription({ required: true })
// { required: true }
```

传入空值时返回空对象。传入规则对象时保留其中的规则字段。

### `parseValidatorDescriptions()`

将单条描述或描述数组统一转换为规则对象数组：

```ts
parseValidatorDescriptions('email')
// [{ format: 'email' }]

parseValidatorDescriptions([
  'email',
  { required: true },
])
// [{ format: 'email' }, { required: true }]
```

这一步只整理数据结构，不查找注册规则，也不执行校验。

## 编译规则对象

### `parseValidatorRules()`

将一个规则对象拆分成执行函数数组：

```ts
const validators = parseValidatorRules({
  required: true,
  minLength: 3,
  validator(value) {
    return value === 'silver' ? '' : '必须为 silver'
  },
})
```

执行顺序遵循两项保证：

1. `required` 始终最先执行。
2. 自定义 `validator` 始终最后执行。

其他规则按它们在对象中的枚举顺序展开。只有已经存在于[注册中心](/api/registry)的规则名会生成执行函数。

每个执行函数还会统一处理：

- 布尔值、字符串和 `{ type, message }` 返回值
- 当前规则的默认消息与模板渲染
- 抛出的异常，将异常消息转换为 error 结果

## 生成最终执行队列

### `parseValidator()`

`parseValidator()` 串联上述步骤，并根据本次执行选项过滤触发类型：

```ts
const queue = parseValidator([
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', format: 'email' },
], {
  triggerType: 'onInput',
})
```

示例只会生成 `onInput` 规则对应的执行函数。规则未声明 `triggerType` 时按 `onInput` 处理；本次不传 `options.triggerType` 时不会按触发类型过滤。

返回的每个函数接收当前值与上下文：

```ts
for (const run of queue) {
  const result = await run(value, context)
  // { type: 'error' | 'warning' | 'success', message?: string }
}
```

通常应直接使用 [`validate()`](/api/validate)，由它负责执行队列、处理 `validateFirst` 并汇总三类消息。
