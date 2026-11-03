# FormButtonGroup

> 表单按钮组布局组件

::: warning 特别说明：与官方实现的差异

- Sticky 已参考本仓库 Vant 封装重构：测量定位并绑定所属表单边界，保留占位与原生提交，不使用官方 react-sticky-box，也不是纯 CSS sticky。

- position、container、CSS 长度偏移和 zIndex 是当前实现支持的配置；不承诺完整兼容旧 StickyBox 属性。默认背景取主题 token，不再向上查找实际背景。

- FormItem 子组件始终包装一层 Space，单个子元素也会改变 DOM；没有强制复刻上游的 padding=0 / width=100%。自定义 justifyContent 可覆盖 align。

- 下面两个吸底原例使用 FormProvider + FormLayout，当前以最近 FormLayout 为边界；额外补充示例展示通过 Form 上下文绑定表单的行为。

:::

## 普通案例

:::demo
form-button-group/basic.tsx
:::

## 吸底案例

:::demo
form-button-group/sticky-bottom.tsx
:::

## 吸底居中案例

:::demo
form-button-group/sticky-bottom-center.tsx
:::

## 本项目补充：表单边界吸附

此例展示当前 Form 根节点上下文与吸底行为，属于本项目补充。

:::demo
form-button-group.tsx
:::

## API

### FormButtonGroup

| 属性       | 类型                                  | 默认值                  | 说明                                                                                |
| ---------- | ------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `align`    | `CSSProperties['textAlign']`          | `'left'`                | left/start 左对齐，right/end 右对齐，其他值居中；显式 style.justifyContent 可覆盖。 |
| `gutter`   | `SpaceProps['size']`                  | Ant Design Space 默认值 | 间距，支持数字、尺寸值或二元数组。                                                  |
| `其他属性` | `Omit<SpaceProps, 'align' \| 'size'>` | —                       | 透传 Ant Design 6 Space 属性；使用 orientation、separator 等当前 API。              |

### FormButtonGroup.FormItem

接收 `IFormItemProps` 和 `gutter`。内部固定 `label=" "`、`colon={false}`，默认 margin 为 0；子元素始终放入 Space。

### FormButtonGroup.Sticky

| 属性                                | 类型                             | 默认值           | 说明                                                                             |
| ----------------------------------- | -------------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| `position`                          | `'top' \| 'bottom'`              | `'bottom'`       | 吸顶或吸底；显式 position 优先于 bottom。                                        |
| `bottom`                            | `boolean`                        | `true`           | 兼容属性；false 等价于未设置 position 时吸顶。                                   |
| `container`                         | `HTMLElement`                    | 所属 Form 根节点 | 显式指定边界；未提供 Form 时依次回退到最近原生 form、FormLayout 根节点、父元素。 |
| `offsetTop / offsetBottom`          | `number \| string`               | `0`              | 与视口边缘的偏移，数字按 px；字符串可使用 rem、px 等 CSS 长度。                  |
| `zIndex`                            | `number \| string`               | `10`             | 吸附状态的层级。                                                                 |
| `align`                             | `CSSProperties['textAlign']`     | `'left'`         | 吸附内容对齐。                                                                   |
| `className / style / 其他 DOM 属性` | `HTMLAttributes<HTMLDivElement>` | —                | 应用到占位根节点；背景色也用于内部操作栏。                                       |
| `children`                          | `ReactNode`                      | —                | 保留在对应表单 DOM 内的按钮内容。                                                |

默认吸底时，表单进入可视区域且按钮原位置仍在视口下方才悬浮；滚到按钮原位置时恢复文档流。吸顶在表单结束处被推离。固定定位时保留占位并跟随宽度，表单离开可视区域或被完全裁剪时暂停测量。

## 文档来源

介绍与原例来自 [Alibaba Formily FormButtonGroup 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/FormButtonGroup.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
