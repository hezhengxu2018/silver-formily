---
outline: 2
---

# Form Validator Registry

`@silver-formily/core` 重新导出了 `@silver-formily/validator` 的注册中心 API，用来统一注册全局校验规则、格式、语言包和消息模板引擎。

这些注册都是全局生效的，会影响当前应用中的所有 Form 实例。

## setValidateLanguage

### 描述

设置当前使用的校验语言。

### 签名

```ts
interface setValidateLanguage {
  (language: string): void
}
```

### 用例

```ts
import { setValidateLanguage } from '@silver-formily/core'

setValidateLanguage('en-US')
setValidateLanguage('zh-CN')
```

## registerValidateFormats

### 描述

注册全局格式校验器。格式匹配器支持 `string`、`RegExp` 和函数。

当前内置格式可参考 `@silver-formily/validator` 文档中的[内置格式](https://validator.silver-formily.org/api/validate#built-in-formats)。

### 签名

```ts
interface registerValidateFormats {
  (formats: {
    [key: string]: string | RegExp | ((value: any) => boolean)
  }): void
}
```

### 用例

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  integer: /^[+-]?\d+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

注册后即可在字段校验规则里通过 `format` 使用：

```ts
field.setValidator({
  format: 'internalCode',
})
```

## registerValidateLocale

### 描述

注册全局校验语言包。语言 key 通常使用 `zh-CN`、`en-US` 这类值。

当前内置语言包可参考 `@silver-formily/validator` 文档中的[内置语言包](https://validator.silver-formily.org/api/registry#built-in-locales)。

### 签名

```ts
interface registerValidateLocale {
  (locales: {
    [language: string]: {
      [key: string]: string | any
    }
  }): void
}
```

### 用例

```ts
import {
  registerValidateLocale,
  setValidateLanguage,
} from '@silver-formily/core'

registerValidateLocale({
  'zh-CN': {
    required: '该字段是必填项',
    maxLength: '长度不能超过 {{maxLength}}',
  },
})

setValidateLanguage('zh-CN')
```

## registerValidateMessageTemplateEngine

### 描述

注册全局校验消息模板引擎，用于在返回校验消息时自定义模板渲染逻辑。

### 签名

```ts
interface registerValidateMessageTemplateEngine {
  (template: (message: ValidatorFunctionResponse, context: any) => any): void
}
```

### 用例

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/core'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? '')
})
```

## registerValidateRules

### 描述

注册全局校验规则，适合复用业务规则。

当前内置规则可参考 `@silver-formily/validator` 文档中的[内置规则](https://validator.silver-formily.org/api/validate#built-in-rules)。

### 签名

```ts
interface registerValidateRules {
  (rules: {
    [key: string]: (
      value: any,
      rule: IValidatorRules,
      ctx: any,
      render: (message: string, scope?: any) => string,
    ) => ValidatorFunctionResponse | Promise<ValidatorFunctionResponse> | null
  }): void
}
```

### 用例

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : '用户名已被占用'
  },
})
```

注册后即可在任意字段上复用：

```ts
field.setValidator({
  usernameAvailable: true,
})
```

## getValidateLocaleIOSCode

### 描述

根据传入语言值获取当前注册中心中最接近的语言标识。

### 签名

```ts
interface getValidateLocaleIOSCode {
  (language: string): string | undefined
}
```

### 用例

```ts
import { getValidateLocaleIOSCode } from '@silver-formily/core'

getValidateLocaleIOSCode('en')

// ==> en
```
