# Form

> FormProvider + FormLayout + form 标签的组合组件，可以帮助我们快速实现带回车提交的且能批量布局的表单

## 使用案例

:::demo
form/basic.tsx
:::

::: tip 提示
想要实现回车提交，我们在使用Submit组件的时候不能给其传onSubmit事件，否则回车提交会失效，这样做的目的是为了防止用户同时在多处写onSubmit事件监听器，处理逻辑不一致的话，提交时很难定位问题。
:::

## API

`FormProps` 继承下文 [FormLayout](/components/form-layout#api) 的全部布局属性，并增加：

| 属性                     | 类型                                              | 默认值          | 说明                                                                                               |
| ------------------------ | ------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `form`                   | `Form`                                            | 父级表单        | 显式传入 createForm() 创建的实例；也可以继承 FormProvider / 对象字段上下文。两者都没有时抛出错误。 |
| `component`              | `JSXComponent`                                    | `'form'`        | 接收 onSubmit 的承载组件。改成非 form 元素后，原生回车提交需要调用方自行提供。                     |
| `onAutoSubmit`           | ^[Function]`(values: any) => any`                 | —               | 原生提交后执行校验，通过后调用；支持 Promise。                                                     |
| `onAutoSubmitFailed`     | ^[Function]`(feedbacks: IFormFeedback[]) => void` | `console.error` | 校验或异步提交失败回调；运行时也可能收到业务抛出的 Error。                                         |
| `previewTextPlaceholder` | `ReactNode`                                       | `'N/A'`         | 设置本表单阅读态的空值占位；显式空字符串有效。                                                     |
| `children`               | `ReactNode`                                       | —               | 表单内容。                                                                                         |

`className`、`style` 等布局属性应用到外层 FormLayout 根节点。表单实例替换时，应通过 React `key` 重新挂载。
