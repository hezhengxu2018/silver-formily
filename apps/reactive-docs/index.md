# 介绍

本文档网站聚焦于 `@silver-formily/reactive` 包本身。内容延续了 Formily Reactive 的核心概念，同时补充了更贴近 silver-formily 使用场景的示例与可交互 Demo，方便在实际封装中快速验证响应式行为。

## 背景

`@silver-formily/reactive` 在架构上与 `mobx` 是一致的。它是整个 `silver-formily` 体系的响应式基础，一套独立的响应式方案可以更简洁的与不同的前端框架整合。

如果不是自己封装组件是不需要查阅本文档的，formily的前端框架绑定库已经抹平了这部分差距，在使用上是无感的。

如果你刚刚开始接触formily可以先跳过本文档的阅读，当你有了组件封装的需求之后再开始学习本文档。

## 最佳实践

本包文档延续的最佳实践可以总结成一下三条：

1. 能不深度包装，就不要用深度包装。
2. 尽量使用 `computed` / `batch`。
3. `autorun` / `reaction` 调用后记得 `dispose`。

## 删减章节

这里不再展开前端框架绑定库的文档，最核心的原因是前端框架绑定本身就是独立包，应该有各自独立的文档。如果你想找 Vue 侧绑定，请直接查看 [`@silver-formily/reactive-vue` 文档站](https://reactive-vue.silver-formily.org/)。

如果你已经在使用 `silver-formily`，还可以继续查看 `@silver-formily/reactive-vue` 的[官方文档](https://reactive-vue.silver-formily.org/)，它在响应式基础能力之上补充了更贴近 Vue 的工具函数。
