# @silver-formily/reactive-vue

> 🧠 Silver Formily 体系下的 Vue 3 响应式绑定层。

::: tip 迁移说明
从 `2.x` 版本开始，`@silver-formily/reactive-vue` 的运行时依赖已经完全迁移到 `@silver-formily/*` 命名空间。安装、示例和工程接入都应使用 `@silver-formily/reactive`，不再推荐 `@formily/reactive`。
:::

## ✨ 特性

- **`observer` / `useObserver`**：把组件渲染函数托管给 Formily Tracker，自动收集依赖并精准更新。
- **`formilyComputed`**：将 Formily 的响应式表达式包装成 Vue `computed`，充分复用生态能力（Pinia、组件 props 等）。
- **`autorunEffect` / `reactionWatch`**：为 `autorun` 与 `reaction` 提供 Vue 生命周期封装，组件卸载时自动释放订阅，也支持手动提前停止。

## 📦 安装

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive
# 或者：npm install / yarn add
```

确保项目已使用 Vue 3.3+ 并启用 Composition API。

## 🚀 快速开始

```vue
<script setup lang="ts">
import { observable } from '@silver-formily/reactive'
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

更多 demo：`apps/reactive-vue-docs/demos` 或在线文档（见下文）。

## 📚 文档与示例

- 官网（VitePress）：<https://reactive-vue.silver-formily.org>
- English docs：<https://reactive-vue.silver-formily.org/en/>（或在文档站右上角切换语言）
- 快速入门、API、Demo：`apps/reactive-vue-docs/index.md`
- 运行文档站点：在仓库根目录执行 `pnpm dev -- reactive-vue-docs`

## 🤝 贡献

欢迎 Issue/PR！请确保：

1. 运行 `pnpm lint && pnpm test` 保持通过。
2. 如涉及文档/示例，更新 `apps/reactive-vue-docs/` 并附上复现步骤。
3. 遵循项目约定的 Commit 规范（可使用 `pnpm commit`）。

## 📄 许可证

MIT © Hezhengxu
