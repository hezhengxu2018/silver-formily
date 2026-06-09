# 注册中心

注册中心负责保存四类全局能力：

- 语言包
- 当前语言
- 格式匹配器
- 规则函数
- 消息模板引擎

这些能力都由 `registry.ts` 维护，并通过一组公开函数暴露给外部。

## 规则注册

```ts
import { registerValidateRules } from '@silver-formily/validator'

registerValidateRules({
  custom(value) {
    return value === 'silver' ? '' : '只允许 silver'
  },
})
```

注册成功后，下面两种写法都能触发它：

```ts
await validate('formily', { custom: true })

await validate('formily', {
  custom: '任意非空值都可以，真正执行的是 custom 规则函数',
})
```

## 格式注册

格式支持三种 matcher：字符串、正则、函数。

```ts
import { registerValidateFormats } from '@silver-formily/validator'

registerValidateFormats({
  slug: /^[a-z0-9-]+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

之后可以直接用：

```ts
await validate('silver-formily', 'slug')
await validate('SF-001', { format: 'internalCode' })
```

## 语言包和语言切换

```ts
import {
  registerValidateLocale,
  setValidateLanguage,
} from '@silver-formily/validator'

registerValidateLocale({
  'zh-CN': {
    slug: 'slug 只能包含小写字母、数字和中划线',
  },
})

setValidateLanguage('zh-CN')
```

语言匹配并不要求完全等值。内部会做 ISO code 近似匹配，所以 `zh`、`zh-CN`、`en-US` 这类值都能回退到最接近的语言包。

## 内置语言包 {#built-in-locales}

模块初始化时会默认注册一组语言包，当前可直接使用的语言标识包括：

- `en`
- `en-US`
- `zh`
- `zh-CN`
- `zh-TW`
- `ja`

这些语言包内置了常见规则名和格式名对应的错误消息，例如 `required`、`min`、`max`、`email`、`url`、`phone` 等。

如果你需要查看具体消息文案，最稳妥的方式是通过注册中心 API 读取：

```ts
import {
  getValidateLocale,
  setValidateLanguage,
} from '@silver-formily/validator'

setValidateLanguage('zh-CN')

getValidateLocale('required')
getValidateLocale('email')
```

如果默认语言包不满足业务需求，可以通过 `registerValidateLocale` 按语言增量扩展或覆盖。

## 读取当前配置

你也可以把注册中心当成查询入口：

```ts
import {
  getValidateFormats,
  getValidateLanguage,
  getValidateLocale,
  getValidateRules,
} from '@silver-formily/validator'

getValidateLanguage()
getValidateLocale('required')
getValidateFormats('email')
getValidateRules('required')
```

## 模板引擎

默认情况下，消息只会做 `{{path.to.value}}` 这种占位符替换。你也可以接入自己的模板引擎：

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/validator'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace('$title', context.title)
})
```

模板引擎会先执行，然后再执行内置的 `{{...}}` 路径替换，因此两者可以组合使用。
