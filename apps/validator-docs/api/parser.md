# 解析器

parser 层的目标很简单：把多种输入形式统一转换成可执行的校验函数列表。

```ts
import {
  parseValidator,
  parseValidatorDescription,
  parseValidatorDescriptions,
  parseValidatorRules,
} from '@silver-formily/validator'
```

## parseValidatorDescription

单条描述会被标准化为 `IValidatorRules`：

```ts
parseValidatorDescription('email')
// { format: 'email' }

parseValidatorDescription(value => value ? '' : 'empty')
// { validator: [Function] }

parseValidatorDescription({ required: true })
// { required: true }
```

## parseValidatorDescriptions

多条描述会被归一化成规则数组：

```ts
parseValidatorDescriptions([
  'email',
  { required: true },
])
```

这一步不会真正执行校验，只负责整理结构。

## parseValidatorRules

规则对象会继续被拆成多个已编排顺序的执行函数。内部顺序有两个关键点：

1. `required` 总是最先执行。
2. `validator` 总是最后执行。

这保证了基础空值判断先发生，而自定义规则可以在最后补充复杂逻辑。

```ts
const validators = parseValidatorRules({
  required: true,
  minLength: 3,
  validator(value) {
    return value === 'silver' ? '' : '必须为 silver'
  },
})
```

## parseValidator

`parseValidator` 是最终入口。它会：

1. 归一化输入为数组。
2. 把每条描述转成规则对象。
3. 根据 `triggerType` 过滤不该执行的规则。
4. 返回最终要执行的函数队列。

```ts
const queue = parseValidator([
  { triggerType: 'onInput', minLength: 3 },
  { triggerType: 'onBlur', required: true },
], {
  triggerType: 'onInput',
})
```

## 错误处理与消息渲染

每个解析后的函数都带有统一异常兜底：

- 规则抛错时，会把异常消息转成 `error`
- 返回字符串时，会交给模板层做渲染
- 返回 `{ type, message }` 时，会保留显式结果类型

这也是为什么 `validate` 层可以稳定收敛到同一种结果结构。
