# Select

> 下拉框组件

## Markup Schema 同步数据源案例

:::demo
select/markup-sync-options.tsx
:::

## Markup Schema 异步搜索案例

:::demo
select/markup-async-search.tsx
:::

## Markup Schema 异步联动数据源案例

:::demo
select/markup-async-linkage.tsx
:::

## JSON Schema 同步数据源案例

:::demo
select/json-sync-options.tsx
:::

## JSON Schema 多选案例

:::demo
select/multiple.tsx
:::

## JSON Schema 异步联动数据源案例

:::demo
select/json-async-linkage.tsx
:::

## 纯 JSX 同步数据源案例

:::demo
select/jsx-sync-options.tsx
:::

## 纯 JSX 异步联动数据源案例

:::demo
select/jsx-async-linkage.tsx
:::

## API

| 属性                                   | 类型                             | 默认值                         | 说明                                                      |
| -------------------------------------- | -------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `value / onChange`                     | `SelectProps 对应类型`           | 由字段传入                     | 支持单选、多选和 labelInValue。                           |
| `options`                              | `SelectProps['options']`         | 字段 dataSource 或显式 options | 字段 dataSource 非空时优先；否则保留显式 options。        |
| `loading`                              | `boolean`                        | 字段 loading                   | 显式 true / false 均优先；校验中仍可显示加载 suffixIcon。 |
| `mode / labelInValue`                  | `'multiple' \| 'tags' / boolean` | — / false                      | 多选、标签或携带 label 的值。                             |
| `fieldNames`                           | `SelectProps['fieldNames']`      | 原生默认值                     | 自定义 label、value、options 字段名；阅读态同样使用。     |
| `showSearch / filterOption / onSearch` | `SelectProps 对应类型`           | 原生默认值                     | 搜索开关、过滤和搜索回调。                                |
| `size / status / variant`              | `SelectProps 对应类型`           | 继承表单项                     | 显式控件属性优先。                                        |
| `style`                                | `CSSProperties`                  | `{ width: '100%' }`            | 调用方 style 可覆盖默认宽度。                             |
| `id / ref`                             | `string / Select ref`            | 自动关联标签 / —               | 访问输入 ID 与 focus、blur 等方法。                       |

其余接口参考 [ Ant Design Select](https://ant.design/components/select-cn)
