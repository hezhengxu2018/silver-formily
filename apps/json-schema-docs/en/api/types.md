# Types

## ISchema

### Description

`ISchema` is a plain JSON object that follows the Schema [Properties](/en/api/properties#properties) specification.

## SchemaTypes

### Description

The supported schema types.

### Signature

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

### Description

Schema property definitions.

### Signature

```ts
type SchemaProperties = Record<string, ISchema>
```

## SchemaItems

### Description

Schema array item definitions.

### Signature

```ts
type SchemaItems = ISchema | ISchema[]
```

## SchemaEnum

### Description

Schema enum definitions.

### Signature

```ts
type SchemaEnum<Message> = Array<
  | string
  | number
  | { label: Message, value: any, [key: string]: any }
  | { key: any, title: Message, [key: string]: any }
>
```

## SchemaReactions

### Description

Schema linkage protocol. If a reaction object contains `target`, it works in active linkage mode; otherwise it works in passive linkage mode.

If you need more complex linkage, you can pass a reaction handler function through scope.

For FormPathPattern syntax, see the [FormPathPattern documentation](https://core.formilyjs.org/api/entry/form-path#formpathpattern).

Detailed linkage patterns and runnable examples are documented in [Linkage Examples](/en/api/linkages).

### Signature

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
    dependencies?: // dependency path list, supports FormPathPattern syntax; passive dependencies support relative paths
      | Array<
        | string // string items are exposed as an array when reading from scope
        | {
          // object items can be read from $deps by alias
          name?: string // alias used when reading from $deps
          type?: string // field type
          source?: string // field path
          property?: string // dependent property, defaults to value
        }
      >
      | Record<string, string> // object form is also exposed as an object, with keys acting as aliases
    when?: string | boolean // linkage condition
    target?: string // target field path, supports FormPathPattern matching syntax; relative paths are not supported
    effects?: SchemaReactionEffect[] // lifecycle hooks available in active mode
    fulfill?: {
      // when the condition matches
      state?: IGeneralFieldState // update field state
      schema?: ISchema // update schema
      run?: string // execute statement
    }
    otherwise?: {
      // when the condition does not match
      state?: IGeneralFieldState // update field state
      schema?: ISchema // update schema
      run?: string // execute statement
    }
  }
  | ((field: Field) => void) // function form for complex linkage

type SchemaReactions<Field = any>
  = | SchemaReaction<Field>
    | SchemaReaction<Field>[] // arrays are supported
```
