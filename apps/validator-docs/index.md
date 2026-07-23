# 介绍

`@silver-formily/validator` 是 Silver Formily 的校验核心。它把字段上的声明式规则转换成可执行的校验流程，并统一生成错误、警告和成功反馈。

## 从哪里开始

- 在 Formily 中配置字段规则：阅读[快速上手](/guide/quick-start)
- 查询 `validate()`、内置规则和格式：阅读[执行校验](/api/validate)
- 注册全局规则、格式和语言：阅读[注册与配置](/api/registry)
- 开发表单框架或调试解析过程：阅读[规则解析](/api/parser)

普通业务开发通常只需要快速上手和执行校验中的规则速查部分。

## 包含的能力

这个包主要提供：

1. `required`、`min`、`max`、`pattern`、`format` 等内置规则。
2. 自定义同步或异步校验函数，以及 error、warning、success 三类反馈。
3. 全局规则、格式、语言包和消息模板引擎的注册能力。
4. 供 Formily 等上层调用的 `validate()` 与规则解析 API。

## 直接安装

Formily 项目通常会通过 `@silver-formily/core` 间接获得 validator 能力。只有需要独立使用或开发适配层时，才需要直接安装：

::: code-group

```bash [pnpm]
pnpm add @silver-formily/validator
```

```bash [npm]
npm install @silver-formily/validator
```

:::

## 独立使用

不使用 Formily 时，可以直接调用 `validate()`：

```ts
import { validate } from '@silver-formily/validator'

const result = await validate('', [
  { required: true },
  { minLength: 3, message: '至少输入 3 个字符' },
])

result.error
// ['The field value is required', '至少输入 3 个字符']
```

完整参数和返回值请查看[执行校验](/api/validate)。
