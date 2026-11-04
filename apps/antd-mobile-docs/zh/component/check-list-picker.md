---
mobileDemo: check-list-picker/index.tsx
---

# CheckListPicker 列表选择器

> `CheckList` 组件的弹出层式。

::: tip 提示
`antd-mobile`本身并没有提供这个组件，该组件是`CheckList`和`createPopup`结合，实际需要开发业务组件的Picker时也可以通过`createPopup`快速完成一个封装。
:::

## 多选

<<< @/zh/demos/check-list-picker/basic.tsx

## 自定义标签展示

默认使用 Space 组件分隔展示已选项，不包裹 Tag。需要标签效果时，可通过 `displayRender` 自定义展示，编辑态与预览态均生效。搭配 FormItem 的 `wrapperWrap: true` 和 Space 的 `wrap` 可让标签换行。

<<< @/zh/demos/check-list-picker/display.tsx

## 单选

<<< @/zh/demos/check-list-picker/single.tsx

## 超长滚动列表

下面提供 100 个选项，分别演示单选与多选。多选通过 FormItem 的 `wrapperWrap: true` 展示已选文本换行。选项区域最大高度为 `60vh`，超出后在弹层内独立滚动；多选时顶部取消、确认按钮保持可见。滚动至末尾选择选项后，可以通过提交查看结果，或重置清空选择。

<<< @/zh/demos/check-list-picker/long-list.tsx

## API

| 属性                             | 说明                                                                       |
| -------------------------------- | -------------------------------------------------------------------------- |
| `multiple`                       | 是否多选，默认 false                                                       |
| `placeholder`                    | 空值占位，默认“请选择”                                                     |
| `confirmText` / `cancelText`     | 多选按钮文字，默认“确定” / “取消”                                          |
| `onConfirm`                      | `(value) => void`，写回后通知                                              |
| `onCancel`                       | 取消按钮或遮罩关闭时通知                                                   |
| `onClose`                        | 确认、取消或主动关闭时通知                                                 |
| `popupProps`                     | createPopup 的 PopupOptions，如 bodyStyle、afterShow、afterClose、safeArea |
| `displayRender`                  | `(value, props) => ReactNode`，自定义编辑态与预览态展示                    |
| `aria-label` / `aria-labelledby` | 触发按钮无障碍名称，默认采用字段字符串标题                                 |

同时支持 CheckList 的 `mode`、`activeIcon`、`extra`。不支持 `defaultValue`、`children` 或外部控制弹层可见性。

底层选项接口参考 [antd-mobile CheckList 文档](https://mobile.ant.design/components/check-list/)。
