---
mobileDemo: rate/index.tsx
---

# Rate

> `Rate` 是对 antd-mobile `Rate` 的 Formily 适配，字段值为数字，支持半星评分和自定义外观。

## 基础使用

通过字段初始值设置评分，点击星星更新字段值。默认允许再次点击当前评分清空为 `0`。

<<< @/zh/demos/rate/basic.tsx

## 半星与自定义外观

`allowHalf` 开启半星评分，`allowClear: false` 禁止再次点击清空。通过 `count`、`character` 和 CSS 变量自定义外观。

<<< @/zh/demos/rate/appearance.tsx

## 字段状态

支持 Formily 字段的 `disabled`、`readOnly` 和 `readPretty` 状态，均以只读评分展示。antd-mobile Rate 没有原生 `disabled` 属性，封装将其映射为 `readOnly`，不额外添加置灰样式。

<<< @/zh/demos/rate/status.tsx

## API

### 属性

| 属性名       | 类型                      | 描述                         | 默认值  |
| ------------ | ------------------------- | ---------------------------- | ------- |
| `value`      | `number`                  | 当前评分，由字段值控制       | -       |
| `onChange`   | `(value: number) => void` | 评分变化回调                 | -       |
| `count`      | `number`                  | 星星总数                     | `5`     |
| `allowHalf`  | `boolean`                 | 是否允许半星                 | `false` |
| `allowClear` | `boolean`                 | 是否允许再次点击清空         | `true`  |
| `character`  | `ReactNode`               | 自定义评分字符               | 星形    |
| `disabled`   | `boolean`                 | 禁止修改，映射为原生只读状态 | `false` |
| `readOnly`   | `boolean`                 | 是否只读                     | `false` |

### CSS 变量

通过 `style` 设置 `--star-size`、`--active-color`、`--inactive-color` 和 `--inactive-color-half`。

其余属性参考 [antd-mobile Rate 官方文档](https://mobile.ant.design/zh/components/rate)。
