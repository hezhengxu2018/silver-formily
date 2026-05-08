---
mobileDemo: area/index.vue
---

# Area

> `Area` 是基于 `AreaPanel` 实现的弹出式封装，大部分配置项可直接参考`AreaPanel`。

## 基础使用

<<< @/zh/demos/area/basic.vue

## API

### 使用约定

- 触发区交互状态跟随 `Field` 的 `disabled` / `readOnly` / `readPretty`，不会透传到内部 AreaPanel
- `displayFormatter` 可自定义触发区回显文本

其余约定请参考 [AreaPanel](/component/area-panel)

### 补充 Props

| 属性名             | 类型                                            | 描述                 | 默认值     |
| ------------------ | ----------------------------------------------- | -------------------- | ---------- |
| `placeholder`      | `string`                                        | 触发输入框占位文本   | `'请选择'` |
| `separator`        | `string`                                        | 触发输入框回显分隔符 | `' / '`    |
| `popupProps`       | `AreaPopupProps`                                | 透传给 Popup 的属性  | `{}`       |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义触发输入框回显 | `-`        |

地区面板相关属性和插槽可以直接参考 [AreaPanel](/component/area-panel)，例如 `modelValue`、`areaList`、`columnsNum`、`columnsPlaceholder` 等。

### Popup Props

参考 [createPopup](/component/create-popup)。

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `opened`            | 弹层打开后触发       | `-`                                          |
| `closed`            | 弹层关闭后触发       | `-`                                          |
