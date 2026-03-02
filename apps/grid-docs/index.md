# 快速开始

`@silver-formily/grid` 用于根据容器尺寸和子节点 `span` 动态计算网格布局。

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/grid @formily/reactive
```

```bash [npm]
npm install @silver-formily/grid @formily/reactive
```

:::

## 基础用法

```ts
import { Grid } from '@silver-formily/grid'

const grid = new Grid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 120,
  maxWidth: 220,
})

const dispose = grid.connect(container)
```

:::demo
basicGrid
:::

## Vue 示例

展示在 Vue 中推荐的接入方式：

- 使用 `createGrid` 创建实例来跳过 @formily/reactive 的深响应式代理。

:::demo
vueUsage
:::

## 重大改动

- 在重构时去掉了polyfill的ResizeObserver，现在依赖浏览器原生的ResizeObserver，在使用时需要注意浏览器的版本需要 Chrome 64 及以上。

- 本库略微添加了一些对SSR的支持，但算不上完善，因为从定位上来说这就是一个运行时才会获取与浏览器DOM绑定的库，其核心的功能也是在运行时计算正确的节点。

## SSR指南

目前对SSR的处理是在SSR阶段视为容器宽度无限大的容器。因为SSR阶段无法获取用户实际的浏览器宽度，也无法计算真实的断点应该是哪个，想要兼容SSR的唯一办法是该网格布局不再使用断点，不然总是无法避免浏览器端与服务器端的渲染不一致，最好将其作为一个仅客户端渲染的库。
