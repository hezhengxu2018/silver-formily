---
mobileDemo: form-button-group/index.vue
---

# FormButtonGroup

> `FormButtonGroup` 是移动端表单按钮布局容器，适合和 `Submit`、`Reset` 搭配使用，支持垂直、水平和紧凑三种布局。

## 垂直布局

<<< @/zh/demos/form-button-group/vertical.vue

## 水平布局

<<< @/zh/demos/form-button-group/horizontal.vue

## 紧凑布局

<<< @/zh/demos/form-button-group/compact.vue

## 粘性布局

<<< @/zh/demos/form-button-group/sticky.vue

## API

| 属性名                | 类型                                      | 描述                                           | 默认值       |
| --------------------- | ----------------------------------------- | ---------------------------------------------- | ------------ |
| `layout`              | `'vertical' \| 'horizontal' \| 'compact'` | 按钮布局模式                                   | `'vertical'` |
| `gap`                 | `number \| string`                        | `vertical` / `horizontal` 模式下的按钮间距     | `12`         |
| `inset`               | `boolean`                                 | 是否给按钮组添加移动端常用的左右留白和底部留白 | `true`       |
| `safeAreaInsetBottom` | `boolean`                                 | `compact` 模式下是否保留底部安全区样式         | `false`      |

## 使用说明

- `vertical`：适合常规表单页底部的上下堆叠按钮
- `horizontal`：适合两个主要操作并排展示
- `compact`：复用 Vant `ActionBar` / `ActionBarButton` 的紧凑圆角样式
- `compact` 模式下，`Reset` 和 `Submit` 会自动切换为 `ActionBarButton`
- `compact` 模式下默认保留 `Reset` / `Submit` 的按钮类型；其中默认白底按钮会补一层主色边框，避免和背景融在一起
- 如果需要特殊配色，仍然可以继续显式传 `type` 或 `color`
- `Submit` 在 `compact` 模式下仍然支持 `Form onAutoSubmit` 和 `onSubmit` 两条提交流程
- `FormButtonGroup.Sticky` 基于 Vant `Sticky` 封装，默认 `position="bottom"`
- `FormButtonGroup.Sticky` 在 `Form` 内部使用时，会默认把当前表单根节点作为 `container`
- 如果不在 `Form` 内使用，或者想修改边界容器，可以继续显式传入 `container`

## FormButtonGroup.Sticky API

参考 Vant `Sticky` 组件。

其中默认值有两点差异：

- `position` 默认值调整为 `bottom`
- `container` 在 `Form` 内部使用时会默认取当前表单根节点
