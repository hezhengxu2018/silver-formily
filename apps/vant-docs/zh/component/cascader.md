---
mobileDemo: cascader/index.vue
---

# Cascader

> `Cascader` 是基于 Vant 官方 `Cascader` 做的表单封装，补上了移动端表单里常见的“字段触发区 + 内置弹层 + 阅读态路径展示”这层能力。

:::tip 与官方的差异

- 当前封装固定使用 `Popup` 弹层，不需要手动维护 `show`
- `Field` 上的 `dataSource` 会自动映射到 `options`
- 字段值默认保存为完整路径数组，例如 `['zj', 'hz', 'xh']`，而不是 Vant 原始的叶子值
- 未完成的中间选择在关闭弹层后会自动回滚，只有选到叶子节点时才会更新字段值

:::

## 基础使用

<<< @/zh/demos/cascader/basic.vue

## 中国省市区数据

文档站已经安装 `@vant/area-data`，这里直接使用官方推荐的 `useCascaderAreaData()` 来生成选项数据。

<<< @/zh/demos/cascader/area-data.vue

## 自定义颜色

<<< @/zh/demos/cascader/custom-color.vue

## 异步加载选项

`change` 事件的 payload 会额外携带当前字段实例 `field`，因此可以直接在回调里通过 `field.setDataSource(...)` 更新当前字段的数据源，不需要再额外维护一份本地 `options` 状态。

<<< @/zh/demos/cascader/async-options.vue

## 自定义字段名

<<< @/zh/demos/cascader/field-names.vue

## 自定义选项上方内容

<<< @/zh/demos/cascader/options-top.vue

## 补充：自定义标题与选项

<<< @/zh/demos/cascader/slot.vue

## API

### 使用约定

- `readPretty` 模式下会自动展示完整路径文案
- `readonly` / `readOnly` / `disabled` 都会阻止弹层打开
- `change` 事件仍然保留逐级选择时的中间态；真正写回字段的是叶子节点触发后的 `update:modelValue`
- `change` / `finish` 的 payload 会额外暴露当前 `field`
- 异步联动场景里更推荐在 `change` 回调中直接使用 `payload.field.setDataSource(...)` 更新字段数据源

### 封装补充 Props

| 属性名             | 类型                                            | 描述                   | 默认值  |
| ------------------ | ----------------------------------------------- | ---------------------- | ------- |
| `modelValue`       | `string[] \| number[] \| string \| number \| -` | 当前值，兼容叶子值输入 | `-`     |
| `separator`        | `string`                                        | 字段展示区路径分隔符   | `' / '` |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义展示区文案       | `-`     |
| `readonly`         | `boolean`                                       | 只读态，阻止打开弹层   | `false` |
| `disabled`         | `boolean`                                       | 禁用态，阻止打开弹层   | `false` |

### 官方 Cascader Props

以下属性会直接透传给 Vant `Cascader`：

| 属性名        | 类型                                 | 描述             | 默认值     |
| ------------- | ------------------------------------ | ---------------- | ---------- |
| `title`       | `string`                             | 标题             | 官方默认值 |
| `options`     | `CascaderOption[]`                   | 选项列表         | `[]`       |
| `fieldNames`  | ^[object]`{ text, value, children }` | 自定义字段名映射 | 官方默认值 |
| `placeholder` | `string`                             | 未选中时的文案   | 官方默认值 |
| `activeColor` | `string`                             | 激活态颜色       | 官方默认值 |
| `swipeable`   | `boolean`                            | 是否支持手势切换 | 官方默认值 |
| `showHeader`  | `boolean`                            | 是否展示头部     | 官方默认值 |
| `closeable`   | `boolean`                            | 是否显示关闭图标 | 官方默认值 |
| `closeIcon`   | `string`                             | 关闭图标名称     | 官方默认值 |

### 官方 Popup Props

当前封装内部固定包了一层 `Popup`，以下弹层属性可直接使用：

| 属性名                | 类型                                            | 描述                 | 默认值     |
| --------------------- | ----------------------------------------------- | -------------------- | ---------- |
| `position`            | ^[enum]`'bottom' \| 'top' \| 'left' \| 'right'` | 弹出位置             | `'bottom'` |
| `round`               | `boolean`                                       | 是否显示圆角         | `true`     |
| `overlay`             | `boolean`                                       | 是否显示遮罩层       | `true`     |
| `teleport`            | `string \| Element`                             | 指定挂载节点         | 官方默认值 |
| `closeOnPopstate`     | `boolean`                                       | 回退时是否自动关闭   | `true`     |
| `closeOnClickOverlay` | `boolean`                                       | 点击遮罩是否自动关闭 | `true`     |
| `safeAreaInsetTop`    | `boolean`                                       | 是否开启顶部安全区   | 官方默认值 |
| `safeAreaInsetBottom` | `boolean`                                       | 是否开启底部安全区   | `true`     |
| `lockScroll`          | `boolean`                                       | 是否锁定背景滚动     | `true`     |
| `lazyRender`          | `boolean`                                       | 是否延迟渲染内容     | `true`     |
| `zIndex`              | `number \| string`                              | 弹层层级             | 官方默认值 |
| `duration`            | `number \| string`                              | 动画时长             | 官方默认值 |
| `transition`          | `string`                                        | 自定义过渡动画       | 官方默认值 |

### Slots

以下官方插槽已转发：

| 插槽名           | 描述           | 插槽参数                                        |
| ---------------- | -------------- | ----------------------------------------------- |
| `title`          | 自定义标题     | `-`                                             |
| `option`         | 自定义选项内容 | ^[object]`{ option: CascaderOption, selected }` |
| `options-top`    | 选项区顶部     | ^[object]`{ tabIndex: number }`                 |
| `options-bottom` | 选项区底部     | ^[object]`{ tabIndex: number }`                 |

### Events

| 事件名              | 描述                       | 回调参数                                                                                                          |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `update:modelValue` | 选中叶子节点后同步字段值   | ^[Function]`(value: string[] \| number[] \| null) => void`                                                        |
| `change`            | 任意层级切换时触发         | ^[Function]`(payload: { value, tabIndex, selectedOptions, field? }) => void`，其中 `payload.field` 为当前字段实例 |
| `finish`            | 选中叶子节点时触发         | ^[Function]`(payload: { value, tabIndex, selectedOptions, field? }) => void`                                      |
| `open`              | 弹层打开时触发             | `-`                                                                                                               |
| `close`             | 弹层关闭时触发             | `-`                                                                                                               |
| `opened`            | 弹层打开且动画结束后触发   | `-`                                                                                                               |
| `closed`            | 弹层关闭且动画结束后触发   | `-`                                                                                                               |
| `clickTab`          | 点击任意级别的标签页时触发 | ^[Function]`(tabIndex: string \| number, title: string) => void`                                                  |
| `clickOverlay`      | 点击遮罩层时触发           | ^[Function]`(event: MouseEvent) => void`                                                                          |
| `update:show`       | 弹层开关变化时触发         | ^[Function]`(visible: boolean) => void`                                                                           |

### 参考

- [Vant Cascader 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/cascader)
