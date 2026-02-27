# FormItem

> 全新的 FormItem 组件，相比于 Element 的 FormItem，它支持的功能更多，同时它的定位是纯样式组件，不管理表单状态，所以也会更轻量，更方便定制

该组件经过重构，请注意更新后的文档。移除了全部 Antd 内置的而 Element-Plus 没有开发的功能。本组件库主要是 Element-Plus 的 Formily 封装，
不应考虑将设计风格与 Antd 对齐。但是在布局配置项上保留了原本Formily的配置方式。

1. 移除了`inset`配置项
2. 移除了`bordered`配置项
3. 移除了天然会被Vue继承的属性，如`class`、`style`
4. 移除了其他Antd中实现的，并非Formily实现的功能

::: warning 注意

由于该组件的样式与交互基本沿用了 Element-Plus 的 FormItem，因此移除了原来浅层封装的`ElFormItem`组件。

:::

:::tip 提示

从`2.1.0`版本开始，项目的vue封装已经升级到了 `@silver-formily/vue@2.2.1` 这意味着你可以通过 decoratorContent 来向 FormItem 插入内容，虽然这不是官方的实现也没有 formily 的响应式，但是在大部分情况下应该都够用。具体的使用方式可以参考 `@silver-formily/vue` [文档中的例子](https://vue.silver-formily.org/questions/#%E5%A6%82%E4%BD%95%E5%90%91%E8%A3%85%E9%A5%B0%E5%99%A8%E4%BC%A0%E9%80%92%E6%8F%92%E6%A7%BD)

:::

## 常用属性案例

:::demo

form-item/common

:::

## 尺寸控制案例

:::demo

form-item/size

:::

## API

### FormItem Attributes

| 属性名         | 类型                                                                                          | 描述                                             | 默认值    |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------- |
| label          | `string` \| `VNode`                                                                           | 标签                                             | -         |
| for            | `string`                                                                                      | 关联的表单字段                                   | -         |
| tooltip        | `string` \| `VNode`                                                                           | 问号提示                                         | -         |
| addonBefore    | `string` \| `VNode`                                                                           | 前缀内容                                         | -         |
| addonAfter     | `string` \| `VNode`                                                                           | 后缀内容                                         | -         |
| extra          | `string` \| `VNode`                                                                           | 扩展描述文案                                     | -         |
| feedbackText   | `string`                                                                                      | 反馈文案                                         | -         |
| feedbackStatus | ^[enum]`'error' \| 'warning' \| 'success' \| 'pending'`                                       | 反馈状态                                         | -         |
| asterisk       | `boolean`                                                                                     | 星号提醒                                         | -         |
| colon          | `boolean`                                                                                     | 是否显示冒号                                     | `true`    |
| labelAlign     | ^[enum]`'right' \| 'left'`                                                                    | 标签文本对齐方式                                 | -         |
| wrapperAlign   | ^[enum]`'right' \| 'left'`                                                                    | 内容文本对齐方式                                 | -         |
| labelWrap      | `boolean`                                                                                     | 标签换行，超出部分显示省略号，hover 显示 tooltip | `false`   |
| labelWidth     | `number`                                                                                      | 标签固定宽度                                     | -         |
| wrapperWidth   | `number`                                                                                      | 内容固定宽度                                     | -         |
| labelCol       | `number`                                                                                      | 标签网格所占列数，和内容列数加起来总和为 24      | -         |
| wrapperCol     | `number`                                                                                      | 内容网格所占列数，和标签列数加起来总和为 24      | -         |
| fullness       | `boolean`                                                                                     | 内容是否撑满                                     | `false`   |
| size           | ^[enum]`'small' \| 'default' \| 'large'`                                                      | 尺寸                                             | `default` |
| layout         | ^[enum]`'vertical' \| 'horizontal' \| 'inline' \| ('vertical' \| 'horizontal' \| 'inline')[]` | 布局模式                                         | -         |
| feedbackLayout | ^[enum]`'loose' \| 'terse' \| 'popover'`                                                      | 反馈布局                                         | `'loose'` |
| tooltipLayout  | ^[enum]`'icon' \| 'text'`                                                                     | 提示布局                                         | -         |

### FormItem.BaseItem

纯样式组件，属性与 FormItem 一样，与 Formily Core 不做状态桥接，主要用于一些需要依赖 FormItem 的样式布局能力，但不希望接入 Field 状态的场景
