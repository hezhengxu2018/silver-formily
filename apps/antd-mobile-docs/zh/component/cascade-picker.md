---
mobileDemo: cascade-picker/index.tsx
---

# CascadePicker

`CascadePicker` 是 antd-mobile 级联选择器的 Formily 适配，适用于省市区等树形数据。点击 FormItem 标签、内容或行内空白打开选择器，确认后保存完整路径数组，滚动或取消不写回字段。

## 基础使用

通过字段 `dataSource` 提供树形选项；Schema 中使用 `enum`，封装将字段数据源映射为原生 `options`。每个节点包含字符串 `label`、字符串 `value` 和可选的 `children`，下一列由上一列选中节点的子节点生成。

通过表单 `initialValues` 或字段 `initialValue` 初始化路径，例如 `['zhejiang', 'hangzhou', 'xihu']`。示例支持必填校验、清空和重置，点击提交查看结果。

<<< @/zh/demos/cascade-picker/basic.tsx

## 禁用、只读与预览

`disabled` 禁止打开和修改；`readOnly` 允许打开查看完整选项，但锁定选项交互，确认也不写回值。禁用和只读时隐藏清空按钮。`readPretty` 仅显示文本，无弹层入口。

`displayRender(labels, selectedOptions)` 同时用于编辑态和预览态，返回 ReactNode。`labels` 为当前路径的标签数组，`selectedOptions` 为匹配到的节点数组；未匹配的节点为 `null`，对应标签回退为原始值。

<<< @/zh/demos/cascade-picker/patterns.tsx

## 清空

清空能力统一由 FormItem 提供：设置 `decorator={[FormItem, { clearable: true }]}`，或在 Schema 中配置 `x-decorator-props: { clearable: true }`。有值时右侧箭头切换为清除按钮，清空后字段值为 `undefined`，恢复箭头且不会打开选择器。组件本身不提供 `clearable` 属性。

## API

导出 `CascadePicker`、`ICascadePickerProps` 和底层受控组件 `BasePicker`。通常通过 Formily Field 或 Schema 使用；独立使用时由调用方管理 `value` 和 `onChange`。

| 属性                  | 说明                                                 | 默认值             |
| --------------------- | ---------------------------------------------------- | ------------------ |
| `options`             | 树形选项数组；字段 `dataSource` 映射到此属性         | `[]`               |
| `value`               | 当前路径值数组，按层级排列                           | `[]`               |
| `onChange`            | `(value, extend) => void`，确认时写回                | -                  |
| `placeholder`         | ReactNode，空值时的提示                              | `请选择`           |
| `disabled`            | 禁止打开和写回                                       | `false`            |
| `readOnly`            | 可打开查看，但不能修改或清空                         | `false`            |
| `displayRender`       | `(labels, selectedOptions) => ReactNode`，自定义展示 | 标签以 `/` 分隔    |
| `className` / `style` | 字段外壳样式                                         | -                  |
| `aria-label`          | 触发按钮名称                                         | Field 的字符串标题 |

其余原生配置与事件直接透传，包括 `onSelect`、`onCancel`、`onClose`、`afterShow`、`afterClose`、`popupClassName` 和 `popupStyle`。`onConfirm(value, extend)` 在确认写回后调用，清空不触发 `onConfirm`。

当前值和弹层由封装管理，不支持 `defaultValue`、`visible` 或 `children`。原生接口参考 [antd-mobile CascadePicker 文档](https://mobile.ant.design/zh/components/cascade-picker)。

## 行为说明

- 标签根据最新 `value` 和 `options` 计算，外部更新字段值或数据源后同步刷新。空数组或全为 `null` 时显示占位内容；预览态使用 `PreviewText.Placeholder` 的占位配置。
- 选择草稿由原生选择器管理，仅确认后提交。取消保留字段值，重置恢复初始值。
- 关闭动画结束后将焦点恢复到触发按钮；关闭完成前不重复打开。
- FormItem 的 `onClick` 可通过 `event.preventDefault()` 阻止整行打开。直接点击触发按钮独立打开，清空按钮不会触发行点击或打开弹层。

## 触发内容布局

通过 FormItem 的 `wrapperWrap` 控制已选内容布局，默认 `false`：保持单行，超出字段宽度后可水平滚动。设置 `x-decorator-props: { wrapperWrap: true }` 后按字段宽度换行显示。
