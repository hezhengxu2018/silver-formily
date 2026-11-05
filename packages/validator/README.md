# @silver-formily/validator

[![npm version](https://img.shields.io/npm/v/@silver-formily/validator)](https://www.npmjs.com/package/@silver-formily/validator)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/validator)](https://www.npmjs.com/package/@silver-formily/validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/validator/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/validator/README.en.md)

`@silver-formily/validator` 是 Silver Formily 的声明式校验执行引擎。它负责把规则定义解析为可执行 validator pipeline，并支持异步执行、结果分级、格式注册和 locale 扩展。

## 安装

```bash
pnpm add @silver-formily/validator
```

安装命令包含必需的 peer 依赖；已有项目请保留满足版本范围的现有依赖。

## 功能

- `validate`：执行 validator pipeline 并返回 `error` / `warning` / `success`
- 校验规则解析器
- 规则、格式、locale 与模板引擎注册 API
- `validateFirst` 等执行策略

## 定位

该包在表单运行时中承担验证子系统角色：

- 为 `@silver-formily/core` 提供字段和表单级校验执行能力
- 为 schema 驱动表单提供规则运行时
- 统一规则、格式和消息模板的注册机制

## 适用场景

- 复杂表单验证
- 可配置校验体系
- 替换 `@formily/validator`

## 文档

- [使用指南](https://validator.silver-formily.org/)
- [项目首页](https://silver-formily.org/)
- [源码](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/validator)
- [问题反馈](https://github.com/hezhengxu2018/silver-formily/issues)

## 许可证

[MIT](https://opensource.org/licenses/MIT)
