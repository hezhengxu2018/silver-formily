---
mobileDemo: form-layout/index.tsx
---

# FormLayout

> `FormLayout` 是表单布局容器，基于 antd-mobile 的 `List` 实现，负责统一下发表单项的布局配置。

## 基础使用

<<< @/zh/demos/form-layout/basic.tsx

## 垂直布局

通过 `layout="vertical"` 让标签与控件上下排布，更适合窄屏与长文案场景。

<<< @/zh/demos/form-layout/vertical.tsx

## 标签冒号

设置 `colon` 后，内部表单项会在标签末尾显示英文冒号 `:`，默认不显示。下面用户名继承全局配置，地址通过 `decorator={[FormItem, { colon: false }]}` 单独关闭冒号。

<<< @/zh/demos/form-layout/colon.tsx

## 全局配置下发

`colon`、`labelWidth`、`labelAlign`、`tooltipLayout` 等属性会批量下发给内部的 `FormItem`，无需逐个重复声明。

<<< @/zh/demos/form-layout/settings.tsx

## API

### 属性

| 属性名          | 类型                                | 描述                                         | 默认值         |
| --------------- | ----------------------------------- | -------------------------------------------- | -------------- |
| `layout`        | ^[enum]`'vertical' \| 'horizontal'` | 布局模式                                     | `'horizontal'` |
| `colon`         | ^[boolean]                          | 是否在标签后显示英文冒号，可由 FormItem 覆盖 | `false`        |
| `labelAlign`    | ^[enum]`'right' \| 'left'`          | 标签文本对齐方式                             | -              |
| `labelWrap`     | ^[boolean]                          | 标签内容超长时是否换行                       | `false`        |
| `labelWidth`    | ^[number \| string]                 | 标签宽度                                     | -              |
| `wrapperWidth`  | ^[number \| string]                 | 控件宽度                                     | -              |
| `wrapperAlign`  | ^[enum]`'right' \| 'left'`          | 控件内容对齐方式                             | -              |
| `wrapperWrap`   | ^[boolean]                          | 控件内容超长时是否换行                       | `false`        |
| `bordered`      | ^[boolean]                          | 是否显示边框                                 | -              |
| `shallow`       | ^[boolean]                          | 上下文传递模式，为 true 时仅向下一层传递     | `true`         |
| `tooltipLayout` | ^[enum]`'icon' \| 'text'`           | 问号提示布局                                 | `'icon'`       |

继承 antd-mobile `List` 的所有配置项，请参考 [List 官方文档](https://mobile.ant.design/zh/components/list)。

`FormItem` 的显式配置优先于布局配置。`shallow` 默认为 `true`，表单项内部不继续继承浅层配置；`shallow={false}` 时嵌套表单项也会继承布局。

`labelWidth`、`wrapperWidth` 支持数字（像素）、CSS 长度和 `'auto'`；对齐属性只接受 `'left'` 或 `'right'`，不再接受原本没有响应式实现的数组。边框和标签提示遵循 FormItem 的同名属性语义。

已移除 `size`、`inset`、`feedbackLayout` 配置。校验反馈由 FormItem 在控件下方统一展示。`Space` 不再从 FormLayout 继承 `size`；间距默认 8px，需要调整时在 Space 自身设置 `size`。
