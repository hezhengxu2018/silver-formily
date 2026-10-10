# Validator

`@silver-formily/react` does not define its own validation protocol. The `validator` attribute on field components directly uses `FieldValidator` from `@silver-formily/core`, and Core's validation types ultimately come from `@silver-formily/validator`.

## How it is consumed in the React package

- The `validator` attribute type of `IFieldProps` and `IFieldFactoryProps` is `FieldValidator`.
- The `x-validator` in a Schema is parsed by `@silver-formily/json-schema` and likewise follows the validator package's rule system.

## Recommended Links

- Validation rules and the `Validator` main entry: [Validator API](https://validator.silver-formily.org/api/validate)
- Registered formats, rules and i18n: [Registry API](https://validator.silver-formily.org/api/registry)
- How to use validators in Formily: [Using in Formily](https://validator.silver-formily.org/guide/formily-validator)

## Recommended Imports

```ts
import type { FieldValidator } from '@silver-formily/core'
import type { IValidatorRules, Validator } from '@silver-formily/validator'
```

Only when you need to stay consistent with the public component props of `@silver-formily/react` do you need to reference `FieldValidator` from the field props perspective.
