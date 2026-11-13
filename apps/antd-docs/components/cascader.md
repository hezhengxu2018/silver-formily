# Cascader 级联选择

## Markup Schema 案例

通过表单 effects 加载地址数据，并写入字段的 `dataSource`。

:::demo
cascader/markup-schema.tsx
:::

## JSON Schema 案例

通过 `x-reactions` 和 `scope` 注入地址加载函数。

:::demo
cascader/json-schema.tsx
:::

## 纯 JSX 案例

使用 `Field` 绑定 Cascader，提交值为从省到区县的完整路径数组。

:::demo
cascader/jsx.tsx
:::

## 动态加载选项

在表单 `effects` 中调用 `useAsyncDataSource(pattern, service)`，通过 `onFieldInit` 给字段注入 `loadData`。加载函数接收当前字段和展开路径，按需加载城市和区县，并更新字段的 `dataSource`。未加载的父级选项设置 `isLeaf: false`，请求期间设置该选项的 `loading`，末级选项设置 `isLeaf: true`。

本例用 800ms 延迟模拟每次请求。依次选择省、市、区后提交，可在控制台查看地址路径；切换省份可以继续加载另一分支，已加载的数据会保留。

::: tip loadData 与搜索
Ant Design Cascader 的 `loadData` 不能与 `showSearch` 同时使用，本例关闭搜索。与前面的整份数据加载不同，此例只在展开选项时请求下一级数据。
:::

:::demo
cascader/async-load.tsx
:::

## 基础用法

::: tip 示例适配说明
本例同时展示单选和 `multiple: true` 多选。多选值为路径数组的数组，使用 `Cascader.SHOW_CHILD` 展示末级选项；可切换阅读态查看标签，点击重置恢复初始选择。
:::

:::demo
cascader/basic.tsx
:::

## API

完整API参考[Ant Design 6 Cascader](https://ant.design/components/cascader)
