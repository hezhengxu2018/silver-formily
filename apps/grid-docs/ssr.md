# SSR 指南

本页聚焦 `@silver-formily/grid` 在 SSR / Hydration 阶段的推荐实践。

## 问题背景

Grid 的真实列数依赖容器宽度，通常只能在客户端拿到。若没有 fallback，首屏会先出现错误布局，随后在客户端修正。

## 推荐配置

```ts
const grid = new Grid({
  ssrWidth: 1000,
  minColumns: [2, 3, 4, 5],
  maxColumns: [2, 3, 4, 5],
  shouldVisible: node => node.index < 5,
})
```

## 执行时机

- `grid.connect()` 触发的 `shouldVisible` 会在 hydration 前后都执行。
- 若希望服务端模板阶段也执行同一规则，请在 SSR 渲染时显式调用 `grid.resolveSsrVisible(...)`。

## 配置项

| 选项            | 类型       | 默认值 | 说明                                                  |
| --------------- | ---------- | ------ | ----------------------------------------------------- |
| `ssrWidth`      | `number`   | -      | SSR 预估容器宽度，用于 `ready=false` 时计算断点与列数 |
| `shouldVisible` | `function` | -      | hydration 前后 + SSR 手动渲染阶段可见性规则           |

## 示例

### 1、 SSR fallback 列模板

:::demo
ssrFallback
:::

### 2、 hydration 前后可见性规则

:::demo
deferVisibility
:::

## 分层接入（推荐）

核心层保持无框架，`@silver-formily/grid` 只提供纯计算：

```ts
const visible = grid.resolveSsrVisible({ index, span, originSpan: span })
```

Vue 层在模板渲染前过滤数据（例如 `computed` / composable）：

```ts
const visibleItems = computed(() =>
  items.filter((item, index) =>
    grid.resolveSsrVisible({ index, span: item.span, originSpan: item.span }),
  ),
)
```

## Vue SSR 示例

```vue
<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const templateColumns = ref('repeat(3,minmax(0,1fr))')
const items = [
  { title: 'A', span: 2 },
  { title: 'B', span: 1 },
  { title: 'C', span: 1 },
  { title: 'D', span: 2 },
]

const grid = markRaw(new Grid({
  ssrWidth: 1000,
  minColumns: [2, 3, 4, 5],
  maxColumns: [2, 3, 4, 5],
  shouldVisible: node => node.index < 3,
  onDigest(current) {
    templateColumns.value = current.templateColumns
  },
}))

const visibleItems = computed(() =>
  items.filter((item, index) =>
    grid.resolveSsrVisible({ index, span: item.span, originSpan: item.span }),
  ),
)

let dispose: (() => void) | undefined
onMounted(() => {
  if (containerRef.value) {
    dispose = grid.connect(containerRef.value)
  }
})
onBeforeUnmount(() => {
  dispose?.()
})
</script>

<template>
  <div ref="containerRef" :style="{ display: 'grid', gridTemplateColumns: templateColumns, gap: '10px' }">
    <div v-for="item in visibleItems" :key="item.title" :data-grid-span="item.span">
      {{ item.title }}
    </div>
  </div>
</template>
```

- `visibleItems` 在 SSR 渲染阶段就会被过滤，保证首屏 HTML 可见性一致。
- 客户端 `connect()` 后继续复用同一套 `shouldVisible` 规则。

## shouldVisible 使用建议

- `shouldVisible` 在 hydration 前后都生效；也可通过 `grid.resolveSsrVisible` 在 SSR 渲染阶段复用。
- 若你在 `shouldVisible` 中需要访问真实 DOM，请先判断节点是否包含 `element` 字段。
