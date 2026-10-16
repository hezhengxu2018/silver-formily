---
order: 2
---

# ObjectField

## 描述

作为 `@silver-formily/core` 中 [createObjectField](https://core.silver-formily.org/api/models/Form#createobjectfield) 的 React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ObjectField 组件属性参考 [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops)

name 属性必填。子字段直接写在 children 中即可。

## 用例

:::demo
api/components/object-field.tsx
:::

## API

属性基于 Field，但 children 回调中的字段类型为 `ObjectField`。完整公共属性参见 [Field](/api/components/field#api)。

```ts
import type { ObjectField as Model } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '@silver-formily/react'

type Props<D extends JSXComponent, C extends JSXComponent> = IFieldProps<D, C, Model>
```
