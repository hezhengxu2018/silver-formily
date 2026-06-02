# 在 Formily 中使用

大多数用户不会单独调用 `@silver-formily/validator`。更常见的用法是：在 Formily 的字段模型上声明 `validator`，再由 `@silver-formily/core` 在字段事件里调用这个包完成校验。

换句话说，业务代码通常面对的是 `Field.validator`，不是裸 `validate(...)`。

## 完整链路

在 Formily 里，一次字段校验大致会经过这条链路：

1. 你在字段上声明 `validator`、`required` 或某些规则片段。
2. 字段触发 `onInput`、`onBlur`、`onFocus` 或显式 `validate()`。
3. `@silver-formily/core` 调用 `@silver-formily/validator` 执行规则。
4. 校验结果被写回字段反馈区，最终体现在 `selfErrors`、`selfWarnings`、`selfSuccesses` 上。

如果你关心“这个包在 Formily 里到底做了什么”，核心其实就两件事：

- 把字段上的声明式规则转换成可执行函数
- 把执行结果规范化成 Formily 可消费的反馈消息

在 `@silver-formily/core` 里，字段校验最终会走到类似下面的调用：

```ts
const results = await validate(field.value, field.validator, {
  triggerType,
  validateFirst: field.props.validateFirst ?? field.form.props.validateFirst,
  context: { field, form: field.form },
})
```

这里有三个关键点：

- 传入的值是当前字段值 `field.value`
- 传入的规则来源是字段上的 `field.validator`
- 模板上下文里会自动带上 `field` 和 `form`

这也是为什么自定义校验函数里可以直接读取表单实例和字段实例。

## 如何添加校验规则

对使用者来说，最重要的问题不是 `validate` 怎么调用，而是规则应该声明在哪。

最常见的是这三种位置：

### 1. 直接写在 Field 上

```tsx
<Field
  name="username"
  title="用户名"
  required
  validator={{
    minLength: 3,
    message: '至少输入 3 个字符',
  }}
/>
```

这是最直接的方式，适合局部字段规则。

### 2. 在 Schema 里写 `x-validator`

```tsx
<SchemaField.String
  name="username"
  title="用户名"
  required
  x-validator={{
    minLength: 3,
    message: '至少输入 3 个字符',
  }}
  x-component="Input"
  x-decorator="FormItem"
/>
```

这和 Field 上的 `validator` 本质上是同一层能力，只是声明入口不同。

### 3. 运行时动态修改 Field.validator

```ts
field.setValidator({
  format: 'email',
})

field.setValidatorRule('minLength', 6)
field.setValidatorRule('required', true)
```

这类写法适合联动场景，或者某些规则需要在副作用里动态切换。

## Field.validator 可以写成什么

如果只看用户侧，`Field.validator` 最值得记住的是这四种形式：

### 1. 字符串

字符串会被当成 `format`：

```ts
field.setValidator('email')
```

等价于：

```ts
field.setValidator({
  format: 'email',
})
```

### 2. 规则对象

```ts
field.setValidator({
  required: true,
  minLength: 3,
  message: '至少输入 3 个字符',
})
```

这是最推荐的日常写法，可读性最好。

### 3. 函数

```ts
field.setValidator((value) => {
  if (!value)
    return ''
  return value === 'silver' ? '' : '用户名不合法'
})
```

适合需要写业务逻辑但又不想抽成全局规则的场景。

### 4. 数组

```ts
field.setValidator([
  { required: true },
  { minLength: 3, message: '至少输入 3 个字符' },
  {
    triggerType: 'onBlur',
    validator(value) {
      return value === 'silver' ? '' : '必须输入 silver'
    },
  },
])
```

数组是 Formily 里最实用的形态，因为它允许你把基础规则、触发时机和复杂业务规则拆开写。完整的说明可以参考[校验规则](/api/validate) 章节

