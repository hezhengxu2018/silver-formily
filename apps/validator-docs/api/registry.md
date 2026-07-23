# 注册与配置

注册中心保存全局规则、格式、多语言消息和消息模板引擎。注册结果在当前 JavaScript 运行环境中共享，适合放置需要跨字段、跨表单复用的能力。

::: tip 提示
在 Formily 项目中，优先从 `@silver-formily/core` 导入注册 API；Core 会把同一组能力转交给 validator。只有独立使用本包时，才从 `@silver-formily/validator` 导入。
:::

## 注册自定义规则

使用 `registerValidateRules()` 注册以规则名为键的校验函数：

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

注册后可以在 Formily 字段上声明规则：

```vue
<Field
  name="username"
  :validator="{ usernameAvailable: true }"
/>
```

对象的键名决定执行哪个已注册函数；配置值会保留在当前规则对象和校验上下文中：

```ts
import { validate } from '@silver-formily/validator'

await validate('formily', {
  usernameAvailable: true,
})
```

如果再次注册同名规则，新函数会覆盖原函数。

## 注册自定义格式

`registerValidateFormats()` 接受字符串、正则表达式或返回布尔值的函数：

```ts
import { registerValidateFormats } from '@silver-formily/core'

registerValidateFormats({
  slug: /^[a-z0-9-]+$/,
  internalCode: value => typeof value === 'string' && value.startsWith('SF-'),
})
```

格式可以通过字符串简写或规则对象引用：

::: code-group

```vue [Field]
<Field name="slug" validator="slug" />

<Field
  name="code"
  :validator="{ format: 'internalCode' }"
/>
```

```ts [独立调用]
import { validate } from '@silver-formily/validator'

await validate('silver-formily', 'slug')
await validate('SF-001', { format: 'internalCode' })
```

:::

注册字符串时，内部会把它转换为 `RegExp`。

## 配置语言消息

### 注册消息

`registerValidateLocale()` 会按语言标识增量合并消息：

```ts
import { registerValidateLocale } from '@silver-formily/core'

registerValidateLocale({
  'zh-CN': {
    usernameAvailable: '用户名已被占用',
    slug: '只能包含小写字母、数字和中划线',
  },
})
```

重复注册同一语言时，只覆盖本次传入的消息路径，不会清空其他消息。

### 切换语言

```ts
import { setValidateLanguage } from '@silver-formily/core'

setValidateLanguage('zh-CN')
```

语言查找会先精确匹配已注册的语言标识；没有精确结果时，再按不区分大小写的包含关系查找第一个近似标识。例如，内置语言中 `ZH` 会匹配 `zh`，`cn` 会匹配 `zh-CN`。如果仍未找到，则保留当前语言标识。

### 内置语言 {#built-in-locales}

模块初始化时会注册以下语言标识：

- `en`
- `en-US`
- `zh`
- `zh-CN`
- `zh-TW`
- `ja`

内置消息覆盖 `required`、`min`、`max`、`email`、`url`、`phone` 等常用规则和格式。自定义消息可以增量覆盖它们。

## 自定义消息模板

默认模板支持 <code v-pre>{{path.to.value}}</code> 路径占位符。需要增加自己的语法时，可以注册前置模板引擎：

```ts
import { registerValidateMessageTemplateEngine } from '@silver-formily/core'

registerValidateMessageTemplateEngine((message, context) => {
  return String(message).replace('$title', context.title)
})
```

自定义模板引擎会先执行，结果再进入内置的 <code v-pre>{{...}}</code> 路径替换，因此两者可以组合使用。

::: warning 全局配置
模板引擎和当前语言都是全局状态。服务端渲染或多租户环境需要避免在并发请求之间反复切换全局配置。
:::

## 读取当前配置

查询 API 主要用于调试、框架适配和测试：

```ts
import {
  getLocaleByPath,
  getValidateFormats,
  getValidateLanguage,
  getValidateLocale,
  getValidateLocaleIOSCode,
  getValidateMessageTemplateEngine,
  getValidateRules,
} from '@silver-formily/validator'

getValidateLanguage()
getValidateLocale('required')
getLocaleByPath('required', 'zh-CN')
getValidateLocaleIOSCode('zh')
getValidateFormats('email')
getValidateRules('required')
getValidateMessageTemplateEngine()
```

| API                                  | 返回内容                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `getValidateLanguage()`              | 当前语言标识                                                                  |
| `getValidateLocale(path)`            | 当前语言下指定路径的消息；找不到时依次回退到当前语言和英文的 `pattern` 消息   |
| `getLocaleByPath(path, lang?)`       | 对 `lang` 执行上述语言匹配后读取对应路径；不执行 `pattern` 消息回退           |
| `getValidateLocaleIOSCode(language)` | 按当前已注册语言近似匹配实际使用的语言标识；API 名称中的 `IOS` 与源码保持一致 |
| `getValidateFormats(key?)`           | 指定格式，或全部已注册格式                                                    |
| `getValidateRules(key?)`             | 指定规则，或全部已注册规则                                                    |
| `getValidateMessageTemplateEngine()` | 当前消息模板引擎                                                              |
