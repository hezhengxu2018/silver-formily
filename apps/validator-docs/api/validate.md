# 执行校验

`validate()` 是 `@silver-formily/validator` 的执行入口。它接收当前值、校验描述和执行选项，最终返回按反馈类型分组的消息。

::: tip 提示
Formily 会自动调用 `validate()`。业务代码通常只需要在字段上声明规则，参见[快速上手](/guide/quick-start)；本页主要用于查询完整规则，或在 Formily 之外直接调用 validator。
:::

## `validate()`

```ts
import { validate } from '@silver-formily/validator'
```

```ts
function validate<Context = any>(
  value: any,
  validator: Validator<Context>,
  options?: IValidatorOptions<Context>,
): Promise<IValidateResults>
```

| 参数        | 说明                                           |
| ----------- | ---------------------------------------------- |
| `value`     | 当前需要校验的值                               |
| `validator` | 一条校验描述，或由多条描述组成的数组           |
| `options`   | 首错停止、触发类型和自定义上下文等本次执行配置 |

```ts
const results = await validate('ab', [
  { required: true },
  { minLength: 3, message: '至少输入 3 个字符' },
])

results.error
// ['至少输入 3 个字符']
```

### 校验描述

`validator` 支持字符串、函数、规则对象和它们组成的数组：

```ts
await validate(value, 'email')

await validate(value, currentValue => currentValue ? '' : '不能为空')

await validate(value, {
  required: true,
  maxLength: 20,
})

await validate(value, [
  { required: true },
  { format: 'email' },
])
```

- 字符串会被解析为 `format`
- 函数会被解析为自定义 `validator`
- 对象会作为一组规则执行
- 数组中的每条描述会按顺序展开执行

### 执行选项

```ts
interface IValidatorOptions<Context = any> {
  validateFirst?: boolean
  triggerType?: 'onInput' | 'onFocus' | 'onBlur' | string
  context?: Context
}
```

`validateFirst` 为 `true` 时，收到第一条非空消息后停止执行：

```ts
await validate(value, validators, {
  validateFirst: true,
})
```

传入 `triggerType` 时，只执行触发类型相同的规则。未声明 `triggerType` 的规则按 `onInput` 处理：

```ts
await validate('ab', [
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', format: 'email' },
], {
  triggerType: 'onInput',
})
```

`context` 会传给自定义校验函数，并参与消息模板渲染：

```ts
await validate('ab', {
  validator(value, rule, ctx, render) {
    return value === ctx.expected
      ? ''
      : render('必须等于 {{expected}}')
  },
}, {
  context: {
    expected: 'silver',
  },
})
```

### 返回结果

结果固定按 `error`、`warning` 和 `success` 分组；没有消息的分组返回空数组：

```ts
interface IValidateResults {
  error?: string[]
  warning?: string[]
  success?: string[]
}
```

## 内置规则 {#built-in-rules}

规则对象本质上是 `IValidatorRules`：

```ts
interface IValidatorRules<Context = any> {
  triggerType?: ValidatorTriggerType
  format?: ValidatorFormats
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
  [key: string]: any
}
```

常用规则可以按行为理解：

| 规则                                    | 说明                                          |
| --------------------------------------- | --------------------------------------------- |
| `required`                              | 校验空字符串、空数组、空对象、Draft.js 空内容 |
| `min` / `max`                           | 对数字比较值，对字符串和数组比较长度          |
| `minimum` / `maximum`                   | `min` / `max` 的别名，行为完全相同            |
| `minLength` / `maxLength`               | `min` / `max` 的别名，行为完全相同            |
| `minItems` / `maxItems`                 | `min` / `max` 的别名，行为完全相同            |
| `exclusiveMinimum` / `exclusiveMaximum` | 严格大于 / 小于                               |
| `len`                                   | 长度或条目数必须精确等于某值                  |
| `pattern`                               | 用正则匹配值                                  |
| `enum` / `const`                        | 枚举值、常量值比较                            |
| `multipleOf`                            | 数值能否整除                                  |
| `uniqueItems`                           | 为 `true` 时要求数组元素按深度比较后互不重复  |
| `maxProperties` / `minProperties`       | 对象属性数量范围                              |
| `whitespace`                            | 禁止纯空白字符串                              |
| `validator`                             | 自定义同步或异步规则                          |

## 内置格式 {#built-in-formats}

当描述是字符串，或者规则对象中包含 `format` 时，会从格式注册表中取对应 matcher：

