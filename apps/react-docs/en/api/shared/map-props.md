# mapProps

## Description

An adapter function that maps [Field](https://core.silver-formily.org/api/models/Field) attributes to component attributes, mainly used together with the connect function.

## Signature

```ts
import type { Field, GeneralField } from '@silver-formily/core'
import type { IStateMapper, JSXComponent } from '@silver-formily/react'

type IStateMapper<Props>
  = | {
    [key in keyof Field]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)

interface mapProps<T extends JSXComponent> {
  (...args: IStateMapper<React.ComponentProps<T>>[]): IComponentMapper<T>
}
```

- The argument can be an object (the key is a field attribute and the value is a component attribute; if the value is `true`, the mapped attribute name is the same)
- The argument can be a function, which can map the attributes in more complex ways

## Usage

:::demo
api/shared/map-props.tsx
:::
