# Segmented

> 分段选择器

## Markup Schema 案例

:::demo

segmented/markup-schema

:::

## JSON Schema 案例

:::demo

segmented/json-schema

:::

## Template 案例

:::demo

segmented/template

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/segmented.html](https://cn.element-plus.org/zh-CN/component/segmented.html)

### 扩展属性

| 属性名  | 类型                                                                | 描述                                             | 默认值 |
| ------- | ------------------------------------------------------------------- | ------------------------------------------------ | ------ |
| options | ^[array]`Array<Record<string, any> \| string \| number \| boolean>` | 选项配置数组，一般情况下请通过`dataSource`来配置 | []     |

## Segmented Slot

| 插槽名  | 说明                     | 类型                |
| ------- | ------------------------ | ------------------- |
| default | 自定义选项渲染作用域插槽 | ^[object]`{ item }` |
