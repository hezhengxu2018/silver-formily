# Introduction

`@silver-formily/vue` is a fresh wrapper of the official `@formily/vue`. The goal is to drop the Vue 2 compatibility baggage such as `vue-demi` and `vue-frag`, and to remove the extra template / `display: contents` wrappers that were only needed for dual-version support. Leaner source means cleaner DOM output and easier maintenance.

Refer to the upstream guide for the full walkthrough. This site highlights the nuances and API confirmations specific to this distribution.

## New Features

Starting with `2.2.0`, `@silver-formily/vue` adds support for decorator slots. This is not part of the upstream package, so only a render outlet is exposed—you cannot use `@formily/core` to mutate the slot payload, and it does not participate in Formily reactivity. See the FAQ’s [decorator slot section](/en/questions/#how-do-i-pass-slots-to-a-decorator) for concrete usage.

## Breaking Changes

- `@formily/vue` mirrors React’s default convention and maps binding props to `value` / `onChange`. This wrapper embraces standard Vue 3 semantics, so bindings now use `modelValue` / `onUpdate:modelValue`. Most Vue 3 component libraries already follow this contract, which removes the need for extra adapters.

::: tip
If you are not ready to migrate, stay on `@silver-formily/vue@1.x`, which keeps 100% API compatibility with `@formily/vue`.
:::

- Schema exports were removed from `@silver-formily/vue`. Import Schema helpers directly from `@formily/json-schema` instead.
