# Radio

> 单选框

::: warning 注意
你永远都应该使用`Radio.Group`而不是`Radio`，本组件实际上并未对`Radio`进行封装。是原始的`ElRadio`组件。新版`ElRadio`的入参value会和Field的入参冲突，想要兼容就必须对入参进行额外的包裹，带来不必要的复杂度。而且对于表单而言应该没有单独使用的场景，额外的封装显得有些多余。
:::

::: tip 提示
本组件做了对低版本`element-plus`的兼容处理，即无论你在使用哪个版本的`element-plus`，不使用插槽时dataSource中的对象都应包含`label`和`value`（但在低版本时使用插槽渲染还是要使用`label`属性来作为`value`）。
:::

## Markup Schema 案例

:::demo

radio/markup-schema

:::

## JSON Schema 案例

:::demo

radio/json-schema

:::

## Template 案例

:::demo

radio/template

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/radio.html](https://cn.element-plus.org/zh-CN/component/radio.html)

### 扩展属性

| 属性名     | 类型                           | 描述     | 默认值      |
| ---------- | ------------------------------ | -------- | ----------- |
| optionType | ^[enum]`'default' \| 'button'` | 样式类型 | `'default'` |

## Checkbox Slot

| 插槽名 | 说明                               | 类型                  |
| ------ | ---------------------------------- | --------------------- |
| option | 自定义每个选项渲染方式的作用域插槽 | ^[object]`{ option }` |

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
