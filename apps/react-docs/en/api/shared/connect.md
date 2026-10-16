# connect

## Description

Mainly used to integrate third-party component libraries into Formily non-invasively.

## Signature

```ts
import type { ConnectedComponent, JSXComponent } from '@silver-formily/react'

interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}

declare function connect<T extends JSXComponent>(
  target: T,
  ...args: IComponentMapper<T>[]
): ConnectedComponent<T>
```

The first argument is the component to connect; the remaining arguments are all component mappers, each of which is a function. Usually we use the built-in [mapProps](/en/api/shared/map-props) and [mapReadPretty](/en/api/shared/map-read-pretty) mappers.

Internally, `connect` wraps the target component with `forwardRef` and passes the ref through, and hoists the target component's static properties via `hoist-non-react-statics`.

## Usage

:::demo
api/shared/connect.tsx
:::

`ConnectedComponent<T>` makes the original props optional, retains the ref target type and hoisted custom statics, and excludes React metadata. Mappers are applied in argument order. `mapProps` / `mapReadPretty` themselves return `ComponentType<any>`; the precise public props of the connected component come from the original target.
