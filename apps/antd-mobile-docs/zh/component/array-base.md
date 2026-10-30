---
mobileDemo: array-base/index.tsx
---

# ArrayBase 数组操作基础组件

为数组字段提供上下文、记录作用域和通用操作，不负责渲染数组项或排列布局。需要现成的 Schema 自增列表时，可直接使用 [ArrayItems](./array-items.md)。

## 自定义数组布局

在 Formily `ArrayField` 内放置 `ArrayBase`，遍历数组并用 `ArrayBase.Item` 建立每项上下文。字段路径相对当前数组填写，操作调用当前 ArrayField 的方法。

<<< @/zh/demos/array-base/basic.tsx

## API

### ArrayBase

`IArrayBaseProps`：

| 属性                  | 类型                    | 说明                                 |
| --------------------- | ----------------------- | ------------------------------------ |
| disabled              | boolean                 | 阻止此上下文内的新增、删除和移动操作 |
| onAdd                 | (index: number) => void | 新增后调用，参数为新增项索引         |
| onRemove              | (index: number) => void | 删除后调用，参数为删除前索引         |
| onMoveUp / onMoveDown | (index: number) => void | 调用移动操作后触发，参数为移动前索引 |
| children              | ReactNode               | 自定义布局及操作组件                 |

ArrayBase 不生成 DOM 容器。提供 `RecordsScope`，供后代 Schema 表达式使用 `$records` / `$lookup`；在 Schema 场景下读取当前数组 Schema。

### ArrayBase.Item

`IArrayBaseItemProps`：

| 属性     | 类型      | 说明                                       |
| -------- | --------- | ------------------------------------------ |
| index    | number    | 当前项索引，从 0 开始，必填                |
| record   | unknown   | 当前记录，或接收索引并返回记录的函数，必填 |
| children | ReactNode | 当前项内容                                 |

Item 不生成 DOM 容器。提供 `RecordScope`，供后代 Schema 表达式使用 `$record` / `$index`。

### ArrayBase.Addition

`IArrayBaseAdditionProps` 继承 antd-mobile ButtonProps，额外支持：

| 属性         | 类型                | 说明                                 |
| ------------ | ------------------- | ------------------------------------ |
| title        | string              | 按钮文字；未提供时使用当前字段 title |
| method       | 'push' \| 'unshift' | 默认 push，分别追加到末尾或插入开头  |
| defaultValue | unknown             | 新项默认值，每次新增独立深拷贝       |

默认呈现白底圆角卡片、蓝色文字和圆圈加号，可通过 Button 的 color、fill 等属性调整按钮。onClick 在新增完成后调用。

未配置 defaultValue 时，从 items Schema 推断默认值：object 为 `{}`，array 为 `[]`，void 向其子属性查找；tuple 使用第一个 items Schema。基础类型及手写 JSX 场景建议显式配置 defaultValue。

### ArrayBase.Remove / MoveUp / MoveDown

共用 `IArrayBaseOperationProps`，继承 span 属性并支持 `index?: number`。项内默认使用 Item 上下文索引，项外可以显式指定 index；Item 上下文优先于传入的 index。支持 `ref<HTMLSpanElement>`，onClick 在操作调用后执行，并阻止事件冒泡。

Remove 删除当前项；第一项隐藏 MoveUp，最后一项隐藏 MoveDown，只有一项时两个移动按钮均隐藏。按钮会随数组长度和当前索引更新。

### ArrayBase.Index / Empty

Index 支持 span 属性，将当前索引显示为 `#1.` 等从 1 开始的编号。Empty 仅透传 children，不会自动检测数组是否为空。

### hooks

| 方法                        | 返回值                    | 说明                                                                      |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------- |
| useArray()                  | IArrayBaseContext \| null | 最近的数组上下文，包含 field、schema 和 props；JSX 场景 schema 可能不存在 |
| useIndex(index?: number)    | number                    | 当前项索引；无 Item 时回退到入参或 0                                      |
| useRecord(record?: unknown) | unknown                   | 当前项记录；无 Item 时使用入参，也支持传入取值函数                        |

嵌套数组的操作与 hooks 使用最近的上下文。自定义组件读取记录的响应式属性时，应使用 Formily 的 observer 包装。

### mixin

`ArrayBase.mixin(component)` 将 Addition、Remove、MoveUp、MoveDown、Index、Empty 和三个 hooks 挂载到目标组件，返回类型为原组件类型与 `ArrayBaseMixins` 的交集；不附加 Item。ArrayItems 使用此方法复用操作。

### 状态行为

- editable：显示新增、删除和移动操作。
- disabled：保留禁用的新增按钮，隐藏删除和移动操作。
- readOnly / readPretty：隐藏全部操作。
- `ArrayBase.disabled` 用于阻止操作执行；需要统一禁用字段及按钮外观时，应通过 Formily 的 disabled pattern 配置。

所有组件及公开类型均可从 `@silver-formily/antd-mobile` 根入口导入。
