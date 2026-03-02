# QueryForm

> 查询表单组件，基于 FormGrid + Submit/Reset 实现折叠展开

::: tip 提示

- 在`QueryForm` 中默认 `:fullness="true"`，可以通过传入 Form 的属性覆盖。
- `QueryForm` 与 `QueryForm.Light` 默认自动注册常用输入组件及 `FormItem`，大多数 JSON Schema 场景无需手动传入 `components`。

:::

::: warning 注意
由于本组件默认注册了几乎所有的输入组件，会导致树摇失败，使用前需确认对包的体积不敏感。目前没有注册的输入组件有： `DatePickerPanel`、`Upload`、`ColorPickerPanel` 、`SelectTable`、`Transfer`、`Mention`、`Tree`。另外由于`Segmented`、`InputTag`所需要的版本号相对较高，暂时没有注册，防止注册阶段报错。
:::

## Markup Schema 案例

:::tip 提示
配置跨列可以使用`@silver-formily/grid`的`data-grid-span`属性，减少GridColumn的额外嵌套。
:::

:::demo

query-form/markup-schema

:::

## JSON Schema 案例

:::demo

query-form/json-schema

:::

## 通过传入 form 设置初始值

:::demo

query-form/external-form-initial-values

:::

## 垂直布局示例

:::demo

query-form/vertical-layout

:::

## 默认展开所有搜索项

:::demo

query-form/default-expanded

:::

## 隐藏切换按钮并展示所有搜索项

:::demo

query-form/hide-toggle-show-all

:::

## Light 模式（值变更自动提交）

:::demo

query-form/light

:::

## Light 模式（无节流实时提交）

::: tip 提示

- `QueryForm.Light` 使用独立的 flex 紧凑布局，不使用 Grid 折叠逻辑，因此 `gridProps`、`visibleWhen`、展开/收起相关配置在 Light 模式下不生效。

- `Select` 组件在 Element-Plus 的 `2.5.0` 版本后不再提供默认宽度，在Light模式下需要手动添加宽度。

- 如果需要更紧凑的布局可以考虑`Editable`组件。

:::

:::demo

query-form/light-immediate

:::

## 操作区行尾对齐示例（操作按钮始终在尾部可减少展开收起时的定位闪动）

:::demo

query-form/actions-at-row-end

:::

## 插槽示例（在查询/重置后、展开前插入导出按钮）

:::tip 提示
目前操作区仅支持占用网格布局中的一个网格，内容太多会导致换行。需要设置合理的断点值，保证交互区按钮的宽度足够显示。
:::

:::demo

query-form/actions-slot-export

:::

## visibleWhen 示例（按字段名）

:::demo

query-form/visible-when

:::

## visibleWhen 示例（默认折叠显示前两行）

:::demo

query-form/visible-when-two-rows

:::

## visibleWhen 示例（默认折叠显示前 N 项）

:::demo

query-form/visible-when-top-n

:::

## API

::: tip 提示
`QueryForm` 与 `QueryForm.Light` 均会透传并继承 `Form` 的属性（如`form`、 `layout`、`labelAlign`、`size` 等，包括`onAutoSubmit`等事件）。在此不再列出
:::

### QueryForm Props

| 属性名          | 说明                                                         | 类型                                                | 默认值  |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------- | ------- |
| schema          | JSON Schema 渲染                                             | `ISchema`                                           | -       |
| schemaField     | 自定义 SchemaField                                           | `Component`                                         | -       |
| components      | JSON Schema 组件映射（会与内置映射合并，传入同名可覆盖）     | `Record<string, Component>`                         | `{}`    |
| gridProps       | 创建 Grid 的参数（不包含 shouldVisible / maxRows）           | `Omit<IGridOptions, 'shouldVisible' \| 'maxRows'>`  | `{}`    |
| defaultExpanded | 初始是否展开                                                 | `boolean`                                           | `false` |
| showToggle      | 是否显示展开/收起切换按钮（为 `false` 时始终展示全部搜索项） | `boolean`                                           | `true`  |
| actionsAtRowEnd | 操作区是否固定在行尾右侧显示                                 | `boolean`                                           | `false` |
| visibleWhen     | 字段可见性判断函数                                           | [QueryFormVisibleContext](#QueryFormVisibleContext) | -       |
| submitText      | 提交按钮文字                                                 | `string`                                            | `查询`  |
| resetText       | 重置按钮文字                                                 | `string`                                            | `重置`  |
| expandText      | 展开按钮文字                                                 | `string`                                            | `展开`  |
| collapseText    | 收起按钮文字                                                 | `string`                                            | `收起`  |
| showSubmit      | 是否显示提交按钮                                             | `boolean`                                           | `true`  |
| showReset       | 是否显示重置按钮                                             | `boolean`                                           | `true`  |
| submitProps     | 透传给 Submit 的属性                                         | `Record<string, any>`                               | -       |
| resetProps      | 透传给 Reset 的属性                                          | `Record<string, any>`                               | -       |

### Slots

| 插槽名   | 说明                           | Slot Props                   |
| -------- | ------------------------------ | ---------------------------- |
| default  | 表单内容（Markup Schema 场景） | -                            |
| actions  | 自定义操作按钮区域             | `{ expanded, toggle, type }` |
| collapse | 自定义展开/收起按钮            | `{ expanded, toggle, type }` |

::: tip 提示
`type` 的可选值：`'incomplete-wrap' | 'collapsible' | 'complete-wrap'`。
:::

### QueryForm.Light Props

| 属性名       | 说明                                           | 类型                        | 默认值                              |
| ------------ | ---------------------------------------------- | --------------------------- | ----------------------------------- |
| schema       | JSON Schema 渲染                               | `ISchema`                   | -                                   |
| schemaField  | 自定义 SchemaField                             | `Component`                 | -                                   |
| components   | JSON Schema 需注册组件（会与默认注册组件合并） | `Record<string, Component>` | 绝大部分（适合QueryForm的）输入组件 |
| throttleWait | 值变更自动提交的节流时间（毫秒）               | `number`                    | `300`                               |

### QueryForm.Light Slots

| 插槽名  | 说明                           | Slot Props |
| ------- | ------------------------------ | ---------- |
| default | 表单内容（Markup Schema 场景） | -          |

::: tip 提示
`QueryForm.Light` 不支持 `actions` / `collapse` 插槽，也不支持 Grid 折叠相关配置。
:::

### visibleWhen Context

#### QueryFormVisibleContext

<<< @/../../packages/element-plus/src/query-form/types.ts#visible
