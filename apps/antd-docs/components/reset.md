# Reset

> 重置按钮

::: warning 特别说明：与官方实现的差异

- onClick 调用 preventDefault() 也能取消重置；没有 children 时默认显示“重置”，支持按钮 ref。

- validate=true 时，reset Promise 完成后会额外检查 form.invalid，并将 form.errors 交给失败回调；上游仅跟随 reset Promise 的结果。

- 没有失败回调时记录 console.error。本页校验示例显式接收预期失败，以便在字段内展示错误，不将正常校验写成控制台异常。

:::

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

基于 Ant Design 6 [Button](https://ant.design/components/button-cn/)，接收 `IFieldResetOptions` 与按钮 props，独有配置如下：

| 属性                            | 类型                                          | 默认值                | 说明                                                   |
| ------------------------------- | --------------------------------------------- | --------------------- | ------------------------------------------------------ |
| `forceClear`                    | `boolean`                                     | —                     | true 时清空为字段类型默认值，否则优先恢复初始值。      |
| `validate`                      | `boolean`                                     | —                     | 重置后执行校验。                                       |
| `onClick`                       | `(event: MouseEvent<HTMLElement>) => unknown` | —                     | 返回 false 或调用 preventDefault() 均可取消重置。      |
| `onResetValidateSuccess`        | `(payload: any) => void`                      | —                     | 重置及可选校验成功后调用；当前没有额外结果值。         |
| `onResetValidateFailed`         | `(feedbacks: IFormFeedback[]) => void`        | `console.error`       | 重置 Promise 失败，或 validate=true 且表单无效时调用。 |
| `htmlType`                      | `ButtonProps['htmlType']`                     | `'button'`            | 使用 Formily 的 reset，不依赖浏览器原生 reset。        |
| `children / ref / 其他按钮属性` | `ReactNode / Button ref / ButtonProps`        | 重置 / — / 原生默认值 | 传递至底层按钮。                                       |

需要处于 Form / FormProvider 或对象字段上下文中。Reset 自身不添加 loading 或重复点击锁。

## 文档来源

介绍与原例来自 [Alibaba Formily Reset 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Reset.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
