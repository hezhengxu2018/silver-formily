# FormStep

> 分步表单组件

::: warning 注意
该组件只适用于 Schema 场景。
:::

## Markup Schema 案例

::: tip 提示
通过`createFormStep`创建出来的对象属于`@formily/reactive`的响应式，在例子中通过`FormConsumer`包裹才实现了渲染的更新。
:::

:::demo

form-step/markup-schema

:::

## JSON Schema 案例

:::demo

form-step/json-schema

:::

## API

### FormStep

| 属性名   | 类型      | 描述                                   | 默认值 |
| -------- | --------- | -------------------------------------- | ------ |
| formStep | IFormStep | 传入通过 createFormStep 创建出来的模型 |        |

其余参考 [https://cn.element-plus.org/zh-CN/component/steps.html](https://cn.element-plus.org/zh-CN/component/steps.html)

### FormStep.StepPane

参考 [https://cn.element-plus.org/zh-CN/component/steps.html](https://cn.element-plus.org/zh-CN/component/steps.html)

### FormStep.createFormStep

```ts pure
interface createFormStep {
  (current?: number): IFormStep
}

interface IFormStep {
  // 当前索引
  current: number
  // 是否允许向后
  allowNext: boolean
  // 是否允许向前
  allowBack: boolean
  // 设置当前索引
  setCurrent: (key: number) => void
  // 提交表单
  submit: Formily.Core.Models.Form['submit']
  // 向后
  next: () => void
  // 向前
  back: () => void
}
```
