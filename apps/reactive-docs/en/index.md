# Introduction

This documentation site focuses on the `@silver-formily/reactive` package itself. It keeps the core ideas of Formily Reactive, while adding examples and interactive demos that better match real silver-formily integration scenarios.

## Background

`@silver-formily/reactive` follows the same overall architecture as `mobx`. It is the reactive foundation of the silver-formily ecosystem, and having an independent reactive solution makes it easier to integrate cleanly with different frontend frameworks.

If you are not building your own components, you usually do not need this documentation. Formily's framework binding libraries already smooth over that gap, so it is mostly transparent in everyday use.

If you are just getting started with Formily, you can skip this documentation for now and come back to it when you need to build custom components.

## Best Practices

The best practices carried into this package documentation can be summarized in three points:

1. Avoid deep wrapping unless you really need it.
2. Prefer `computed` and `batch` where appropriate.
3. Remember to `dispose` after calling `autorun` or `reaction`.

## Removed Sections

This site does not duplicate the documentation for framework-specific binding libraries. Each frontend binding is still a separate package and should have its own dedicated documentation. If you are looking for `@formily/reactive-vue` or `@formily/reactive-react`, see the [official Formily documentation](https://reactive.formilyjs.org/).

If you are already using silver-formily, you can also read the documentation for `@silver-formily/reactive-vue` in its [official docs](https://reactive-vue.silver-formily.org/), which add Vue-oriented utilities on top of the reactive foundation.
