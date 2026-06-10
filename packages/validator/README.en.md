# @silver-formily/validator

[简体中文](./README.md)

`@silver-formily/validator` is the validation engine for Silver Formily. It parses declarative validators, runs sync or async validation, groups results by severity, and exposes registries for rules, formats, and localized messages.

## What This Package Is For

If you need more than lightweight component-level checks, this package provides a composable, extensible, and i18n-friendly validation runtime. It is commonly used for:

- field-level and form-level validation
- custom rule registration
- format validation and message template overrides
- validation workflows inside `@silver-formily/core`

## Key Capabilities

- `validate` for running validators and collecting `error`, `warning`, and `success`
- validator parsing and execution
- built-in rule, format, and locale registries
- async validation support and `validateFirst`

## Good Fit For

- custom form engines and field systems
- shared business validation rules
- migrations from `@formily/validator` to `@silver-formily/validator`

## Installation

```bash
pnpm add @silver-formily/validator @silver-formily/path @silver-formily/shared
```

## Documentation

- Docs site: <https://validator.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
