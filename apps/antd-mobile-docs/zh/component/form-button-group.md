---
mobileDemo: form-button-group/index.tsx
---

# FormButtonGroup

移动端表单按钮布局容器，支持纵向、横向等宽、紧凑连体三种布局。不会像 Space 一样为按钮添加收缩宽度的包装，默认 Submit 可以撑满内容区。

## 纵向布局

默认纵向排列。Submit 默认 `block`，按钮组内的 Reset 及直接传入的 antd-mobile Button 也默认满宽；显式 `block={false}` 可使用内容宽度。Submit、Reset 通过上下文读取按钮组配置，经过自定义组件或 Formily 字段包装后仍可继承。自定义组件包装原生 antd-mobile Button 时需自行传递配置。

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

默认直角（`rectangular`）。设置 `FormButtonGroup shape="rounded"` 可统一开启圆角，或通过 Submit、Reset 的同名属性单独设置。按钮组内的优先级为 **按钮组显式 shape → 按钮自身 shape → rectangular**，按钮组未设置 shape 时不会覆盖子按钮的配置。嵌套按钮组使用最近一层的配置。

<<< @/zh/demos/form-button-group/rounded.tsx

## 滚动吸底

Sticky 只负责定位，布局与安全区由内部 FormButtonGroup 控制。默认以最近原生 `form` 为边界，其次取最近 FormLayout；没有这两者时取 Sticky 的直接父元素（请确保它包裹整段表单）。也可显式传入 `container`。FormProvider 不提供 DOM 边界。

使用 Floating UI 的 `computePosition` / `autoUpdate` 处理定位与滚动、尺寸、布局变化，用 IntersectionObserver 判断表单是否真正可见（包括滚动祖先裁剪）。表单尚未进入视口、被完全裁剪或已经离开时，不会显示悬浮操作栏。

吸底以浏览器视口为基准：按钮原位置位于视口下方且边界容器进入视口时固定；滚动到原位置后恢复普通布局。它不是始终显示的 fixed 操作栏，也不等同于 CSS `position: sticky`。嵌套滚动容器滚动时会重新测量，但不会改为吸附到该容器底边。

底部 Sticky 内的按钮组默认开启底部安全区，纵向、横向和紧凑布局均生效；可通过 `safeAreaInsetBottom={false}` 显式关闭。普通按钮组和顶部 Sticky 默认关闭，也可显式开启。安全区在恢复普通布局后仍保留，避免吸附切换时高度变化；有默认留白时在其基础上叠加。页面需配置 `viewport-fit=cover`，实际留白由 `env(safe-area-inset-bottom)` 决定，没有安全区的设备不增加额外空间。

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

支持常规 div 属性；`style`、`className` 应用于占位根节点。背景默认使用 `--adm-color-background`，可在祖先上设置该主题变量。固定定位遵循浏览器规则，应避免在带有 transform、filter 或 containment 的祖先内使用；此类祖先会改变 fixed 的参照系。
