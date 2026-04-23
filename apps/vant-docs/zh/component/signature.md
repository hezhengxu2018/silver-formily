---
mobileDemo: signature/index.vue
---

# Signature

> `Signature` 是对 Vant 签名组件的 Formily 适配。相比官方组件，这层封装会把“签字编辑”和“签名预览”拆成两个状态：编辑时展示画板，确认后切换为图片预览。

:::tip 使用建议
适合电子签名、签收确认、免责确认这类需要直接把签名图片存进表单字段的场景。字段值默认保存为 `dataURL` 字符串。
:::

::: warning 注意
为了简化使用，官方组件中的各种事件均不再暴露。
:::

## 基础使用

点击“确认”后，当前签名会以 `dataURL` 形式写回字段值，并切换成图片预览；点击“清空”后会回到签字面板。

<<< @/zh/demos/signature/basic.vue

## 自定义样式

官方 `penColor`、`lineWidth`、`backgroundColor` 和按钮文案都会继续透传。

<<< @/zh/demos/signature/custom-style.vue

## 只读回显

当字段本身已经有签名图片时，组件会直接显示图片预览；在 `readonly` 场景下只展示图片，不再显示签字画板。

<<< @/zh/demos/signature/readonly.vue

## 获取实例

如果需要主动调用 `submit / clear / resize`，推荐通过 Formily 字段实例的 `invoke` 获取组件引用，而不是直接拿 Vue `ref`：

```ts
const signatureRef = fieldRef.value?.invoke('getSignatureRef')

signatureRef?.value?.submit()
signatureRef?.value?.clear()
signatureRef?.value?.resize()
```

## API

### 扩展属性

| 属性名       | 类型      | 描述                                  | 默认值 |
| ------------ | --------- | ------------------------------------- | ------ |
| `modelValue` | `string`  | 当前签名图片，通常为 `dataURL` 字符串 | `-`    |
| `readonly`   | `boolean` | 只读状态，仅展示签名图片              | `-`    |
| `disabled`   | `boolean` | 禁用状态                              | `-`    |

### 属性

组件的其他属性参考 [Vant Signature 官方文档](https://vant-ui.github.io/vant/#/zh-CN/signature)。

### Events

> 官方文档中的各种事件不再暴露。

| 事件名              | 描述                       | 回调参数                             |
| ------------------- | -------------------------- | ------------------------------------ |
| `update:modelValue` | 点击确认或清空后同步字段值 | ^[Function]`(value: string) => void` |

### Slots

同官方文档
