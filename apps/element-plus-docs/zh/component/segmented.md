# Segmented

> 分段选择器

## Markup Schema 案例

:::demo

segmented/markup-schema

:::

## JSON Schema 案例

:::demo

segmented/json-schema

:::

## Template 案例

:::demo

segmented/template

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/segmented.html](https://cn.element-plus.org/zh-CN/component/segmented.html)

### 扩展属性

| 属性名  | 类型                                                                | 描述                                             | 默认值 |
| ------- | ------------------------------------------------------------------- | ------------------------------------------------ | ------ |
| options | ^[array]`Array<Record<string, any> \| string \| number \| boolean>` | 选项配置数组，一般情况下请通过`dataSource`来配置 | []     |

## Segmented Slot

| 插槽名  | 说明                     | 类型                |
| ------- | ------------------------ | ------------------- |
| default | 自定义选项渲染作用域插槽 | ^[object]`{ item }` |

## 对象值与属性筛选

设置 `optionAsValue: true` 可将选项对象作为表单值；`optionValueKeys?: string[]` 仅保留指定的顶层属性。未配置时返回完整对象，空数组返回空对象，缺失属性忽略。默认 `optionAsValue` 为 `false`。

筛选只作用于表单输出，不修改 `dataSource`。请在白名单中保留选项标识（如 `value`、`nodeKey` 或 `rowKey` 对应属性），回显按标识从完整数据源读取标签。仅提供标识而不保存 label 也可以正常回显。

```ts
const componentProps = {
  optionAsValue: true,
  optionValueKeys: ['value'],
}
// dataSource: [{ value: 1, label: '选项一', extra: '业务属性' }]
// 表单值: { value: 1 }
```
