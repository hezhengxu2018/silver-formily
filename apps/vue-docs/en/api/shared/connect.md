# connect

## Description

Adapter helper that wires third-party Vue components into Formily without touching their internals.

## Signature

```ts
interface IComponentMapper<T extends Vue.Component> {
  (target: T): Vue.Component;
}
interface connect<T extends Vue.Component> {
  (target: T, ...args: IComponentMapper<T>[]): Vue.Component;
}
```

Pass the component you want to enhance as the first argument, then any number of mappers. In most cases you combine it with [mapProps](/en/api/shared/map-props) and [mapReadPretty](/en/api/shared/map-read-pretty).

## Example

::: demo
api/shared/connect
:::
