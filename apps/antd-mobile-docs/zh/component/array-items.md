---
mobileDemo: array-items/index.tsx
---

# ArrayItems 自增列表

适用于联系人、地址等动态数组编辑场景。采用 antd-mobile 分组列表外观，数据与校验由 Formily 管理，仅支持 Schema 场景。

## JSON Schema：联系人

数组使用 `ArrayItems`，对象项内通过 VoidField 的 `x-component: 'ArrayItems.Item'` 组织布局，输入字段使用 `FormItem` decorator。将 `Addition` 放在数组的 `properties` 中，即使数组为空也能添加。`defaultValue` 会在每次新增时独立复制。

<<< @/zh/demos/array-items/basic.tsx

## Markup Schema：基础类型数组

基础类型数组以 `type: 'void'` / `SchemaField.Void` 作为 items 容器，使用 `ArrayItems.Item` 作为 component；内部输入字段仍使用 `FormItem` 作为 decorator。VoidField 只负责布局，不增加数据层级，提交值仍为字符串数组。通过 `extra` 显式配置操作区，使用 `useIndex()` / `useRecord()` 可读取当前项的索引和值。嵌套数组中的操作与 hooks 作用于最近的数组上下文。自定义组件若读取记录中的响应式属性，需要使用 `observer` 包装。

<<< @/zh/demos/array-items/primitive.tsx

## API

### ArrayItems

`IArrayItemsProps` 支持 div 属性，以及以下 ArrayBase 配置。`value` / `onChange` 不传递到 DOM；数组值由当前 ArrayField 提供，不支持通过 children 或 renderItem 手写数组项。

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

组件及 Props 均可从 `@silver-formily/antd-mobile` 根入口导入。
