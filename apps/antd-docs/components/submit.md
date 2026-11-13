# Submit

> 提交按钮

## 普通提交

:::demo
submit/basic.tsx
:::

## 防重复提交(Loading)

:::demo
submit/prevent-duplicate-submit.tsx
:::

## API

基于 Ant Design 6 [Button](https://ant.design/components/button-cn/)，接收 `ISubmitProps`，独有属性如下：

| 属性              | 类型                                   | 默认值                             | 说明                                                                     |
| ----------------- | -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `onSubmit`        | `(values: any) => any`                 | —                                  | 先校验再提交，支持 Promise；省略时由原生 submit 交给 Form.onAutoSubmit。 |
| `onSubmitSuccess` | `(payload: any) => void`               | —                                  | 仅自定义 onSubmit 路径调用，接收其返回值。                               |
| `onSubmitFailed`  | `(feedbacks: IFormFeedback[]) => void` | `console.error`                    | 校验或异步提交失败回调；运行时也可能收到业务 Error。                     |
| `loading`         | `ButtonProps['loading']`               | 表单 submitting                    | 与表单提交状态共同决定；false 不会覆盖 submitting=true。                 |
| `disabled`        | `boolean`                              | —                                  | 显式禁用或 loading / submitting 时均不可点击。                           |
| `htmlType`        | `ButtonProps['htmlType']`              | 有 onSubmit 时 button，否则 submit | 自定义 onSubmit 路径始终阻止原生重复提交。                               |
