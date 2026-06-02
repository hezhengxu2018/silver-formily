# FormValidatorRegistry

> 校验注册 API 的便捷导出，用于注册全局校验规则、格式、语言包和消息模板引擎

## 描述

`@silver-formily/core` 重新导出了 `@silver-formily/validator` 的核心注册 API，方便在 Formily 场景中统一注册校验相关配置。

## 导出的 API

### registerValidateRules

```ts
function registerValidateRules(rules: Record<string, ValidateRule>): void
```

注册全局校验规则：

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : '用户名已被占用'
  },
})

// 之后可以在任意字段上使用
field.setValidator({
  usernameAvailable: true,
})
```

### registerValidateFormats

```ts
function registerValidateFormats(formats: Record<string, ValidateFormat>): void
```

注册全局校验格式（如 `email`、`url`、`phone` 等）：

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  idCard: /^\d{17}[\dX]$/i,
})

field.setValidator({
  format: 'idCard',
  message: '身份证格式不正确',
})
```

### registerValidateLocale

```ts
function registerValidateLocale(locale: Record<string, any>): void
```

注册校验语言包：

```ts
import { registerValidateLocale } from '@silver-formily/core'

registerValidateLocale({
  'zh-CN': {
    required: '该字段为必填',
    maxLength: '最大长度不能超过 {{maxLength}}',
    email: '请输入合法的邮箱格式',
  },
})
```

### setValidateLanguage

```ts
function setValidateLanguage(lang: string): void
```

设置当前校验语言：

```ts
import { setValidateLanguage } from '@silver-formily/core'

setValidateLanguage('zh-CN')
```

### registerValidateMessageTemplateEngine

```ts
function registerValidateMessageTemplateEngine(engine: MessageTemplateEngine): void
```

注册消息模板引擎，用于渲染校验消息中的模板变量：

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/core'

registerValidateMessageTemplateEngine((message, scope) => {
  return message.replace(/\{\{(\w+)\}\}/g, (_, key) => scope[key] ?? '')
})
```

### getLocaleByPath / getValidateLocaleIOSCode

```ts
function getLocaleByPath(path: string): string
function getValidateLocaleIOSCode(locale: string): string
```

语言包相关工具函数，内部使用，业务开发中较少直接调用。

## 完整示例

```ts
import {
  registerValidateFormats,
  registerValidateRules,
  setValidateLanguage,
} from '@silver-formily/core'

// 1. 注册自定义格式
registerValidateFormats({
  phone: /^1[3-9]\d{9}$/,
})

// 2. 注册自定义规则
registerValidateRules({
  customRule(value, rule, ctx) {
    if (!value)
      return ''
    // 自定义校验逻辑
    return value.length > 3 ? '' : '至少需要 3 个字符'
  },
})

// 3. 设置语言
setValidateLanguage('zh-CN')
```

## 注意事项

`registerValidateRules` 等 API 是全局注册的，会影响所有 Form 实例和所有字段。建议在应用入口处统一注册。
