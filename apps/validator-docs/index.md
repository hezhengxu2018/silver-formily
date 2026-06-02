# 介绍

`@silver-formily/validator` 是 Silver Formily 维护的校验核心。它负责把声明式规则转换成可执行的校验流程，并统一返回错误、警告和成功消息。

这个包的能力可以概括为四部分：

1. 用一个 `validate` 入口执行单条或多条校验描述。
2. 提供一组默认规则，包括 `required`、`min`、`max`、`pattern`、`format` 等。
3. 允许通过 registry 动态注册格式、规则、语言包和消息模板引擎。
4. 通过 parser 把字符串、函数、规则对象统一解析成可运行的校验函数。

:::tip 提示
普通用户是在使用 `@silver-formily/core` 的过程中间接使用其能力的。因此可以重点查看[在Formily中使用](/guide/formily-validator)章节。API部分中最常参考的章节是[校验规则](/api/validate)，偶尔会用到[注册中心](/api/registry)的部分。解析器的部分主要暴露给 `@silver-formily/core`， 业务开发很少会用到。
:::

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/validator
```

```bash [npm]
npm install @silver-formily/validator
```

:::

## 例子

```ts
import { validate } from '@silver-formily/validator'

const result = await validate('', [
  { required: true },
  { minLength: 3, message: '至少输入 3 个字符' },
])

result.error
// ['The field value is required', '至少输入 3 个字符']
```

## 何时使用它

- 需要把 UI 层规则对象转换成统一的校验结果。
- 需要为业务系统追加自定义规则或格式。
- 需要为同一套规则切换不同语言文案。
- 需要把错误消息和上下文数据进行模板渲染。
