---
outline: [2, 3]
---

# 快速上手

`@silver-formily/json-schema` 是 Silver Formily 在 JSON Schema 开发模式里的协议层。当前文档将表单开发分为 `Markup Schema`、`JSON Schema` 和 `JSX Components` 三种模式；其中 `Markup Schema` 和 `JSON Schema` 都依赖 `@silver-formily/json-schema` 提供的协议能力。`@silver-formily/json-schema` 使用一份普通对象来描述表单结构、组件映射与联动逻辑，使得递归渲染成为可能。

简单来说不同库的负责功能如下：

- `@silver-formily/core` 负责 Form 实例、字段状态、校验与副作用
- `@silver-formily/json-schema` 负责 Schema 协议、表达式编译与 Schema 类能力
- 前端框架绑定库（如：`@silver-formily/vue`） 负责把 Schema 递归渲染成组件树。

## 安装

```bash
pnpm add @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared
```

`@silver-formily/json-schema` 本身不负责渲染 UI。要在 Vue 中把 Schema 变成真正的表单，还需要 `@silver-formily/core` 和 `@silver-formily/vue`（或者其他前端框架绑定库）。

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

- [上游参考：Formily 核心概念 / JSON Schema 开发模式](https://vue.silver-formily.org/guide/concept#json-schema-%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F)
