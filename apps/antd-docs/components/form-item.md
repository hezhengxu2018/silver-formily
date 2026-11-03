# FormItem

> 全新的 FormItem 组件，相比于 Antd 的 FormItem，它支持的功能更多，同时它的定位是纯样式组件，不管理表单状态，所以也会更轻量，更方便定制

::: warning 特别说明：与官方实现的差异

- 已移除上游的 inset 内嵌布局配置，不再将标签与控件绘制在共享外框中。

- 当前重写了样式与 DOM 层级：内部 class 为 sf-item-\*；wrapperWidth / wrapperStyle 作用于整个 control 容器，旧的覆盖 CSS 不能直接沿用。

- 显式 label、extra、feedbackText（包括空字符串或 null）优先于字段值；asterisk=false 可以隐藏必填星号；显式反馈状态优先于字段状态。

- 标签自动关联本包输入控件；溢出时通过 ResizeObserver 重新测量。error / warning 与尺寸通过内部上下文传给本包控件；外观通过 Ant Design ConfigProvider 的 variant 传递，自定义控件需要自行适配。

- 未完整保留官方反馈动画、Popover 状态图标及所有 hover / focus / success 边框细节；feedbackStatus / feedbackLayout 也不接受自定义字符串扩展。

- 自动反馈消息改为字符串 join(', ')；依赖 ReactNode 消息数组的自定义用法可能不同。纵向布局固定左对齐。

:::

## Markup Schema 案例

:::demo
form-item/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
form-item/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
form-item/jsx.tsx
:::

## 常用属性案例

::: tip 示例适配说明
本例保留官方常用属性的展示。当前 Select 默认宽度 100%，所以“默认不撑满”和“撑满”的两行可能外观相同；这与官方示例的对比效果不同。
:::

:::demo
form-item/common-props.tsx
:::

## 必填样式

:::demo
form-item/required-mark.tsx
:::

## 四种原生外观

使用 Ant Design 6 的 `variant`：`outlined`（描边）、`filled`（填充）、`borderless`（无边框）、`underlined`（下划线）。可通过 Form / FormLayout 统一配置，通过 FormItem 覆盖局部默认值，或在控件上直接指定；控件属性优先。

::: tip 从旧配置迁移
已删除 FormItem / FormLayout 的 `bordered` 配置。原来的 `bordered={false}` 改为 `variant="borderless"`。Schema 中可将 `x-decorator-props.variant` 设为 `'borderless'`，也可通过 `x-component-props` 配置原生控件。这里直接使用 Ant Design 的外观与聚焦样式，不再额外绘制无边框样式。
:::

:::demo
form-item/variants.tsx
:::

## 反馈信息定制案例

可通过 `feedbackIcon` 传入指定反馈的按钮

::: tip 示例适配说明
仅保留已迁移控件的反馈案例；弹出模式没有复刻官方的状态图标和动画。
:::

:::demo
form-item/custom-feedback.tsx
:::

## 尺寸控制案例

::: tip 示例适配说明
尺寸联动逻辑沿用官方示例；用于切换尺寸的 Radio.Group 改用本次已有的 Select，并去除未迁移控件。
:::

:::demo
form-item/size-control.tsx
:::

## API

### FormItem

通过 `connect + mapProps` 从字段读取标题、描述、必填状态和校验反馈；只有未显式设置的属性才使用字段或布局默认值。

