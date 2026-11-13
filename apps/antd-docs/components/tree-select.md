# TreeSelect 树形选择

> 树形选择

## Markup Schema 同步数据源案例

:::demo
tree-select/markup-sync-options.tsx
:::

## Markup Schema 异步联动数据源案例

:::demo
tree-select/markup-async-linkage.tsx
:::

## JSON Schema 同步数据源案例

:::demo
tree-select/json-sync-options.tsx
:::

## JSON Schema 异步联动数据源案例

:::demo
tree-select/json-async-linkage.tsx
:::

## 纯 JSX 同步数据源案例

:::demo
tree-select/jsx-sync-options.tsx
:::

## 纯 JSX 异步联动数据源案例

:::demo
tree-select/jsx-async-linkage.tsx
:::

## 异步加载子节点

展开父节点时通过 `loadData` 加载子节点，并将结果追加到字段的 `dataSource`。本例使用 `treeDataSimpleMode`，以 `id` / `pId` 表达父子关系，加载完成的子节点标记为 `isLeaf: true`。

请求使用 800ms 的本地延迟模拟。可分别展开两个父节点，选中子节点后提交查看字段值。

::: tip 搜索与加载
Ant Design 的 `loadData` 在搜索过滤时不会触发。本例关闭搜索，通过展开节点触发加载。
:::

:::demo
tree-select/async-load.tsx
:::

## 基础用法

:::demo
tree-select/basic.tsx
:::

## API

| 配置                               | 说明                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| Schema `enum` / Field `dataSource` | 配置树节点，映射到原生 `treeData`；非空字段数据源优先于组件属性中的 `treeData`  |
| `loadData`                         | 展开节点时异步加载，返回 Promise；加载完成后需更新字段数据源或组件的 `treeData` |
| `treeDataSimpleMode`               | 使用 `id` / `pId` 描述父子关系，代替嵌套的 `children`                           |
| `fieldNames`                       | 自定义节点的标签、值、子节点属性名                                              |
| `pattern="readPretty"`             | 通过 PreviewText 展示选中项标签                                                 |

其余属性、事件与 ref 参考 [Ant Design 6 TreeSelect](https://ant.design/components/tree-select)。
