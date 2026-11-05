# @silver-formily/core

[![npm version](https://img.shields.io/npm/v/@silver-formily/core)](https://www.npmjs.com/package/@silver-formily/core)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/core)](https://www.npmjs.com/package/@silver-formily/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/core/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/core/README.en.md)

`@silver-formily/core` 是 Silver Formily 的核心表单运行时。它定义表单实例、字段树、状态流转、校验调度、提交流程与副作用执行模型，是上层渲染层和 UI 适配层的统一语义基础。

## 安装

```bash
pnpm add @silver-formily/core
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

公开 API 主要围绕以下能力展开：

- `createForm`：构造表单实例
- `createEffectHook` / `createEffectContext`：组织表单级副作用和 reaction pipeline
- `useEffectForm`：在 effect 上下文中访问活动表单
- `FormPath`：复用 `@silver-formily/path` 的路径系统
- `isForm`、`isField`、`isArrayField` 等类型守卫
- 校验规则、格式、locale 与模板引擎的注册入口

## 定位

在包分层上，`@silver-formily/core` 位于：

- `@silver-formily/reactive` 之上，复用响应式模型与 effect 调度
- `@silver-formily/vue`、`@silver-formily/react`、`@silver-formily/json-schema` 之下，为它们提供领域运行时
- `@silver-formily/element-plus`、`@silver-formily/vant` 之下，作为所有表单 UI 绑定的状态来源

## 适用场景

推荐在以下场景直接使用该包：

- 构建自定义渲染器或组件绑定层
- 直接编排字段状态、联动逻辑和提交流程
- 在迁移过程中替换 `@formily/core`

如果只是消费现成的 Vue 或 React 表单能力，通常应优先从 `@silver-formily/vue`、`@silver-formily/react` 或对应 UI 包接入，而不是直接操作底层 runtime。

## 相关包

- `@silver-formily/reactive`
- `@silver-formily/path`
- `@silver-formily/validator`
- `@silver-formily/json-schema`
- `@silver-formily/vue`
- `@silver-formily/react`

## 文档

- [使用指南](https://core.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/core)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
