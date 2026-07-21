# 值与状态

理解 Form 和 Field 中的值与状态管理机制，是正确使用 core 包的关键。

## 字段中的值

Field 使用以下状态描述当前值、初始值和最近一次输入：

| 值             | 说明                          | 更新时机                                   |
| -------------- | ----------------------------- | ------------------------------------------ |
| `value`        | 字段当前值，也是表单聚合值    | `onInput`、`setValue` 或其他表单值写入操作 |
| `inputValue`   | 最近一次 `onInput` 的首个参数 | 每次调用 `onInput`                         |
| `inputValues`  | 最近一次 `onInput` 的全部参数 | 每次调用 `onInput`，用于记录多参数组件事件 |
| `initialValue` | 字段初始值                    | 创建字段或调用 `setInitialValue` 时设置    |

### value vs inputValue

```ts
const field = form.createField({
  name: 'name',
  value: 'initial',
})

console.log(field.value) // 'initial'
console.log(field.inputValue) // null

// 模拟用户输入：同时记录输入来源并更新字段值
await field.onInput('user input')
console.log(field.inputValue) // 'user input'
console.log(field.inputValues) // ['user input']
console.log(field.value) // 'user input'
console.log(form.values.name) // 'user input'
console.log(field.selfModified) // true

// 程序化赋值只更新字段值，不会伪装成一次用户输入
field.setValue('programmatic value')
console.log(field.value) // 'programmatic value'
console.log(form.values.name) // 'programmatic value'
console.log(field.inputValue) // 'user input'
```

`inputValue` 不是失焦前的暂存值。`onInput()` 会立即把首个输入参数写入 `value`，因此输入框、下拉框、单选、多选等组件都可以使用同一套输入通道。两类状态的区别在于来源和生命周期：

- `value` 表示当前业务值，`onInput()` 和程序化赋值都会更新它
- `inputValue` / `inputValues` 记录最近一次 `onInput()` 的参数
- `onInput()` 还会标记字段已修改，触发输入变化生命周期，并执行 `triggerType: 'onInput'` 的校验
- `setValue()` 只执行程序化值更新，不更新 `inputValue`，也不会主动标记字段已修改

对于传递多个参数的组件，`inputValues` 会保留完整参数列表，而 `value` 和 `inputValue` 使用第一个参数：

```ts
const option = { label: '管理员', value: 'admin' }

await field.onInput('admin', option)

console.log(field.value) // 'admin'
console.log(field.inputValue) // 'admin'
console.log(field.inputValues) // ['admin', option]
```

## 值的层级

Form 的值是各字段值的聚合视图：

```
Form.values = {
  username: 'silver',          // ← Field(name: 'username').value
  email: 'a@b.com',            // ← Field(name: 'email').value
  profile: {                   // ← ObjectField(name: 'profile')
    name: 'Silver',
    age: 18,                   // ← Field(name: 'profile.age').value
  },
  items: [                     // ← ArrayField(name: 'items')
    { title: 'Item 1' },       // ← Field(name: 'items.0.title').value
    { title: 'Item 2' },       // ← Field(name: 'items.1.title').value
  ],
}
```

### 操作嵌套值

```ts
// 设置深层值
form.setValuesIn('profile.name', 'New Name')

// 获取深层值
const name = form.getValuesIn('profile.name')

// 删除深层值
form.deleteValuesIn('profile.temp')

// 判断路径是否存在
const exists = form.existValuesIn('profile.name')
```

## 值的合并策略

Form 提供了多种合并策略：

```ts
// 深层合并（默认）
form.setValues({ profile: { name: 'new' } })
// 保留 profile 中未传入的属性以及其他顶层属性

// 浅合并
form.setValues({ username: 'new' }, 'shallowMerge')

// 深层合并（当前实现与默认的 merge 相同）
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
// 结果: { profile: { name: 'new', age: 18 } }

// 覆盖——完全替换表单值
form.setValues({ username: 'new' }, 'overwrite')
// 结果: { username: 'new' }
```

`merge` 和 `deepMerge` 当前都递归合并普通对象、整体替换数组；`shallowMerge` 只合并第一层，`overwrite` 则替换整个 `values`。

