# FormLayout

> 区块级布局批量控制组件，借助该组件，我们可以轻松的控制被 FormLayout 圈住的所有 FormItem 组件的布局模式

::: warning 特别说明：与官方实现的差异

- 使用 ConfigProvider 同步控件尺寸和方向；default、middle 尺寸转换为 medium；浅层布局中的 colon=false 也可以向深层传播。

- 响应式属性变化会重新计算，动态启停 breakpoints 不会条件调用 hooks；未提供断点时，属性数组取第一项。

- 内部 class 和 inline 布局样式与官方不同；spaceGap、gridColumnGap、gridRowGap 当前仅保留配置，不单独生成间距。

- 已知限制：内层 FormLayout 未设置 layout、labelCol 等响应式属性时，当前产生的 undefined 可能覆盖外层深层配置。嵌套时请显式设置这些值；本页不将其描述成官方等价行为。

:::

## Markup Schema 案例

:::demo
form-layout/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
form-layout/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
form-layout/jsx.tsx
:::

## API

| 属性                                    | 类型                                                      | 默认值                                | 说明                                                                                                  |
| --------------------------------------- | --------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `layout`                                | `布局值 \| 布局值[]`                                      | 表单项最终取 `'horizontal'`           | horizontal、vertical、inline；数组配合 breakpoints 使用。                                             |
| `labelAlign / wrapperAlign`             | `'left' \| 'right' \| 对齐值[]`                           | 由表单项决定                          | 标签和控件对齐，可按断点设置。                                                                        |
| `labelCol / wrapperCol`                 | `number \| number[]`                                      | —                                     | 24 列体系中的占比，可按断点设置。                                                                     |
| `labelWidth / wrapperWidth`             | `number \| string`                                        | —                                     | 标签与 control 容器的固定宽度。                                                                       |
| `breakpoints`                           | `number[]`                                                | —                                     | 升序的容器宽度断点；N 个断点通常对应 N+1 个属性值。                                                   |
| `shallow`                               | `boolean`                                                 | `true`                                | true 影响当前层级；false 将配置写入深层布局上下文。size、colon 在浅层模式下仍会写入深层配置。         |
| `colon`                                 | `boolean`                                                 | 表单项最终取 `true`                   | 标签冒号；false 可向深层传播。                                                                        |
| `requiredMark`                          | `boolean \| 'optional'`                                   | 表单项最终取 `true`                   | true 显示必填星号；false 隐藏；optional 显示选填标记。                                                |
| `labelWrap / wrapperWrap`               | `boolean`                                                 | —                                     | 标签 / 控件内容是否换行。                                                                             |
| `fullness`                              | `boolean`                                                 | —                                     | 表单项铺满默认配置。                                                                                  |
| `size`                                  | `'small' \| 'medium' \| 'large' \| 'default' \| 'middle'` | —                                     | 向控件上下文与 ConfigProvider 传递尺寸。                                                              |
| `direction`                             | `'ltr' \| 'rtl'`                                          | 继承 ConfigProvider                   | 文字和控件方向。                                                                                      |
| `tooltipLayout / tooltipIcon`           | `'icon' \| 'text' / ReactNode`                            | —                                     | 表单项提示默认配置。                                                                                  |
| `feedbackLayout`                        | `'loose' \| 'terse' \| 'popover' \| 'none'`               | —                                     | 表单项反馈布局默认值。                                                                                |
| `spaceGap / gridColumnGap / gridRowGap` | `number`                                                  | —                                     | 当前仅保留类型和上下文值；本次没有对应 Space / FormGrid 封装消费，不直接产生间距。                    |
| `className / style`                     | `string / CSSProperties`                                  | —                                     | 根节点额外 class 和样式。                                                                             |
| `children`                              | `ReactNode`                                               | —                                     | 布局内的表单项。                                                                                      |
| `ref`                                   | `Ref<HTMLDivElement>`                                     | —                                     | 当前外层 div；供 Form 提供 Sticky 边界，也可以读取根节点。                                            |
| `variant`                               | `ConfigProviderProps['variant']`                          | 继承 Ant Design 配置，最终 `outlined` | 通过原生 ConfigProvider 设置 outlined、filled、borderless、underlined，嵌套区域和显式控件属性可覆盖。 |

### 布局 hooks

`useFormLayout()` 合并深层与浅层配置；`useFormDeepLayout()`、`useFormShallowLayout()` 分别读取对应上下文，可能返回 null。三者既可从包入口导入，也可通过 `FormLayout` 同名静态方法调用。

## 文档来源

介绍与原例来自 [Alibaba Formily FormLayout 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/FormLayout.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。

## 样式命名与迁移

封装组件使用固定的 `silver-formily-` BEM 类名，与 antd 的 `ConfigProvider.prefixCls` 独立。主题仍通过 antd token 继承。

| 组件                   | Block                                     |
| ---------------------- | ----------------------------------------- |
| FormItem               | `silver-formily-form-item`                |
| FormLayout             | `silver-formily-form-layout`              |
| FormGrid               | `silver-formily-form-grid`                |
| FormButtonGroup        | `silver-formily-form-button-group`        |
| FormButtonGroup.Sticky | `silver-formily-form-button-group-sticky` |
| PreviewText            | `silver-formily-preview-text`             |

元素使用 `__`，布尔修饰符使用 `--`，枚举修饰符使用 `--名称_值`，例如 `silver-formily-form-item__label`、`silver-formily-form-item--label-wrap`、`silver-formily-form-item--layout_vertical`。

迁移时，请将旧的缩写类名和 antd 前缀封装类替换为上述 BEM 类名；CSS 变量统一使用 `--silver-formily-*`，例如 `--silver-formily-primary` 和 `--silver-formily-height`。不保留旧类名或变量别名。FormItem、FormLayout、FormGrid、PreviewText 不再提供 `prefixCls`，请通过 `className`、`style` 或 CSS 变量扩展样式。antd 原生控件和反馈图标仍遵循 `ConfigProvider.prefixCls`。
