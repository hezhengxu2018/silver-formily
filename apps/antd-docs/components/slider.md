# Slider 滑块

::: warning 与官方封装的差异
属性、事件和 ref 遵循 antd 6；Formily 负责字段绑定与阅读态。
:::

Slider 用于表单中的滑块，支持 Field 与 Schema 绑定。

## 基础用法

::: tip 示例适配说明
本例按 antd 6 API 编写，展示字段绑定、阅读态和重置。
:::

:::demo
slider/basic.tsx
:::

## API

| 接口                 | 行为                                                             |
| -------------------- | ---------------------------------------------------------------- |
| 组件属性、事件及 ref | 遵循 [Ant Design 6 Slider](https://ant.design/components/slider) |
| 字段 value           | number / number[]                                                |
| pattern="readPretty" | 展示当前值，不允许改变字段；空值使用 PreviewText 占位配置        |
| disabled、校验状态   | 继承字段与 FormItem 的原生反馈上下文；仅应用原生支持的能力       |

## 来源

本项目扩展，无对应上游封装。迁移参考遵循 [MIT 许可](/licenses/formily-MIT.txt)，本页 API 与示例按当前独立封装整理。
