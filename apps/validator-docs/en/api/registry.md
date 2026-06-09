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

After registration, both of the following trigger the rule:

```ts
await validate('formily', { custom: true })

await validate('formily', {
  custom: 'Any truthy value works — the real logic lives inside the custom rule function',
})
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

## Built-in locales {#built-in-locales}

A set of locale messages is registered by default when the module is loaded. The following language tags are available out of the box:

- `en`
- `en-US`
- `zh`
- `zh-CN`
- `zh-TW`
- `ja`

These locales include error messages for common rule and format keys such as `required`, `min`, `max`, `email`, `url`, `phone`, and more.

To inspect the exact messages, the safest approach is to query the registry:

```ts
import {
  getValidateLocale,
  setValidateLanguage,
} from '@silver-formily/validator'

setValidateLanguage('zh-CN')

getValidateLocale('required')
getValidateLocale('email')
```

If the built-in locales are not sufficient, use `registerValidateLocale` to extend or override messages per language.

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

By default, messages only apply built-in <code v-pre>{{path.to.value}}</code> interpolation. You can plug in a custom engine first:

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/validator'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace('$title', context.title)
})
```

The custom engine runs before built-in <code v-pre>{{...}}</code> path interpolation, so both mechanisms can be combined.
