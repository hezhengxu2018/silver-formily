# @silver-formily/reactive-vue

[English README](./README.en.md)

## Overview

`@silver-formily/reactive-vue` 实现 Silver Formily 响应式引擎与 Vue 3 生命周期之间的桥接层。它将 observer、依赖追踪与 reaction 语义绑定到组件渲染与 effect scope 中。

## Runtime Positioning

该包位于响应式引擎与 Vue 渲染层之间：

- 以下层 `@silver-formily/reactive` 为状态和依赖模型
- 以上层 `@silver-formily/vue` 为典型消费方
- 也可直接服务于自定义 Vue 组件或 renderer

## Public Surface

- `observer`
- `useObserver`
- `formilyComputed`
- `autorunEffect`
- `reactionWatch`

## Use Cases

- 在 Vue 3 中消费 Silver Formily observable 状态
- 将 reaction 生命周期绑定到组件作用域
- 为自定义 renderer 提供细粒度订阅能力

## Installation

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive vue
```

## Documentation

- Docs: <https://reactive-vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
