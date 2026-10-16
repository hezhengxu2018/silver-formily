# FormConsumer

## 描述

表单响应消费者，专门用于监听表单模型数据变化而实现各种 UI 响应的组件，使用方式为 render props。

当回调函数内依赖的数据发生变化时就会重新渲染回调函数

Form 参考[Form](https://core.silver-formily.org/api/models/Form)

## 用例

:::demo
api/components/form-consumer.tsx
:::

## API

### FormConsumer children

| 属性     | 说明                         | 类型                                         |
| -------- | ---------------------------- | -------------------------------------------- |
| children | 渲染函数，接收当前 Form 实例 | ^[Function]`(form: Form) => React.ReactNode` |

`children` 可省略，提供时必须是渲染函数；返回值可以是任意 ReactNode，包括 null、数组、文本和元素。组件需要 FormProvider 上下文，并追踪回调内部读取的响应式状态。
