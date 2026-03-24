---
mobileDemo: reset/index.vue
---

# Reset

> `Reset` 是和 Formily 表单状态打通的 Vant 重置按钮，支持恢复初始值、强制清空、重置后再次校验，以及成功/失败回调。

**使用约定**

- `Reset` 会固定渲染成普通按钮，不参与原生 `submit`
- 默认执行 `form.reset('*', { forceClear })`
- 开启 `validate` 后，会在重置完成后继续调用 `form.validate()`
- 默认会渲染为 `default`、`round`、`block` 按钮，默认文案为 `重置`
- 当表单处于 `submitting` 时，`Reset` 会自动进入 disabled

## 基础重置

<<< @/zh/demos/reset/basic.vue

## 重置后校验

<<< @/zh/demos/reset/validate.vue

## API

### Reset 专属属性

其余按钮属性主要继承自 [Vant Button 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/button)。

| 属性名                   | 类型                                     | 描述                                | 默认值  |
| ------------------------ | ---------------------------------------- | ----------------------------------- | ------- |
| `onClick`                | `(event: MouseEvent) => void \| boolean` | 点击事件，返回 `false` 时会阻止重置 | `-`     |
| `forceClear`             | `boolean`                                | 是否强制清空字段值而不是恢复初始值  | `false` |
| `validate`               | `boolean`                                | 重置后是否继续执行表单校验          | `false` |
| `onResetValidateSuccess` | `(payload: any) => void`                 | 重置后校验成功回调                  | `-`     |
| `onResetValidateFailed`  | `(error: any) => void`                   | 重置后校验失败回调                  | `-`     |

### 与 Form 的配合方式

- `Reset`：恢复表单到初始值
- `Reset forceClear`：强制清空当前字段值
- `Reset validate`：重置后立即重新校验
- `Reset forceClear validate`：适合演示必填项被清空后的失败回调
- `type` / `round` / `block`：都可以显式覆盖默认值
