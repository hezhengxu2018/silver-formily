# @silver-formily/reactive

[![npm version](https://img.shields.io/npm/v/@silver-formily/reactive)](https://www.npmjs.com/package/@silver-formily/reactive)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/reactive)](https://www.npmjs.com/package/@silver-formily/reactive)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive/README.en.md)

`@silver-formily/reactive` 是 Silver Formily 的底层响应式执行引擎。它提供可观察模型、依赖收集、reaction 调度、批处理和原始对象控制能力，用于驱动表单 runtime 与上层派生逻辑。

## 安装

```bash
pnpm add @silver-formily/reactive
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `observable`：声明可观察对象、数组和引用
- `action`：组织事务式更新
- `autorun` / `reaction`：建立依赖驱动的副作用
- `batch`：显式批量更新
- `markRaw` / `raw` / `toJS`：控制代理边界和序列化输出
- `contains` / `hasCollected`：辅助依赖与节点关系分析

## 定位

该包位于整个体系的最底层之一：

- 为 `@silver-formily/core` 提供状态与 effect 语义
- 为 `@silver-formily/reactive-vue` 和 `@silver-formily/reactive-react` 提供框架绑定目标
- 可独立用于框架无关的响应式状态编排

## 适用场景

- 表单状态运行时
- DSL / 低代码系统中的派生执行层
- 从 `@formily/reactive` 迁移到 `@silver-formily/reactive`

## 文档

- [使用指南](https://reactive.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/reactive)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
