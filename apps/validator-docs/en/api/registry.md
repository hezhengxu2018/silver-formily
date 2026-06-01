# Registry

The registry stores five kinds of global validation behavior:

- locale messages
- active language
- format matchers
- rule handlers
- message template engine

These capabilities live in `registry.ts` and are exposed through public helper functions.

## Register rules

```ts
import { registerValidateRules } from '@silver-formily/validator'

registerValidateRules({
  custom(value) {
    return value === 'silver' ? '' : 'Only silver is allowed'
  },
})
```

After registration, the rule can be referenced by key on any rule object:

```ts
await validate('formily', { custom: true })
```

## Register formats

Formats accept strings, regular expressions, or functions.

```ts
import { registerValidateFormats } from '@silver-formily/validator'

registerValidateFormats({
  slug: /^[a-z0-9-]+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

Then use them directly:

```ts
await validate('silver-formily', 'slug')
await validate('SF-001', { format: 'internalCode' })
```

## Register locales and switch language

```ts
import {
  registerValidateLocale,
  setValidateLanguage,
} from '@silver-formily/validator'

registerValidateLocale({
  'en-US': {
    slug: 'Slug can only contain lowercase letters, numbers, and hyphens',
  },
})

setValidateLanguage('en-US')
```

Language matching is fuzzy on purpose. Values such as `en`, `en-US`, `zh`, and `zh-CN` can resolve to the nearest registered locale key.

## Read current registry state

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

## Message template engine

By default, messages only apply built-in `&#123;&#123;path.to.value&#125;&#125;` interpolation. You can plug in a custom engine first:

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/validator'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace('$title', context.title)
})
```

The custom engine runs before built-in path interpolation, so both mechanisms can be combined.
