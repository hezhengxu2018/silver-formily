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

## 全局配置下发

`labelWidth`、`labelAlign`、`feedbackLayout`、`size` 等属性会批量下发给内部的 `FormItem`，无需逐个重复声明。

<<< @/zh/demos/form-layout/feedback.tsx

## API

### 属性

| 属性名           | 类型                                                | 描述                                     | 默认值         |
| ---------------- | --------------------------------------------------- | ---------------------------------------- | -------------- |
| `layout`         | ^[enum]`'vertical' \| 'horizontal'`                 | 布局模式                                 | `'horizontal'` |
| `labelAlign`     | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]` | 标签文本对齐方式                         | -              |
| `labelWrap`      | ^[boolean]                                          | 标签内容超长时是否换行                   | `false`        |
| `labelWidth`     | ^[number]                                           | 标签宽度                                 | -              |
| `wrapperAlign`   | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]` | 控件内容对齐方式                         | -              |
| `wrapperWrap`    | ^[boolean]                                          | 控件内容超长时是否换行                   | `false`        |
| `inset`          | ^[boolean]                                          | 是否开启内嵌布局                         | `false`        |
| `bordered`       | ^[boolean]                                          | 是否显示边框                             | -              |
| `shallow`        | ^[boolean]                                          | 上下文传递模式，为 true 时仅向下一层传递 | `false`        |
| `feedbackLayout` | ^[enum]`'loose' \| 'terse' \| 'popover' \| 'none'`  | 反馈文案布局                             | `'loose'`      |
| `tooltipLayout`  | ^[enum]`'icon' \| 'text'`                           | 问号提示布局                             | `'icon'`       |
| `size`           | ^[enum]`'mini' \| 'small' \| 'middle' \| 'large'`   | 尺寸                                     | -              |

继承 antd-mobile `List` 的所有配置项，请参考 [List 官方文档](https://mobile.ant.design/zh/components/list)。
