# Validator

Vue 包保留了一组校验相关的类型导出，主要是为了兼容历史导入路径。它们本质上都来自 `@silver-formily/validator`。

对于新的业务代码，推荐直接从 `@silver-formily/validator` 导入原始类型；如果你已经在使用 `@silver-formily/vue` 的 Schema API，也可以继续使用这些别名。

## Vue 包中的校验类型别名

| Vue 导出                  | 实际来源                      |
| ------------------------- | ----------------------------- |
| `SchemaFieldValidator`    | `Validator`                   |
| `SchemaValidatorFunction` | `ValidatorFunction<any>`      |
| `SchemaValidatorRules`    | `IValidatorRules<any>`        |
| `SchemaMultiValidator`    | `MultiValidator<any>`         |
| `SchemaValidateResult`    | `IValidateResult`             |
| `SchemaValidatorResponse` | `ValidatorFunctionResponse`   |
| `FormilyValidator`        | 直接 re-export 的 `Validator` |

## 这些别名在 Vue 包里用在哪里

- `IFieldProps` 与 `IFieldFactoryProps` 的 `validator` 属性使用 `SchemaFieldValidator`
- `ISchemaMarkupFieldProps` 的 `x-validator` 通过 `SchemaMarkupValidator` 关联到 Schema 协议
- `SchemaField` 与 `RecursionField` 的 Schema 类型最终仍然遵循 validator 包的规则系统

## 推荐跳转

- 校验规则与 `Validator` 主入口：[Validator API](https://validator.silver-formily.org/api/validate)
- 注册格式、规则与多语言：[Registry API](https://validator.silver-formily.org/api/registry)
- 在 Formily 中如何使用校验器：[在 Formily 中使用](https://validator.silver-formily.org/guide/formily-validator)

## 推荐导入方式

```ts
import type { IValidatorRules, Validator } from '@silver-formily/validator'
```

只有当你要和 `@silver-formily/vue` 的公开组件 props 保持一致时，才优先使用这些 Vue 侧别名。
