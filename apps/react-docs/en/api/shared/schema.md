# Schema

`@silver-formily/react` does not export `Schema`. If you see protocol names such as `Schema`, `ISchema`, `x-reactions`, `x-component-props` in the React-side APIs, they all belong to [`@silver-formily/json-schema`](https://json-schema.silver-formily.org/). They are not duplicated here.

::: tip Migration Notes
Schema-related code in this site's demos and examples imports types from `@silver-formily/json-schema` uniformly. The `@silver-formily/react` documentation only explains how the React side consumes Schemas, and does not duplicate the JSON Schema protocol itself.
:::
