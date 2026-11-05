# @silver-formily/validator

[![npm version](https://img.shields.io/npm/v/@silver-formily/validator)](https://www.npmjs.com/package/@silver-formily/validator)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/validator)](https://www.npmjs.com/package/@silver-formily/validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/validator/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/validator/README.en.md)

`@silver-formily/validator` is the declarative validation engine of Silver Formily. It parses rule definitions into executable validator pipelines and supports async execution, severity-based result aggregation, format registration, and locale extension.

## Installation

```bash
pnpm add @silver-formily/validator
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- `validate` for executing validator pipelines and returning `error`, `warning`, and `success`
- validator parsing infrastructure
- rule, format, locale, and message-template registries
- execution strategies such as `validateFirst`

## Positioning

This package acts as the validation subsystem of the form runtime:

- it provides field-level and form-level validation execution for `@silver-formily/core`
- it powers validation in schema-driven form flows
- it centralizes registration for rules, formats, and message templates

## Use Cases

- complex form validation flows
- configurable validation systems
- replacement for `@formily/validator`

## Documentation

- [Guide](https://validator.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/validator)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
