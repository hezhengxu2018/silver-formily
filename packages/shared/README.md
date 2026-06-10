# @silver-formily/shared

[English README](./README.en.md)

## Overview

`@silver-formily/shared` 提供 Silver Formily 各运行时包共享的低层工具集合。它聚合数组与对象操作、默认值合并、订阅器、中间件、字符串转换、判空与类型检查等基础设施能力。

## Runtime Positioning

该包不直接承载表单语义，而是作为多个 runtime 包的公共依赖：

- 为 `@silver-formily/core`、`@silver-formily/reactive`、`@silver-formily/validator` 等包消除重复实现
- 统一基础工具行为，降低跨包语义漂移

## Public Surface

- 数组、对象与 merge/defaults 工具
- subscribable / middleware 基元
- string / case conversion helpers
- emptiness checks 与 runtime guards
- `uid` 等通用基础能力

## Use Cases

- 构建 Silver Formily 配套包
- 复用与核心 runtime 一致的辅助工具
- 替换 `@formily/shared`

## Installation

```bash
pnpm add @silver-formily/shared
```

## Documentation

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
