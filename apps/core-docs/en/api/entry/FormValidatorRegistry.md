# FormValidatorRegistry

> Convenient re-exports of validation registry APIs for registering global rules, formats, locales, and template engines

## Description

`@silver-formily/core` re-exports the core registry APIs from `@silver-formily/validator`, providing a unified entry point for validation configuration in Formily scenarios.

## Exported APIs

### registerValidateRules

```ts
function registerValidateRules(rules: Record<string, ValidateRule>): void
```

Register global validation rules:

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : 'Username already taken'
  },
})

// Use on any field
field.setValidator({ usernameAvailable: true })
```

### registerValidateFormats

```ts
function registerValidateFormats(formats: Record<string, ValidateFormat>): void
```

Register global validation formats:

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  idCard: /^\d{17}[\dX]$/i,
})

field.setValidator({ format: 'idCard' })
```

### registerValidateLocale & setValidateLanguage

```ts
registerValidateLocale({
  'zh-CN': {
    required: 'This field is required',
    maxLength: 'Max length is {{maxLength}}',
  },
})

setValidateLanguage('zh-CN')
```

### registerValidateMessageTemplateEngine

Register a custom template engine for rendering validation messages:

```ts
registerValidateMessageTemplateEngine((message, scope) => {
  return message.replace(/\{\{(\w+)\}\}/g, (_, key) => scope[key] ?? '')
})
```

## Complete Example

```ts
import {
  registerValidateFormats,
  registerValidateRules,
  setValidateLanguage,
} from '@silver-formily/core'

registerValidateFormats({ phone: /^1[3-9]\d{9}$/ })

registerValidateRules({
  customRule(value, rule, ctx) {
    if (!value)
      return ''
    return value.length > 3 ? '' : 'At least 3 characters required'
  },
})

setValidateLanguage('zh-CN')
```

> **Note:** These registrations are global and affect all Form instances.
