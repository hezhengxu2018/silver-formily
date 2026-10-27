---
mobileDemo: cascader/index.tsx
---

# Cascader

> `Cascader` 是对 antd-mobile 分栏级联选择弹层的 Formily 适配，字段值为从父级到子级的选项值数组。滚轮式级联选择请使用 [CascadePicker](./cascade-picker)。

## 弹层选择

通过字段 `dataSource` 提供树形选项，封装会将其映射到原生 `options`。

当前封装保留原生弹层用法，没有自动生成触发按钮，也没有将 `onConfirm` 映射为字段的 `onChange`。需要自行控制 `visible`，在 `onClose` 关闭弹层，并在 `onConfirm` 中调用 `form.setValuesIn` 或字段的 `setValue` 写回确认值。

<<< @/zh/demos/cascader/basic.tsx

叶子节点不要设置 `children: []`，应省略 `children`，以便组件识别最后一级。

## 阅读态

字段设置 `readPretty` 后切换为 `PreviewText.Cascader`，根据数据源将路径值转换为标签。默认以 `/` 分隔，可通过 `PreviewText.Placeholder` 配置空值占位。

<<< @/zh/demos/cascader/preview.tsx

## API

| 属性名            | 类型                      | 描述                           | 默认值  |
| ----------------- | ------------------------- | ------------------------------ | ------- |
| 字段 `dataSource` | `CascaderOption[]`        | 树形选项，映射到组件 `options` | -       |
| `value`           | `(string \| number)[]`    | 字段路径值                     | -       |
| `visible`         | `boolean`                 | 是否展示弹层，由调用方管理     | `false` |
| `title`           | `ReactNode`               | 弹层标题                       | -       |
| `onConfirm`       | `(value, extend) => void` | 确认回调，需要手动写回字段     | -       |
| `onSelect`        | `(value, extend) => void` | 弹层内选项变化回调             | -       |
| `onClose`         | `() => void`              | 关闭回调，需要同步关闭状态     | -       |

选项使用 `{ label, value, disabled?, children? }` 结构。推荐统一通过字段 `dataSource` 供给选项，保证编辑态与阅读态使用相同数据。

原生 Cascader 不提供 `disabled` / `readOnly` 属性；当前封装也没有额外处理这两个字段状态。需要限制选择时，由调用方限制打开弹层和确认写回；仅展示标签可使用 `readPretty`。

其余配置参考 [antd-mobile Cascader 官方文档](https://mobile.ant.design/zh/components/cascader)。
