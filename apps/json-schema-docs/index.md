---
outline: [2, 3]
---

# 快速上手

`@formily/json-schema` 是 Formily 在 JSON Schema 开发模式里的协议层。官方文档将表单开发分为 `Markup Schema`、`JSON Schema` 和 `JSX Components` 三种模式；`Markup Schema`、`JSON Schema`都依赖于`@formily/json-schema`的能力。`@formily/json-schema` 使用一份普通对象来描述表单结构、组件映射与联动逻辑，使得递归渲染成为可能。

简单来说不同库的负责功能如下：

- `@formily/core` 负责 Form 实例、字段状态、校验与副作用
- `@formily/json-schema` 负责 Schema 协议、表达式编译与 Schema 类能力
- 前端框架绑定库（如：`@silver-formily/vue`、`@formily/vue`、`@silver-formily/react`） 负责把 Schema 递归渲染成组件树。

::: tip 提示
Formily 官方示例使用的是 `@formily/vue`。当前重构的文档使用的是 `@silver-formily/vue`，两者在能力上没有区别，在接口上也大致相同，具体区别请参考[官方文档](https://vue.silver-formily.org/)。
:::

## 编写动机

官方文档写的较为粗糙，阅读体验很差，有些地方也没有写清楚。本文档网站是对官方文档的一次重构，提供了完善的例子与良好的搜索体验。

## 安装

```bash
pnpm add @silver-formily/vue @formily/core @formily/json-schema @formily/reactive @silver-formily/reactive-vue @formily/shared
```

`@formily/json-schema` 本身不负责渲染 UI。要在 Vue 中把 Schema 变成真正的表单，还需要 `@formily/core` 和 `@silver-formily/vue`（或者其他前端框架绑定库）。

## 最小可运行示例

一个最小示例通常只有 4 步：

1. 调用 `createForm()` 创建表单实例
2. 调用 `createSchemaField()` 注册 Schema 中会用到的组件
3. 编写一份 `schema`，通过 `type`、`properties`、`x-component` 描述字段
4. 用 `FormProvider` 和 `SchemaField` 完成渲染

::: demo
guide/quick-start
:::

上面的示例里有几个关键点：

- `createSchemaField({ components })` 决定了 `x-component` 可以使用哪些组件名
- `schema.properties.nickname` 和 `schema.properties.bio` 描述了两个字段
- `x-component-props` 会原样传给目标组件
- `FormConsumer` 只是为了展示当前值，业务代码里可以换成提交、校验或联动逻辑

## 参考

- [Formily 官方：核心概念 / JSON Schema 开发模式](https://vue.formilyjs.org/guide/concept#json-schema-%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F)
