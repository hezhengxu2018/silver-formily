# connect

## Description

Adapter helper that wires third-party Vue components into Formily without touching their internals.

## Signature

```ts
import type { VueComponentProps } from '@silver-formily/vue'

interface IComponentMapper<T extends Vue.Component> {
  (target: T): Vue.Component
}

declare function connect<T extends Vue.Component, Props = VueComponentProps<T>>(
  target: T,
  ...args: IComponentMapper<T>[]
): ConnectedComponent<T, Props>
```

Pass the component you want to enhance as the first argument, then any number of mappers. In most cases you combine it with [mapProps](/en/api/shared/map-props) and [mapReadPretty](/en/api/shared/map-read-pretty).

By default, `connect` extracts the target component's public props and preserves its
props, slots, and instance type. To add Formily or application-specific props, provide
the second type parameter:

```ts
import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

type InputProps = VueComponentProps<typeof ElInput> & {
  formilyReadonly?: boolean
}

const ConnectedInput = connect<typeof ElInput, InputProps>(
  ElInput,
  mapProps({
    formilyReadonly: 'readonly',
  }),
)
```

This only changes TypeScript inference. The runtime behavior of `connect` and `mapProps`,
including attrs and event forwarding, remains unchanged.

## Example

::: demo
api/shared/connect
:::
