# @silver-formily/vue

[English README](./README.en.md)

`@silver-formily/vue` 是 Silver Formily 面向 Vue 3 的运行时绑定层。它把 `@silver-formily/core` 的表单模型、字段状态和副作用系统接到 Vue 组件树中，提供 `Field`、`SchemaField`、`FormProvider`、`connect`、`mapProps` 等表单渲染能力。

## 这个包在做什么

如果说 `@silver-formily/core` 是表单的大脑，那么 `@silver-formily/vue` 就是 Vue 3 世界里的渲染与连接层。它负责：

- 把表单实例注入到组件树中
- 把字段模型映射成 Vue 组件
- 提供 schema 驱动表单的运行时组件
- 统一 `modelValue` / `onUpdate:modelValue` 风格的 Vue 3 事件契约

## 为什么选择它

- 完全面向 Vue 3，不再保留 Vue 2 兼容分支
- 与 `@silver-formily/core`、`@silver-formily/json-schema`、`@silver-formily/reactive-vue` 同命名空间协作
- 更适合 Element Plus、Vant 等 Vue 3 组件库
- 适合从 `@formily/vue` 迁移到统一的 `@silver-formily/*` 体系

## 主要能力

- 组件：`FormProvider`、`FormConsumer`、`Field`、`ArrayField`、`ObjectField`、`VoidField`
- Schema 渲染：`SchemaField`、`RecursionField`、`ReactiveField`、`ExpressionScope`
- 组合式 API：`useForm`、`useField`、`useFieldSchema`、`useFormEffects`
- 适配工具：`connect`、`mapProps`

## 推荐搭配

- `@silver-formily/core`：表单运行时内核
- `@silver-formily/json-schema`：schema 驱动描述层
- `@silver-formily/reactive-vue`：Vue 响应式桥接
- `@silver-formily/element-plus` / `@silver-formily/vant`：开箱即用 UI 方案

## 安装

```bash
pnpm add @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/validator vue
```

## 文档

- 文档站点：<https://vue.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