:::tip 提示
`setValidator` 只是[三种添加校验的方式](/guide/formily-validator#如何添加校验规则)之一，这三种方式是等价的。在业务开发中一般会直接声明在`Field` 上或者 MarkupSchema 中的 `x-validator` 中。这里写成`field.setValidator` 的形式只是为了代码高亮。
:::

## 什么时候触发

- 没写 `triggerType` 时，规则默认走 `onInput`
- 写了 `triggerType: 'onBlur'`，就只会在失焦时触发
- 写了 `triggerType: 'onFocus'`，就只会在聚焦时触发
- 调用 `field.validate()` 或 `form.validate()` 时，通常会跑完整校验流程，不只是当前输入事件

例如：

```ts
field.setValidator([
  { required: true },
  {
    triggerType: 'onBlur',
    format: 'email',
  },
])
```

这意味着：

- 输入过程中会先做必填检查
- 失焦时才做邮箱格式检查

这通常比把所有规则都塞到 `onInput` 上更符合实际交互。

## 自定义函数的入参

当你写函数型校验器时，签名本身就能看出 Formily 是怎么把上下文接进来的：

```ts
const rule = {
  validator(value, rule, ctx, render) {
    const { field, form } = ctx

    if (!value)
      return ''

    if (form.values.confirmUsername && form.values.confirmUsername !== value) {
      return render('用户名必须与 {{field.title}} 保持一致')
    }

    return ''
  },
}
```

这里：

- `value` 是当前字段值
- `rule` 是当前规则对象
- `ctx` 里会有 `field` 和 `form`
- `render` 用来做消息模板渲染

其中 `render` 不是 React 里的 render，也不是组件渲染函数。它的职责只有一个：把消息字符串和当前上下文合并，生成最终要显示的校验消息。

它的签名可以理解成：

```ts
type MessageRenderer = (message: string, scope?: Record<string, any>) => string
```

常见用法有两种：

### 1. 直接使用现有上下文

```ts
return render('字段 {{field.title}} 不能为空')
```

这里会直接从当前上下文里读取 `field.title`。

### 2. 临时补充额外变量

```ts
return render('字段 {{field.title}} 必须大于 {{min}}', {
  min: 10,
})
```

这里的第二个参数会和原有上下文合并，所以你既可以访问 `field`、`form`，也可以访问手动传入的 `min`。

如果你只是需要访问其他字段值，优先通过 `ctx.form.values` 读取；如果你需要字段实例行为，再使用 `ctx.field`。

## 一个更复杂的自定义函数例子

下面这个例子把几个常见需求放在了一起：

- 根据其他字段值做交叉校验
- 在不同分支返回 error 和 warning
- 用 `render(...)` 统一拼装消息
- 通过 `scope` 传入额外变量

```ts
const rule = {
  triggerType: 'onBlur',
  async validator(value, rule, ctx, render) {
    const { field, form } = ctx
    const role = form.values.role
    const domain = value?.split('@')[1]

    if (!value)
      return ''

    if (!value.includes('@')) {
      return render('字段 {{field.title}} 必须是合法邮箱')
    }

    if (role === 'admin' && domain !== 'company.com') {
      return render('管理员账号必须使用 {{expectedDomain}} 域名', {
        expectedDomain: 'company.com',
      })
    }

    if (role === 'guest' && domain === 'company.com') {
      return {
        type: 'warning',
        message: render('访客账号通常不建议使用 {{currentDomain}} 域名', {
          currentDomain: domain,
        }),
      }
    }

    if (field.required && value.length < 6) {
      return render('字段 {{field.title}} 的长度不能小于 {{min}}', {
        min: 6,
      })
    }

    return ''
  },
}
```

这个例子里，`render(...)` 的价值主要有两个：

- 保持消息模板写法一致，不需要手动拼接字符串
- 同时复用 `ctx` 里的 `field`、`form` 和临时传入的额外变量

## 返回值的格式

这也是用户容易困惑的点。把它按“是否携带类型”来记最简单：

### 返回空值

```ts
return ''
return null
```

表示通过，不产生消息。

### 返回字符串

```ts
return '用户名已被占用'
```

表示失败，并把字符串作为错误消息。

### 返回布尔值

```ts
return value === 'silver'
```

- `true` 表示通过
- `false` 表示失败，并使用当前规则上的 `message`

### 返回 `{ type, message }`

```ts
return {
  type: 'warning',
  message: '建议使用公司邮箱',
}
```

这会直接决定消息进入哪个反馈类型，需要结合正确封装的组件库使用。

## 校验结果获取

在 Formily 里，validator 的结果不会只是“返回给调用者”，还会被同步写进字段反馈系统。

你通常会看到这些结果体现在：

- `field.selfErrors`
- `field.selfWarnings`
- `field.selfSuccesses`

例如：

```ts
await field.onInput('321')
console.log(field.selfWarnings)

await field.onBlur()
console.log(field.selfErrors)
```

所以从 UI 角度看，validator 不只是一个判断函数，它还是字段反馈状态的来源。

## 全局规则和局部规则的最佳实践

实践上建议这样分：

### 局部规则

放在字段自己的 `validator` 上：

- 某个页面独有的字段逻辑
- 临时业务约束
- 与特定表单上下文强相关的规则

### 全局规则

通过 `@formily/core` 暴露的注册函数统一注册：

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

然后在字段上声明：

```ts
const fieldProps = {
  validator: {
    usernameAvailable: true,
  },
}
```

这样的好处是：字段上保留声明式配置，复杂规则逻辑集中在一处维护。

如果你是从 Formily 角度使用这个库，建议优先采用下面的层次：

1. 用对象或数组声明字段规则，不要一上来就写大型自定义函数。
2. 把即时反馈规则放在 `onInput`，把成本更高的规则放在 `onBlur`。
3. 多字段复用的规则通过 `registerValidateRules` 注册。
4. 只有当你确实需要非 error 类型反馈时，再返回 `{ type, message }`。
5. 需要模板插值时，优先利用 `message` 和 `render(...)`，而不是手动拼接字符串。

## 一个更贴近实际的例子

```tsx
<Field
  name="email"
  title="邮箱"
  required
  validator={[
    { format: 'email', message: '邮箱格式不正确' },
    {
      triggerType: 'onBlur',
      validator(value) {
        if (!value)
          return ''
        return value.endsWith('@company.com')
          ? ''
          : '请使用公司邮箱'
      },
    },
  ]}
/>
```

这段配置里：

- 必填由 Field 自身和规则系统共同处理
- 邮箱格式在输入时即时提示
- 域名约束放到失焦后再做

这就是 Formily 场景里最典型的 validator 使用方式。
