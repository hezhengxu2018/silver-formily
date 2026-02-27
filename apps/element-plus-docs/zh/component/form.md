# Form

> FormProvider + FormLayout + form 标签的组合组件，可以帮助我们快速实现带回车提交的且能批量布局的表单

::: warning 注意
`component`属性已经改名为`tag`并迁移至 FormLayout 组件上。
:::

## 使用案例

:::demo

form/form

:::

> 注意：想要实现回车提交，我们在使用 Submit 组件的时候不能给其传 submit 事件，否则回车提交会失效，这样做的目的是为了防止用户同时在多处写 submit 事件监听器，处理逻辑不一致的话，提交时很难定位问题。

## API

属性主要继承自 [FormLayout](./form-layout) ，下面是 Form 组件额外的 API 属性

| 属性名                 | 类型                                               | 描述                     | 默认值 |
| ---------------------- | -------------------------------------------------- | ------------------------ | ------ |
| form                   | [Form](https://core.formilyjs.org/api/models/form) | Form 实例                | -      |
| previewTextPlaceholder | string                                             | 预览态占位符             | `N/A`  |
| onAutoSubmit           | `(values:any)=>any`                                | 回车提交事件回调         | -      |
| onAutoSubmitFailed     | (feedbacks) => void                                | 回车提交校验失败事件回调 | -      |
