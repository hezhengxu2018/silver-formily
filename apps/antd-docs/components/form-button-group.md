# FormButtonGroup

> 表单按钮组布局组件

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

## API

### FormButtonGroup

| 属性     | 类型                         | 默认值                  | 说明                                                                                |
| -------- | ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `align`  | `CSSProperties['textAlign']` | `'left'`                | left/start 左对齐，right/end 右对齐，其他值居中；显式 style.justifyContent 可覆盖。 |
| `gutter` | `SpaceProps['size']`         | Ant Design Space 默认值 | 间距，支持数字、尺寸值或二元数组。                                                  |

### FormButtonGroup.FormItem

主要用来处理按钮组与主表单 FormItem 对齐问题。使用该组件包裹后按钮组会与 FormItem 对齐。使用方式可参考例子。

### FormButtonGroup.Sticky

| 属性                       | 类型                         | 默认值           | 说明                                                                             |
| -------------------------- | ---------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| `position`                 | `'top' \| 'bottom'`          | `'bottom'`       | 吸顶或吸底；显式 position 优先于 bottom。                                        |
| `bottom`                   | `boolean`                    | `true`           | 兼容属性；false 等价于未设置 position 时吸顶。                                   |
| `container`                | `HTMLElement`                | 所属 Form 根节点 | 显式指定边界；未提供 Form 时依次回退到最近原生 form、FormLayout 根节点、父元素。 |
| `offsetTop / offsetBottom` | `number \| string`           | `0`              | 与视口边缘的偏移，数字按 px；字符串可使用 rem、px 等 CSS 长度。                  |
| `zIndex`                   | `number \| string`           | `10`             | 吸附状态的层级。                                                                 |
| `align`                    | `CSSProperties['textAlign']` | `'left'`         | 吸附内容对齐。                                                                   |

默认吸底时，表单进入可视区域且按钮原位置仍在视口下方才悬浮；滚到按钮原位置时恢复文档流。吸顶在表单结束处被推离。固定定位时保留占位并跟随宽度，表单离开可视区域或被完全裁剪时暂停测量。
