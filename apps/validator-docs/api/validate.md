# 校验规则

模块加载时会自动注册内置规则、格式和默认语言包，所以多数情况下导入后就能直接使用。

```ts
import { validate } from '@silver-formily/validator'
```

## 内置规则

规则对象本质上是 `IValidatorRules`：

```ts
interface IValidatorRules<Context = any> {
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | string
  format?: string
  validator?: ValidatorFunction<Context>
  required?: boolean
  pattern?: RegExp | string
  max?: number
  maximum?: number
  maxItems?: number
  minItems?: number
  maxLength?: number
  minLength?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  minimum?: number
  min?: number
  len?: number
  whitespace?: boolean
  enum?: any[]
  const?: any
  multipleOf?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  message?: string
}
```

常用规则可以按行为理解：

| 规则                                    | 说明                                          |
| --------------------------------------- | --------------------------------------------- |
| `required`                              | 校验空字符串、空数组、空对象、Draft.js 空内容 |
| `min` / `max`                           | 对数字比较值，对字符串和数组比较长度          |
| `minimum` / `maximum`                   | `min` / `max` 的同义规则                      |
| `minLength` / `maxLength`               | 复用长度判断逻辑                              |
| `minItems` / `maxItems`                 | 复用条目数判断逻辑                            |
| `exclusiveMinimum` / `exclusiveMaximum` | 严格大于 / 小于                               |
| `len`                                   | 长度或条目数必须精确等于某值                  |
| `pattern`                               | 用正则匹配值                                  |
| `enum` / `const`                        | 枚举值、常量值比较                            |
| `multipleOf`                            | 数值能否整除                                  |
| `uniqueItems`                           | 数组元素是否唯一                              |
| `maxProperties` / `minProperties`       | 对象属性数量范围                              |
| `whitespace`                            | 禁止纯空白字符串                              |
| `validator`                             | 自定义同步或异步规则                          |

## format

当描述是字符串，或者规则对象中包含 `format` 时，会从格式注册表中取对应 matcher：

```ts
await validate('hello@example.com', 'email')
await validate('https://silver-formily.org', { format: 'url' })
```

内置格式包括：

- `url`
- `email`
- `ipv6`
- `ipv4`
- `number`
- `integer`
- `idcard`
- `qq`
- `phone`
- `money`
- `zh`
- `date`
- `zip`

## 自定义 validator

`validator` 函数接收四个参数：当前值、规则对象、上下文和消息渲染器。

```ts
await validate('123', {
  validator(value, rule, ctx, render) {
    if (value === ctx.expected)
      return ''

    return render('必须等于 {{expected}}', {
      expected: ctx.expected,
    })
  },
}, {
  context: {
    expected: '456',
  },
})
```

返回值支持四种形式：

- `null` 或空字符串：表示通过
- `false`：表示失败，使用当前规则消息
- 字符串：表示失败，字符串会继续走模板渲染
- `{ type, message }`：显式指定结果类型

## 返回结果

每条规则最终都会被归并到 `error`、`warning`、`success` 三个消息桶中：

```ts
const results = {
  error: ['The field value is required'],
  warning: [],
  success: [],
}
```
