---
mobileDemo: reset/index.tsx
---

# Reset

> `Reset` 是重置按钮，基于 antd-mobile `Button` 实现。点击时将表单重置回 `initialValues`。

## 基础使用

<<< @/zh/demos/reset/basic.tsx

## 强制清空

`forceClear` 会清空到空值而非初始值；`validate` 控制重置后是否触发校验。

<<< @/zh/demos/reset/force-clear.tsx

## API

### 属性

| 属性名                   | 类型                                              | 描述                              | 默认值  |
| ------------------------ | ------------------------------------------------- | --------------------------------- | ------- |
| `forceClear`             | ^[boolean]                                        | 是否强制清空到空值                | `false` |
| `validate`               | ^[boolean]                                        | 重置后是否触发校验                | -       |
| `onResetValidateSuccess` | ^[Function]`(payload: any) => void`               | 重置校验成功回调                  | -       |
| `onResetValidateFailed`  | ^[Function]`(feedbacks: IFormFeedback[]) => void` | 重置校验失败回调                  | -       |
| `onClick`                | ^[Function]`(e: MouseEvent) => any`               | 点击回调，返回 `false` 可阻止重置 | -       |

继承 antd-mobile `Button` 的所有配置项（`color`、`size`、`block`、`disabled` 等），请参考 [Button 官方文档](https://mobile.ant.design/zh/components/button)。

### 按钮组配置

在 FormButtonGroup 内，Reset 默认满宽、直角，显式 `block={false}` 可使用内容宽度。形状优先级为 **按钮组显式 shape → Reset 自身 shape → rectangular**，经过自定义组件或 Formily 字段包装后同样有效。

独立使用 Reset 时，保留 antd-mobile Button 的默认宽度和形状。
