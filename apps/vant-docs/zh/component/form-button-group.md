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

| 属性名                | 类型                                             | 描述                                           | 默认值       |
| --------------------- | ------------------------------------------------ | ---------------------------------------------- | ------------ |
| `layout`              | ^[enum]`'vertical' \| 'horizontal' \| 'compact'` | 按钮布局模式                                   | `'vertical'` |
| `gap`                 | `number \| string`                               | `vertical` / `horizontal` 模式下的按钮间距     | `12`         |
| `inset`               | `boolean`                                        | 是否给按钮组添加移动端常用的左右留白和底部留白 | `true`       |
| `safeAreaInsetBottom` | `boolean`                                        | `compact` 模式下是否保留底部安全区样式         | `false`      |

## FormButtonGroup.Sticky API

参考 Vant `Sticky` 组件。

其中默认值有两点差异：

- `position` 默认值调整为 `bottom`
- `container` 在 `Form` 内部使用时会默认取当前表单根节点
