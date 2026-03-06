# 方法

## addProperty

### 描述

添加属性描述

### 签名

```ts
interface addProperty {
  (key: string | number, schema: ISchema): Schema // 返回添加后的Schema对象
}
```

## removeProperty

### 描述

移除属性描述

### 签名

```ts
interface removeProperty {
  (key: string | number): Schema // 返回被移除的Schema对象
}
```

## setProperties

### 描述

覆盖式更新属性描述

### 签名

```ts
interface setProperties {
  (properties: SchemaProperties): Schema // 返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](/api/types#schemaproperties)

## addPatternProperty

### 描述

添加正则属性描述

### 签名

```ts
interface addPatternProperty {
  (regexp: string, schema: ISchema): Schema // 返回添加后的Schema对象
}
```

## removePatternProperty

### 描述

移除正则属性描述

### 签名

```ts
interface removePatternProperty {
  (regexp: string): Schema // 返回移除后的Schema对象
}
```

## setPatternProperties

### 描述

覆盖式更新正则属性描述

### 签名

```ts
interface setPatternProperties {
  (properties: SchemaProperties): Schema // 返回当前Schema对象
}
```

SchemaProperties 参考 [SchemaProperties](/api/types#schemaproperties)

## setAdditionalProperties

### 描述

覆盖式更新扩展属性描述

### 签名

```ts
interface setAdditionalProperties {
  (properties: ISchema): Schema // 返回扩展属性Schema对象
}
```

## setItems

### 描述

覆盖式更新数组项描述

### 签名

```ts
interface setItems {
  (items: SchemaItems): SchemaItems // 返回更新后的SchemaItems对象
}
```

SchemaItems 参考 [SchemaItems](/api/types#schemaitems)

## setAdditionalItems

### 描述

覆盖式更新数组扩展项描述

### 签名

```ts
interface setAdditionalItems {
  (items: ISchema): Schema // 返回更新后的Schema对象
}
```

SchemaItems 参考 [SchemaItems](/api/types#schemaitems)

## mapProperties

### 描述

遍历并映射当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

### 签名

```ts
interface mapProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

## mapPatternProperties

### 描述

遍历并映射当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

### 签名

```ts
interface mapPatternProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

## reduceProperties

### 描述

reduce 当前 Schema 的 properties 属性，同时会基于 x-index 顺序来遍历

### 签名

```ts
interface reduceProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

## reducePatternProperties

### 描述

reduce 当前 Schema 的 patternProperties 属性，同时会基于 x-index 顺序来遍历

### 签名

```ts
interface reducePatternProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

## compile

### 描述

深度递归当前 Schema 对象中的表达式片段，编译表达式，并返回 Schema，我们可以传入作用域对象，在表达式中即可消费作用域变量

表达式片段约定：以<code v-pre>{{</code>开头<code v-pre>}}</code>结尾的字符串代表一个表达式片段

### 签名

```ts
interface compile {
  (scope: any): Schema
}
```

### 用例

下面的例子会把 Schema 里的表达式编译成最终值，适合在手动创建 `Schema` 实例后，先注入一组运行时变量再继续消费 Schema 的场景。

```ts
import { Schema } from '@formily/json-schema'

const schema = new Schema({
  type: 'object',
  properties: {
    age: {
      'type': 'string',
      'title': '{{user.name}} 的年龄',
      'x-visible': '{{showAge}}',
      'x-component-props': {
        placeholder: '{{user.name}} 请输入年龄',
      },
    },
  },
})

schema.compile({
  user: { name: '张三' },
  showAge: true,
})

console.log(schema.properties.age.title)
// 张三 的年龄

console.log(schema.properties.age['x-visible'])
// true

console.log(schema.properties.age['x-component-props'].placeholder)
// 张三 请输入年龄
```

## fromJSON

### 描述

将普通 json 数据转换成 Schema 对象

### 签名

```ts
interface fromJSON {
  (json: ISchema): Schema
}
```

## toJSON

### 描述

将当前 Schema 对象转换成普通 json 数据

### 签名

```ts
interface toJSON {
  (): ISchema
}
```

## toFieldProps

### 描述

将当前 Schema 对象转换成 Formily 字段模型属性，映射关系参考 [属性](/api/properties#属性)

### 签名

```ts
import { IFieldFactoryProps } from '@formily/core'

interface toFieldProps {
  (): IFieldFactoryProps
}
```

IFieldFactoryProps 参考 [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops)
