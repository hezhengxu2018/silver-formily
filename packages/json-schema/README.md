# @silver-formily/json-schema

[English README](./README.en.md)

## Overview

`@silver-formily/json-schema` 提供 Silver Formily 的 schema 描述层。它将 JSON Schema 风格结构映射为表单字段、装饰器、组件、展示状态与 reaction 元数据，是 schema-driven form runtime 的核心输入协议。

## Runtime Positioning

在包结构中，该包承担描述层角色：

- 位于 `@silver-formily/core` 之上，将静态 schema 映射到运行时语义
- 位于 `@silver-formily/vue` 和 UI 绑定层之下，作为渲染输入协议
- 为低代码、配置驱动和 schema 编排场景提供统一抽象

## Public Surface

- `Schema` 类与 schema 相关类型定义
- `x-component`、`x-decorator`、`x-reactions` 等扩展协议
- schema compiler、patch、polyfill 与默认类型映射能力

## Use Cases

- 动态表单生成
- 低代码 / 配置驱动表单系统
- 替换 `@formily/json-schema`

## Installation

```bash
pnpm add @silver-formily/json-schema @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared
```

## Related Packages

- `@silver-formily/core`
- `@silver-formily/vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- Docs: <https://json-schema.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
