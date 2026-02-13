---
order: 2
---

# ObjectField

## 描述

作为@formily/core 的 [createObjectField](https://core.formilyjs.org/api/models/form#createobjectfield) Vue 实现，它是专门用于将 ViewModel 与输入控件做绑定的桥接组件，ObjectField 组件属性参考[IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)

name 属性必填。需要使用 scoped slot 形式来组织子组件

## 用例

::: demo
api/components/object-field
:::

## API

与Field组件的[API](/api/components/field.html#api)完全一致

<!--@include: ./field.md{16,}-->
