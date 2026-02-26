# SSR 指南

本页聚焦 `@silver-formily/grid` 在 SSR / Hydration 阶段的推荐实践。

## 问题背景

Grid 的真实列数依赖容器宽度，通常只能在客户端拿到。若没有 fallback，首屏会先出现错误布局，随后在客户端修正。

## 推荐配置

```ts
const grid = new Grid({
  ssrColumns: 3,
  ssrTemplateColumns: 'repeat(3,minmax(0,1fr))',
  deferVisibilityUntilHydration: true,
})
```

## 配置项

| 选项                            | 类型      | 默认值 | 说明                                               |
| ------------------------------- | --------- | ------ | -------------------------------------------------- |
| `ssrColumns`                    | `number`  | `1`    | `ready=false` 时 `grid.columns` 的回退列数         |
| `ssrTemplateColumns`            | `string`  | -      | `ready=false` 时 `grid.templateColumns` 的回退模板 |
| `deferVisibilityUntilHydration` | `boolean` | `true` | 是否延迟执行 `shouldVisible` 的 DOM 可见性副作用   |

## 示例

### 1、 SSR fallback 列模板

:::demo
ssrFallback
:::

### 2、 hydration 前后可见性时机

:::demo
deferVisibility
:::

## shouldVisible 使用建议

- 将 `shouldVisible` 视作“布局后修正”能力。
- 若某些组件必须在 SSR 首屏就排除，请优先在模板层通过 `v-if` 或数据条件处理。
