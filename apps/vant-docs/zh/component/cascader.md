---
mobileDemo: cascader/index.vue
---

# Cascader

> `Cascader` 是基于 Vant 官方 `Cascader` 做的表单封装。

:::tip 提示

由于 `PickerGroup` 不支持内嵌 `Cascader` 组件，没有独立使用的价值，因此暂时没有做xxxPanel的拆分。

:::

## 基础使用

<<< @/zh/demos/cascader/basic.vue

## 中国省市区数据

文档站已经安装 `@vant/area-data`，这里直接使用官方推荐的 `useCascaderAreaData()` 来生成选项数据。

<<< @/zh/demos/cascader/area-data.vue

## 自定义颜色

<<< @/zh/demos/cascader/custom-color.vue

## 异步加载选项

封装层保留了 `change` 事件，payload 会额外携带当前字段实例 `field` 和当前已选路径值 `currentValue`。异步场景里可以直接通过 `field.setDataSource(...)` 更新当前字段的数据源，不需要额外再维护一份本地 `options` 状态。

<<< @/zh/demos/cascader/async-options.vue

## 自定义字段名

<<< @/zh/demos/cascader/field-names.vue

## 自定义选项上方内容

<<< @/zh/demos/cascader/options-top.vue

## 自定义标题与选项

<<< @/zh/demos/cascader/slot.vue

## API

由于官方组件没有添加组件本身的`readonly`和`disable`属性，所以本组件也不提供`disableTriggerWhenInactive`配置项，直接禁止了弹出框的展示。

### 补充 Props

| 属性名             | 类型                                            | 描述                   | 默认值  |
| ------------------ | ----------------------------------------------- | ---------------------- | ------- |
| `modelValue`       | `string[] \| number[] \| string \| number \| -` | 当前值，兼容叶子值输入 | `-`     |
| `separator`        | `string`                                        | 字段展示区路径分隔符   | `' / '` |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义展示区文案       | `-`     |
| `popupProps`       | `CascaderPopupProps`                            | 传给内部 Popup 的配置  | `-`     |
| `readonly`         | `boolean`                                       | 只读态，阻止打开弹层   | `false` |
| `disabled`         | `boolean`                                       | 禁用态，阻止打开弹层   | `false` |

其余的属性、事件、插槽可以直接参考官方文档[Vant Cascader 官方文档](https://vant-ui.github.io/vant/#/zh-CN/cascader)

### Popup Props

参考[createPopup](/component/create-popup)
