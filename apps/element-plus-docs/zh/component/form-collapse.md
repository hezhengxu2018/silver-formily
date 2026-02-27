# FormCollapse

> 折叠面板，通常用在布局空间要求较高的表单场景

::: warning 注意
该组件只适用于 Schema 场景。
:::

## Markup Schema 标题使用插槽案例

:::demo

form-collapse/markup-schema

:::

## JSON Schema 案例

:::demo

form-collapse/json-schema

:::

## API

### FormCollapse

| 属性名       | 类型          | 描述                                                       | 默认值 |
| ------------ | ------------- | ---------------------------------------------------------- | ------ |
| formCollapse | IFormCollapse | 传入通过 createFormCollapse/useFormCollapse 创建出来的模型 |        |

`onChange`事件已被组件内部使用，请勿占用。其余参考 [https://cn.element-plus.org/zh-CN/component/collapse.html](https://cn.element-plus.org/zh-CN/component/collapse.html)

### FormCollapse.Item

参考 [https://cn.element-plus.org/zh-CN/component/collapse.html#collapse-插槽](https://cn.element-plus.org/zh-CN/component/collapse.html#collapse-插槽)

### FormCollapse.createFormCollapse

```ts pure
type ActiveKey = string | number
type ActiveKeys = string | number | Array<string | number>

interface createFormCollapse {
  (defaultActiveKeys?: ActiveKeys): IFormCollpase
}

interface IFormCollapse {
  // 激活主键列表
  activeKeys: ActiveKeys
  // 是否存在该激活主键
  hasActiveKey: (key: ActiveKey) => boolean
  // 设置激活主键列表
  setActiveKeys: (keys: ActiveKeys) => void
  // 添加激活主键
  addActiveKey: (key: ActiveKey) => void
  // 删除激活主键
  removeActiveKey: (key: ActiveKey) => void
  // 开关切换激活主键
  toggleActiveKey: (key: ActiveKey) => void
}
```
