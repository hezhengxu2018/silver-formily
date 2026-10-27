---
mobileDemo: cascader/index.tsx
---

# Cascader

`Cascader` 是 antd-mobile 分栏级联选择器的 Formily 适配，字段值为从父级到子级的选项值数组。点击字段按钮或 FormItem 整行打开弹层，确认后自动写回字段；切换选项和取消不会提交草稿。滚轮式级联选择请使用 [CascadePicker](./cascade-picker)。

## 基础使用

通过字段 `dataSource` 提供树形选项，封装将其映射为原生 `options`。Schema 中也可使用 `enum` 配置数据源。

使用字段 `initialValue` 或表单 `initialValues` 初始化路径，无需自行管理弹层开关或在确认回调中写回字段。FormItem 检测到组件的触发按钮后自动显示右侧箭头；点击标签、内容或行内空白均可打开选择器。

<<< @/zh/demos/cascader/basic.tsx

选项使用 `{ label, value, disabled?, children? }` 结构。叶子节点应省略 `children`，不要设置 `children: []`，以便原生组件识别最后一级。

## 异步层级加载

参考 [antd-mobile 官方异步加载示例](https://github.com/ant-design/ant-design-mobile/blob/master/src/components/cascader/demos/demo2.tsx)，在 `onSelect` 中按已选路径请求子级，并更新字段 `dataSource`。示例用 800ms 延迟模拟接口，提供三级选项；已加载的节点会缓存，重复选择不会再次请求。

缓存区分三种状态：未加载时使用原生 `Cascader.optionSkeleton` 显示下一层骨架；加载后提供子选项数组；确认是叶子节点时记录为 `null`，生成选项树时省略其 `children`。骨架数组应直接使用原生导出的实例，不要复制，否则原生组件无法识别加载状态。示例中原生组件以 `AntCascader` 命名，避免与 Formily 封装混淆。

<<< @/zh/demos/cascader/async-options.tsx

选择选项只更新弹层草稿并触发加载，确认后才提交字段值。取消不会写回字段，已获取的选项仍保留在缓存中。实际接口返回空子级时也应将该节点标记为叶子；请求失败时应提供错误提示及重试处理。

## 禁用、只读与阅读态

- `disabled`：入口禁用，无法打开弹层或写回值。
- `readOnly`：保留入口，可以打开查看完整选项并切换层级 Tab；所有选项显示为禁用，禁止更改选择和确认写回。
- `readPretty`：仅展示路径标签，不渲染触发按钮或选择弹层。

编辑态与阅读态默认以 `/` 连接路径标签；`displayRender(labels, selectedOptions)` 可统一自定义两种状态的展示。编辑态空值使用 `placeholder`，默认为“请选择”；阅读态空值使用 `PreviewText.Placeholder`。

<<< @/zh/demos/cascader/preview.tsx

## API

导出 `Cascader` 和 `ICascaderProps`。当前值由 Formily 管理，弹层可见性由组件内部管理；不提供非受控 `defaultValue`、外部 `visible` 或原生 `children` 渲染函数。

| 属性                             | 说明                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| 字段 `dataSource` / `options`    | `CascaderOption[]`，树形选项；推荐通过字段数据源提供                                              |
| `value`                          | `(string \| number)[]`，当前路径值，默认为 `[]`                                                   |
| `onChange`                       | `(value, extend) => void`，确认时写回字段的事件，由 Formily 注入                                  |
| `placeholder`                    | `string`，入口空值占位及弹层待选择提示，默认入口显示“请选择”                                      |
| `disabled`                       | `boolean`，禁止打开和写回                                                                         |
| `readOnly`                       | `boolean`，允许打开查看，禁止修改和写回                                                           |
| `displayRender`                  | `(labels: ReactNode[], selectedOptions: (CascaderOption \| null)[]) => ReactNode`，自定义路径展示 |
| `fieldNames`                     | 自定义选项的 `label`、`value`、`children` 字段名，展示标签也遵循此配置                            |
| `className` / `style`            | 字段外壳样式                                                                                      |
| `aria-label` / `aria-labelledby` | 触发按钮的无障碍名称；`aria-label` 默认使用 Field 的字符串标题                                    |
| `onConfirm`                      | `(value, extend) => void`，字段写回后通知；保留原生 `items`、`isLeaf` 附加信息                    |
| `onSelect`                       | `(value, extend) => void`，弹层内选项变化回调，不写回字段                                         |
| `onCancel` / `onClose`           | 取消与关闭通知，无需手动修改弹层状态                                                              |

其余原生配置直接透传，包括 `title`、`confirmText`、`cancelText`、`loading`、`activeIcon`、`optionRender`、`onTabsChange`、`getContainer`、`afterShow` 和 `afterClose`。详见 [antd-mobile Cascader 官方文档](https://mobile.ant.design/zh/components/cascader)。

## 行为说明

- 默认逐级匹配路径标签，未找到的选项回退显示原值。空数组显示占位，数值 `0` 不视为空。
- 字段值及数据源变化会更新展示，打开的弹层也会接收最新选项。确认提交原生选择草稿，取消保留字段值；再次打开使用最新字段值。
- 关闭动画结束前不会重复打开，关闭动画结束后焦点回到入口按钮。
- FormItem 通过唯一的 `data-form-item-trigger` 按钮转发整行点击。FormItem 的 `onClick` 可以调用 `event.preventDefault()` 阻止整行打开；直接点击 Cascader 按钮独立打开，不触发 FormItem 的点击回调。
- 没有 FormItem 时，Cascader 自身的按钮仍可打开选择器。
