# @silver-formily/core

[English README](./README.en.md)

## Overview

`@silver-formily/core` 是 Silver Formily 的核心表单运行时。它定义表单实例、字段树、状态流转、校验调度、提交流程与副作用执行模型，是上层渲染层和 UI 适配层的统一语义基础。

## Runtime Positioning

在包分层上，`@silver-formily/core` 位于：

- `@silver-formily/reactive` 之上，复用响应式模型与 effect 调度
- `@silver-formily/vue`、`@silver-formily/json-schema` 之下，为它们提供领域运行时
- `@silver-formily/element-plus`、`@silver-formily/vant` 之下，作为所有表单 UI 绑定的状态来源

## Public Surface

公开 API 主要围绕以下能力展开：

- `createForm`：构造表单实例
- `createEffectHook` / `createEffectContext`：组织表单级副作用和 reaction pipeline
- `useEffectForm`：在 effect 上下文中访问活动表单
- `FormPath`：复用 `@silver-formily/path` 的路径系统
- `isForm`、`isField`、`isArrayField` 等类型守卫
- 校验规则、格式、locale 与模板引擎的注册入口

## Use Cases

推荐在以下场景直接使用该包：

- 构建自定义渲染器或组件绑定层
- 直接编排字段状态、联动逻辑和提交流程
- 在迁移过程中替换 `@formily/core`

如果只是消费现成的 Vue 表单能力，通常应优先从 `@silver-formily/vue` 或对应 UI 包接入，而不是直接操作底层 runtime。

## Installation

```bash
pnpm add @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared @silver-formily/validator
```

## Related Packages

- `@silver-formily/reactive`
- `@silver-formily/path`
- `@silver-formily/validator`
- `@silver-formily/json-schema`
- `@silver-formily/vue`

## Documentation

- Docs: <https://core.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
