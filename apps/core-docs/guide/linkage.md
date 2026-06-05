# 联动系统

:::tip 提示
整个 formily 的响应式都基于 `@silver-formily/reactive`，如果你对下面的 `autorun` 、`reaction`、`observer`等概念不了解的话可以先去阅读其[官方文档](https://reactive.silver-formily.org/)
:::

联动系统用于描述“状态变化后要做什么”。Formily 提供两种常用入口：`effects` 和 `reactions`。

它们看起来一个是主动订阅，一个是被动依赖追踪，但底层都围绕响应式状态变化展开：状态被写入后，系统调度相关消费者，消费者再执行副作用或更新字段状态。

它们的区别主要在**语义包装**上：

- `reactions` 保留依赖语义：在 `autorun` 中执行 `reaction(field)`，函数里读到哪些字段状态，就自动追踪哪些依赖
- `effects` 保留事件语义：内置模型 reaction 监听关键状态变化，再通过 Heart 发布 `LifeCycleTypes`
- `Observer` 保留渲染语义：渲染过程中读取过的状态变化后，只通知相关视图更新

<ThemeImage
  light="/architecture/reaction.png"
  dark="/architecture/reaction.dark.png"
  alt="Formily 联动系统"
/>

因此，主动副作用和被动联动的底层并不是两套互不相关的系统。它们都依赖 observable 的读写追踪，只是触发后的表达方式不同：`reactions` 直接重跑联动函数，`effects` 先转换成生命周期事件，再交给业务 Hook 处理。

每个事件类型都有对应的 Hook API：

```ts
import { onFieldValueChange, onFormSubmit } from '@silver-formily/core'

const form = createForm({
  effects() {
    onFormSubmit((form) => {
      // 表单提交时的副作用
    })
    onFieldValueChange('*', (field) => {
      // 任意字段值变化时的副作用
    })
  },
})
```

## effects：主动副作用

`effects` 适合表达“某个生命周期事件发生时，执行一段业务逻辑”。

```ts
import {
  createForm,
  onFieldValueChange,
  onFormSubmit,
} from '@silver-formily/core'

const form = createForm({
  effects() {
    onFieldValueChange('source', (field) => {
      field.form.setFieldState('target', (state) => {
        state.value = field.value
      })
    })

    onFormSubmit((form) => {
      console.log(form.values)
    })
  },
})
```

主动副作用的特点：

- 由生命周期事件触发
- 可以通过路径选择目标字段
- 适合“一处变化，批量影响多个目标”的场景
- 更像命令式流程，读起来接近事件订阅

## reactions：被动联动

`reactions` 适合表达“当前字段依赖哪些状态，这些状态变化后自动重新计算字段状态”。

```ts
form.createField({
  name: 'email',
  reactions: [
    (field) => {
      const role = field.form.values.role

      field.required = role === 'admin'
      field.visible = role !== 'guest'

      field.setComponentProps({
        placeholder: role === 'admin' ? '请输入管理员邮箱' : '请输入邮箱',
      })
    },
  ],
})
```

首次执行 `reaction(field)` 时，读取到的响应式状态会被自动收集为依赖。后续依赖变化时，该 reaction 会重新执行。

被动联动的特点：

- 由依赖追踪触发
- 适合“多个依赖共同决定一个字段状态”的场景
- 更像声明式计算，字段状态由依赖状态推导出来
- 可以减少手写多个 lifecycle hook 的成本

## 如何选择

| 场景                               | 推荐方式    |
| ---------------------------------- | ----------- |
| 一个字段变化后同步多个字段         | `effects`   |
| 多个字段共同决定一个字段状态       | `reactions` |
| 提交、重置、校验等生命周期副作用   | `effects`   |
| 字段显隐、必填、组件属性等状态推导 | `reactions` |

实际项目中两者经常同时存在：`effects` 负责事件型业务流程，`reactions` 负责字段状态推导。
