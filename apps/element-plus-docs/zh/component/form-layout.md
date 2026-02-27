# FormLayout

> 区块级布局批量控制组件，借助该组件，我们可以轻松的控制被 FormLayout 圈住的所有 FormItem 组件的布局模式

::: tip 提示
该组件经过重构，请注意更新后的文档。移除了全部 Antd 内置的而 Element-Plus 没有开发的功能。本组件库主要是 Element-Plus 的 Formily 封装，
不应考虑将设计风格与 Antd 对齐。但是在布局配置项上保留了原本Formily的配置方式。

1. 移除了`inset`配置项
2. 移除了`bordered`配置项
3. 移除了`gridColumnGap` `gridRowGap`配置项，应该通过网格布局组件完成。
4. 移除了`spaceGap`配置项，现在应该通过`Space`组件完成配置。
5. 添加了`hideRequiredAsterisk` `statusIcon` `requireAsteriskPosition`这三个 Element-Plus 组件提供的配置项

:::

::: warning 注意
由于功能上 FormLayout 组件实际替代了Element-Plus的Form组件，所以现在添加了tag属性且默认值是`form`，按照HTML规范所有表单都应该被包裹在`form`标签内。
如果仅提供布局请自行修改。
:::

## Markup Schema 案例

:::demo

form-layout/markup-schema

:::

## JSON Schema 案例

:::demo

form-layout/json-schema

:::

## Template 案例

:::demo

form-layout/template

:::

## Template 栅格布局案例

:::demo

form-layout/template-grid

:::

## API

| 属性名                  | 说明                    | 类型                                                                                          | 默认值         |
| ----------------------- | ----------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| tag                     | 提供layout的容器标签    | ^[string] \| ^[VueComponent]                                                                  | `'form'`       |
| colon                   | 是否有冒号              | ^[boolean]                                                                                    | `true`         |
| labelAlign              | 标签内容对齐            | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]`                                           | -              |
| wrapperAlign            | 组件容器内容对齐        | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]`                                           | -              |
| labelWrap               | 标签内容换行            | ^[boolean]                                                                                    | `false`        |
| labelWidth              | 标签宽度(px)            | ^[number]                                                                                     | -              |
| wrapperWidth            | 组件容器宽度(px)        | ^[number]                                                                                     | -              |
| labelCol                | 标签宽度(24 column)     | ^[number] \| ^[array]`number[]`                                                               | -              |
| wrapperCol              | 组件容器宽度(24 column) | ^[number] \| ^[array]`number[]`                                                               | -              |
| fullness                | 组件容器宽度 100%       | ^[boolean]                                                                                    | `false`        |
| size                    | 组件尺寸                | ^[enum]`'small' \| 'default' \| 'large'`                                                      | `'default'`    |
| layout                  | 布局模式                | ^[enum]`'vertical' \| 'horizontal' \| 'inline' \| ('vertical' \| 'horizontal' \| 'inline')[]` | `'horizontal'` |
| feedbackLayout          | 反馈布局                | ^[enum]`'loose' \| 'terse' \| 'popover'`                                                      | -              |
| tooltipLayout           | 提示布局                | ^[enum]`'icon' \| 'text'`                                                                     | `'icon'`       |
| breakpoints             | 容器尺寸断点            | ^[array]`number[]`                                                                            | -              |
| shallow                 | 上下文浅层传递          | ^[boolean]                                                                                    | `true`         |
| hideRequiredAsterisk    | 隐藏必填星号            | ^[boolean]                                                                                    | -              |
| statusIcon              | 显示状态图标            | ^[boolean]                                                                                    | -              |
| requireAsteriskPosition | 必填星号位置            | ^[enum]`'left' \| 'right'`                                                                    | -              |
