# 类型

## ISchema

### 描述

ISchema 就是一份普通 JSON 数据，同时它是遵循 Schema [属性](/api/properties#属性) 规范的 JSON 数据

## SchemaTypes

### 描述

Schema 描述的类型

### 签名

```ts
type SchemaTypes
  = | 'string'
    | 'object'
    | 'array'
    | 'number'
    | 'boolean'
    | 'void'
    | 'date'
    | 'datetime'
    | (string & {})
```

## SchemaProperties

### 描述

Schema 属性描述

### 签名

```ts
type SchemaProperties = Record<string, ISchema>
```

## SchemaItems

### 描述

Schema 数组项描述

### 签名

```ts
type SchemaItems = ISchema | ISchema[]
```

## SchemaEnum

### 描述

Schema 枚举

### 签名

```ts
type SchemaEnum<Message> = Array<
  | string
  | number
  | { label: Message, value: any, [key: string]: any }
  | { key: any, title: Message, [key: string]: any }
>
```

## SchemaReactions

### 描述

Schema 联动协议，如果 reaction 对象里包含 target，则代表主动联动模式，否则代表被动联动模式
如果想实现更复杂的联动，可以通过作用域传入 reaction 响应器函数进行处理
FormPathPattern 路径语法文档看[这里](https://core.formilyjs.org/zh-CN/api/entry/form-path#formpathpattern)

`SchemaReactions` 的详细联动写法与示例已拆分至 [联动示例](/api/linkages)。

### 签名

```ts
import { IGeneralFieldState } from '@formily/core'

type SchemaReactionEffect
  = | 'onFieldInit'
    | 'onFieldMount'
    | 'onFieldUnmount'
    | 'onFieldValueChange'
    | 'onFieldInputValueChange'
    | 'onFieldInitialValueChange'
    | 'onFieldValidateStart'
    | 'onFieldValidateEnd'
    | 'onFieldValidateFailed'
    | 'onFieldValidateSuccess'

type SchemaReaction<Field = any>
  = | {
    dependencies?: // 依赖的字段路径列表，支持FormPathPattern数据路径语法, 只能以点路径描述依赖，支持相对路径
      | Array<
        | string // 如果数组里是string，那么读的时候也是数组格式
        | {
          // 如果数组里是对象, 那么读的时候通过name从$deps获取
          name?: string // 从$deps读取时的别名
          type?: string // 字段类型
          source?: string // 字段路径
          property?: string // 依赖属性, 默认为value
        }
      >
      | Record<string, string> // 如果是对象格式，读的时候也是对象格式，只是对象的key相当于别名
    when?: string | boolean // 联动条件
    target?: string // 要操作的字段路径，支持FormPathPattern匹配路径语法，注意：不支持相对路径！！
    effects?: SchemaReactionEffect[] // 主动模式下的独立生命周期钩子
    fulfill?: {
      // 满足条件
      state?: IGeneralFieldState // 更新状态
      schema?: ISchema // 更新Schema
      run?: string // 执行语句
    }
    otherwise?: {
      // 不满足条件
      state?: IGeneralFieldState // 更新状态
      schema?: ISchema // 更新Schema
      run?: string // 执行语句
    }
  }
  | ((field: Field) => void) // 支持函数, 可以复杂联动

type SchemaReactions<Field = any>
  = | SchemaReaction<Field>
    | SchemaReaction<Field>[] // 支持传入数组
```
