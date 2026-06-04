# 表单模型

Form 是 `@silver-formily/core` 的顶层聚合模型。它不把所有能力都塞进一个类里，而是把字段树、表单值、生命周期、校验入口和联动入口组织到同一个上下文中。

换句话说：**Form 负责“统筹”，具体机制由字段模型、路径系统、校验系统和联动系统分别完成。**

## 核心职责

| 职责         | 说明                                                                                          | 延伸阅读                      |
| ------------ | --------------------------------------------------------------------------------------------- | ----------------------------- |
| 状态容器     | 维护 `values`、`initialValues`、`pattern`、`display`、`validating`、`submitting` 等表单级状态 | [值与状态](/guide/values)     |
| 字段工厂     | 创建 `Field`、`ArrayField`、`ObjectField`、`VoidField`，并把它们挂到同一棵字段树中            | [字段模型](/guide/field)      |
| 字段图管理   | 导入、导出和清空字段图，用于恢复表单结构与字段状态                                            | 本页                          |
| 路径查询入口 | 通过 `query()` 按路径表达式查找字段                                                           | [路径系统](/guide/path)       |
| 生命周期中心 | 通过 `heart` 发布生命周期事件，并让 effects 订阅这些事件                                      | [联动系统](/guide/linkage)    |
| 聚合操作入口 | 提供 `validate()`、`submit()`、`reset()` 等表单级批量操作                                     | [校验系统](/guide/validation) |

## 创建表单

`createForm()` 会创建一个 Form 实例。常见配置包括初始值、展示状态、交互模式、校验策略和副作用函数：

```ts
import { createForm, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  initialValues: {
    username: 'silver',
  },
  effects() {
    onFieldValueChange('username', (field) => {
      console.log('username changed:', field.value)
    })
  },
})
```

Form 创建后就是整张表单的运行时上下文。字段、联动、校验和 UI 消费方都会围绕这个实例读写状态。

## 字段管理

Form 负责创建字段并维护字段集合：

```ts
const username = form.createField({
  name: 'username',
  value: '',
})

const users = form.createArrayField({
  name: 'users',
})

const layout = form.createVoidField({
  name: 'layout',
})
```

字段创建后会进入 Form 的字段树。后续可以通过路径查询目标字段：

```ts
form.query('username').take()
form.query('users.*.name').map()
form.query('**.email').forEach((field) => {
  field.disabled = true
})
```

字段自身的状态规则、数据读写、显隐、组件代理等内容，请阅读 [字段模型](/guide/field)。

## 字段图

Form 可以导入和导出字段图。字段图保存的是字段结构和字段状态，适合做状态恢复、调试快照或动态表单结构复用。

```ts
const graph = form.getFormGraph()

form.setFormGraph(graph)

form.clearFormGraph()
```

字段图关注的是**字段模型树**，而不是单纯的 `values`。如果只想读写表单数据，应使用 `values` / `initialValues` 或深路径读写方法。

## 值入口

Form 维护表单级数据，并提供深路径读写方法：

```ts
form.setValues({
  profile: {
    name: 'Silver',
  },
})

form.setValuesIn('profile.age', 18)

console.log(form.values)
console.log(form.getValuesIn('profile.name'))
```

字段并不会单独保存一份独立数据。数据型字段的 `field.value` 本质上会通过字段的 `path` 读写 `form.values`。这部分机制请阅读 [值与状态](/guide/values) 和 [路径系统](/guide/path)。

## 生命周期与 effects

Form 内部有一个 `heart`，用于发布生命周期事件。`effects()` 中注册的 hooks 会订阅这些事件：

```ts
import {
  createForm,
  onFieldValueChange,
  onFormSubmit,
} from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => {
      console.log('submit:', form.values)
    })

    onFieldValueChange('username', (field) => {
      console.log(field.value)
    })
  },
})
```

生命周期 hooks 是 Form 提供的主动副作用入口；字段的 `reactions` 则是依赖追踪驱动的被动联动入口。两者如何配合，请阅读 [联动系统](/guide/linkage)。

## 聚合操作

Form 提供表单级操作入口：

```ts
await form.validate()

await form.submit(async (values) => {
  await request(values)
})

await form.reset()
```

这些方法会聚合字段树中的数据字段来执行批量逻辑。例如 `form.validate()` 会调度匹配字段的校验，而每个字段如何声明规则、产生反馈，仍由字段模型和校验系统负责。

## 阅读建议

表单模型建议按下面顺序理解：

1. [Form 模型](/guide/form)：看清顶层聚合职责
2. [Field 模型](/guide/field)：理解字段状态和字段类型
3. [值与状态](/guide/values)：理解数据如何被读写和聚合
4. [路径系统](/guide/path)：理解字段树和数据路径的关系
5. [校验系统](/guide/validation)：理解规则、触发时机和反馈
6. [联动系统](/guide/linkage)：理解 effects 与 reactions
