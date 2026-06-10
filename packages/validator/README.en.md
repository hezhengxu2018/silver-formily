# @silver-formily/validator

[简体中文](./README.md)

## Overview

`@silver-formily/validator` is the declarative validation engine of Silver Formily. It parses rule definitions into executable validator pipelines and supports async execution, severity-based result aggregation, format registration, and locale extension.

## Runtime Positioning

This package acts as the validation subsystem of the form runtime:

- it provides field-level and form-level validation execution for `@silver-formily/core`
- it powers validation in schema-driven form flows
- it centralizes registration for rules, formats, and message templates

## Public Surface

- `validate` for executing validator pipelines and returning `error`, `warning`, and `success`
- validator parsing infrastructure
- rule, format, locale, and message-template registries
- execution strategies such as `validateFirst`

## Use Cases

- complex form validation flows
- configurable validation systems
- replacement for `@formily/validator`

## Installation

```bash
pnpm add @silver-formily/validator @silver-formily/path @silver-formily/shared
```

## Documentation

- Docs: <https://validator.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
