# 快速开始

## 安装

::: tip 迁移说明
从 `2.x` 版本开始，Reactive Vue 文档站和示例默认使用 `@silver-formily/reactive`。如果你看到旧的 `@formily/reactive` 写法，请将其视为迁移前背景，而不是当前推荐接入方式。
:::

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-vue @silver-formily/reactive
```

```bash [npm]
npm install @silver-formily/reactive-vue @silver-formily/reactive
```

:::

## 主要改动

1. 移除 `vue-demi` ，现在是一个仅适用于 Vue3 的封装库。
2. 新增部分hooks函数，在Vue3中使用这些hooks在组件卸载时会自动dispose，降低心智负担。
3. 从 `2.x` 起，底层响应式依赖完全切换到 `@silver-formily/reactive`，与 Silver Formily 其余包保持一致。
