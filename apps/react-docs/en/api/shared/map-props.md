# mapProps

## Description

An adapter function that maps [Field](https://core.silver-formily.org/api/models/Field) attributes to component attributes, mainly used together with the connect function.

## Signature

```ts
import type { IStateMapper, JSXComponent } from '@silver-formily/react'
import type React from 'react'

declare function mapProps<T extends JSXComponent>(
  ...mappers: IStateMapper<React.ComponentProps<T>>[]
): (target: T) => React.ComponentType<any>
```

- The argument can be an object (the key is a field attribute and the value is a component attribute; if the value is `true`, the mapped attribute name is the same)
- The argument can be a function, which can map the attributes in more complex ways

## Usage

:::demo
api/shared/map-props.tsx
:::

Mappers run left to right against a shallow copy of incoming props. Function results are merged into that copy. Object mappings overwrite the destination with the field value, except when the field value is nullish and the destination already has a non-nullish value. Both boolean values use the source property name: `false` does **not** disable mapping. Mapping `value` to another name removes the original `value` prop. Use this adapter beneath a field context.
