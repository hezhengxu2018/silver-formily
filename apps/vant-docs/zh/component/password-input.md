---
mobileDemo: password-input/index.vue
---

# PasswordInput

> `PasswordInput` 是对 Vant 密码输入框的 Formily 适配，负责把字段值映射到组件展示，并补上内置数字键盘的接入能力。

:::tip 使用边界
当传入 `keyboard` 后，组件会内置 `NumberKeyboard`，并在内部管理展开、收起和字段值写回；当显式传入 `keyboard: false` 时，仅表示关闭内置键盘，后续输入流程需要业务自行接管。
:::

## 基础使用

<<< @/zh/demos/password-input/basic.vue

## 禁用内置键盘

<<< @/zh/demos/password-input/disable-keyboard.vue

## 自定义长度

<<< @/zh/demos/password-input/custom-length.vue

## 明文展示

<<< @/zh/demos/password-input/plain-text.vue

## API

### 扩展属性

| 属性名       | 类型                                    | 描述                                     | 默认值  |
| ------------ | --------------------------------------- | ---------------------------------------- | ------- |
| `modelValue` | `string \| number \| null`              | Formily 字段值                           | `-`     |
| `disabled`   | `boolean`                               | 是否禁用；禁用后不再透出 `focus`         | `false` |
| `keyboard`   | `boolean \| PasswordInputKeyboardProps` | 是否启用内置数字键盘，或传入键盘配置对象 | `false` |

### 属性

除了上述扩展属性之外，组件会透传所有Vant组件的属性及事件，详情可参考 [Vant PasswordInput 官方文档](https://vant-ui.github.io/vant/#/zh-CN/password-input)。

### PasswordInputKeyboardProps

可参考[Vant NumberKeyboard 官方文档](https://vant-ui.github.io/vant/#/zh-CN/number-keyboard)
