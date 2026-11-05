# @silver-formily/path

[![npm version](https://img.shields.io/npm/v/@silver-formily/path)](https://www.npmjs.com/package/@silver-formily/path)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/path)](https://www.npmjs.com/package/@silver-formily/path)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/path/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/path/README.en.md)

`@silver-formily/path` 实现 Silver Formily 统一使用的路径抽象。它覆盖路径解析、模式匹配、相对路径求值以及深层对象访问，是字段树、schema 树和 reaction 定位机制的基础设施。

## 安装

```bash
pnpm add @silver-formily/path
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `Path`：路径值对象与解析入口
- 路径模式匹配与相对路径计算
- 深层读写删除与存在性判断
- 支持数组索引、通配和复杂 segment 表达式

## 定位

该包为多个 runtime 层提供通用寻址能力：

- `@silver-formily/core` 使用它定位字段和状态
- `@silver-formily/json-schema` 使用它处理 schema 级寻址
- `@silver-formily/validator` 和上层 UI 绑定共享同一套路径语义

## 适用场景

- 深层对象读写工具链
- 字段树或 schema 树寻址
- 替换 `@formily/path`

## 文档

- [使用指南](https://path.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/path)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
