# @silver-formily/reactive-vue

> 🧠 使用 Vue3 封装的 `@formily/reactive-vue`。

## ✨ 特性

- **`observer` / `useObserver`**：把组件渲染函数托管给 Formily Tracker，自动收集依赖并精准更新。
- **`formilyComputed`**：将 Formily 的响应式表达式包装成 Vue `computed`，充分复用生态能力（Pinia、组件 props 等）。
- **`autorunEffect` / `reactionWatch`**：为 `autorun` 与 `reaction` 提供 Vue 生命周期封装，组件卸载时自动释放订阅，也支持手动提前停止。

## 📦 安装

```bash
pnpm add @silver-formily/reactive-vue @formily/reactive
# 或者：npm install / yarn add
```

确保项目已使用 Vue 3.3+ 并启用 Composition API。

## 🚀 快速开始

```vue
<script setup lang="ts">
import { observable } from '@formily/reactive'
import {
  autorunEffect,
  formilyComputed,
  useObserver,
} from '@silver-formily/reactive-vue'

const state = observable({
  name: 'Formily',
  greetCount: 0,
})

const uppercaseName = formilyComputed(() => state.name.toUpperCase())
autorunEffect(() => {
  console.log('name changed:', state.name)
})

useObserver()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target)
    return
  state.name = target.value
  state.greetCount++
}
</script>

<template>
  <div>
    <input :value="state.name" @input="handleInput">
    <p>原始：{{ state.name }}</p>
    <p>大写：{{ uppercaseName }}</p>
    <p>响应次数：{{ state.greetCount }}</p>
  </div>
</template>
```

`autorunEffect` / `reactionWatch` 必须在 `setup()` 或任意活动中的 effect scope 里调用，这样才能把 `dispose` 绑定到作用域释放时机。如果它们运行在组件 `setup()` 中，组件卸载时会自动清理；如果需要更早停止订阅，也可以接住它们返回的清理函数并手动调用。

更多 demo：`docs/demos` 或在线文档（见下文）。

## 📚 文档与示例

- 官网（VitePress）：<https://reactive-vue.silver-formily.org>
- English docs：<https://reactive-vue.silver-formily.org/en/>（或在文档站右上角切换语言）
- 快速入门、API、Demo：`docs/index.md`
- 运行文档站点：`pnpm docs:dev`

## 🤝 贡献

欢迎 Issue/PR！请确保：

1. 运行 `pnpm lint && pnpm test` 保持通过。
2. 如涉及文档/示例，更新 `docs/` 并附上复现步骤。
3. 遵循项目约定的 Commit 规范（可使用 `pnpm commit`）。

## 📄 许可证

MIT © Hezhengxu
