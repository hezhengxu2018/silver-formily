# Methods

## addProperty

### Description

Add a property schema.

### Signature

```ts
interface addProperty {
  (key: string | number, schema: ISchema): Schema // returns the updated Schema instance
}
```

## removeProperty

### Description

Remove a property schema.

### Signature

```ts
interface removeProperty {
  (key: string | number): Schema // returns the removed Schema instance
}
```

## setProperties

### Description

Replace all property schemas.

### Signature

```ts
interface setProperties {
  (properties: SchemaProperties): Schema // returns the current Schema instance
}
```

For `SchemaProperties`, see [SchemaProperties](/en/api/types#schemaproperties).

## addPatternProperty

### Description

Add a pattern property schema.

### Signature

```ts
interface addPatternProperty {
  (regexp: string, schema: ISchema): Schema // returns the updated Schema instance
}
```

## removePatternProperty

### Description

Remove a pattern property schema.

### Signature

```ts
interface removePatternProperty {
  (regexp: string): Schema // returns the updated Schema instance
}
```

## setPatternProperties

### Description

Replace all pattern property schemas.

### Signature

```ts
interface setPatternProperties {
  (properties: SchemaProperties): Schema // returns the current Schema instance
}
```

For `SchemaProperties`, see [SchemaProperties](/en/api/types#schemaproperties).

## setAdditionalProperties

### Description

Replace the `additionalProperties` schema.

### Signature

```ts
interface setAdditionalProperties {
  (properties: ISchema): Schema // returns the additionalProperties Schema instance
}
```

## setItems

### Description

Replace array item definitions.

### Signature

```ts
interface setItems {
  (items: SchemaItems): SchemaItems // returns the updated SchemaItems object
}
```

For `SchemaItems`, see [SchemaItems](/en/api/types#schemaitems).

## setAdditionalItems

### Description

Replace additional array item definitions.

### Signature

```ts
interface setAdditionalItems {
  (items: ISchema): Schema // returns the updated Schema instance
}
```

For `SchemaItems`, see [SchemaItems](/en/api/types#schemaitems).

## mapProperties

### Description

Map over the current Schema `properties` in `x-index` order.

### Signature

```ts
interface mapProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

## mapPatternProperties

### Description

Map over the current Schema `patternProperties` in `x-index` order.

### Signature

```ts
interface mapPatternProperties<T> {
  (mapper: (property: Schema, key: string | number) => T): T[]
}
```

## reduceProperties

### Description

Reduce the current Schema `properties` in `x-index` order.

### Signature

```ts
interface reduceProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

## reducePatternProperties

### Description

Reduce the current Schema `patternProperties` in `x-index` order.

### Signature

```ts
interface reducePatternProperties<T> {
  (
    reducer: (value: T, property: Schema, key: string | number) => T,
    initialValue?: T
  ): T
}
```

## compile

### Description

Recursively walks the current Schema object, compiles expression fragments, and returns the Schema instance. You can pass a scope object and consume its variables inside expressions.

Expression fragments are strings that start with <code v-pre>{{</code> and end with <code v-pre>}}</code>.

### Signature

```ts
interface compile {
  (scope: any): Schema
}
```

### Example

The following example compiles expressions inside a Schema into final values. It is useful when you manually create a `Schema` instance and want to inject runtime variables before consuming it elsewhere.

```ts
import { Schema } from '@formily/json-schema'

const schema = new Schema({
  type: 'object',
  properties: {
    age: {
      'type': 'string',
      'title': '{{user.name}}\'s age',
      'x-visible': '{{showAge}}',
      'x-component-props': {
        placeholder: '{{user.name}}, please enter your age',
      },
    },
  },
})

schema.compile({
  user: { name: 'Alice' },
  showAge: true,
})

console.log(schema.properties.age.title)
// Alice's age

console.log(schema.properties.age['x-visible'])
// true

console.log(schema.properties.age['x-component-props'].placeholder)
// Alice, please enter your age
```

## fromJSON

### Description

Convert plain JSON data into a `Schema` instance.

### Signature

```ts
interface fromJSON {
  (json: ISchema): Schema
}
```

## toJSON

### Description

Convert the current `Schema` instance into plain JSON data.

### Signature

```ts
interface toJSON {
  (): ISchema
}
```

## toFieldProps

### Description

Convert the current Schema into Formily field model props. See [Properties](/en/api/properties#properties) for the field mapping reference.

### Signature

```ts
import { IFieldFactoryProps } from '@formily/core'

interface toFieldProps {
  (): IFieldFactoryProps
}
```

For `IFieldFactoryProps`, see [IFieldFactoryProps](https://core.formilyjs.org/api/models/form#ifieldfactoryprops).
