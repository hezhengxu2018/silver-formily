# @silver-formily/shared

[![npm version](https://img.shields.io/npm/v/@silver-formily/shared)](https://www.npmjs.com/package/@silver-formily/shared)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/shared)](https://www.npmjs.com/package/@silver-formily/shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/shared/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/shared/README.en.md)

`@silver-formily/shared` 提供 Silver Formily 各运行时包共享的低层工具集合。它聚合数组与对象操作、默认值合并、订阅器、中间件、字符串转换、判空与类型检查等基础设施能力。

## 安装

```bash
pnpm add @silver-formily/shared
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- 数组、对象与 merge/defaults 工具
- subscribable / middleware 基元
- string / case conversion helpers
- emptiness checks 与 runtime guards
- `uid` 等通用基础能力

## 定位

该包不直接承载表单语义，而是作为多个 runtime 包的公共依赖：

- 为 `@silver-formily/core`、`@silver-formily/reactive`、`@silver-formily/validator` 等包消除重复实现
- 统一基础工具行为，降低跨包语义漂移

## 适用场景

- 构建 Silver Formily 配套包
- 复用与核心 runtime 一致的辅助工具
- 替换 `@formily/shared`

## 文档

- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/shared)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
