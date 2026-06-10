# @silver-formily/reactive

[English README](./README.en.md)

## Overview

`@silver-formily/reactive` 是 Silver Formily 的底层响应式执行引擎。它提供可观察模型、依赖收集、reaction 调度、批处理和原始对象控制能力，用于驱动表单 runtime 与上层派生逻辑。

## Runtime Positioning

该包位于整个体系的最底层之一：

- 为 `@silver-formily/core` 提供状态与 effect 语义
- 为 `@silver-formily/reactive-vue` 提供 Vue 绑定目标
- 可独立用于框架无关的响应式状态编排

## Public Surface

- `observable`：声明可观察对象、数组和引用
- `action`：组织事务式更新
- `autorun` / `reaction`：建立依赖驱动的副作用
- `batch`：显式批量更新
- `markRaw` / `raw` / `toJS`：控制代理边界和序列化输出
- `contains` / `hasCollected`：辅助依赖与节点关系分析

## Use Cases

- 表单状态运行时
- DSL / 低代码系统中的派生执行层
- 从 `@formily/reactive` 迁移到 `@silver-formily/reactive`

## Installation

```bash
pnpm add @silver-formily/reactive
```

## Documentation

- Docs: <https://reactive.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
