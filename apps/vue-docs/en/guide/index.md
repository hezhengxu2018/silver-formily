# Introduction

`@silver-formily/vue` started as a Vue 3-focused rewrite of the official `@formily/vue`. The goal was to remove the Vue 2 compatibility baggage such as `vue-demi` and `vue-frag`, along with the extra wrappers they forced into the render tree. The result is a cleaner DOM structure and a codebase that is easier to maintain.

Starting with `3.x`, the package family, docs, demos, and installation instructions are fully migrated to the Silver Formily namespace. In practice that means this site now treats `@silver-formily/core`, `@silver-formily/json-schema`, `@silver-formily/reactive`, and `@silver-formily/shared` as the default companion packages instead of the upstream `@formily/*` names.

Refer to the upstream guide for the broad concepts if needed. This site focuses on the Silver Formily branch, its migration story, and the Vue-specific behavior.

## New Features

Starting with `2.2.0`, `@silver-formily/vue` adds support for decorator slots. This capability does not come from upstream, so only a render outlet is exposed. You cannot use `@silver-formily/core` to mutate the slot payload through field protocols, and it does not participate in Formily reactivity. See the FAQ’s [decorator slot section](/en/questions/#how-do-i-pass-slots-to-a-decorator) for concrete usage.

## Breaking Changes

- `@formily/vue` mirrors React’s default convention and maps binding props to `value` / `onChange`. This wrapper embraces standard Vue 3 semantics, so bindings now use `modelValue` / `onUpdate:modelValue`. Most Vue 3 component libraries already follow this contract, which removes the need for extra adapters.
- Starting with `3.x`, the docs site, demos, and installation snippets consistently use the `@silver-formily/*` namespace. If you still maintain an upstream `@formily/*` project, treat those names as legacy migration context rather than the current recommendation.

::: tip
If you are not ready to migrate, stay on `@silver-formily/vue@1.x`, which keeps 100% API compatibility with `@formily/vue`.
:::

- Schema exports were removed from `@silver-formily/vue`. Import Schema helpers directly from `@silver-formily/json-schema` instead, and use the [rebuilt JSON Schema docs](https://json-schema.silver-formily.org/en/) for the full `Schema`, `ISchema`, and linkage reference.
