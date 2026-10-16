# ArrayField

## 描述

作为 `@silver-formily/core` 中 [createArrayField](https://core.silver-formily.org/api/models/Form#createarrayfield) 的 React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ArrayField 组件属性参考 [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops)

name 属性必填。可使用 render props 或自定义 component 渲染列表，也接受普通 ReactNode。

## 用例

:::demo
api/components/array-field.tsx
:::

## API

属性基于 Field，但 children 回调中的字段类型为 `ArrayField`。完整公共属性参见 [Field](/api/components/field#api)。

```ts
import type { ArrayField as Model } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '@silver-formily/react'

type Props<D extends JSXComponent, C extends JSXComponent> = IFieldProps<D, C, Model>
```
