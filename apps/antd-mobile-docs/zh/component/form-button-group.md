---
mobileDemo: form-button-group/index.tsx
---

# FormButtonGroup

> 移动端表单按钮布局容器，支持纵向、横向等宽、紧凑连体三种布局。

## 纵向布局

默认纵向排列。Submit 默认 `block`。

<<< @/zh/demos/form-button-group/vertical.tsx

## 横向等宽

横向布局下，直接渲染的按钮等分可用宽度，`gap` 控制间距。

<<< @/zh/demos/form-button-group/horizontal.tsx

## 紧凑连体

compact 使用原生 antd-mobile Button，无间距、等宽，默认直角；开启 `shape="rounded"` 后首尾按钮保留外侧圆角；Submit 的提交行为与其他布局一致。

<<< @/zh/demos/form-button-group/compact.tsx

## 紧凑布局统一圆角

在按钮组上同时设置 `layout="compact"` 和 `shape="rounded"`，即可统一按钮形状：首尾保留外侧圆角，中间连接处保持直角。

<<< @/zh/demos/form-button-group/compact-rounded.tsx

## 按钮形状

默认直角。

<<< @/zh/demos/form-button-group/rounded.tsx

## 滚动吸底

底部 Sticky 内的按钮组默认开启底部安全区。启用时页面需配置 `viewport-fit=cover`。

<<< @/zh/demos/form-button-group/sticky.tsx

## API

| 属性                | 类型                                      | 默认值                                  | 说明                                     |
| ------------------- | ----------------------------------------- | --------------------------------------- | ---------------------------------------- |
| shape               | `'default' \| 'rounded' \| 'rectangular'` | 未设置                                  | 优先覆盖子按钮形状，未设置时按钮默认直角 |
| layout              | `'vertical' \| 'horizontal' \| 'compact'` | `'vertical'`                            | 布局模式                                 |
| gap                 | `number \| string`                        | `12`                                    | 纵向/横向间距，数字按 px 处理            |
| inset               | `boolean`                                 | `true`                                  | 上 12px、左右 16px、下 16px 留白         |
| safeAreaInsetBottom | `boolean`                                 | 底部 Sticky 内为 `true`，其他为 `false` | 所有布局均支持；显式设置优先             |

支持 `className`、`style`、children、ARIA、data 属性和常规 div 事件。布局针对直接渲染的按钮元素；自定义组件应直接返回按钮，避免额外宽度包装。

### FormButtonGroup.Sticky

| 属性         | 类型                | 默认值                          | 说明                                   |
| ------------ | ------------------- | ------------------------------- | -------------------------------------- |
| position     | `'top' \| 'bottom'` | `'bottom'`                      | 吸附方向                               |
| offsetTop    | `number \| string`  | `0`                             | 顶部偏移，支持 px、rem、vh 等 CSS 长度 |
| offsetBottom | `number \| string`  | `0`                             | 底部偏移                               |
| container    | `HTMLElement`       | 最近 form / FormLayout / 父元素 | 限制吸附范围的容器                     |
| zIndex       | `number \| string`  | —                               | 固定内容的层级                         |
