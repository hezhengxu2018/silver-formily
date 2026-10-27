---
mobileDemo: picker/index.tsx
---

# Picker

`Picker` 是 antd-mobile 多列选择器的 Formily 适配，内部使用声明式原生 `Picker`。点击 FormItem 标签、内容或行内空白打开选择器，FormItem 检测到 `data-form-item-trigger` 后自动显示右侧箭头，也可通过 `clickable` / `arrowIcon` 显式配置；确认后写回数组值，滚动和取消不提交草稿。

## 基础使用

数据源优先使用字段 `dataSource`；Schema 中使用 `enum`，由 Formily 映射到字段数据源。封装通过 `mapProps` 将 `dataSource` 映射为原生 `columns`。

通过字段 `initialValue` 或表单 `initialValues` 初始化，由 Formily 管理当前值。重置恢复字段初始值，点击提交查看结果。

<<< @/zh/demos/picker/basic.tsx

## 两列选择

使用二维 `dataSource` 配置两列，每个子数组对应一列选项。两列独立选择，确认后保存为值数组。

<<< @/zh/demos/picker/columns.tsx

## 禁用、只读与预览

禁用态由 Picker 和 FormItem 共同处理；只读态保留 Picker 入口，弹框展示完整数据源但禁用选项交互，也不会写回值；`readPretty` 仅展示文字。业务自行提供的 FormItem 点击配置不受影响。`displayRender` 用于编辑态和预览态。

<<< @/zh/demos/picker/patterns.tsx

## API

导出 `Picker`、`IPickerProps` 和底层受控组件 `BasePopupPicker`。底层组件无本地值状态，也不提供非受控 `defaultValue`；一般应通过 Formily Field 或 Schema 使用 `Picker`。

| 属性                  | 说明                                      |
| --------------------- | ----------------------------------------- |
| `columns`             | 原生多列选项或根据选择值生成选项的函数    |
| `value` / `onChange`  | Formily 注入的当前数组值与写回事件        |
| `placeholder`         | ReactNode，默认“请选择”                   |
| `disabled`            | 禁止打开和写回，复用禁用态样式            |
| `displayRender`       | `(value, props) => ReactNode`，自定义展示 |
| `className` / `style` | 字段外壳样式                              |
| `aria-label`          | 入口名称，默认使用 Field 的字符串标题     |

原生 `Picker` 支持的其余参数与事件直接透传，包括 `onSelect`、`onCancel`、`onClose`、`afterShow`、`afterClose`、`popupClassName` 和 `popupStyle`。`onConfirm(value, extend)` 在写回后通知，保留原生附加信息。不支持 `visible`、`children`、`trigger` 或清空配置。

原生接口参考 [antd-mobile Picker 文档](https://mobile.ant.design/zh/components/picker)。

## 行为说明

- 已提交值由 Formily 管理。当前值通过原生 Picker 的 `value` 传入，弹层可见性由封装内部管理。
- 默认按列匹配标签，以 `/` 分隔；选项尚未到达时回退显示原值。空数组或全为 null 显示占位内容，值 `0` 不视为空。
- 打开期间 `dataSource` 变化会实时刷新选项，原生 Picker 调整选择草稿，但不会自动写回字段。确认后才提交，取消保留字段当前值；Picker 和 FormItem 都读取 Field 的 `disabled` 状态分别拦截交互，只读态保留完整弹框但锁定选项，预览态直接展示文本。
- 同一 Picker 在关闭动画结束前不会重复打开。取消后再次打开使用最新字段值。
- FormItem 的 `onClick` 仅处理整行点击，可通过 `event.preventDefault()` 阻止整行打开；Picker 按钮阻止事件冒泡，直接点击时独立打开，不经过 FormItem 的回调。行内其他按钮和链接不会误打开。
- Picker 的按钮通过 `data-form-item-trigger` 标记为整行点击入口，FormItem 查找唯一标记元素并调用其 `click()`，无需 Context 注册。自定义控件也可在触发按钮上添加此属性；多个标记元素时不自动决定整行入口。没有 FormItem 时，可通过受控底层组件自身入口打开。

FormItem 在挂载后检测一次 `data-form-item-trigger` 以决定是否自动展示箭头，不监听内部 DOM 变化。禁用状态通过 Field 模型映射到 FormItem 和 Picker；独立使用时由组件 props 控制。

## 触发内容布局

`triggerWrap` 默认为 `false`：已选内容保持单行，超出字段宽度后可水平滚动。设置 `triggerWrap: true` 后按字段宽度换行显示。
