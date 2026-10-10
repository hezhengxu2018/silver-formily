# connect

## Description

Mainly used to integrate third-party component libraries into Formily non-invasively.

## Signature

```ts
import type { IComponentMapper, JSXComponent } from '@silver-formily/react'

interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}

declare function connect<T extends JSXComponent>(
  target: T,
  ...args: IComponentMapper<T>[]
): React.ComponentType<Partial<React.ComponentProps<T>>>
```

The first argument is the component to connect; the remaining arguments are all component mappers, each of which is a function. Usually we use the built-in [mapProps](/en/api/shared/map-props) and [mapReadPretty](/en/api/shared/map-read-pretty) mappers.

Internally, `connect` wraps the target component with `forwardRef` and passes the ref through, and hoists the target component's static properties via `hoist-non-react-statics`.

## Usage

:::demo
api/shared/connect.tsx
:::
