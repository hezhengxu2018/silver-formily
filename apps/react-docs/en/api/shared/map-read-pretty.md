# mapReadPretty

## Description

Since most third-party components do not support the read-pretty state, if you want to quickly support the read-pretty state, you can use the mapReadPretty function to map a read-pretty component.

## Signature

```ts
interface mapReadPretty<T extends JSXComponent, C extends JSXComponent> {
  (component: C, readPrettyProps?: React.ComponentProps<C>): IComponentMapper<T>
}
```

The second argument can declare extra props for the read-pretty component; when rendering in the read-pretty state, they are merged with the props received by the original component (the read-pretty component's props take precedence).

## Usage

:::demo
api/shared/map-read-pretty.tsx
:::
