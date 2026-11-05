# @silver-formily/json-schema

[![npm version](https://img.shields.io/npm/v/@silver-formily/json-schema)](https://www.npmjs.com/package/@silver-formily/json-schema)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/json-schema)](https://www.npmjs.com/package/@silver-formily/json-schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/json-schema/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/json-schema/README.en.md)

`@silver-formily/json-schema` 提供 Silver Formily 的 schema 描述层。它将 JSON Schema 风格结构映射为表单字段、装饰器、组件、展示状态与 reaction 元数据，是 schema-driven form runtime 的核心输入协议。

## 安装

```bash
pnpm add @silver-formily/json-schema
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `Schema` 类与 schema 相关类型定义
- `x-component`、`x-decorator`、`x-reactions` 等扩展协议
- schema compiler、patch、polyfill 与默认类型映射能力

## 定位

在包结构中，该包承担描述层角色：

- 位于 `@silver-formily/core` 之上，将静态 schema 映射到运行时语义
- 位于 `@silver-formily/vue`、`@silver-formily/react` 和 UI 绑定层之下，作为渲染输入协议
- 为低代码、配置驱动和 schema 编排场景提供统一抽象

## 适用场景

- 动态表单生成
- 低代码 / 配置驱动表单系统
- 替换 `@formily/json-schema`

## 相关包

- `@silver-formily/core`
- `@silver-formily/vue`
- `@silver-formily/react`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## 文档

- [使用指南](https://json-schema.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/json-schema)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
