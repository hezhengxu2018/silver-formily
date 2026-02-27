# Checkbox

> 复选框

::: tip 提示
本组件做了对低版本`element-plus`的兼容处理，即无论你在使用哪个版本的`element-plus`，不使用插槽时dataSource中的对象都应包含`label`和`value`（但在低版本时使用插槽渲染还是要使用`label`属性来作为`value`）。
:::

## Markup Schema 案例

:::demo

checkbox/markup-schema

:::

## Markup Schema 使用插槽案例

:::demo

checkbox/markup-schema-slot

:::

## JSON Schema 案例

:::demo

checkbox/json-schema

:::

## Template 案例

:::demo

checkbox/template

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/checkbox.html](https://cn.element-plus.org/zh-CN/component/checkbox.html)

### 扩展属性

| 属性名     | 类型                           | 描述     | 默认值      |
| ---------- | ------------------------------ | -------- | ----------- |
| optionType | ^[enum]`'default' \| 'button'` | 样式类型 | `'default'` |

## Checkbox Slot

| 插槽名 | 说明                               | 类型                  |
| ------ | ---------------------------------- | --------------------- |
| option | 自定义每个选项渲染方式的作用域插槽 | ^[object]`{ option }` |
