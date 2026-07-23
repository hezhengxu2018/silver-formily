# Registry and Configuration

The registry stores global rules, formats, locale messages, and the message template engine. Registered capabilities are shared within the current JavaScript runtime and are suitable for reuse across fields and forms.

::: tip
In a Formily project, import registration APIs from `@silver-formily/core`; Core forwards the same capabilities to validator. Import them from `@silver-formily/validator` only when using this package independently.
:::

## Register custom rules

Use `registerValidateRules()` to register validation functions keyed by rule name:

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : 'Username is already taken'
  },
})
```

After registration, declare the rule on a Formily field:

```vue
<Field
  name="username"
  :validator="{ usernameAvailable: true }"
/>
```

The object key selects the registered function. Its configured value remains available on the current rule object and validation context:

```ts
import { validate } from '@silver-formily/validator'

await validate('formily', {
  usernameAvailable: true,
})
```

Registering the same rule name again replaces the previous function.

## Register custom formats

`registerValidateFormats()` accepts strings, regular expressions, and functions that return booleans:

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  slug: /^[a-z0-9-]+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

Reference a format through the string shorthand or a rule object:

::: code-group

```vue [Field]
<Field name="slug" validator="slug" />

<Field
  name="code"
  :validator="{ format: 'internalCode' }"
/>
```

```ts [Standalone]
import { validate } from '@silver-formily/validator'

await validate('silver-formily', 'slug')
await validate('SF-001', { format: 'internalCode' })
```

:::

Registered strings are converted to `RegExp` objects internally.

## Configure locale messages

### Register messages

`registerValidateLocale()` merges messages incrementally by language identifier:

```ts
import { registerValidateLocale } from '@silver-formily/core'

registerValidateLocale({
  'en-US': {
    usernameAvailable: 'Username is already taken',
    slug: 'Only lowercase letters, numbers, and hyphens are allowed',
  },
})
```

Registering the same language again only replaces the supplied message paths; other messages remain intact.

### Switch language

```ts
import { setValidateLanguage } from '@silver-formily/core'

setValidateLanguage('en-US')
```

Language lookup first checks for an exact registered identifier. Without an exact result, it returns the first identifier whose lowercase form has a containment relationship with the requested value. For example, among the built-in locales, `EN` matches `en` and `US` matches `en-US`. If no match is found, the current language identifier is preserved.

### Built-in languages {#built-in-locales}

Module initialization registers these language identifiers:

- `en`
- `en-US`
- `zh`
- `zh-CN`
- `zh-TW`
- `ja`

Built-in messages cover common rules and formats such as `required`, `min`, `max`, `email`, `url`, and `phone`. Custom messages can extend or replace them incrementally.

## Customize message templates

The default renderer supports <code v-pre>{{path.to.value}}</code> path placeholders. Register a preprocessing template engine to add custom syntax:

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/core'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace('$title', context.title)
})
```

The custom engine runs first, and its output then goes through built-in <code v-pre>{{...}}</code> path replacement. The two mechanisms can therefore be combined.

::: warning Global configuration
The template engine and current language are global state. In server-side rendering or multi-tenant environments, avoid switching global configuration back and forth across concurrent requests.
:::

## Read current configuration

The query APIs are primarily useful for debugging, framework adapters, and tests:

```ts
import {
  getLocaleByPath,
  getValidateFormats,
  getValidateLanguage,
  getValidateLocale,
  getValidateLocaleIOSCode,
  getValidateMessageTemplateEngine,
  getValidateRules,
} from '@silver-formily/validator'

getValidateLanguage()
getValidateLocale('required')
getLocaleByPath('required', 'en-US')
getValidateLocaleIOSCode('en')
getValidateFormats('email')
getValidateRules('required')
getValidateMessageTemplateEngine()
```

| API                                  | Returns                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `getValidateLanguage()`              | Current language identifier                                                                                              |
| `getValidateLocale(path)`            | Message at the path for the current language; falls back to the current-language `pattern`, then the English `pattern`   |
| `getLocaleByPath(path, lang?)`       | Message at the path after applying the language matching described above; does not perform `pattern` message fallback    |
| `getValidateLocaleIOSCode(language)` | Registered language identifier selected by approximate matching; `IOS` in the API name is preserved from the source code |
| `getValidateFormats(key?)`           | One format, or all registered formats                                                                                    |
| `getValidateRules(key?)`             | One rule, or all registered rules                                                                                        |
| `getValidateMessageTemplateEngine()` | Current message template engine                                                                                          |
