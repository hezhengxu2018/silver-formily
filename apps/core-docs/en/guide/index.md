# Introduction

`@silver-formily/core` is the core of the entire Formily framework. Unlike the official docs, this guide does not start with concepts such as domain models or ultra-high performance that are not immediately helpful in development. Instead, it focuses on what `@silver-formily/core` actually is. Once you build the right mental model for the various Formily modules, those concepts become much easier to understand.

## Positioning

There are two ways to explain the role of `@silver-formily/core`:

1. For users, it is the core of the whole framework and provides the main form model and field model.
2. For the other libraries in the Formily ecosystem, it is the glue of the framework. It combines the reactivity from `reactive`, the path query system from `path`, and the validation system from `validator`, so forms can be validated at the right time and feed results back into the models.

Among these three libraries, especially `@silver-formily/validator` and `@silver-formily/path`, the dependency is mostly transparent to users. Without `@silver-formily/core`, these two packages are hard to use independently. You can think of it this way:

- `@silver-formily/core` needs a reactive system, so it has `@silver-formily/reactive`
- `@silver-formily/core` needs a field path query system, so it has `@silver-formily/path`
- `@silver-formily/core` needs a complete form validation system, so it has `@silver-formily/validator`

All of these capabilities exist to serve the form model. So the greatest value of `@silver-formily/core` is that it establishes a complete form model and field model, while `@silver-formily/reactive`, `@silver-formily/path`, and `@silver-formily/validator` are dependencies derived to support fields and forms.

## Reading Path

This guide separates models from mechanisms, so not every capability gets squeezed into one "Form Model" page:

| Page                                      | Focus                                                                                                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Form Model](/en/guide/form)              | The top-level aggregate responsibilities of Form: state container, field factory, field graph, lifecycle, and aggregate operation entry points |
| [Field Model](/en/guide/field)            | Field state and differences among Field / ArrayField / ObjectField / VoidField                                                                 |
| [Values & State](/en/guide/values)        | `values`, `initialValues`, form state, field state, and batch updates                                                                          |
| [Path System](/en/guide/path)             | `address`, `path`, `FormPath`, `query()`, and nested data read/write                                                                           |
| [Validation System](/en/guide/validation) | Validators, trigger timing, validation strategies, and feedback aggregation                                                                    |
| [Linkage System](/en/guide/linkage)       | The difference between `effects` and `reactions`, their shared foundation, and suitable scenarios                                              |

If you only want to know what Form is, start with [Form Model](/en/guide/form). If you want to understand complex dynamic forms, then continue with the path, validation, and linkage mechanism pages.
