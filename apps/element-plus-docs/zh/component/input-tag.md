# InputTag

> 标签输入框

## Markup Schema 基础用法

:::demo

input-tag/markup-schema-basic

:::

## Markup Schema 高级能力

:::demo

input-tag/markup-schema-limit

:::

## Template 插槽拓展

:::demo

input-tag/template-slots

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/input-tag.html](https://cn.element-plus.org/zh-CN/component/input-tag.html)

### 插槽

| 插槽名 | 描述                                  | 类型                               |
| ------ | ------------------------------------- | ---------------------------------- |
| prefix | 输入框前置内容                        | --                                 |
| suffix | 输入框后置内容                        | --                                 |
| tag    | 自定义标签渲染，额外注入 `field` 引用 | ^[object]`{ value, index, field }` |
