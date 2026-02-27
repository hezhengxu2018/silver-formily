# Reset

> 重置按钮

## 普通重置

> 有默认值的控件无法清空

:::demo

reset/base

:::

## 强制清空重置

:::demo

reset/force

:::

## 强制清空重置并校验

:::demo

reset/validate

:::

## API

属性主要继承自 [Button组件](https://cn.element-plus.org/zh-CN/component/button.html) ，下面是 Reset 组件独有的 API 属性

### 属性

| 属性名     | 类型      | 描述         | 默认值  |
| ---------- | --------- | ------------ | ------- |
| forceClear | `boolean` | 强制清空重置 | `false` |
| validate   | `boolean` | 校验表单     | `false` |

### 事件

| 属性名                 | 类型                                                                                             | 描述                                  | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ |
| onClick                | `(event: MouseEvent) => void \| boolean`                                                         | 点击事件，如果返回 false 可以阻塞重置 | -      |
| onResetValidateSuccess | (payload: any) => void                                                                           | 重置校验成功事件                      | -      |
| onResetValidateFailed  | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | 重置校验失败事件                      | -      |
