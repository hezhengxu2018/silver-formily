---
order: 2
---

# ObjectField

## Description

As the React implementation of [createObjectField](https://core.silver-formily.org/api/models/Form#createobjectfield) from `@silver-formily/core`, it is a bridge component dedicated to binding a ViewModel to an input control. See [IFieldFactoryProps](https://core.silver-formily.org/api/models/Form#ifieldfactoryprops) for the ObjectField component props.

The name attribute is required. Child fields can be written directly inside children.

## Usage

:::demo
api/components/object-field.tsx
:::

## API

Props follow Field, but the children callback receives `ObjectField`. See the [Field API](/en/api/components/field#api) for shared props.

```ts
import type { ObjectField as Model } from '@silver-formily/core'
import type { IFieldProps, JSXComponent } from '@silver-formily/react'

type Props<D extends JSXComponent, C extends JSXComponent> = IFieldProps<D, C, Model>
```
