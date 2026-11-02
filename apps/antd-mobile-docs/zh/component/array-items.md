---
mobileDemo: array-items/index.tsx
---

# ArrayItems 自增列表

> 适用于动态数组编辑场景的组件。

::: tip 提示
本组件仅支持Schema的写法。
:::

## JSON Schema

<<< @/zh/demos/array-items/basic.tsx

## Markup Schema

::: warning 注意
自定义组件若读取记录中的响应式属性，需要使用 `observer` 包装。
:::

<<< @/zh/demos/array-items/primitive.tsx

## API

### ArrayItems

| 属性                  | 类型                    | 说明                                                    |
| --------------------- | ----------------------- | ------------------------------------------------------- |
| disabled              | boolean                 | 禁止数组操作，字段禁用状态建议使用 Formily pattern 配置 |
| onAdd                 | (index: number) => void | 新增后的索引                                            |
| onRemove              | (index: number) => void | 删除的索引                                              |
| onMoveUp / onMoveDown | (index: number) => void | 移动前的索引                                            |
| className / style     | div 对应属性            | 外层容器样式                                            |

支持对象数组、基础类型数组和 tuple Schema；tuple 超出声明长度时回退使用第一个 items Schema。

### ArrayItems.Item

`ArrayItems.Item` 作为 VoidField 的 component 使用。`IArrayItemsItemProps` 为每项提供独立的 FormLayout，并继承外层表单布局。

| 属性              | 类型                   | 说明                                       |
| ----------------- | ---------------------- | ------------------------------------------ |
| title             | ReactNode              | 标题，不自动生成；可组合 useIndex 或 Index |
| extra             | ReactNode              | 标题右侧操作区，不自动添加删除按钮         |
| mode              | 'card' \| 'default'    | 默认 card                                  |
| children          | ReactNode              | 项内字段                                   |
| className / style | string / CSSProperties | 项容器样式                                 |

未设置 title 和 extra 时不显示标题区。

### 操作与 hooks

`ArrayItems` 复用 `ArrayBase` 的 `Addition`、`Remove`、`MoveUp`、`MoveDown`、`Index`、`Empty`、`useArray`、`useIndex` 和 `useRecord`，详细属性及状态行为见 [ArrayBase](./array-base.md)。
