# 静态方法

## getOrderProperties

### 描述

从 Schema 中获取排序后的 properties

### 签名

```ts
interface getOrderProperties {
  (schema: ISchema = {}, propertiesName: keyof ISchema = 'properties'): ISchema
}
```

## compile

### 描述

深度遍历任意对象中的表达式片段，表达式片段约定：以<code v-pre>{{</code>开头<code v-pre>}}</code>结尾的字符串代表一个表达式片段

### 签名

```ts
interface compile {
  (target: any, scope: any): any
}
```

### 用例

静态 `compile` 更像一个通用工具方法，不要求目标对象必须是 `Schema` 实例。

```ts
import { Schema } from '@formily/json-schema'

const result = Schema.compile(
  {
    greeting: '{{user.name}}',
    visible: '{{enabled}}',
    nested: {
      text: '{{count + 1}}',
    },
  },
  {
    user: { name: '张三' },
    enabled: true,
    count: 2,
  },
)

console.log(result)
// {
//   greeting: '张三',
//   visible: true,
//   nested: { text: 3 },
// }
```

## shallowCompile

### 描述

浅层遍历任意对象中的表达式片段，表达式片段约定：以<code v-pre>{{</code>开头<code v-pre>}}</code>结尾的字符串代表一个表达式片段

### 签名

```ts
interface shallowCompile {
  (target: any, scope: any): any
}
```

### 用例

`shallowCompile` 只会编译当前传入值本身，不会继续递归处理对象或数组内部的成员。

```ts
import { Schema } from '@formily/json-schema'

console.log(Schema.shallowCompile('{{count + 1}}', { count: 2 }))
// 3

console.log(
  Schema.shallowCompile(
    {
      text: '{{count + 1}}',
      nested: {
        value: '{{count + 2}}',
      },
    },
    { count: 2 },
  ),
)
// {
//   text: '{{count + 1}}',
//   nested: {
//     value: '{{count + 2}}',
//   },
// }
```

如果你希望递归编译整个对象，请使用上面的 `Schema.compile(target, scope)`。

## silent

### 描述

是否静默编译，如果是，则表达式报错不会有任何提醒

### 签名

```ts
interface silent {
  (value?: boolean): void
}
```

## isSchemaInstance

### 描述

判断某个对象是否为 Schema Class 的实例对象

### 签名

```ts
interface isSchemaInstance {
  (target: any): target is Schema
}
```

## registerCompiler

### 描述

注册表达式编译器

### 签名

```ts
interface registerCompiler {
  (compiler: (expression: string, scope: any) => any): void
}
```

## registerPatches

### 描述

注册 Schema 补丁，方便做不同版本的 Schema 协议兼容

### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPatches {
  (...args: SchemaPatch[]): void
}
```

## registerVoidComponents

### 描述

给字段组件打上标识，标识该组件是虚拟组件，与 formily1.x 做兼容

### 签名

```ts
interface registerVoidComponents {
  (components: string[]): void
}
```

### 用例

```ts
import { Schema } from '@formily/react'

Schema.registerVoidComponents(['card', 'tab', 'step'])
```

::: warning

  <p>注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用</p>
:::

## registerTypeDefaultComponents

### 描述

给 Schema 类型标识默认组件类型

### 签名

```ts
interface registerTypeDefaultComponents {
  (maps: Record<string, string>): void
}
```

### 用例

```ts
import { Schema } from '@formily/vue'

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayTable',
})
```

注意，该 api 需要配合 <code>enablePolyfills(['1.0'])</code> 使用

## registerPolyfills

### 描述

注册协议兼容垫片

### 签名

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPolyfills {
  (version: string, patch: SchemaPatch): void
}
```

### 用例

```ts
import { Schema } from '@formily/react'

Schema.registerPolyfills('1.0', (schema) => {
  schema['x-decorator'] = 'FormItem'
  return schema
})
```

## enablePolyfills

### 描述

开启协议垫片，默认内置 1.0 版本协议兼容垫片，主要兼容特性：

- x-decorator 不声明，自动作为 FormItem
- x-linkages 转换为 x-reactions
- x-props 自动转换为 x-decorator-props
- x-rules 转换为 x-validator
- editable 转换为 x-editable
- visible 转换为 x-visible
- x-component 为 card/block/grid-row/grid-col/grid/layout/step/tab/text-box 自动转换 VoidField，

### 签名

```ts
interface enablePolyfills {
  (versions: string[]): void
}
```

### 用例

```ts
import { Schema } from '@formily/vue'

Schema.enablePolyfills(['1.0'])
```
