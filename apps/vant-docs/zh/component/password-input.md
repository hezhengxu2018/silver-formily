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

### 使用约定

- Formily 场景统一使用 `modelValue`，内部会自动映射到 Vant 原生 `value`
- `keyboard` 开启后，组件会自动内置数字键盘，并通过 `update:modelValue` 直接写回字段值
- `keyboard: false` 时只会禁用内置键盘，组件仍会透出 `focus` 事件供外部接管输入
- 内置键盘的展开与收起由组件内部管理，不额外暴露 `show` 之类的可控状态
- `length` 会同时作为密码框位数和内置数字键盘的最大输入长度；输入满位后会自动收起键盘
- `disabled` 会阻止 `focus` 事件继续向外透出，也不会展开内置键盘

### 扩展属性

| 属性名       | 类型                                    | 描述                                     | 默认值  |
| ------------ | --------------------------------------- | ---------------------------------------- | ------- |
| `modelValue` | `string \| number \| null`              | Formily 字段值                           | `-`     |
| `disabled`   | `boolean`                               | 是否禁用；禁用后不再透出 `focus`         | `false` |
| `keyboard`   | `boolean \| PasswordInputKeyboardProps` | 是否启用内置数字键盘，或传入键盘配置对象 | `false` |

### 官方透传属性

以下属性会直接透传给 Vant `PasswordInput`：

| 属性名      | 类型               | 描述                                               | 默认值     |
| ----------- | ------------------ | -------------------------------------------------- | ---------- |
| `info`      | `string`           | 底部说明文案                                       | 官方默认值 |
| `errorInfo` | `string`           | 底部错误提示                                       | 官方默认值 |
| `mask`      | `boolean`          | 是否使用掩码                                       | `true`     |
| `length`    | `number \| string` | 密码位数                                           | `6`        |
| `gutter`    | `number \| string` | 输入框格子间距                                     | 官方默认值 |
| `focused`   | `boolean`          | 是否显示聚焦光标；仅在未启用内置键盘时建议手动控制 | 官方默认值 |

### PasswordInputKeyboardProps

开启 `keyboard` 后，可通过配置对象透传以下 Vant `NumberKeyboard` 属性：

| 属性名                | 类型                           | 描述                | 默认值     |
| --------------------- | ------------------------------ | ------------------- | ---------- |
| `title`               | `string`                       | 键盘标题            | 官方默认值 |
| `theme`               | ^[enum]`'default' \| 'custom'` | 键盘主题            | 官方默认值 |
| `teleport`            | `any`                          | Teleport 目标       | 官方默认值 |
| `zIndex`              | `number \| string`             | 层级                | 官方默认值 |
| `transition`          | `boolean`                      | 是否启用过渡        | 官方默认值 |
| `blurOnClose`         | `boolean`                      | 关闭时是否触发 blur | 官方默认值 |
| `showDeleteKey`       | `boolean`                      | 是否展示删除键      | 官方默认值 |
| `randomKeyOrder`      | `boolean`                      | 是否随机键位        | 官方默认值 |
| `closeButtonText`     | `string`                       | 关闭按钮文案        | 官方默认值 |
| `deleteButtonText`    | `string`                       | 删除按钮文案        | 官方默认值 |
| `closeButtonLoading`  | `boolean`                      | 关闭按钮加载态      | 官方默认值 |
| `hideOnClickOutside`  | `boolean`                      | 点击外部是否收起    | 官方默认值 |
| `safeAreaInsetBottom` | `boolean`                      | 是否适配底部安全区  | 官方默认值 |
| `extraKey`            | `string \| string[]`           | 自定义额外按键      | 官方默认值 |

### Events

| 事件名              | 描述                         | 回调参数                                 |
| ------------------- | ---------------------------- | ---------------------------------------- |
| `update:modelValue` | 内置键盘输入后触发字段值更新 | ^[Function]`(value: string) => void`     |
| `focus`             | 点击密码框时触发             | ^[Function]`(event: TouchEvent) => void` |
| `input`             | 内置键盘输入单个字符时触发   | ^[Function]`(value: string) => void`     |
| `delete`            | 内置键盘点击删除时触发       | ^[Function]`() => void`                  |
| `blur`              | 内置键盘失焦收起时触发       | ^[Function]`() => void`                  |
| `close`             | 内置键盘点击关闭时触发       | ^[Function]`() => void`                  |
| `show`              | 内置键盘展开后触发           | ^[Function]`() => void`                  |
| `hide`              | 内置键盘收起后触发           | ^[Function]`() => void`                  |

### 参考

属性命名与展示行为主要参考 [Vant PasswordInput 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/password-input)。
