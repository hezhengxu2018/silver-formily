---
mobileDemo: form-item/index.tsx
---

# FormItem

> `FormItem` 是表单项装饰器，基于 antd-mobile 的 `List.Item` 实现，负责标签、校验反馈与帮助文案的渲染。

在 `Field` 中通过 `decorator={[FormItem]}` 使用。

## 基础使用

通过 `help` 展示常驻帮助文案，`extra` 展示右侧补充内容。

<<< @/zh/demos/form-item/basic.tsx

## 表单校验

配合字段的 `validator` 使用，校验失败时自动展示错误反馈；`required` 标记必填并展示星号。

<<< @/zh/demos/form-item/validation.tsx

## 标签配置

`labelWidth`、`labelAlign` 可覆盖 `FormLayout` 下发的布局；`tooltip` 提供气泡说明，默认以图标形式展示。

<<< @/zh/demos/form-item/label.tsx

## API

### 属性

| 属性名           | 类型                                                    | 描述                                 | 默认值    |
| ---------------- | ------------------------------------------------------- | ------------------------------------ | --------- |
| `label`          | ^[string]                                               | 标签内容                             | -         |
| `labelStyle`     | ^[CSSProperties]                                        | 标签样式                             | -         |
| `labelAlign`     | ^[enum]`'left' \| 'right'`                              | 标签文本对齐方式                     | -         |
| `labelWrap`      | ^[boolean]                                              | 标签内容超长时是否换行               | `false`   |
| `labelWidth`     | ^[number \| string]                                     | 标签宽度                             | -         |
| `wrapperWidth`   | ^[number \| string]                                     | 控件宽度                             | -         |
| `wrapperAlign`   | ^[enum]`'left' \| 'right'`                              | 控件内容对齐方式                     | -         |
| `wrapperWrap`    | ^[boolean]                                              | 控件内容超长时是否换行               | `false`   |
| `wrapperStyle`   | ^[CSSProperties]                                        | 控件样式                             | -         |
| `help`           | ^[string]                                               | 帮助文案                             | -         |
| `extra`          | ^[ReactNode]                                            | 右侧补充内容                         | -         |
| `required`       | ^[boolean]                                              | 必填星号标记                         | `false`   |
| `asterisk`       | ^[boolean]                                              | 是否显示星号（优先于 required 推导） | -         |
| `tooltip`        | ^[ReactNode]                                            | 问号提示内容                         | -         |
| `tooltipLayout`  | ^[enum]`'icon' \| 'text'`                               | 问号提示布局                         | `'icon'`  |
| `tooltipIcon`    | ^[ReactNode]                                            | 自定义问号图标                       | -         |
| `feedbackStatus` | ^[enum]`'error' \| 'warning' \| 'success' \| 'pending'` | 反馈状态                             | -         |
| `feedbackText`   | ^[ReactNode]                                            | 反馈文案                             | -         |
| `feedbackLayout` | ^[enum]`'loose' \| 'terse' \| 'popover' \| 'none'`      | 反馈文案布局                         | `'loose'` |
| `feedbackIcon`   | ^[ReactNode]                                            | 自定义反馈图标                       | -         |
| `hasFeedback`    | ^[boolean]                                              | 是否展示反馈图标                     | `false`   |
| `noStyle`        | ^[boolean]                                              | 无样式模式                           | `false`   |
| `disabled`       | ^[boolean]                                              | 禁用状态                             | `false`   |
| `hidden`         | ^[boolean]                                              | 隐藏状态                             | `false`   |
| `layout`         | ^[enum]`'vertical' \| 'horizontal'`                     | 布局模式                             | -         |
| `size`           | ^[enum]`'mini' \| 'small' \| 'middle' \| 'large'`       | 尺寸                                 | -         |
| `inset`          | ^[boolean]                                              | 内嵌布局                             | `false`   |
| `bordered`       | ^[boolean]                                              | 是否显示边框                         | -         |
| `gridSpan`       | ^[number]                                               | 栅格占位数（配合 FormGrid）          | -         |

继承 antd-mobile `List.Item` 的所有配置项，请参考 [List.Item 官方文档](https://mobile.ant.design/zh/components/list)。
