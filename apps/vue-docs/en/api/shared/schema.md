# Schema

`@silver-formily/vue` no longer exports `Schema`. If you see protocol names such as `Schema`, `ISchema`, `x-reactions`, or `x-component-props` in the Vue API, they all belong to [`@silver-formily/json-schema`](https://json-schema.silver-formily.org/en/). This site does not maintain a duplicate copy of those contracts.

::: tip Migration Note
Starting with `3.x`, schema-related examples in `vue-docs` and demos have all moved to `@silver-formily/json-schema`. The `@silver-formily/vue` docs only explain how Vue consumes schema objects and do not duplicate the JSON Schema protocol itself.
:::
