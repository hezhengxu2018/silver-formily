# Static Methods

## getOrderProperties

### Description

Get ordered `properties` from a Schema.

### Signature

```ts
interface getOrderProperties {
  (schema: ISchema = {}, propertiesName: keyof ISchema = 'properties'): ISchema
}
```

## compile

### Description

Recursively walks any object and compiles expression fragments. An expression fragment is a string that starts with <code v-pre>{{</code> and ends with <code v-pre>}}</code>.

### Signature

```ts
interface compile {
  (target: any, scope: any): any
}
```

### Example

Static `compile` is more like a generic utility. The target does not need to be a `Schema` instance.

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
    user: { name: 'Alice' },
    enabled: true,
    count: 2,
  },
)

console.log(result)
// {
//   greeting: 'Alice',
//   visible: true,
//   nested: { text: 3 },
// }
```

## shallowCompile

### Description

Shallowly compiles expression fragments on the current input only. It does not keep traversing nested object members or array items.

### Signature

```ts
interface shallowCompile {
  (target: any, scope: any): any
}
```

### Example

`shallowCompile` only compiles the value you pass in directly. It does not recursively compile nested object or array members.

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

If you want to recursively compile the whole object, use `Schema.compile(target, scope)` above.

## silent

### Description

Enable or disable silent compilation mode. When enabled, expression errors are suppressed.

### Signature

```ts
interface silent {
  (value?: boolean): void
}
```

## isSchemaInstance

### Description

Check whether a target is an instance of the `Schema` class.

### Signature

```ts
interface isSchemaInstance {
  (target: any): target is Schema
}
```

## registerCompiler

### Description

Register a custom expression compiler.

### Signature

```ts
interface registerCompiler {
  (compiler: (expression: string, scope: any) => any): void
}
```

## registerPatches

### Description

Register Schema patches for protocol compatibility across versions.

### Signature

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPatches {
  (...args: SchemaPatch[]): void
}
```

## registerVoidComponents

### Description

Mark components as void components for Formily 1.x compatibility.

### Signature

```ts
interface registerVoidComponents {
  (components: string[]): void
}
```

### Example

```ts
import { Schema } from '@formily/react'

Schema.registerVoidComponents(['card', 'tab', 'step'])
```

::: warning

  <p>This API should be used together with <code>enablePolyfills(['1.0'])</code>.</p>
:::

## registerTypeDefaultComponents

### Description

Register default component names for each Schema type.

### Signature

```ts
interface registerTypeDefaultComponents {
  (maps: Record<string, string>): void
}
```

### Example

```ts
import { Schema } from '@formily/vue'

Schema.registerTypeDefaultComponents({
  string: 'Input',
  number: 'NumberPicker',
  array: 'ArrayTable',
})
```

This API should be used together with <code>enablePolyfills(['1.0'])</code>.

## registerPolyfills

### Description

Register protocol compatibility polyfills.

### Signature

```ts
type SchemaPatch = (schema: ISchema) => ISchema

interface registerPolyfills {
  (version: string, patch: SchemaPatch): void
}
```

### Example

```ts
import { Schema } from '@formily/react'

Schema.registerPolyfills('1.0', (schema) => {
  schema['x-decorator'] = 'FormItem'
  return schema
})
```

## enablePolyfills

### Description

Enable protocol polyfills. The built-in `1.0` compatibility polyfill is enabled by version name and mainly provides the following conversions:

- treats missing `x-decorator` as `FormItem`
- converts `x-linkages` into `x-reactions`
- converts `x-props` into `x-decorator-props`
- converts `x-rules` into `x-validator`
- converts `editable` into `x-editable`
- converts `visible` into `x-visible`
- converts `x-component` values such as `card`, `block`, `grid-row`, `grid-col`, `grid`, `layout`, `step`, `tab`, and `text-box` into `VoidField`

### Signature

```ts
interface enablePolyfills {
  (versions: string[]): void
}
```

### Example

```ts
import { Schema } from '@formily/vue'

Schema.enablePolyfills(['1.0'])
```
