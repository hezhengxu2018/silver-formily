---
mobileDemo: check-list-picker/index.tsx
---

# CheckListPicker 列表选择器

`CheckListPicker` 使用 `createPopup` 打开 `CheckList`，提供与 Picker 一致的表单触发入口。点击 FormItem 整行或按钮打开，单选时点选立即写入并关闭；多选时选择暂存在弹层内，点击确定后写入字段，取消或点击遮罩保留原值。

## 多选

使用字段 `dataSource` 或 Schema `enum` 提供一维选项，也可以通过 `options` 直接传入。选项支持字符串、数字或 `{ label, value, disabled, description }` 对象。默认单选，设置 `multiple: true` 开启多选，单选与多选的值均为数组。

<<< @/zh/demos/check-list-picker/basic.tsx

## 单选

默认单选，不显示取消和确认按钮，点选后立即回写并关闭弹层。可以点击遮罩退出而不修改字段。多选弹层复用 Picker 的圆角与头部样式。

<<< @/zh/demos/check-list-picker/single.tsx

## 超长滚动列表

下面提供 100 个选项，分别演示单选与多选。选项区域最大高度为 `60vh`，超出后在弹层内独立滚动；多选时顶部取消、确认按钮保持可见。滚动至末尾选择选项后，可以通过提交查看结果，或重置清空选择。

<<< @/zh/demos/check-list-picker/long-list.tsx

## API

从包根入口导出 `CheckListPicker` 和 `ICheckListPickerProps`。

| 属性                             | 说明                                                                       |
| -------------------------------- | -------------------------------------------------------------------------- |
| `options`                        | 与 CheckList 相同的选项数组，字段 dataSource 映射到此属性                  |
| `value` / `onChange`             | 当前值数组与写回事件（单选点选、多选确认时触发）                           |
| `multiple`                       | 是否多选，默认 false                                                       |
| `placeholder`                    | 空值占位，默认“请选择”                                                     |
| `confirmText` / `cancelText`     | 多选按钮文字，默认“确定” / “取消”                                          |
| `onConfirm`                      | `(value) => void`，写回后通知                                              |
| `onCancel`                       | 取消按钮或遮罩关闭时通知                                                   |
| `onClose`                        | 确认、取消或主动关闭时通知                                                 |
| `popupProps`                     | createPopup 的 PopupOptions，如 bodyStyle、afterShow、afterClose、safeArea |
| `disabled`                       | 禁止打开及写回                                                             |
| `readOnly`                       | 允许打开查看，禁止修改和写回                                               |
| `displayRender`                  | `(value, props) => ReactNode`，自定义编辑态与预览态展示                    |
| `className` / `style`            | 字段外壳样式                                                               |
| `aria-label` / `aria-labelledby` | 触发按钮无障碍名称，默认采用字段字符串标题                                 |

同时支持 CheckList 的 `mode`、`activeIcon`、`extra`。不支持 `defaultValue`、`children` 或外部控制弹层可见性。

## 行为说明

- 默认按已选值顺序展示标签，多选使用 Space + Tag 展示独立选项；找不到选项时显示原值，数字 `0` 可以正常展示。
- `readPretty` 仅展示文本，空值使用 PreviewText 占位；`readOnly` 保留查看入口。
- 每次打开使用当时的字段值与选项作为弹层快照；弹层打开期间的数据源变化在下次打开时生效。
- FormItem 自动识别触发按钮并展示箭头，支持通过 `event.preventDefault()` 阻止整行打开。关闭动画结束后恢复按钮焦点，并允许再次打开。
- 字段卸载时自动关闭弹层，不提交草稿。重置由 Formily 管理。

底层选项接口参考 [antd-mobile CheckList 文档](https://mobile.ant.design/components/check-list/)。

## 触发内容布局

`triggerWrap` 默认为 `false`：已选内容保持单行，超出字段宽度后可水平滚动。设置 `triggerWrap: true` 后按字段宽度换行显示。
