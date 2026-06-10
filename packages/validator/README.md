# @silver-formily/validator

[English README](./README.en.md)

## Overview

`@silver-formily/validator` 是 Silver Formily 的声明式校验执行引擎。它负责把规则定义解析为可执行 validator pipeline，并支持异步执行、结果分级、格式注册和 locale 扩展。

## Runtime Positioning

该包在表单运行时中承担验证子系统角色：

- 为 `@silver-formily/core` 提供字段和表单级校验执行能力
- 为 schema 驱动表单提供规则运行时
- 统一规则、格式和消息模板的注册机制

## Public Surface

- `validate`：执行 validator pipeline 并返回 `error` / `warning` / `success`
- 校验规则解析器
- 规则、格式、locale 与模板引擎注册 API
- `validateFirst` 等执行策略

## Use Cases

- 复杂表单验证
- 可配置校验体系
- 替换 `@formily/validator`

## Installation

```bash
pnpm add @silver-formily/validator @silver-formily/path @silver-formily/shared
```

## Documentation

- Docs: <https://validator.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
