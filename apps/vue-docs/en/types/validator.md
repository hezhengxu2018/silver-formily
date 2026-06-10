# Validator

The Vue package still exports a set of validator-related type aliases mostly for backward compatibility. Their actual source is `@silver-formily/validator`.

For new code, prefer importing validator contracts from `@silver-formily/validator` directly. Keep the Vue aliases only when you want your public component props to mirror `@silver-formily/vue` exactly.

## Validator aliases exported by the Vue package

| Vue export                | Source type                     |
| ------------------------- | ------------------------------- |
| `SchemaFieldValidator`    | `Validator`                     |
| `SchemaValidatorFunction` | `ValidatorFunction<any>`        |
| `SchemaValidatorRules`    | `IValidatorRules<any>`          |
| `SchemaMultiValidator`    | `MultiValidator<any>`           |
| `SchemaValidateResult`    | `IValidateResult`               |
| `SchemaValidatorResponse` | `ValidatorFunctionResponse`     |
| `FormilyValidator`        | direct re-export of `Validator` |

## Where these aliases appear in the Vue package

- `IFieldProps` and `IFieldFactoryProps` use `SchemaFieldValidator` for their `validator` prop.
- `ISchemaMarkupFieldProps` reaches the validator contract through `SchemaMarkupValidator`.
- `SchemaField` and `RecursionField` still follow the validator package's rule model under the hood.

## Recommended links

- Validation rules and the main `Validator` entry: [Validator API](https://validator.silver-formily.org/en/api/validate)
- Registry APIs for rules, formats, and locales: [Registry API](https://validator.silver-formily.org/en/api/registry)
- How validator integrates with Formily: [Using in Formily](https://validator.silver-formily.org/en/guide/formily-validator)

## Recommended import style

```ts
import type { IValidatorRules, Validator } from '@silver-formily/validator'
```

Use the Vue aliases only when you intentionally want to follow the Vue package's public surface.
