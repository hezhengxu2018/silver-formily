# Select

> 下拉框组件

::: warning 特别说明：与官方实现的差异

- dataSource 非空时优先，否则保留显式 options；上游的直接映射可能让空 dataSource 覆盖 options。当前默认宽度为 100%，可用 style 覆盖。

- 显式 loading 优先于字段 loading；校验中仍会显示加载 suffixIcon。size、status、variant、标签 ID 由本包 FormItem 上下文提供。

- 没有完整转发原生静态成员 Select.Option / OptGroup，示例统一使用 options / enum。阅读态按严格相等匹配值，多选仅一项时也显示 Tag。

- 官方异步搜索例使用淘宝 JSONP / mfetch。本页保留搜索触发、加载与防抖流程，用本地候选项模拟服务，输入“杭州”或“React”可验证。

:::

## Markup Schema 同步数据源案例

:::demo
select/markup-sync-options.tsx
:::

## Markup Schema 异步搜索案例

::: tip 示例适配说明
此例用本地候选项替代官方淘宝 JSONP 请求，其他搜索 / 加载结构沿用原例。
:::

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

编辑态基于 Ant Design 6 的 [Select](https://ant.design/components/select-cn/)。当前封装接收其 props，并额外提供字段映射与阅读态。

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

阅读态使用 `PreviewText.Select` 解析选项标签，不读取原生 Option / OptGroup 子节点。

## 文档来源

介绍与原例来自 [Alibaba Formily Select 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Select.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
