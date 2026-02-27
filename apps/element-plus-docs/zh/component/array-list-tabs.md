# ArrayListTabs

> 带有侧边栏标签列表的表单容器

::: warning 注意
该组件仅适用于Schema场景
:::

## MarkupSchema 示例

::: demo
array-list-tabs/markup-schema
:::

## MarkupSchema 作为Tab标题渲染示例

::: tip 提示
推荐使用`Editable`包裹作为标题的field，当其作为标题渲染时其报错不会被统计入panel的错误。
:::

::: demo
array-list-tabs/markup-schema-show-title-field-in-tab
:::

## API

### ArrayListTabs Props

| 属性名              | 类型       | 描述                                                                     | 默认值  |
| ------------------- | ---------- | ------------------------------------------------------------------------ | ------- |
| tabTitleField       | ^[string]  | 必填，作为标签页标题的field的name。对应的field有值时会作为标签页标题渲染 | -       |
| showTitleFieldInTab | ^[boolean] | 是否将`tabTitleField`作为标签页标题。                                    | `false` |

### ArrayListTabs.Remove

> 参考[ArrayBase.Remove](./array-base.md#remove)

### ArrayListTabs.Addition

> 参考[ArrayBase.Addition](./array-base.md#addition)
