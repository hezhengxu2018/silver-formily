# Introduction

This documentation site is a rebuilt version of the official `@formily/reactive` docs. It removes the Mobx background section from the original documentation to reduce extra cognitive load, and it adds interactive demos to the examples to make them easier to understand.

## Background

`@formily/reactive` follows the same overall architecture as `mobx`. It is the reactive foundation of the entire `formily` framework, and having an independent reactive solution makes it easier to integrate cleanly with different frontend frameworks.

If you are not building your own components, you usually do not need this documentation. Formily's framework binding libraries already smooth over that gap, so it is mostly transparent in everyday use.

If you are just getting started with Formily, you can skip this documentation for now and come back to it when you need to build custom components.

## Best Practices

The best practices from the official docs can be summarized in three points:

1. Avoid deep wrapping unless you really need it.
2. Prefer `computed` and `batch` where appropriate.
3. Remember to `dispose` after calling `autorun` or `reaction`.

## Removed Sections

This rebuilt documentation removes the sections about framework-specific binding libraries. The main reason is that each frontend framework binding is a separate library and should have its own dedicated documentation. If you are looking for `@formily/reactive-vue` or `@formily/reactive-react`, see the [official Formily documentation](https://reactive.formilyjs.org/).

If you are already using `silver-formily`, you can read the documentation for `@silver-formily/reactive-vue` in its [official docs](https://reactive-vue.silver-formily.org/), which add some utility functions on top of the original documentation.
