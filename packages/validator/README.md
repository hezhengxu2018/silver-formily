# @silver-formily/validator

[English README](./README.en.md)

`@silver-formily/validator` 是 Silver Formily 的校验引擎。它负责解析声明式校验规则、执行同步或异步校验、组织错误级别结果，并提供规则、格式和国际化消息的注册能力。

## 这个包的作用

如果你需要的不是某个 UI 组件上的简单表单校验，而是一套可组合、可扩展、可国际化的运行时校验机制，这个包就是底层入口。它通常用于：

- 字段级和表单级校验
- 自定义规则注册
- 格式校验与消息模板定制
- 在 `@silver-formily/core` 中驱动验证流程

## 主要能力

- `validate`：执行校验并返回 `error` / `warning` / `success` 结果
- 校验规则解析器
- 内置规则、格式与 locale 注册机制
- 支持异步校验与 `validateFirst`

## 适用场景

- 构建表单引擎或字段系统
- 统一业务侧复杂校验规则
- 从 `@formily/validator` 迁移到 `@silver-formily/validator`

## 安装

```bash
pnpm add @silver-formily/validator @silver-formily/path @silver-formily/shared
```

## 文档

- 文档站点：<https://validator.silver-formily.org>
- 仓库主页：<https://github.com/hezhengxu2018/silver-formily>

## License

MIT
