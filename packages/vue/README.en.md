# Silver Formily Vue

[Documentation](https://vue.silver-formily.org/) · [Local docs index](../../apps/vue-docs/en/index.md) · [中文 README](./README.md)

@silver-formily/vue is a Vue 3–first runtime wrapper around [Formily](https://formilyjs.org/). It keeps the orchestration power of `@formily/vue` while removing Vue 2 compatibility layers, redundant DOM wrappers, and inconsistent event contracts. The source lives in `src/`, docs in `docs/`, and build artifacts in `esm/`.

## ✨ Features

- **Pure Vue 3 runtime** – no `vue-demi`, `vue-frag`, or compatibility shims; the render tree mirrors native Vue component libraries.
- **Native DOM & events** – relies on `modelValue` / `onUpdate:modelValue`, so Element Plus and most Vue 3 UI kits work without extra adapters.
- **Richer TypeScript hints** – explicit generics and shared interfaces sit beside the runtime to keep emitted `.d.ts` files in sync.
- **Formily ecosystem alignment** – works with `@formily/core`, `@formily/json-schema`, and other official packages, keeping migration costs low.
- **Decorator slots** – wire `FormItem` and other wrappers to the form schema via `:decorator-content` / `x-decorator-content`, covering `default`, `label`, `extra`, or any named slot. See the [FAQ entry](../../apps/vue-docs/en/questions/index.md#how-do-i-pass-slots-to-a-decorator).
- **Docs & demos included** – VitePress docs describe APIs, migration notes, and Element Plus demos; run `pnpm docs:dev` to browse locally.

## 🔄 Differences vs `@formily/vue`

| Aspect         | `@silver-formily/vue` 2.x                                          | Official `@formily/vue`                  |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| Event contract | `modelValue` / `onUpdate:modelValue`                               | `value` / `onChange`                     |
| DOM structure  | No extra `template` / `display: contents` wrappers                 | Extra containers for Vue 2 compatibility |
| Dependencies   | Vue 3–only runtime deps                                            | Uses `vue-demi` to target Vue 2 + 3      |
| Schema export  | Schema is **not** re-exported (import from `@formily/json-schema`) | Schema is re-exported                    |
| Compatibility  | Use `@silver-formily/vue@1.x` for strict parity                    | Official package                         |

## 📦 Peer Dependencies

Install these alongside the library in your host app:

```
@formily/core ^2
@formily/json-schema ^2
@formily/reactive ^2
@silver-formily/reactive-vue ^1
@formily/shared ^2
vue ^3.3.0+
```

## 🚀 Installation

Recommended pnpm command:

```bash
pnpm add @silver-formily/vue @formily/core @formily/json-schema @formily/reactive @silver-formily/reactive-vue @formily/shared
```

## ⚡️ Quick Start

The snippet below wires Element Plus inputs into Formily:

```vue
<script setup lang="ts">
import { createForm } from '@formily/core'
import { connect, Field, FormProvider, mapProps } from '@silver-formily/vue'
import { ElFormItem, ElInput } from 'element-plus'

const form = createForm({ validateFirst: true })

const FormItem = connect(
  ElFormItem,
  mapProps({ title: 'label', required: true }, (_, field) => ({
    error: field.selfErrors[0] || undefined,
  })),
)
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="email"
      title="Email"
      required
      :decorator="[FormItem]"
      :component="[ElInput, { placeholder: 'hello@formily.dev' }]"
    />
  </FormProvider>
</template>
```

Explore more components (`SchemaField`, `RecursionField`, `ArrayField`, etc.) and composables in [`docs/api`](../../apps/vue-docs/api).

## 🧱 API Overview

- **Components**: `FormProvider`, `FormConsumer`, `Field`, `ArrayField`, `ObjectField`, `VoidField`, `SchemaField`, `RecursionField`, `ReactiveField`, `ExpressionScope`.
- **Composables**: `useForm`, `useField`, `useFieldSchema`, `useFormEffects`, `useParentForm`, `useAttach`, `useInjectionCleaner`.
- **Shared helpers**: `connect`, `mapProps`, plus factories in `src/shared` and `src/utils`.

All public symbols are re-exported from `src/index.ts`, and the published bundle (JS + declarations) lives in `esm/`.

## 🛠️ Local Development

```bash
pnpm install       # Install dependencies
pnpm lint          # Run Antfu ESLint rules
pnpm build         # Build the library + types via Vite
pnpm docs:dev      # Launch the VitePress docs site
pnpm docs:build    # Generate static docs into docs/.vitepress/dist
pnpm commit        # Conventional Commit helper (czg)
pnpm release       # release-it workflow (requires clean tree)
```

- Build output is generated into `esm/`; do not hand-edit this directory.
- Automated tests are not wired yet—document manual verification (Vue + Formily versions, schema, browser) in every PR.
- Follow `@antfu/eslint-config` style: 2 spaces, single quotes, dangling commas where allowed, no semicolons.

## 📚 Docs & Examples

- Visit the published site: <https://vue.silver-formily.org/>.
- `docs/demos` contains Element Plus playgrounds that double as regression samples.

## 📄 License

MIT © hezhengxu
