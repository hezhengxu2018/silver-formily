# 字段模型

Formily 的字段模型包含两大类：**数据型字段**和**虚数据型字段**。

- **数据型字段 (Field)**：维护表单提交数据对应的字段状态
- **虚数据型字段 (VoidField)**：不维护表单数据，主要作为 UI 容器组织字段结构

字段模型关注的是“一个字段拥有哪些状态，以及这些状态如何影响数据和 UI”。路径匹配、校验规则和联动规则已经独立成单独章节：

- 字段树路径与数据路径：[路径系统](/guide/path)
- 校验器、触发时机和反馈：[校验系统](/guide/validation)
- `effects` 与 `reactions`：[联动系统](/guide/linkage)

## 数据型字段

数据型字段共有三种具体形态：

| 类型          | 继承关系     | 职责                           |
| ------------- | ------------ | ------------------------------ |
| `Field`       | —            | 维护非自增型数据字段           |
| `ArrayField`  | 继承自 Field | 维护自增列表字段，支持增删移   |
| `ObjectField` | 继承自 Field | 维护自增对象字段，支持属性增删 |

> Field 并不只能存储简单类型，它可以存放任意数据类型。区别在于：如果需要数组项添加、删除、移动，应使用 ArrayField；如果需要对象属性添加、删除，应使用 ObjectField。没有这类交互需求时，统一使用 Field 即可。

## 基础状态

字段常见状态可以分成几组：

| 状态                                                            | 说明                    |
| --------------------------------------------------------------- | ----------------------- |
| `value` / `initialValue`                                        | 当前值与初始值          |
| `inputValue` / `inputValues`                                    | 最近一次输入值          |
| `display` / `visible` / `hidden`                                | 字段展示状态            |
| `pattern` / `editable` / `disabled` / `readOnly` / `readPretty` | 字段交互模式            |
| `validator` / `feedbacks`                                       | 校验规则与反馈          |
| `component` / `decorator`                                       | UI 组件与装饰器代理信息 |
| `dataSource`                                                    | 字段可选项数据源        |

字段状态本身是响应式的。UI 渲染层、`reactions` 和 effects 都可以消费这些状态。

## 显隐规则

字段的显示与隐藏通过 `display` 属性表达：

| display 值 | 含义         | 对数据的影响   |
| ---------- | ------------ | -------------- |
| `visible`  | 字段 UI 显示 | 恢复字段数据   |
| `hidden`   | 字段 UI 隐藏 | 保留字段数据   |
| `none`     | 字段 UI 隐藏 | 不保留字段数据 |

在 `display` 之上还提供两个便捷属性：

| 属性      | 取值    | 含义                        |
| --------- | ------- | --------------------------- |
| `visible` | `true`  | 等同于 `display: 'visible'` |
| `visible` | `false` | 等同于 `display: 'none'`    |
| `hidden`  | `true`  | 等同于 `display: 'hidden'`  |
| `hidden`  | `false` | 等同于 `display: 'visible'` |

如果父节点主动设置了 `display`，而子节点没有主动设置，子节点会继承父节点的 `display`。

```ts
field.setDisplay('hidden')
field.setDisplay('none')
field.setDisplay(null) // 恢复为继承父节点的 display
```

## 交互模式

字段通过 `pattern` 表达交互模式：

| pattern 值   | 含义   |
| ------------ | ------ |
| `editable`   | 可编辑 |
| `disabled`   | 禁用   |
| `readOnly`   | 只读   |
| `readPretty` | 阅读态 |

也可以通过便捷属性切换：

```ts
field.editable = true
field.disabled = true
field.readOnly = true
field.readPretty = true
```

## 数据读写

Field 是数据型字段，但它不单独维护一份独立数据，而是通过自身 `path` 直接读写 `form.values`。

```ts
console.log(field.value)
console.log(field.initialValue)
console.log(field.inputValue)

field.value = 'new value'
field.initialValue = 'default'

field.onInput('input value')
field.setValue('programmatic value')
```

`onInput()` 更接近用户输入行为：它会写入值、记录输入值、标记 modified，并触发 `triggerType: 'onInput'` 的校验规则。

## 数据源

字段的值除了来自输入框，也可能来自下拉框、单选、多选等数据源。`dataSource` 用于代理这类可选项数据：

```ts
field.dataSource = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
]

field.setDataSource([
  { label: '选项 3', value: '3' },
])
```

消费端 UI 组件需要自己完成数据源映射和展示。

## 组件代理

字段模型可以代理 UI 组件信息，方便在联动中精细控制组件属性。

`component` 的结构是 `[Component, ComponentProps]`：

```ts
field.component = [InputComponent, { placeholder: '请输入' }]

field.setComponent(InputComponent, { placeholder: '请输入' })
field.setComponentProps({ placeholder: '新的 placeholder' })
```

## 装饰器代理

`decorator` 用于维护字段的包裹容器，例如 FormItem、布局容器等。

```ts
field.decorator = [FormItemComponent, { label: '用户名' }]

field.setDecorator(FormItemComponent, { label: '用户名' })
field.setDecoratorProps({ label: '新的标签' })
```

## ArrayField

> 详细 API 请参考 [ArrayField API](/api/models/ArrayField)

ArrayField 继承自 Field，在字段状态之外扩展了数组操作方法。这些方法不仅会处理字段数据，还会同步转置 ArrayField 子节点状态，确保字段顺序和数据顺序保持一致。

```ts
const users = form.createArrayField({
  name: 'users',
})

users.push({ name: 'Alice' })
users.insert(0, { name: 'Bob' })
users.move(0, 1)
users.remove(0)
```

常见方法：

| 方法                                 | 说明                |
| ------------------------------------ | ------------------- |
| `push()` / `pop()`                   | 末尾新增 / 删除     |
| `insert()` / `remove()`              | 指定位置新增 / 删除 |
| `move()` / `moveUp()` / `moveDown()` | 移动数组项          |
| `unshift()` / `shift()`              | 头部新增 / 删除     |

## ObjectField

> 详细 API 请参考 [ObjectField API](/api/models/ObjectField)

ObjectField 继承自 Field，适合描述需要动态增删属性的对象字段。

```ts
const profile = form.createObjectField({
  name: 'profile',
})

profile.addProperty('nickname', 'Silver')
profile.removeProperty('nickname')
```

如果对象结构是固定的，直接使用普通 Field 存储对象值也可以。

## VoidField

> 详细 API 请参考 [VoidField API](/api/models/VoidField)

VoidField 是虚数据字段，主要用于组织 UI 结构。它有 `address`，也有自身的 `path`，但它不会把自己的节点写入子数据字段的数据路径中。

```ts
form.createVoidField({
  name: 'layout',
  component: [LayoutComponent],
})

form.createField({
  name: 'layout.username',
})
```

上例中 `layout.username` 的 `address` 是 `layout.username`，但数据字段的 `path` 是 `username`。完整解释请阅读 [路径系统](/guide/path)。
