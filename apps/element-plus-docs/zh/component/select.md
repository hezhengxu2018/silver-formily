# Select

> 下拉框组件

## Markup Schema 同步数据源案例

:::demo

select/markup-schema-sync

:::

## Markup Schema 异步搜索案例

:::demo

select/markup-schema-async-search

:::

## Markup Schema 异步联动数据源案例

:::demo

select/markup-schema-async

:::

## Markup Schema OptionGroup案例

:::demo

select/markup-schema-option-group

:::

## JSON Schema 同步数据源案例

:::demo

select/json-schema-sync

:::

## JSON Schema 异步联动数据源案例

:::demo

select/json-schema-async

:::

## Template 同步数据源案例

:::demo

select/template-sync

:::

## Template 异步联动数据源案例

:::demo

select/template-async

:::

## Template 作用域插槽

:::demo

select/scope-slot

:::

## Template Header插槽

:::demo

select/template-slot-header

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/select.html](https://cn.element-plus.org/zh-CN/component/select.html)

### 扩展属性

| 属性名  | 类型                                                                                      | 描述                                             | 默认值 |
| ------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ | ------ |
| options | [SelectOptionProps](https://cn.element-plus.org/zh-CN/component/select.html#option-api)[] | 选项配置数组，一般情况下请通过`dataSource`来配置 | []     |

::: tip 提示

1. 如果在`options`中有`options`数组则会渲染为OptionGroup，第一层的`options`属性会当作`ElOptionGroup`的属性。具体请参考Demo。
2. 如果没有提供`valueKey`配置项的话`label`属性会作为遍历的key值，请保证其唯一性。
   :::

### 插槽

::: tip 提示

1. 组件继承了`ElSelect`的所有插槽。具体使用时请注意所使用的`element-plus`版本。
2. 组件额外的为header、footer、tag插槽提供了field作用域。其余插槽没有改动。
3. 组件目前无法使用`OptionGroup`的default插槽。

:::

| 插槽名  | 描述           | 类型                        |
| ------- | -------------- | --------------------------- |
| header  | 下拉框头部插槽 | ^[object]`{ field }`        |
| footer  | 下拉框尾部插槽 | ^[object]`{ field }`        |
| prefix  | Select头部插槽 | --                          |
| empty   | 无选项时插槽   | --                          |
| tag     | 自定义标签内容 | ^[object]`{ field }`        |
| loading | 自定义loading  | --                          |
| label   | 自定义标签内容 | ^[object]`{ label, value }` |
