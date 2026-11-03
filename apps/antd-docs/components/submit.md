# Submit

> 提交按钮

::: warning 特别说明：与官方实现的差异

- 表单 submitting=true 时，loading=false 不再关闭加载；loading / submitting 时同时禁用按钮，并在校验与提交期间拦截同一按钮的重复触发。

- onClick 返回 false 或 preventDefault() 都会取消原生及程序化提交；配置自定义 onSubmit 时会阻止原生重复提交，即使显式设置 htmlType='submit'。

- 没有 children 时默认显示“提交”；失败没有回调时记录 console.error。自定义提交在微任务中开始，业务异常也会传给失败回调。

:::

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

| 属性              | 类型                                          | 默认值                             | 说明                                                                     |
| ----------------- | --------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `onClick`         | `(event: MouseEvent<HTMLElement>) => unknown` | —                                  | 返回 false 或调用 preventDefault() 均可取消原生及程序化提交。            |
| `onSubmit`        | `(values: any) => any`                        | —                                  | 先校验再提交，支持 Promise；省略时由原生 submit 交给 Form.onAutoSubmit。 |
| `onSubmitSuccess` | `(payload: any) => void`                      | —                                  | 仅自定义 onSubmit 路径调用，接收其返回值。                               |
| `onSubmitFailed`  | `(feedbacks: IFormFeedback[]) => void`        | `console.error`                    | 校验或异步提交失败回调；运行时也可能收到业务 Error。                     |
| `loading`         | `ButtonProps['loading']`                      | 表单 submitting                    | 与表单提交状态共同决定；false 不会覆盖 submitting=true。                 |
| `disabled`        | `boolean`                                     | —                                  | 显式禁用或 loading / submitting 时均不可点击。                           |
| `htmlType`        | `ButtonProps['htmlType']`                     | 有 onSubmit 时 button，否则 submit | 自定义 onSubmit 路径始终阻止原生重复提交。                               |
| `type / children` | `ButtonProps['type'] / ReactNode`             | primary / 提交                     | 其余 Button 属性与 ref 透传。                                            |

需要处于 Form / FormProvider 或对象字段上下文中。点击后到校验、提交结束之间，对同一按钮的重复触发会被拦截。

## 文档来源

介绍与原例来自 [Alibaba Formily Submit 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Submit.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
