# 快速上手

大多数业务项目不会直接调用 `@silver-formily/validator`。你只需要在 Formily 字段上声明校验规则，字段模型会在合适的时机执行规则，并把结果同步到表单组件。

下面是最常见的写法：

```vue
<Field
  name="email"
  title="邮箱"
  required
  :validator="[
    { format: 'email', message: '邮箱格式不正确' },
    { maxLength: 200, message: '长度请控制在200字符以内' },
    {
      triggerType: 'onBlur',
      validator(value) {
        if (!value)
          return ''
        return value.endsWith('@company.com') ? '' : '请使用公司邮箱'
      },
    },
  ]"
  :decorator="[FormItem]"
  :component="[Input]"
/>
```

这段配置会在输入时检查邮箱格式，在失焦时检查邮箱域名。日常使用 validator 时，通常就是把规则写在 `Field` 的 `validator` 属性中，或写在 Schema 的 `x-validator` 中。

::: tip 提示
上面的例子中

- `'email'` 属于[内置格式](/api/validate#built-in-formats)
- `maxLength` 属于[内置规则](/api/validate#built-in-rules)

:::

::: tip 提示
如果你正在开发 Formily 表单，请从本章开始，并可结合 Core 文档中的[校验系统](https://core.silver-formily.org/guide/validation)了解字段和表单层的完整行为。只有在开发底层适配、脱离 Formily 单独使用校验器时，才需要直接调用 [`validate()`](/api/validate)。
:::

## 配置校验规则

同一条规则可以声明在 Vue Field、Markup Schema 或 JSON Schema 中。选择与你当前表单写法一致的入口即可：

::: code-group

```vue [Field]
<Field
  name="username"
  title="用户名"
  required
  :validator="{
    minLength: 3,
    message: '至少输入 3 个字符',
  }"
  :decorator="[FormItem]"
  :component="[Input]"
/>
```

```vue [Markup Schema]
<SchemaField.String
  name="username"
  title="用户名"
  required
  :x-validator="{
    minLength: 3,
    message: '至少输入 3 个字符',
  }"
  x-component="Input"
  x-decorator="FormItem"
/>
```

```ts [JSON Schema]
const schema = {
  type: 'object',
  properties: {
    username: {
      'type': 'string',
      'title': '用户名',
      'required': true,
      'x-validator': {
        minLength: 3,
        message: '至少输入 3 个字符',
      },
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}
```

:::

`Field.validator` 和 Schema 的 `x-validator` 最终都会成为字段上的校验规则。选择与你当前表单写法一致的入口即可，不需要手动调用 `validate()`。

## 校验规则书写形式

`validator` 与 `x-validator` 接受相同的四种形式。

### 字符串

字符串会被当成 `format`（可参考[内置格式](/api/validate#built-in-formats)）：

```vue
<Field name="email" title="邮箱" validator="email" />
```

它等价于：

```vue
<Field name="email" title="邮箱" :validator="{ format: 'email' }" />
```

### 对象

```vue
<Field
  name="username"
  title="用户名"
  :validator="{
    required: true,
    minLength: 3,
    message: '请输入至少 3 个字符',
  }"
/>
```

对象最适合表达一组共享提示文案和触发时机的约束。例子中的 `minLength` 属于[内置规则](/api/validate#built-in-rules)。

### 函数

```vue
<script setup lang="ts">
function validateUsername(value: string) {
  if (!value)
    return ''
  return value === 'silver' ? '' : '用户名不合法'
}
</script>

<template>
  <Field
    name="username"
    title="用户名"
    :validator="validateUsername"
  />
</template>
```

函数形式适合只在当前字段使用的简单业务规则。

### 数组

```vue
<Field
  name="username"
  title="用户名"
  :validator="[
    { required: true, message: '请输入用户名' },
    { minLength: 3, message: '至少输入 3 个字符' },
    {
      triggerType: 'onBlur',
      validator(value) {
        return value === 'silver' ? '' : '必须输入 silver'
      },
    },
  ]"
/>
```

数组是实际项目中最常用的组合形式。每条规则可以拥有独立的消息、触发时机和自定义函数。所有内置规则请参考[执行校验](/api/validate#built-in-rules)。

## 控制触发时机

规则对象可以通过 `triggerType` 指定执行时机：

- 不设置时默认为 `onInput`
- `onBlur` 在字段失焦时执行
- `onFocus` 在字段聚焦时执行
- `field.validate()` 或 `form.validate()` 不指定触发类型时会执行全部规则

```vue
<Field
  name="email"
  title="邮箱"
  :validator="[
    { required: true, message: '请输入邮箱' },
    {
      format: 'email',
      triggerType: 'onBlur',
      message: '邮箱格式不正确',
    },
  ]"
/>
```

这意味着输入过程中会先检查必填，失焦后才检查邮箱格式。对于请求接口等成本更高的异步校验，也通常建议放到 `onBlur`。

## 编写自定义校验函数

自定义校验函数接收四个参数：

```ts
function validator(value, rule, ctx, render) {
  // 返回校验结果，也可以返回 Promise
}
```

| 参数     | 说明                                                 |
| -------- | ---------------------------------------------------- |
| `value`  | 当前字段值                                           |
| `rule`   | 当前规则对象                                         |
| `ctx`    | Formily 注入的上下文，包含当前 `field` 和 `form`     |
| `render` | 将消息模板与上下文合并为最终文案，与组件渲染没有关系 |

例如，确认密码需要读取另一个字段的值：

```vue
<Field
  name="confirmPassword"
  title="确认密码"
  :validator="{
    required: true,
    validator(value, rule, ctx, render) {
      if (!value || value === ctx.form.values.password)
        return ''

      return render('{{field.title}}与密码不一致')
    },
  }"
/>
```

`render` 可以直接读取 `ctx` 中的 `field` 和 `form`，也可以临时补充模板变量：

```ts
return render('字段 {{field.title}} 的长度不能小于 {{min}}', {
  min: 6,
})
```

如果只需要读取其他字段值，优先使用 `ctx.form.values`；需要调用字段实例方法或读取字段状态时，再使用 `ctx.field`。

### 异步校验

自定义函数可以返回 Promise。下面的规则只在失焦时检查用户名是否已被占用：

```vue
<script setup lang="ts">
const usernameValidator = {
  triggerType: 'onBlur',
  async validator(value: string) {
    if (!value)
      return ''

    const available = await checkUsernameAvailable(value)
    return available ? '' : '用户名已被占用'
  },
}
</script>

<template>
  <Field
    name="username"
    title="用户名"
    :validator="usernameValidator"
  />
</template>
```

## 返回校验结果

自定义函数支持以下返回值：

| 返回值                 | 含义                               |
| ---------------------- | ---------------------------------- |
| `''`、`null` 或 `true` | 校验通过，不产生反馈               |
| `false`                | 校验失败，使用当前规则的 `message` |
| 字符串                 | 校验失败，字符串作为错误消息       |
| `{ type, message }`    | 产生指定类型的反馈                 |

返回字符串是最常见的失败形式：

```ts
return '用户名已被占用'
```

需要 warning 或 success 反馈时，可以明确指定类型：

```ts
return {
  type: 'warning',
  message: '建议使用公司邮箱',
}
```

非 error 类型的展示效果取决于所使用的组件库是否正确消费字段反馈。

## 读取校验反馈

校验结果会被写入字段的反馈状态，表单组件会消费这些状态完成提示展示。常用属性包括：

- `field.selfErrors`
- `field.selfWarnings`
- `field.selfSuccesses`

```ts
await field.onInput('321')
console.log(field.selfWarnings)

await field.onBlur()
console.log(field.selfErrors)
```

调用 `field.validate()` 会校验当前字段及其后代数据字段；调用 `form.validate()` 或 `form.submit()` 则会调度表单中的数据字段校验。

## 复用全局规则

只服务于单个字段的逻辑可以直接写在字段上；需要跨页面复用时，建议注册为全局规则：

```ts
import { registerValidateRules } from '@silver-formily/core'

registerValidateRules({
  usernameAvailable(value) {
    if (!value)
      return ''
    return value === 'silver' ? '' : '用户名已被占用'
  },
})
```

注册后，字段仍然使用声明式配置：

```vue
<Field
  name="username"
  title="用户名"
  :validator="{ usernameAvailable: true }"
/>
```

这样既能保持字段配置清晰，也能把复用逻辑集中维护。注册自定义格式、语言和消息模板的方式请参考[注册与配置](/api/registry)。

## 运行时动态修改规则

只有当规则需要随着联动状态动态变化时，才需要直接操作字段实例：

```ts
field.setValidator({
  format: 'email',
})

field.setValidatorRule('minLength', 6)
field.setValidatorRule('required', true)
```

`setValidator()` 会替换字段的完整校验配置；`setValidatorRule()` 用于新增或更新其中一项规则。普通的静态规则应优先声明在 `Field.validator` 或 `x-validator` 中。

## Formily 如何执行规则

字段触发 `onInput`、`onBlur`、`onFocus` 或显式 `validate()` 后，`@silver-formily/core` 最终会调用 `@silver-formily/validator`：

```ts
const results = await validate(field.value, field.validator, {
  triggerType,
  validateFirst: field.props.validateFirst ?? field.form.props.validateFirst,
  context: { field, form: field.form },
})
```

这段底层调用解释了三个行为：

- 校验值来自 `field.value`
- 校验规则来自 `field.validator`
- 自定义函数的 `ctx` 中会自动包含 `field` 和 `form`

业务代码不需要重复调用这段逻辑。Formily 字段模型会负责触发校验、过滤当前触发时机对应的规则，并把结果写回反馈状态。
