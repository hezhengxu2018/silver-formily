# 快速开始

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-vue @formily/reactive
```

```bash [npm]
npm install @silver-formily/reactive-vue @formily/reactive
```

:::

## 主要改动

1. 移除 `vue-demi` ，现在是一个仅适用于 Vue3 的封装库。
2. 新增部分hooks函数，在Vue3中使用这些hooks在组件卸载时会自动dispose，降低心智负担。
