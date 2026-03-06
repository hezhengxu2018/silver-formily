# Schema

`@silver-formily/vue` no longer re-exports `Schema`. When the Vue API mentions `Schema`, `ISchema`, `x-reactions`, or `x-component-props`, those contracts come from `@formily/json-schema`.

This page stays in `vue-docs` as a stable internal landing page. The full JSON Schema protocol docs now live on the rebuilt official site:

- [Rebuilt JSON Schema docs](https://json-schema.silver-formily.org/en/)

::: tip Migration Note
Import `Schema`, `ISchema`, and related helpers from `@formily/json-schema`. The `@silver-formily/vue` docs only explain how Vue consumes schema objects and do not duplicate the JSON Schema protocol reference.
:::

## Core Entry Points

- [Quick Start](https://json-schema.silver-formily.org/en/)
- [Constructor](https://json-schema.silver-formily.org/en/api/constructor)
- [Properties](https://json-schema.silver-formily.org/en/api/properties)
- [Methods](https://json-schema.silver-formily.org/en/api/methods)
- [Static Methods](https://json-schema.silver-formily.org/en/api/static-methods)
- [Types](https://json-schema.silver-formily.org/en/api/types)
- [Linkages](https://json-schema.silver-formily.org/en/api/linkages)
