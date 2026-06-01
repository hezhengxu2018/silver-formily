# Introduction

`@silver-formily/validator` is the validation core maintained by Silver Formily. It turns declarative rule descriptions into executable validation pipelines and normalizes output into error, warning, and success message buckets.

The package is built around four pieces:

1. A `validate` entry that executes one or many validation descriptions.
2. A default ruleset for `required`, `min`, `max`, `pattern`, `format`, and related constraints.
3. A registry layer for custom rules, formats, locales, and template engines.
4. A parser layer that normalizes strings, functions, and rule objects into runnable validators.

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/validator
```

```bash [npm]
npm install @silver-formily/validator
```

:::

## Example

```ts
import { validate } from '@silver-formily/validator'

const result = await validate('', [
  { required: true },
  { minLength: 3, message: 'Please enter at least 3 characters' },
])

result.error
// ['The field value is required', 'Please enter at least 3 characters']
```

## When to use it

- You need a stable validation engine behind form or schema rules.
- You want to add project-specific rules or formats.
- You need locale-aware validation messages.
- You need template-driven message rendering with runtime context.