```ts
await validate('hello@example.com', 'email')
await validate('https://silver-formily.org', { format: 'url' })
```

内置 `format` 会在值非空时执行；如果字段允许为空，需要配合 `required` 一起使用。当前内置格式及其具体含义如下：

| 格式名    | 具体含义                                                                                                                                                                                                                                                               | 示例                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `url`     | 只接受带协议的 `http://`、`https://`、`ftp://`、`rtmp://` 地址，或以 `//` 开头的协议相对地址。域名至少要有两段，顶级域至少 2 个字符；IPv4 会拒绝 `10/8`、`127/8`、`169.254/16`、`172.16/12`、`192.168/16`，以及首段为 `0` 或不小于 `224`、末段为 `0` 或 `255` 的地址。 | `https://silver-formily.org`、`//cdn.example.com/app.js` |
| `email`   | 基于正则的邮箱格式校验，要求包含本地部分、`@` 和域名部分；本地部分支持字母、数字、下划线，以及中间的 `-`、`+`、`.`，域名部分也允许 `-`、`.`。                                                                                                                          | `hello@example.com`                                      |
| `ipv6`    | IPv6 地址校验，支持标准 8 段十六进制写法、`::` 压缩写法，以及末尾携带 IPv4 的混合写法；同时支持 zone id，例如 `%eth0`。                                                                                                                                                | `2001:db8::1`、`fe80::1%en0`、`::ffff:192.168.1.1`       |
| `ipv4`    | IPv4 地址校验，必须是 4 段十进制数字，每段取值 `0-255`。这个格式本身只看语法，不区分公网或私网。                                                                                                                                                                       | `192.168.1.10`、`8.8.8.8`                                |
| `number`  | 十进制数字，可带正负号，可带小数部分；至少要有一位整数数字，不支持 `.5` 这种省略整数位的写法，也不支持科学计数法。                                                                                                                                                     | `123`、`-123.45`、`+8.0`                                 |
| `integer` | 整数数字，可带正负号，不允许小数点。                                                                                                                                                                                                                                   | `0`、`-42`、`+7`                                         |
| `idcard`  | 中国身份证号的基础格式校验：支持 15 位数字，或 18 位中的前 17 位数字加最后 1 位数字 / `X` / `x`。这里只校验位数和字符形式，不校验行政区、生日、校验码是否真实。                                                                                                        | `11010519491231002X`                                     |
| `qq`      | 只校验数字结构：接受单独的 `0`，或以 `1-9` 开头、可带一个 `+` 前缀的正整数字符串；不接受其他前导零、负号、小数点或空白。它不验证 QQ 号码是否真实存在。                                                                                                                 | `0`、`123456789`、`+123456789`                           |
| `phone`   | 只校验三种数字结构：连续 11 位数字、`3 位数字-8 位数字` 或 `4 位数字-7 位数字`。它不检查手机号段、运营商、真实区号或号码是否有效，因此任意 11 位数字都能通过。                                                                                                         | `15934567899`、`010-12345678`、`0571-1234567`            |
| `money`   | 金额格式校验，可选单个货币符号前缀（如 `$`、`¥`、`￥`、`€` 等），整数部分可写普通数字或千分位逗号分组，小数部分可选但如果出现小数点，其后必须至少有 1 位数字。                                                                                                         | `$12`、`¥ 1,234.56`、`1000`                              |
| `zh`      | 纯中文字符串校验，只允许 `U+4E00` 至 `U+9FA5` 范围内的字符，不允许空格、字母、数字或标点。                                                                                                                                                                             | `中文`、`验证器`                                         |
| `date`    | 宽松日期字符串校验，日期部分必须由 3 段、每段 1–4 位数字组成，分隔符可为 `-`、`/`、`.`；可选时间部分必须有 3 段、每段 1–2 位数字。它只校验结构，不校验真实日历或时间有效性。                                                                                           | `2020-01-12`、`12/01/2020 11:23:33`                      |
| `zip`     | 6 位数字邮编。                                                                                                                                                                                                                                                         | `310000`                                                 |

## 自定义校验函数

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

返回值支持以下形式：

- `null`、空字符串或 `true`：表示通过
- `false`：表示失败，使用当前规则消息
- 字符串：表示失败，字符串会继续走模板渲染
- `{ type, message }`：显式指定结果类型

需要生成 warning 或 success 时，可以返回显式结果：

```ts
return {
  type: 'warning',
  message: '建议使用公司邮箱',
}
```
