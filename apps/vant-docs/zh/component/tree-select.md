---
mobileDemo: tree-select/index.vue
---

# TreeSelect

> `TreeSelect` 是基于 Vant 官方 `TreeSelect` 做的表单封装，交互形态与 `Picker` 一致：表单项里展示触发输入框，点击后在底部弹层中选择。

## 基础使用

<<< @/zh/demos/tree-select/basic.vue

## 多选

当字段值是数组时，会进入多选模式。

<<< @/zh/demos/tree-select/multiple.vue

## 只读与禁用

封装层补充了 `readonly` / `disabled` 给表单触发输入框使用，不会透传给内部 Vant `TreeSelect`。

<<< @/zh/demos/tree-select/status.vue

## 阅读态

阅读态会从 `items.children` 中按 `id` 查找并展示对应的 `text`。

<<< @/zh/demos/tree-select/read-pretty.vue

## API

### 补充 Props

| 属性名             | 类型                                            | 描述                                       | 默认值  |
| ------------------ | ----------------------------------------------- | ------------------------------------------ | ------- |
| `modelValue`       | `number \| string \| Array`                     | 当前选中项 id，数组值表示多选              | `-`     |
| `items`            | `TreeSelectItem[]`                              | 分类数据，Formily 中可用 `dataSource` 传入 | `[]`    |
| `popupProps`       | `TreeSelectPopupProps`                          | 传给内部 Popup 的配置                      | `-`     |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示文案                         | `-`     |
| `readonly`         | `boolean`                                       | 只作用于表单触发输入框                     | `false` |
| `disabled`         | `boolean`                                       | 只作用于表单触发输入框                     | `false` |

:::tip 提示

当前封装暂不对外暴露 `main-active-index` 的双向绑定，弹层内左侧激活项由组件内部维护。需要感知左侧点击时，可先使用 `click-nav` 事件。

:::

其余属性、事件、插槽可以直接参考官方文档[Vant TreeSelect 官方文档](https://vant-ui.github.io/vant/#/zh-CN/tree-select)。
