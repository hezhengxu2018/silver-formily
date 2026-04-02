---
mobileDemo: signature/index.vue
---

# Signature

> `Signature` 是对 Vant 签名组件的 Formily 适配。相比官方组件，这层封装额外补上了 `modelValue` 字段值、现有签名回显，以及 `readPretty` 阅读态图片预览。

:::tip 使用建议
适合电子签名、签收确认、免责确认这类需要直接把签名图片存进表单字段的场景。字段值默认保存为 `dataURL` 字符串。
:::

## 基础使用

点击“确认”后，当前签名会以 `dataURL` 形式写回字段值。

<<< @/zh/demos/signature/basic.vue

## 自定义样式

官方 `penColor`、`lineWidth`、`backgroundColor` 和按钮文案都会继续透传。

<<< @/zh/demos/signature/custom-style.vue

## 只读回显

当字段本身已经有签名图片时，组件会自动把 `modelValue` 回绘到画布里；在 `readonly` / `disabled` 场景下也能稳定展示。

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

### 使用约定

- Formily 场景统一使用 `modelValue` 作为字段值，推荐保存 `data:image/...` 格式的 `dataURL` 字符串
- 点击组件底部“确认”按钮时，会触发 `update:modelValue`，并把当前签名图片写回字段
- 点击“清空”按钮时，会同步把字段值清空为 `''`
- 当外部字段值变化时，组件会自动把新的签名图片重新绘制到画布上，避免编辑态只能看到空白板
- `readPretty` 模式下会自动切换到 `PreviewText.Signature`，非空时展示签名图片，空值显示占位符
- `tips` 和 `tips` 插槽保持 Vant 原生语义，只会在当前环境不支持 `canvas` 时作为降级提示展示；如果只是想补充签名说明，建议写在 `FormItem.extra` / `description` 这类外层文案里

### 扩展属性

| 属性名       | 类型      | 描述                                  | 默认值 |
| ------------ | --------- | ------------------------------------- | ------ |
| `modelValue` | `string`  | 当前签名图片，通常为 `dataURL` 字符串 | `-`    |
| `readonly`   | `boolean` | 只读状态，会保留画布展示但阻止编辑    | `-`    |
| `disabled`   | `boolean` | 禁用状态                              | `-`    |

### 官方透传属性

以下属性会直接透传给 Vant `Signature`：

| 属性名              | 类型     | 描述                                     | 默认值     |
| ------------------- | -------- | ---------------------------------------- | ---------- |
| `tips`              | `string` | 当前环境不支持 `canvas` 时的降级提示文案 | 官方默认值 |
| `type`              | `string` | 导出图片类型                             | `png`      |
| `penColor`          | `string` | 画笔颜色                                 | `#000`     |
| `lineWidth`         | `number` | 线宽                                     | `3`        |
| `backgroundColor`   | `string` | 画布背景色                               | `''`       |
| `clearButtonText`   | `string` | 清空按钮文案                             | 官方默认值 |
| `confirmButtonText` | `string` | 确认按钮文案                             | 官方默认值 |

### Events

| 事件名              | 描述                       | 回调参数                                                                     |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `update:modelValue` | 点击确认或清空后同步字段值 | ^[Function]`(value: string) => void`                                         |
| `submit`            | 点击确认按钮时触发         | ^[Function]`(payload: { image: string; canvas: HTMLCanvasElement }) => void` |
| `clear`             | 点击清空按钮时触发         | ^[Function]`() => void`                                                      |
| `start`             | 开始签名时触发             | ^[Function]`() => void`                                                      |
| `signing`           | 签名过程中持续触发         | ^[Function]`(event: TouchEvent) => void`                                     |
| `end`               | 结束签名时触发             | ^[Function]`() => void`                                                      |

### Slots

| 插槽名 | 描述                                           | 插槽参数 |
| ------ | ---------------------------------------------- | -------- |
| `tips` | 自定义降级提示内容，仅在不支持 `canvas` 时展示 | `-`      |

### 参考

基础交互和样式能力参考 [Vant Signature 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/signature)。
