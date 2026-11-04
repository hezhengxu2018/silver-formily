---
mobileDemo: radio/index.tsx
---

# Radio

> `Radio` 是对 antd-mobile `Radio` 的 Formily 适配。单选场景应使用 `Radio.Group`。

## 基础使用

通过字段的 `dataSource` 提供选项，支持初始值和表单提交。

<<< @/zh/demos/radio/basic.tsx

## 排列方向

`layout` 控制排列方向，未设置时继承 `FormLayout` 的方向，默认纵向排列。

协议示例通过 `allowClear: true` 开启再次点击取消选中，取消后字段值为 `null`。默认不开启，多选项组同样支持此配置。

<<< @/zh/demos/radio/layout.tsx

## 禁用状态

<<< @/zh/demos/radio/disabled.tsx

## API

### Radio.Group

| 属性名        | 类型                         | 描述                                                    | 默认值       |
| ------------- | ---------------------------- | ------------------------------------------------------- | ------------ |
| `allowClear`  | `boolean`                    | 是否允许再次点击当前选项取消选中，取消后字段值为 `null` | `false`      |
| `layout`      | `'vertical' \| 'horizontal'` | 选项排列方向                                            | `'vertical'` |
| `layoutBlock` | `boolean`                    | 选项容器是否占满整行                                    | `false`      |
| `children`    | `ReactNode`                  | 自定义选项，提供时优先于数据源渲染                      | -            |

其余属性参考 [antd-mobile Radio 官方文档](https://mobile.ant.design/zh/components/radio)。
