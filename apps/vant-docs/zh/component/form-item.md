---
mobileDemo: form-item/index.vue
---

# FormItem

> `FormItem` 是当前 Vant 封装里的装饰器组件，负责承接参考 `VanField` 设计的展示、布局和反馈层能力。

:::tip 提示
Vant 并没有单独的 `FormItem` 组件，官方是把“表单项壳层”和“文本输入”统一放进 `Field` 里。这里拆成 `FormItem + Input`，是为了继续保持 Formily 的 `decorator + component` 心智。
:::

## 基础使用

<<< @/zh/demos/form-item/basic.vue

## 直接使用

<<< @/zh/demos/form-item/manual-feedback.vue

## 边框与说明

<<< @/zh/demos/form-item/border-extra.vue

## API

### 使用约定

- `title` 会自动映射到 `label`
- `description` 会自动映射到 `extra`
- `extra` 属性会作为表单项下方的独立说明区域渲染
- `extra` 插槽仍然保持与 Vant `Field` 接近的布局语义
- `extra` 属性和 `extra` 插槽互不影响，可以同时存在
- `field.required`、`field.validateStatus`、`field.selfErrors` 等字段状态会自动映射到当前 `FormItem` 壳层
- `clearable`、`showWordLimit`、`leftIcon` 这类输入增强属性请写在 `Input` 上，由 `FormItem` 内部读取并消费
- `tag`、`titleStyle`、`valueClass`、`clickable` 这类更偏布局和展示层的属性，建议写在 `FormItem` 上

### FormItem 封装属性

| 属性名           | 类型                                                    | 描述                                             | 默认值                                             |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| `label`          | `string` \| `number` \| `VNode`                         | 左侧标签内容；未传时优先读取 `field.title`       | `field.title`                                      |
| `extra`          | `string` \| `number` \| `VNode`                         | 额外说明内容；未传时优先读取 `field.description` | `field.description`                                |
| `feedbackStatus` | ^[enum]`'error' \| 'warning' \| 'success' \| 'pending'` | 手动覆盖反馈状态                                 | `field.validateStatus`                             |
| `feedbackText`   | `string` \| `number` \| `VNode`                         | 手动覆盖底部反馈文案                             | 自动读取字段反馈                                   |
| `asterisk`       | `boolean`                                               | 手动控制必填星号展示                             | `field.required && field.pattern !== 'readPretty'` |

### FormItem 展示与布局属性

| 属性名              | 类型                                                         | 描述                                                   | 默认值                     |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------ | -------------------------- |
| `tag`               | `keyof HTMLElementTagNameMap`                                | 根节点标签名                                           | `'div'`                    |
| `required`          | `boolean`                                                    | 是否显示必填态                                         | `field.required`           |
| `colon`             | `boolean`                                                    | 是否在标签后显示冒号                                   | `-`                        |
| `size`              | ^[enum]`'normal' \| 'large'`                                 | 表单项尺寸                                             | `-`                        |
| `border`            | `boolean`                                                    | 是否显示内边框                                         | `true`                     |
| `center`            | `boolean`                                                    | 是否让内容垂直居中                                     | `false`                    |
| `labelWidth`        | `number` \| `string`                                         | 左侧标签宽度                                           | `-`                        |
| `labelAlign`        | ^[enum]`'left' \| 'center' \| 'right' \| 'top'`              | 标签对齐方式                                           | `-`                        |
| `labelClass`        | `string` \| `string[]` \| ^[object]`Record<string, boolean>` | 标签区域额外类名                                       | `-`                        |
| `titleClass`        | `string` \| `string[]` \| ^[object]`Record<string, boolean>` | 标题区域额外类名                                       | `-`                        |
| `titleStyle`        | `string` \| ^[object]`CSSProperties`                         | 标题区域样式                                           | `-`                        |
| `valueClass`        | `string` \| `string[]` \| ^[object]`Record<string, boolean>` | 内容区域额外类名                                       | `-`                        |
| `error`             | `boolean`                                                    | 手动指定错误态；也会被 `feedbackStatus` 的推导结果覆盖 | 根据字段状态与反馈配置推导 |
| `errorMessage`      | `string`                                                     | 手动指定错误文案；也会被 `feedbackText` 的推导结果覆盖 | 根据字段状态与反馈配置推导 |
| `errorMessageAlign` | ^[enum]`'left' \| 'center' \| 'right' \| 'top'`              | 底部错误文案对齐方式                                   | `-`                        |
| `clickable`         | `boolean` \| `null`                                          | 是否开启点击反馈                                       | 未传时跟随 `isLink`        |
| `isLink`            | `boolean`                                                    | 是否展示右侧箭头并开启链接态样式                       | `false`                    |
| `arrowDirection`    | ^[enum]`'left' \| 'right' \| 'up' \| 'down'`                 | 右侧箭头方向，仅在 `isLink` 为 `true` 时有明显视觉效果 | `-`                        |

### FormItem Slots

| 插槽名          | 描述                               | 插槽参数                       |
| --------------- | ---------------------------------- | ------------------------------ |
| `default`       | 默认内容，会被放进表单项内容区域   | `-`                            |
| `input`         | 自定义输入区域，优先级高于默认插槽 | `-`                            |
| `label`         | 自定义标签区域                     | `-`                            |
| `extra`         | 自定义额外说明区域                 | `-`                            |
| `button`        | 自定义右侧按钮区域                 | `-`                            |
| `left-icon`     | 自定义左侧图标区域                 | `-`                            |
| `right-icon`    | 自定义右侧图标区域                 | `-`                            |
| `error-message` | 自定义底部反馈区域                 | ^[object]`{ message: string }` |

### FormItem.BaseItem

纯展示组件，保留和 `FormItem` 相同的视觉结构与插槽能力，但不会和 Formily `Field` 状态做自动桥接。适合只想复用这套表单项布局壳层、不需要接入字段状态的场景。

### 参考

属性命名、布局能力和默认值主要参考 [Vant Field 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/field)。
