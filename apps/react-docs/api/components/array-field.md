# ArrayField

## 描述

作为 `@silver-formily/core` 中 [createArrayField](https://core.silver-formily.org/api/models/Form#createarrayfield) 的 React 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ArrayField 组件属性参考 [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops)

name 属性必填。需要使用 render props 形式来渲染列表。

## 用例

:::demo
api/components/array-field.tsx
:::

## API

与Field组件的[API](/api/components/field.html#api)完全一致

<!--@include: ./field.md{16,}-->