| 属性                            | 类型                                                      | 默认值                                | 说明                                                                   |
| ------------------------------- | --------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| `label`                         | `ReactNode`                                               | `field.title`                         | 标签；空字符串、null、false 可隐藏标签，0 可显示。                     |
| `labelFor`                      | `string`                                                  | 自动生成                              | 关联输入控件 ID；优先使用显式 labelFor，其次字段 componentProps.id。   |
| `colon`                         | `boolean`                                                 | 继承布局，最终 `true`                 | 显示冒号。                                                             |
| `layout`                        | `'horizontal' \| 'vertical' \| 'inline'`                  | 继承布局，最终 `'horizontal'`         | 表单项布局。                                                           |
| `labelAlign`                    | `'left' \| 'right'`                                       | 横向 `right`                          | 标签对齐；当前纵向布局固定左对齐。                                     |
| `wrapperAlign`                  | `'left' \| 'right'`                                       | `'left'`                              | 控件内容对齐。                                                         |
| `labelWidth / wrapperWidth`     | `number \| string`                                        | —                                     | 标签列 / 整个 control 容器宽度，支持 CSS 长度。                        |
| `labelCol / wrapperCol`         | `number`                                                  | —                                     | 24 列体系中的占比；未配置固定宽度且非纵向时生效。                      |
| `labelWrap / wrapperWrap`       | `boolean`                                                 | —                                     | 标签换行 / 控件内容换行。                                              |
| `labelStyle / wrapperStyle`     | `CSSProperties`                                           | —                                     | 标签列样式 / 整个 control 容器样式。                                   |
| `tooltip`                       | `ReactNode \| TooltipProps`                               | —                                     | 提示内容或 Ant Design 6 Tooltip 配置。                                 |
| `tooltipLayout`                 | `'icon' \| 'text'`                                        | 继承布局，最终 `'icon'`               | 通过图标或标签文本触发提示。                                           |
| `tooltipIcon`                   | `ReactNode`                                               | 问号图标                              | 图标触发模式的图标；可继承布局。                                       |
| `getPopupContainer`             | `(node: HTMLElement) => HTMLElement`                      | Ant Design 默认值                     | 标签 Tooltip / 反馈 Popover 的弹出容器。                               |
| `asterisk`                      | `boolean`                                                 | 字段必填且非阅读态                    | 是否显示必填星号；最终还受 FormLayout.requiredMark 控制。              |
| `optionalMarkHidden`            | `boolean`                                                 | 阅读态通常为 `true`                   | 隐藏 optional 标记。                                                   |
| `extra`                         | `ReactNode`                                               | `field.description`                   | 控件下方的补充说明。                                                   |
| `feedbackStatus`                | `'error' \| 'warning' \| 'success' \| 'pending'`          | 由字段状态计算                        | 显式设置时优先于字段状态。                                             |
| `feedbackText`                  | `ReactNode`                                               | 字段错误 / 警告 / 成功消息            | 显式设置时优先；自动消息使用字符串拼接。                               |
| `feedbackLayout`                | `'loose' \| 'terse' \| 'popover' \| 'none'`               | 继承布局，最终 `'loose'`              | 松散、紧凑、弹出或隐藏反馈。                                           |
| `feedbackIcon`                  | `ReactNode`                                               | —                                     | 自定义反馈图标，并启用外层反馈边框。                                   |
| `enableOutlineFeedback`         | `boolean`                                                 | `true`                                | 将 error / warning 状态传给已迁移控件，并控制图标边框反馈。            |
| `fullness`                      | `boolean`                                                 | 继承布局                              | 让第一个控件填满可用宽度。                                             |
| `variant`                       | `ConfigProviderProps['variant']`                          | 继承 Ant Design 配置，最终 `outlined` | 原生 outlined、filled、borderless、underlined；显式控件 variant 优先。 |
| `size`                          | `'small' \| 'medium' \| 'large' \| 'default' \| 'middle'` | 继承布局                              | default、middle 在向控件传递时转换为 medium。                          |
| `addonBefore / addonAfter`      | `ReactNode`                                               | —                                     | 控件前 / 后附加内容。                                                  |
| `gridSpan`                      | `number`                                                  | —                                     | 通过 data-grid-span 配合 FormGrid 跨列；-1 填满当前行剩余列。          |
| `prefixCls / className / style` | `string / string / CSSProperties`                         | —                                     | 根 class 前缀、额外 class 和样式；内部样式使用 sf-item-\*。            |
| `children`                      | `ReactNode`                                               | —                                     | 控件内容；data-_、aria-_ 运行时透传至根节点。                          |

### FormItem.BaseItem / BaseItem

接收同一组 `IFormItemProps`，读取布局配置并渲染布局，但不读取字段标题、描述或校验状态。适合自行控制标签和反馈；也可从包入口单独导入 `BaseItem`。

## 文档来源

介绍与原例来自 [Alibaba Formily FormItem 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/FormItem.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
