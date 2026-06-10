# @silver-formily/json-schema

[简体中文](./README.md)

`@silver-formily/json-schema` provides the schema description layer for Silver Formily. It connects JSON Schema-style structures with form components, decorators, reactions, display state, and other runtime behavior, making it a key package for schema-driven forms.

## What This Package Does

If your form is generated from a schema rather than handwritten field-by-field, this package is the bridge. It is responsible for:

- the `Schema` class and schema-related types
- describing components, decorators, and component props
- supporting extensions such as `x-component`, `x-decorator`, and `x-reactions`
- schema compilation, patches, polyfills, and default type mappings

## Typical Use Cases

- dynamic forms generated from JSON or DSL definitions
- low-code or config-driven form systems
- schema input for `@silver-formily/vue` and UI adapter packages
- migrations from `@formily/json-schema` to `@silver-formily/json-schema`

## Works With

- `@silver-formily/core` for the runtime field model
- `@silver-formily/vue` for Vue rendering
- `@silver-formily/element-plus` and `@silver-formily/vant` for UI-specific schema declarations

## Installation

```bash
pnpm add @silver-formily/json-schema @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared
```

## Documentation

- Docs site: <https://json-schema.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