## 表单状态

### FormState 关键字段

| 状态            | 类型              | 说明             |
| --------------- | ----------------- | ---------------- |
| `values`        | `T`               | 表单当前值       |
| `initialValues` | `T`               | 表单初始值       |
| `modified`      | `boolean`         | 是否有字段被修改 |
| `valid`         | `boolean`         | 是否通过校验     |
| `invalid`       | `boolean`         | 是否校验不通过   |
| `submitting`    | `boolean`         | 是否正在提交     |
| `validating`    | `boolean`         | 是否正在校验     |
| `loading`       | `boolean`         | 是否加载中       |
| `errors`        | `IFormFeedback[]` | 表单级错误       |
| `warnings`      | `IFormFeedback[]` | 表单级警告       |

### self 前缀 vs 汇总状态

Field 状态中带 `self` 前缀的仅表示**自身**状态，不带前缀的表示**自身+子孙**的汇总：

```ts
// selfErrors — 只包含当前字段自己的校验错误
console.log(field.selfErrors)

// errors — 包含当前字段及其所有子孙字段的校验错误
console.log(field.errors)

// 同理
console.log(field.selfValid) // 仅自身是否合法
console.log(field.valid) // 自身及子孙是否全部合法
```

这个设计使得父字段（如 ObjectField）可以聚合子字段的校验状态。

## 响应式状态读取

在副作用或 `autorun` 中读取状态会自动订阅变化：

```ts
import { autorun } from '@silver-formily/reactive'

autorun(() => {
  // 自动订阅 field.value 和 form.values 的变化
  if (field.value !== form.values.username) {
    console.log('值不同步')
  }
})
```

## 状态快照

```ts
// 获取包含 Form 和所有 Field 状态的字段图快照
const graph = form.getFormGraph()

// 只获取 Form 状态快照
const formState = form.getState()

// 获取字段状态快照
const fieldState = field.getState()
```

## 批量更新

多次状态更新应使用 `batch` 合并，避免不必要的中间态通知：

```ts
import { batch } from '@silver-formily/reactive'

batch(() => {
  field.setState({ value: 'a' })
  field.setState({ visible: false })
  field.setState({ loading: true })
  // 只触发一次更新通知
})
```

## 直接赋值与 Setter 的区别

大部分字段状态都可以直接赋值，也可以通过对应的 `setXxx` 方法更新；但它们并不总是完全等价。

### 基本等价的常见场景

以下属性的直接赋值通常会转发到对应 setter，适合按常规属性来理解：

- `field.value = x` 与 `field.setValue(x)`
- `field.initialValue = x` 与 `field.setInitialValue(x)`
- `field.required = x` 与 `field.setRequired(x)`
- `field.selfErrors = []` 与 `field.setSelfErrors([])`
- `field.selfWarnings = []` 与 `field.setSelfWarnings([])`
- `field.selfSuccesses = []` 与 `field.setSelfSuccesses([])`

### 不完全等价的流程状态

以下状态建议优先使用 setter，而不是直接赋值：

- `loading`
- `validating`
- `submitting`

原因是这些 setter 除了修改状态值本身，还会附带运行时语义，例如：

- 清理上一次异步计时器
- 延迟切换某些状态，避免瞬时闪烁
- 触发对应的生命周期事件

例如：

```ts
field.loading = true
field.setLoading(true)
```

这两种写法最终都可能让 `field.loading` 变成 `true`，但只有 `setLoading(true)` 会走完整的运行时流程。

同理：

```ts
form.validating = true
form.setValidating(true)
```

也不应视为完全等价。

### 推荐规则

- 普通值、默认值、反馈状态可以直接赋值
- `loading`、`validating`、`submitting` 这类流程状态优先使用 `setXxx`
- 需要一次性更新多个状态时，优先使用 `setState` / `setFieldState` / `setFormState` 配合 `batch`

## 相关机制

值与状态是其他机制的基础，但具体规则分别在独立章节说明：

- 通过字段路径读写嵌套数据：[路径系统](/guide/path)
- 根据状态变化修改其他字段：[联动系统](/guide/linkage)
- 读取和写入错误、警告、成功反馈：[校验系统](/guide/validation)
