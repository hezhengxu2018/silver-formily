# TimePicker 时间选择

::: warning 与官方封装的差异
直接使用 Dayjs 值，不接受旧版字符串协议；format 遵循 antd 6。
:::

TimePicker 用于表单中的时间选择，支持 Field 与 Schema 绑定。

## 基础用法

::: tip 示例适配说明
本例按 antd 6 API 编写，展示字段绑定、阅读态和重置。
:::

:::demo
time-picker/basic.tsx
:::

## API

| 接口                 | 行为                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| 组件属性、事件及 ref | 遵循 [Ant Design 6 TimePicker](https://ant.design/components/time-picker) |
| 字段 value           | Dayjs，范围为原生 Dayjs 元组                                              |
| pattern="readPretty" | 展示当前值，不允许改变字段；空值使用 PreviewText 占位配置                 |
| disabled、校验状态   | 继承字段与 FormItem 的原生反馈上下文；仅应用原生支持的能力                |

## 接口数据转换

初始化和提交时由业务代码转换；封装不改变值的类型。

```tsx
import dayjs from 'dayjs'

const form = createForm({ initialValues: { date: dayjs('2026-11-06') } })
const payload = { date: form.values.date?.format('YYYY-MM-DD') ?? null }
```

`RangePicker` 保留原生空端点；`disabledDate`、`onChange` 等接口中的日期仍然是 Dayjs。展示格式支持原生字符串、数组、函数及 mask 配置；阅读态使用首个格式。
