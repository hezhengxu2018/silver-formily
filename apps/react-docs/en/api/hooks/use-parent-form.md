# useParentForm

## Description

Used to read the nearest Form or ObjectField instance, mainly making it convenient to call submit/validate on sub-forms.

## Signature

```ts
import type { Form, ObjectField } from '@silver-formily/core'

declare function useParentForm(): Form | ObjectField
```

## Usage

:::demo
api/hooks/use-parent-form.tsx
:::

The search starts at the current field: if it is an `ObjectField`, the hook returns that field itself; otherwise it walks up to the nearest `ObjectField` and falls back to the current form.
