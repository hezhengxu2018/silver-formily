# FormConsumer

## 描述

表单响应消费者，专门用于监听表单模型数据变化而实现各种 UI 响应的组件，使用方式为 scoped slot.

当回调函数内依赖的数据发生变化时就会重新渲染回调函数

Form 参考[Form](https://core.formilyjs.org/api/models/form)

## 用例

::: demo
api/components/form-consumer
:::

## API

### FormConsumer 插槽

| 插槽名  | 说明     | 类型                      |
| ------- | -------- | ------------------------- |
| default | 默认插槽 | ^[object]`{ form: Form }` |
