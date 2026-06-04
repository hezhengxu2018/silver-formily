# Introduction

`@silver-formily/core` is the core package of the Silver Formily runtime. It is UI-agnostic: the same form domain model can drive Vue, React, or a custom renderer.

Its value is not that one class does everything. Instead, it builds a form runtime by composing several mechanisms:

- `@silver-formily/reactive` provides reactive state and dependency tracking
- `@silver-formily/path` provides field path matching and nested data paths
- `@silver-formily/validator` provides validation rule execution and feedback
- `@silver-formily/core` combines them into Form and Field models

## Positioning

There are two useful ways to understand `@silver-formily/core`:

1. For application developers, it provides the main form model and field model.
2. For other Formily packages, it is the glue that connects reactivity, path queries, validation, lifecycle events, and UI consumers.

The path and validator packages are mostly transparent to users. They exist to serve the form model:

- `@silver-formily/core` needs a reactive system, so it depends on `@silver-formily/reactive`
- `@silver-formily/core` needs field path querying, so it depends on `@silver-formily/path`
- `@silver-formily/core` needs validation, so it depends on `@silver-formily/validator`

## Reading Path

This guide separates models from mechanisms, so the Form page does not become a catch-all page:

| Page                                      | Focus                                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Form Model](/en/guide/form)              | Form as the top-level aggregate: state container, field factory, field graph, lifecycle, and aggregate operations |
| [Field Model](/en/guide/field)            | Field / ArrayField / ObjectField / VoidField state and differences                                                |
| [Values & State](/en/guide/values)        | `values`, `initialValues`, form state, field state, and batch updates                                             |
| [Path System](/en/guide/path)             | `address`, `path`, `FormPath`, `query()`, and nested data operations                                              |
| [Validation System](/en/guide/validation) | Validators, trigger timing, validation strategy, and feedback aggregation                                         |
| [Linkage System](/en/guide/linkage)       | `effects` and `reactions`, their shared foundation, and when to use each                                          |

If you only want to know what Form is, start with [Form Model](/en/guide/form). If you need to understand complex dynamic forms, continue with the path, validation, and linkage pages.
