# Radio 单选框

> 单选框，大部分情况下应该使用 `Radio.Group`

## Markup Schema 案例

通过 `enum` 配置单选组选项。选项值为数字时，使用 `SchemaField.Number` 声明字段类型。

:::demo
radio/markup-schema.tsx
:::

## JSON Schema 案例

通过 JSON Schema 的 `enum` 配置选项，使用 `x-component: 'Radio.Group'` 渲染单选组。

:::demo
radio/json-schema.tsx
:::

## 纯 JSX 案例

通过 `Field` 的 `dataSource` 配置选项，选中后提交的是对应选项的 `value`。

:::demo
radio/jsx.tsx
:::

## 基础用法

:::demo
radio/basic.tsx
:::

## 按钮样式

通过 `Radio.Group` 的 `optionType: 'button'` 开启按钮风格，选项由 Schema 的 `enum` 或字段的 `dataSource` 提供。切换阅读态可查看选中项标签，点击重置恢复初始值。

:::demo
radio/button.tsx
:::

## API

### Radio.Group

| 属性          | 类型                    | 默认值      | 说明                                   |
| ------------- | ----------------------- | ----------- | -------------------------------------- |
| `optionType`  | `'default' \| 'button'` | `'default'` | 选项风格，与 Element Plus 封装保持一致 |
| `buttonStyle` | `'outline' \| 'solid'`  | `'outline'` | 按钮风格下的外观                       |

非空字段 `dataSource` 优先，否则使用显式原生数据源属性。其余的属性请参考 [Antd Radio](https://ant.design/components/radio-cn#radioradiobutton)
