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

`labelWidth`、`labelAlign` 可覆盖 `FormLayout` 下发的布局。下面用户名继承 80px、左对齐；地址覆盖为 120px、右对齐；备注使用 120px、左对齐，并展示点击提示。输入框初始为空，可通过 placeholder 对照控件的起始位置。

横向布局中，`labelWidth` 控制标签列的内容宽度，标签与控件间另保留 20px 间距；百分比只相对于列表项内容区域计算一次。右对齐保持文字在前、提示图标在后。

<<< @/zh/demos/form-item/label.tsx

## 长文本：省略与换行

标签默认单行显示，超出 `labelWidth` 时省略；点击带虚线的标签可查看全文。设置 `labelWrap` 后，标签在固定宽度内完整换行。`wrapperWrap` 用于控件区域的文本换行，下面以阅读状态展示包含换行符和连续英文的内容。

<<< @/zh/demos/form-item/long-text.tsx

## 禁用与只读

通过字段的 `pattern="disabled"` 禁用输入；同时设置装饰器 `disabled` 可将整行置为禁用样式。仅设置 FormItem 的 `disabled` 不会改变字段状态。`pattern="readOnly"` 保留输入框但不可编辑，`pattern="readPretty"` 则展示为纯文本。

<<< @/zh/demos/form-item/states.tsx

## 垂直布局

`FormLayout layout="vertical"` 为整组表单项设置上下布局；单个 FormItem 也能用 `layout` 覆盖。多行输入和较长的问题说明适合这一布局。

<<< @/zh/demos/form-item/vertical.tsx

## 提示说明

默认点击图标显示 `tooltip`，`tooltipLayout="text"` 改为点击标签文字触发。可以用 `tooltipIcon` 自定义提示图标。长说明和连续链接都会在手机视口内换行。

<<< @/zh/demos/form-item/tooltip.tsx

## 外观与控件布局

`bordered={false}` 隐藏当前行顶部分隔线；`wrapperWidth` 与 `wrapperAlign` 配合控制输入区的宽度和位置。控件内部文字对齐通过控件自身属性设置。`label={null}` 可隐藏标签而保留整行输入区域。

<<< @/zh/demos/form-item/appearance.tsx

## 箭头与清除按钮

控件区内存在带 `data-form-item-trigger` 属性的入口时，自动显示右侧箭头，适用于 Picker、DatePicker、CascadePicker 及自定义控件。挂载后检测一次入口，不监听后续 DOM 变化；嵌套 FormItem 的入口只影响其自身。禁用态保留箭头，纯预览无入口时不自动显示。显式 `arrow` / `arrowIcon` 配置优先，例如 `arrowIcon: false` 可隐藏箭头。

设置 `decorator={[FormItem, { clearable: true }]}` 后，字段为空时显示箭头，有值时切换为清除按钮。点击清除会将字段值设为 `undefined`，并触发字段输入流程；不会触发行点击或打开选择器。禁用、只读和阅读态不显示清除按钮。

显式传入 `arrowIcon` 时优先使用自定义内容，包括 `null` 和 `false`。`clearable` 默认关闭。

独立使用 `FormItem.BaseItem` 时，通过 `value` 和 `onClear` 提供受控值及清除处理；作为字段装饰器使用时由 Formily 自动提供，`onClear` 可用作清除后的通知。

## API

### 属性

