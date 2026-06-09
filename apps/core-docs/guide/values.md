# 值与状态

理解 Form 和 Field 中的值与状态管理机制，是正确使用 core 包的关键。

## 三种值

在 Formily Core 中，每个字段都有三种核心值：

| 值             | 说明       | 触发时机                   |
| -------------- | ---------- | -------------------------- |
| `value`        | 当前有效值 | 失焦、程序化赋值、提交     |
| `inputValue`   | 输入值     | 用户每次输入时实时更新     |
| `initialValue` | 初始默认值 | 创建字段时设置，或手动重置 |

### value vs inputValue

```ts
const field = form.createField({
  name: 'name',
  value: '',
})

// 模拟用户输入 — 实时更新 inputValue
field.onInput('a')
console.log(field.inputValue) // 'a'
console.log(field.value) // '' (尚未确认)

field.onInput('ab')
console.log(field.inputValue) // 'ab'
console.log(field.value) // '' (尚未确认)

// 程序化设置 — 直接更新 value
field.setValue('silver')
console.log(field.inputValue) // 'silver'
console.log(field.value) // 'silver'
```

这个设计的意义在于：

- **inputValue**: 用户可实时看到输入内容，同时可据此做输入校验和即时反馈
- **value**: 只在确认后更新（失焦、提交等），保证表单值的稳定性

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
// 覆盖 (默认) — 完全替换目标值
form.setValues({ username: 'new' }) // values = { username: 'new' }

// 浅合并
form.setValues({ username: 'new' }, 'shallowMerge')

// 深合并
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
// 结果: { profile: { name: 'new', age: 18 } }
```

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
// 获取表单状态快照（不订阅）
const state = form.getFormGraph()

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
