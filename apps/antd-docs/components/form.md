# Form

> FormProvider + FormLayout + form 标签的组合组件，可以帮助我们快速实现带回车提交的且能批量布局的表单

::: warning 特别说明：与官方实现的差异

- 提交中新增防重复锁，提交调用延后到微任务；未配置 onAutoSubmitFailed 时使用 console.error 处理失败。

- 默认阅读态占位为 N/A，显式空字符串可以保留。样式和 className 作用于外层 FormLayout，而不是内部 form。

:::

## 使用案例

:::demo
form/basic.tsx
:::

::: warning 官方原文：回车提交
注意：想要实现回车提交，我们在使用Submit组件的时候不能给其传onSubmit事件，否则回车提交会失效，这样做的目的是为了防止用户同时在多处写onSubmit事件监听器，处理逻辑不一致的话，提交时很难定位问题。
:::

## API

`FormProps` 继承下文 [FormLayout](/components/form-layout#api) 的全部布局属性，并增加：

| 属性                     | 类型                                   | 默认值          | 说明                                                                                               |
| ------------------------ | -------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `form`                   | `Form`                                 | 父级表单        | 显式传入 createForm() 创建的实例；也可以继承 FormProvider / 对象字段上下文。两者都没有时抛出错误。 |
| `component`              | `JSXComponent`                         | `'form'`        | 接收 onSubmit 的承载组件。改成非 form 元素后，原生回车提交需要调用方自行提供。                     |
| `onAutoSubmit`           | `(values: any) => any`                 | —               | 原生提交后执行校验，通过后调用；支持 Promise。                                                     |
| `onAutoSubmitFailed`     | `(feedbacks: IFormFeedback[]) => void` | `console.error` | 校验或异步提交失败回调；运行时也可能收到业务抛出的 Error。                                         |
| `previewTextPlaceholder` | `ReactNode`                            | `'N/A'`         | 设置本表单阅读态的空值占位；显式空字符串有效。                                                     |
| `children`               | `ReactNode`                            | —               | 表单内容。                                                                                         |

`className`、`style` 等布局属性应用到外层 FormLayout 根节点。表单实例替换时，应通过 React `key` 重新挂载。

## 文档来源

介绍与原例来自 [Alibaba Formily Form 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Form.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