| 属性名          | 类型                                | 描述                                             | 默认值   |
| --------------- | ----------------------------------- | ------------------------------------------------ | -------- |
| `clearable`     | ^[boolean]                          | 自动切换箭头与清除按钮                           | `false`  |
| `value`         | ^[unknown]                          | BaseItem 的受控值，装饰器自动读取字段值          | -        |
| `onClear`       | ^[() => void]                       | 清除回调                                         | -        |
| `label`         | ^[ReactNode]                        | 标签内容                                         | -        |
| `labelStyle`    | ^[CSSProperties]                    | 标签样式                                         | -        |
| `colon`         | ^[boolean]                          | 是否在标签后显示英文冒号，优先于 FormLayout 配置 | `false`  |
| `labelAlign`    | ^[enum]`'left' \| 'right'`          | 标签文本对齐方式                                 | -        |
| `labelWrap`     | ^[boolean]                          | 标签内容超长时是否换行                           | `false`  |
| `labelWidth`    | ^[number \| string]                 | 标签宽度                                         | -        |
| `wrapperWidth`  | ^[number \| string]                 | 控件宽度                                         | -        |
| `wrapperAlign`  | ^[enum]`'left' \| 'right'`          | 控件内容对齐方式                                 | -        |
| `wrapperWrap`   | ^[boolean]                          | 控件内容超长时是否换行                           | `false`  |
| `wrapperStyle`  | ^[CSSProperties]                    | 控件样式                                         | -        |
| `help`          | ^[ReactNode]                        | 帮助文案                                         | -        |
| `extra`         | ^[ReactNode]                        | 右侧补充内容                                     | -        |
| `required`      | ^[boolean]                          | 必填星号标记                                     | `false`  |
| `asterisk`      | ^[boolean]                          | 是否显示星号（优先于 required 推导）             | -        |
| `tooltip`       | ^[ReactNode]                        | 问号提示内容                                     | -        |
| `tooltipLayout` | ^[enum]`'icon' \| 'text'`           | 问号提示布局                                     | `'icon'` |
| `tooltipIcon`   | ^[ReactNode]                        | 自定义问号图标                                   | -        |
| `disabled`      | ^[boolean]                          | 原生列表项禁用交互（不改变字段 pattern）         | `false`  |
| `layout`        | ^[enum]`'vertical' \| 'horizontal'` | 布局模式                                         | -        |
| `bordered`      | ^[boolean]                          | 是否显示边框                                     | -        |
| `gridSpan`      | ^[number]                           | 栅格占位数（配合 FormGrid）                      | -        |

继承 antd-mobile `List.Item` 中除 `title`、`prefix`、`description` 以外的配置项（这些区域由装饰器管理），包括 `onClick`、`clickable`、`arrowIcon`、`disabled`、`tabIndex`、`aria-*`、`data-*` 和 CSS 变量，请参考 [List.Item 官方文档](https://mobile.ant.design/zh/components/list)。

## 映射与布局规则

- 显式 `label`、`extra` 优先于字段推导，只有 `undefined` 才回退；可用 `null` 或空字符串隐藏文案。
- `asterisk` 优先于 `required` 和字段必填状态，因此 `asterisk={false}` 可隐藏必填星号；读取态默认隐藏星号，仍允许显式开启。
- 校验由字段的 `required`、`validator` 配置驱动，校验错误自动显示在控件下方，无需手动配置反馈状态或文案。
- `help` 是常驻帮助，位于校验反馈之后。`extra` 位于右侧，默认使用字段 `description`。
- 标签提示使用点击触发，默认向上并与触发元素起点对齐（`top-start`），空间不足时自动调整；气泡宽度不超过 320px 或视口宽度减去 24px，长文本及 URL 自动换行。标签截断时展示完整标签，文本变化和容器缩放后自动重新检测。`labelWrap` 开启时优先换行。
- `bordered={false}` 移除列表项分隔线。需要自定义外观时使用 `style`、`labelStyle`、`wrapperStyle`，输入控件自身样式通过组件属性设置。
- `FormItem.BaseItem`（也可直接导入 `BaseItem`）只负责展示，不读取字段；可独立传入 `required`、标签和帮助文案。

## 迁移说明

本次接口收敛为破坏性变更：删除原本未生效的 `hasFeedback`、`noStyle`、`hidden` 和内部标记 `__layout__`。通过 Formily 字段的 `display`、`pattern` 管理可见性和编辑状态；不需要装饰器时直接省略 `decorator`。

不再接受原生 `title`、`prefix`、`description`，分别使用 `label`、`help` 或 `extra` 表达装饰器内容。显式属性改为优先于字段推导，空值不会再被字段标题或描述覆盖。

移除封装层的 `size`、`inset`、`feedbackIcon`、`feedbackLayout`，以及 FormLayout 对应的布局配置。这些并非 antd-mobile 原生 FormItem 属性。表单项不再提供尺寸分档、内嵌外框、独立反馈图标或反馈气泡布局，校验错误由字段自动映射展示。标签说明的 `tooltip`、`tooltipIcon`、`tooltipLayout` 继续支持。
