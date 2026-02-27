# Mention

> 富文本提及输入框，用于在长文本里快速 @ 成员或话题。

## Markup Schema 基础用法

:::demo

mention/markup-schema-basic

:::

## Markup Schema 进阶能力

:::demo

mention/markup-schema-advanced

:::

## Template 插槽拓展

:::demo

mention/template-slots

:::

## API

参考 [https://element-plus.org/zh-CN/component/mention.html](https://element-plus.org/zh-CN/component/mention.html)

- 组件完整透传 Element Plus Mention 的属性/事件，可通过 `dataSource`（或直接传入 `options`）管理下拉数据，还可以结合 `whole`、`checkIsWhole`、`prefix` 等能力控制提及行为。
- `props` 属性用于映射自定义字段名，例如远端返回 `id`、`nickname` 等键值时无需手动转换。
- `onSearch(pattern, prefix, field)` 会在输入触发字符后被调用，第三个参数会注入当前 Formily `field`，方便实现远程搜索时拉起 loading 并更新 `options`。

### 插槽

| 插槽名  | 描述                                                      | 类型                              |
| ------- | --------------------------------------------------------- | --------------------------------- |
| prefix  | 输入框前置内容                                            | --                                |
| suffix  | 输入框后置内容                                            | --                                |
| prepend | 输入框前缀内容（位于 prefix 之前）                        | --                                |
| append  | 输入框后缀内容（位于 suffix 之后）                        | --                                |
| header  | 下拉面板头部，额外注入 `field` 引用                       | ^[object]`{ field }`              |
| footer  | 下拉面板底部，额外注入 `field` 引用                       | ^[object]`{ field }`              |
| label   | 自定义选项渲染，除了 `item`、`index` 之外还会注入 `field` | ^[object]`{ item, index, field }` |
| loading | 自定义加载状态                                            | --                                |
