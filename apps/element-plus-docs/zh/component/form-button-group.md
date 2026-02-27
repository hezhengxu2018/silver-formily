# FormButtonGroup

> 表单按钮组布局组件

## Markup Schema 案例

:::demo

form-button-group/markup-schema

:::

## Markup Schema 固钉 案例

:::demo

form-button-group/markup-schema-sticky

:::

## Template 固钉居中 案例

:::demo

form-button-group/template-sticky-center

:::

## API

### FormButtonGroup

| 参数          | 说明                       | 类型                               | 默认值   |
| ------------- | -------------------------- | ---------------------------------- | -------- |
| gutter        | 按钮间隙大小               | `number`                           | `8`      |
| align         | 对齐方式                   | ^[enum]`'left'\|'center'\|'right'` | `'left'` |
| alignFormItem | 对齐 FormItem              | `boolean`                          | `false`  |
| inline        | 行内模式（不添加 padding） | `boolean`                          | `false`  |

### FormButtonGroup.Sticky

参考 [https://cn.element-plus.org/zh-CN/component/affix.html](https://cn.element-plus.org/zh-CN/component/affix.html)

其中position 默认值修改为 `bottom`，target属性默认值为form表单所在容器（需要使用`Form`组件或者`FormLayout`组件包裹，如果没有包裹需要手动提供表单所在DOM）。
