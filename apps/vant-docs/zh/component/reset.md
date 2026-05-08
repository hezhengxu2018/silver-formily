---
mobileDemo: reset/index.vue
---

# Reset

> `Reset` 是和 Formily 表单状态打通的 Vant 重置按钮，支持恢复初始值、强制清空、重置后再次校验，以及成功/失败回调。

::: tip 提示
从使用习惯上可以把props里的`onResetValidateFailed`的这种回调函数写成事件的形式： `@reset-validate-failed`
:::

## 基础重置

<<< @/zh/demos/reset/basic.vue

## 重置后校验

<<< @/zh/demos/reset/validate.vue

## API

### Reset 专属属性

其余按钮属性主要继承自 [Vant Button 官方文档](https://vant-ui.github.io/vant/#/zh-CN/button)。

| 属性名                   | 类型                                                | 描述                                | 默认值  |
| ------------------------ | --------------------------------------------------- | ----------------------------------- | ------- |
| `onClick`                | ^[Function]`(event: MouseEvent) => void \| boolean` | 点击事件，返回 `false` 时会阻止重置 | `-`     |
| `forceClear`             | `boolean`                                           | 是否强制清空字段值而不是恢复初始值  | `false` |
| `validate`               | `boolean`                                           | 重置后是否继续执行表单校验          | `false` |
| `onResetValidateSuccess` | ^[Function]`(payload: any) => void`                 | 重置后校验成功回调                  | `-`     |
| `onResetValidateFailed`  | ^[Function]`(error: any) => void`                   | 重置后校验失败回调                  | `-`     |
