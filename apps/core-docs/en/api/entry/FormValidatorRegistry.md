---
outline: 2
---

# Form Validator Registry

`@silver-formily/core` re-exports the core registry APIs from `@silver-formily/validator`, providing a unified entry point for validation configuration in Formily scenarios.

All registrations are **global** and affect every Form instance in the current application.

## setValidateLanguage

### Description

Sets the current validation language.

### Signature

```ts
interface setValidateLanguage {
  (language: string): void
}
```

### Usage

```ts
import { setValidateLanguage } from '@silver-formily/core'

setValidateLanguage('en-US')
setValidateLanguage('zh-CN')
```

## registerValidateFormats

### Description

Registers global format validators. Formats support `string`, `RegExp`, and function matchers.

For built-in formats, see the [Built-in Formats](https://validator.silver-formily.org/api/validate#built-in-formats) documentation.

### Signature

```ts
interface registerValidateFormats {
  (formats: {
    [key: string]: string | RegExp | ((value: any) => boolean)
  }): void
}
```

### Usage

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  integer: /^[+-]?\d+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

After registration, use `format` in field validation rules:

```ts
field.setValidator({
  format: 'internalCode',
})
```

## registerValidateLocale

### Description

Registers global validation locale messages. The language key typically uses values like `zh-CN` or `en-US`.

For built-in locales, see the [Built-in Locales](https://validator.silver-formily.org/api/registry#built-in-locales) documentation.

### Signature

```ts
interface registerValidateLocale {
  (locales: {
    [language: string]: {
      [key: string]: string | any
    }
  }): void
}
```

### Usage

```ts
import {
  registerValidateLocale,
  setValidateLanguage,
} from '@silver-formily/core'

registerValidateLocale({
  'zh-CN': {
    required: 'This field is required',
    maxLength: 'Length must not exceed {{maxLength}}',
  },
})

setValidateLanguage('zh-CN')
```

## registerValidateMessageTemplateEngine

### Description

Registers a global template engine for custom rendering of validation messages.

### Signature

```ts
interface registerValidateMessageTemplateEngine {
  (template: (message: ValidatorFunctionResponse, context: any) => any): void
}
```

### Usage

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/core'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? '')
})
```

## registerValidateRules

### Description

Registers global validation rules, useful for reusable business rules.

For built-in rules, see the [Built-in Rules](https://validator.silver-formily.org/api/validate#built-in-rules) documentation.

### Signature

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

### Usage

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : 'Username already taken'
  },
})
```

After registration, use on any field:

```ts
field.setValidator({
  usernameAvailable: true,
})
```

## getValidateLocaleIOSCode

### Description

Returns the closest matching language identifier from the current registry based on the input language value.

### Signature

```ts
interface getValidateLocaleIOSCode {
  (language: string): string | undefined
}
```

### Usage

```ts
import { getValidateLocaleIOSCode } from '@silver-formily/core'

getValidateLocaleIOSCode('en')
// ==> en
```
