# @silver-formily/vue

[![npm version](https://img.shields.io/npm/v/@silver-formily/vue)](https://www.npmjs.com/package/@silver-formily/vue)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/vue)](https://www.npmjs.com/package/@silver-formily/vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vue/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vue/README.en.md)

`@silver-formily/vue` is the Vue 3 form rendering layer of Silver Formily. It connects the core runtime, schema protocol, and Vue component system, and exposes field components, schema-rendering components, composables, and adapter helpers.

## Installation

```bash
pnpm add \
  @silver-formily/vue \
  @silver-formily/core \
  @silver-formily/json-schema \
  @silver-formily/path \
  @silver-formily/reactive \
  @silver-formily/reactive-vue \
  @silver-formily/shared \
  @silver-formily/validator \
  'vue@^3.3.0'
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- field components: `Field`, `ArrayField`, `ObjectField`, `VoidField`
- form-context components: `FormProvider`, `FormConsumer`
- schema components: `SchemaField`, `RecursionField`, `ReactiveField`, `ExpressionScope`
- composables: `useForm`, `useField`, `useFieldSchema`, `useFormEffects`
- adapter helpers: `connect`, `mapProps`

## Positioning

This package sits between the runtime kernel and concrete UI libraries:

- it depends on `@silver-formily/core` for form and field semantics
- it depends on `@silver-formily/reactive-vue` for Vue lifecycle integration
- it acts as the upstream rendering layer consumed by `@silver-formily/element-plus` and `@silver-formily/vant`

## Component Types

`connect` preserves the wrapped component's public props, slots, and instance type.
Use `VueComponentProps<T>` to extract the props exposed to consumers. If a wrapper
needs to add or override its public props, provide the second type parameter to
`connect`:

```ts
import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

type InputProps = VueComponentProps<typeof ElInput>

const ConnectedInput = connect<typeof ElInput, InputProps>(
  ElInput,
  mapProps({ readOnly: 'readonly' }),
)
```

This type change does not alter the runtime behavior of `connect` or `mapProps`,
including attrs forwarding.

## Design Characteristics

- pure Vue 3 runtime path
- aligned with `modelValue` / `onUpdate:modelValue`
- intended for schema-driven forms and component-level field modeling
- serves as the Silver Formily namespace replacement for `@formily/vue`

## Related Packages

- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- [Guide](https://vue.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/vue)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
