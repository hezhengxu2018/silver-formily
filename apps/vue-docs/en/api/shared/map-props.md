# mapProps

## Description

Adaptor that maps [Field](https://core.formilyjs.org/api/models/field) properties to component props—usually paired with `connect`.

## Signature

```ts
import { Field, GeneralField } from "@formily/core";

type IStateMapper<Props> =
  | {
      [key in keyof Field]?: keyof Props | boolean;
    }
  | ((props: Props, field: GeneralField) => Props);

interface mapProps<T extends Vue.Component> {
  (...args: IStateMapper<VueComponentProps<T>>[]): Vue.Component;
}
```

- Use objects to map Field keys to component props (set the value to `true` when both prop names match).
- Use functions for advanced mapping logic.

## Example

::: demo
api/shared/map-props
:::
