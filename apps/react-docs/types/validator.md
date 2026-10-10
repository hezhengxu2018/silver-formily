# Validator

`@silver-formily/react` 没有定义自己的校验协议。字段组件上的 `validator` 属性直接使用 `@silver-formily/core` 的 `FieldValidator`，而 Core 的校验类型最终来自 `@silver-formily/validator`。

## 在 React 包里如何消费

- `IFieldProps` 与 `IFieldFactoryProps` 的 `validator` 属性类型是 `FieldValidator`。
- Schema 中的 `x-validator` 由 `@silver-formily/json-schema` 解析后，同样遵循 validator 包的规则系统。

## 推荐跳转

- 校验规则与 `Validator` 主入口：[Validator API](https://validator.silver-formily.org/api/validate)
- 注册格式、规则与多语言：[Registry API](https://validator.silver-formily.org/api/registry)
- 在 Formily 中如何使用校验器：[在 Formily 中使用](https://validator.silver-formily.org/guide/formily-validator)

## 推荐导入方式

```ts
import type { FieldValidator } from '@silver-formily/core'
import type { IValidatorRules, Validator } from '@silver-formily/validator'
```

只有当你要和 `@silver-formily/react` 的公开组件 props 保持一致时，才需要从字段 props 的角度引用 `FieldValidator`。
