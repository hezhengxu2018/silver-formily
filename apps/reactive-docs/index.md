# 介绍

本文档网站是对 `@formily/reactive` 官方文档的一次重构。移除了官方文档中对Mobx的介绍部分，减少额外的理解负担；同时对文档中的例子添加了可交互的Demo，方便理解。

## 背景

`@formily/reactive` 在架构上与 `mobx` 是一致的。它是整个 `formily` 框架的响应式基础，一套独立的响应式方案可以更简洁的与不同的前端框架整合。

如果不是自己封装组件是不需要查阅本文档的，formily的前端框架绑定库已经抹平了这部分差距，在使用上是无感的。

如果你刚刚开始接触formily可以先跳过本文档的阅读，当你有了组件封装的需求之后再开始学习本文档。

## 最佳实践

官方文档的最佳实践可以总结成一下三条：

1. 能不深度包装，就不要用深度包装。
2. 尽量使用 `computed` / `batch`。
3. `autorun` / `reaction` 调用后记得 `dispose`。

## 删减章节

文档在重构时移除了对前端框架绑定库的文档，最核心的原因当然是前端框架是独立的一个库，他应该有一份独立的文档。如果你想找 `@formily/reactive-vue` 或者 `@formily/reactive-react` 可以去[Formily官方文档](https://reactive.formilyjs.org/)中查看。

如果你已经在使用 `silver-formily` 了，可以查看 `@silver-formily/reactive-vue` 的[官方文档](https://reactive-vue.silver-formily.org/)，他在原来的官方文档的基础上补充添加了部分工具函数。
