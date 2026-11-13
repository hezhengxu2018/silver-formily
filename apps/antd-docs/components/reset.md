# Reset

> 重置按钮

## 普通重置

> 有默认值的控件无法被清空

:::demo
reset/basic.tsx
:::

## 强制清空重置

:::demo
reset/force-clear.tsx
:::

## 重置并校验

:::demo
reset/validate.tsx
:::

## 强制清空重置并校验

:::demo
reset/force-clear-validate.tsx
:::

## API

基于 Ant Design 6 [Button](https://ant.design/components/button-cn)，接收 `IFieldResetOptions` 与按钮 props，独有配置如下：

| 属性                     | 类型                                   | 默认值          | 说明                                                   |
| ------------------------ | -------------------------------------- | --------------- | ------------------------------------------------------ |
| `forceClear`             | `boolean`                              | —               | true 时清空为字段类型默认值，否则优先恢复初始值。      |
| `validate`               | `boolean`                              | —               | 重置后执行校验。                                       |
| `onResetValidateSuccess` | `(payload: any) => void`               | —               | 重置及可选校验成功后调用；当前没有额外结果值。         |
| `onResetValidateFailed`  | `(feedbacks: IFormFeedback[]) => void` | `console.error` | 重置 Promise 失败，或 validate=true 且表单无效时调用。 |
| `htmlType`               | `ButtonProps['htmlType']`              | `'button'`      | 使用 Formily 的 reset，不依赖浏览器原生 reset。        |

Reset 自身不添加 loading 或重复点击锁。
