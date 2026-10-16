# ArrayField

## Description

As the React implementation of [createArrayField](https://core.silver-formily.org/api/models/Form#createarrayfield) from `@silver-formily/core`, it is a bridge component dedicated to binding a ViewModel to an input control. See [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops) for the ArrayField component props.

The name attribute is required. Use render props or a custom component to render the list; plain ReactNode children are also accepted.

## Usage

:::demo
api/components/array-field.tsx
:::

## API

Props follow Field, but the children callback receives `ArrayField`. See the [Field API](/en/api/components/field#api) for shared props.

```ts
import type { ArrayField as Model } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '@silver-formily/react'

type Props<D extends JSXComponent, C extends JSXComponent> = IFieldProps<D, C, Model>
```
