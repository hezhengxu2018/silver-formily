# @silver-formily/path

[English README](./README.en.md)

## Overview

`@silver-formily/path` 实现 Silver Formily 统一使用的路径抽象。它覆盖路径解析、模式匹配、相对路径求值以及深层对象访问，是字段树、schema 树和 reaction 定位机制的基础设施。

## Runtime Positioning

该包为多个 runtime 层提供通用寻址能力：

- `@silver-formily/core` 使用它定位字段和状态
- `@silver-formily/json-schema` 使用它处理 schema 级寻址
- `@silver-formily/validator` 和上层 UI 绑定共享同一套路径语义

## Public Surface

- `Path`：路径值对象与解析入口
- 路径模式匹配与相对路径计算
- 深层读写删除与存在性判断
- 支持数组索引、通配和复杂 segment 表达式

## Use Cases

- 深层对象读写工具链
- 字段树或 schema 树寻址
- 替换 `@formily/path`

## Installation

```bash
pnpm add @silver-formily/path
```

## Documentation

- Docs: <https://path.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
