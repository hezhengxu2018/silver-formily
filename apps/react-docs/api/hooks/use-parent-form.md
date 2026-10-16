# useParentForm

## 描述

用于读取最近的 Form 或者 ObjectField 实例，主要方便于调用子表单的 submit/validate

## 签名

```ts
import type { Form, ObjectField } from '@silver-formily/core'

declare function useParentForm(): Form | ObjectField
```

## 用例

:::demo
api/hooks/use-parent-form.tsx
:::

查找从当前字段开始：当前字段本身是 `ObjectField` 时直接返回它，否则沿父链查找最近的 `ObjectField`，最后回退到当前 form。
