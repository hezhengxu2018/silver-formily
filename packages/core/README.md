# @silver-formily/core

[English README](./README.en.md)

`@silver-formily/core` 是 Silver Formily 的表单运行时内核。它负责管理表单实例、字段状态、联动副作用、校验调度、提交流程以及表单上下文，是 `@silver-formily/vue`、`@silver-formily/json-schema` 和各类 UI 适配层共同依赖的基础包。

## 这个包解决什么问题

当你需要一套与 UI 框架无关的表单领域模型时，`@silver-formily/core` 提供了真正的“表单大脑”：

- 创建表单实例并维护全局状态
- 管理字段树、字段生命周期和路径访问
- 协调校验、提交、重置、联动、副作用
- 提供类型守卫、effect hook 和运行时工具

如果你只是想在 Vue 里直接写表单组件，通常会配合 `@silver-formily/vue` 使用；如果你想做自定义渲染层、跨框架集成或更底层的状态控制，这个包就是核心入口。

## 主要能力

- `createForm`：创建表单实例
- `createEffectHook` / `createEffectContext`：组织表单副作用和联动逻辑
- `useEffectForm`：在 effect 作用域内访问当前表单
- `FormPath`：复用 `@silver-formily/path` 的路径能力
- 一组 `isForm`、`isField`、`isArrayField` 等类型守卫与状态判断工具
- 校验规则、校验格式、国际化消息的注册入口

## 适合谁使用

- 正在构建自己的 Silver Formily 渲染层或组件库
- 需要脱离 UI 框架直接管理表单状态
- 需要在业务侧编排复杂联动、提交和副作用逻辑
- 正在把旧的 `@formily/core` 依赖迁移到 `@silver-formily/core`

## 安装

```bash
pnpm add @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared @silver-formily/validator
```

## 通常如何配合其它包

- 配合 `@silver-formily/vue`：把表单运行时接到 Vue 组件树
- 配合 `@silver-formily/json-schema`：把 Schema 描述转成字段与组件树
- 配合 `@silver-formily/element-plus` / `@silver-formily/vant`：接入现成 UI 组件方案

## 文档

- 文档站点：<https://core.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
