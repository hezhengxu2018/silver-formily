# 介绍

## UI 无关

`@silver-formily/core` 是一个**独立的框架无关包**，它存在的价值在于将领域模型从 UI 框架中抽离出来。

这样做有两层好处：

- 开发者不再需要将业务逻辑与 UI 组件强耦合，代码可维护性大幅提升
- 让框架天然具备**跨终端、跨框架**的能力。不管是 React、Vue 还是其他框架，都可以共享 Formily 的领域模型

```ts
// core 是纯逻辑，不依赖任何 UI 框架
import { createForm } from '@silver-formily/core'

// 你可以用同一个 form 实例驱动不同框架的 View 层
// Vue:  @silver-formily/vue
// 或任何自定义渲染
```

## 超高性能

借助 `@silver-formily/reactive` 的响应式内核，`@silver-formily/core` 实现了：

- **依赖追踪**：自动收集字段状态和副作用之间的依赖关系
- **高效更新**：仅在依赖变化时精准通知，避免全量更新
- **按需渲染**：只重新渲染实际发生变化的字段组件

无论面对频繁的字段输入还是复杂的字段联动，都能保证 **O(1)** 级别的更新性能。你无需关心性能优化的事情，专注于业务逻辑即可。

## 领域模型

`@silver-formily/core` 将表单问题拆解为四个领域级问题，并逐一提供了完备的解决方案：

### 数据管理

提供 `values` 和 `initialValues` 双重值管理，支持覆盖、浅合并、深合并三种策略。值与默认值的冲突解决遵循"以用户为准"原则。

```ts
form.setValues({ username: 'silver' })
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
```

### 字段管理

通过 `createField` / `createArrayField` / `createObjectField` / `createVoidField` 创建字段，通过 `query` 灵活查找，通过 `getFormGraph` / `setFormGraph` 导入导出字段集。

```ts
const field = form.createField({ name: 'username' })
const fields = form.query('user.*.name').map()
```

### 校验管理

提供声明式校验规则、动态规则修改、多触发时机（onInput/onBlur/onFocus）、校验策略（validateFirst）、以及丰富的反馈结果（error/warning/success）。

```ts
field.setValidator([
  { required: true },
  { format: 'email', triggerType: 'onBlur' },
])
```

### 联动管理

提供**主动联动**（基于生命周期钩子）和**被动联动**（基于 reactions 依赖追踪）两种模式，覆盖一对一、一对多、多对一等各种联动场景。

```ts
onFieldValueChange('source', (field) => {
  field.form.setValuesIn('target', field.value)
})
```

## 智能提示

`@silver-formily/core` 是一个完整的 TypeScript 项目，在 VSCode、WebStorm 等编辑器中使用时可以获得最大化的智能提示体验。所有 API 都提供了精确的类型定义和泛型支持，让你在编写代码时能享受到完整的自动补全和类型校验。

## 状态可观测

通过安装 [FormilyDevtools](https://chrome.google.com/webstore/detail/formily-devtools/kkocalmbfnplecdmbadaapgapdioecfm?hl=zh-CN) 浏览器扩展，你可以实时观测表单模型的状态变化，快速排查联动问题或校验异常。

## 何时需要手动使用 Core

大多数情况下，你是通过 `@silver-formily/vue` 等 UI 绑定包间接使用 core 的能力。以下场景需要直接使用 core：

- **自定义组件封装**：需要操作字段的底层 API（如 setState、setValidator）
- **副作用逻辑复用**：需要在 effects 函数中编写跨页面的联动逻辑
- **脱离 UI 的表单操作**：如服务端表单校验、测试场景
- **框架无关的工具函数**：如编写一个纯逻辑的表单处理器

如果你刚刚开始接触 Formily，可以从 [快速开始](/) 开始，先感受整体流程，再深入本章了解设计原理。
