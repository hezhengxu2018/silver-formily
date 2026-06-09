# 校验规则

模块加载时会自动注册内置规则、格式和默认语言包，所以多数情况下导入后就能直接使用。

```ts
import { validate } from '@silver-formily/validator'
```

## 内置规则 {#built-in-rules}

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

## 内置格式 {#built-in-formats}

当描述是字符串，或者规则对象中包含 `format` 时，会从格式注册表中取对应 matcher：

```ts
await validate('hello@example.com', 'email')
await validate('https://silver-formily.org', { format: 'url' })
```

内置 `format` 会在值非空时执行；如果字段允许为空，需要配合 `required` 一起使用。当前内置格式及其具体含义如下：

| 格式名    | 具体含义                                                                                                                                                                                           | 示例                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `url`     | 只接受带协议的 `http://`、`https://`、`ftp://`、`rtmp://` 地址，或以 `//` 开头的协议相对地址。域名至少要有两段，顶级域至少 2 个字符；支持公网 IPv4，但会拒绝私网、回环、链路本地、组播等保留地址。 | `https://silver-formily.org`、`//cdn.example.com/app.js` |
| `email`   | 基于正则的邮箱格式校验，要求包含本地部分、`@` 和域名部分；本地部分支持字母、数字、下划线，以及中间的 `-`、`+`、`.`，域名部分也允许 `-`、`.`。                                                      | `hello@example.com`                                      |
| `ipv6`    | IPv6 地址校验，支持标准 8 段十六进制写法、`::` 压缩写法，以及末尾携带 IPv4 的混合写法；同时支持 zone id，例如 `%eth0`。                                                                            | `2001:db8::1`、`fe80::1%en0`、`::ffff:192.168.1.1`       |
| `ipv4`    | IPv4 地址校验，必须是 4 段十进制数字，每段取值 `0-255`。这个格式本身只看语法，不区分公网或私网。                                                                                                   | `192.168.1.10`、`8.8.8.8`                                |
| `number`  | 十进制数字，可带正负号，可带小数部分；至少要有一位整数数字，不支持 `.5` 这种省略整数位的写法，也不支持科学计数法。                                                                                 | `123`、`-123.45`、`+8.0`                                 |
| `integer` | 整数数字，可带正负号，不允许小数点。                                                                                                                                                               | `0`、`-42`、`+7`                                         |
| `idcard`  | 中国身份证号的基础格式校验：支持 15 位数字，或 18 位中的前 17 位数字加最后 1 位数字 / `X` / `x`。这里只校验位数和字符形式，不校验行政区、生日、校验码是否真实。                                    | `11010519491231002X`                                     |
| `qq`      | QQ 号格式校验，本质上是非负整数字符串：允许 `0`，也允许以 `+` 开头的正整数；不允许负数、小数和前导空格。                                                                                           | `0`、`123456789`                                         |
| `phone`   | 电话号码格式校验，支持 11 位纯数字手机号，也支持区号座机格式 `3 位区号-8 位号码` 或 `4 位区号-7 位号码`。                                                                                          | `15934567899`、`010-12345678`、`0571-1234567`            |
| `money`   | 金额格式校验，可选单个货币符号前缀（如 `$`、`¥`、`￥`、`€` 等），整数部分可写普通数字或千分位逗号分组，小数部分可选但如果出现小数点，其后必须至少有 1 位数字。                                     | `$12`、`¥ 1,234.56`、`1000`                              |
| `zh`      | 纯中文字符串校验，只允许中文汉字字符，不允许空格、字母、数字或标点。                                                                                                                               | `中文`、`验证器`                                         |
| `date`    | 宽松日期字符串校验，日期部分必须由 3 段数字组成，分隔符可为 `-`、`/`、`.`；可选时间部分必须是 `HH:mm:ss` 三段。它只校验结构，不校验真实日历有效性，因此像 `2020-99-99` 这种结构正确的值也会通过。  | `2020-01-12`、`12/01/2020 11:23:33`                      |
| `zip`     | 6 位数字邮编。                                                                                                                                                                                     | `310000`                                                 |

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
