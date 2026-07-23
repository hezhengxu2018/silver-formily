# Introduction

`@silver-formily/validator` is the validation core for Silver Formily. It turns declarative field rules into executable validation flows and produces consistent error, warning, and success feedback.

## Where to start

- Configure field rules in Formily: read [Quick Start](/en/guide/quick-start)
- Look up `validate()`, built-in rules, and formats: read [Run Validation](/en/api/validate)
- Register global rules, formats, and locales: read [Registry and Configuration](/en/api/registry)
- Build a form adapter or inspect the parsing process: read [Rule Parsing](/en/api/parser)

Most application development only needs Quick Start and the rule reference in Run Validation.

## What it includes

The package mainly provides:

1. Built-in rules such as `required`, `min`, `max`, `pattern`, and `format`.
2. Custom synchronous or asynchronous validators, with error, warning, and success feedback.
3. Global registration for rules, formats, locales, and message template engines.
4. The `validate()` and rule parsing APIs used by Formily and other upper layers.

## Install directly

Formily projects normally receive validator capabilities indirectly through `@silver-formily/core`. Install this package directly only when you need to use it independently or build an adapter:

::: code-group

```bash [pnpm]
pnpm add @silver-formily/validator
```

```bash [npm]
npm install @silver-formily/validator
```

:::

## Standalone usage

Outside Formily, call `validate()` directly:

```ts
import { validate } from '@silver-formily/validator'

const result = await validate('', [
  { required: true },
  { minLength: 3, message: 'Enter at least 3 characters' },
])

result.error
// ['The field value is required']
```

See [Run Validation](/en/api/validate) for the complete parameters and return value.
