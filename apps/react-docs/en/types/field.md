# Field

This page only covers the types that `@silver-formily/react` adds or consolidates at the field component layer.

Core models such as `Field`, `ArrayField`, `ObjectField`, `VoidField`, `GeneralField` and `Form` all belong to `@silver-formily/core`; see the [Field model documentation](https://core.silver-formily.org/api/models/Field) and the [Form model documentation](https://core.silver-formily.org/api/models/Form) directly.

## `JSXComponent`

The unified constraint for all component mappings on the React side; it can be a native tag name or a component constructor:

```ts
type JSXComponent
  = | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
```

## `IProviderProps`

The props of `FormProvider` are very thin; it only provides a `Form` instance to the subtree:

```ts
interface IProviderProps {
  form: Form
}
```

## `RenderPropsChildren<Payload>`

The `children` of the React field components supports the render props pattern; the render function receives the field instance and the form instance:

```ts
type RenderPropsChildren<Payload>
  = | ((field: Payload, form: Form) => React.ReactNode)
    | React.ReactNode
```

## `IFieldProps`

The React field props are based on Core's `IFieldFactoryProps` and extend `children` and `decoratorContent` with React semantics:

```ts
interface IFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = FieldType,
> extends IFieldFactoryProps<D, C> {
  children?: RenderPropsChildren<Field>
  decoratorContent?: DecoratorContent
  decorator?: [] | [D] | [D, React.ComponentProps<D>] | any[]
  component?: [] | [C] | [C, React.ComponentProps<C>] | any[]
}
```

`Field`, `ArrayField` and `ObjectField` all share the same props; only the `Field` generic parameter is narrowed to the corresponding field model.

## `IVoidFieldProps`

`VoidField` has no value semantics; its props come from Core's `IVoidFieldFactoryProps`:

```ts
interface IVoidFieldProps<
  D extends JSXComponent,
  C extends JSXComponent,
  Field = VoidField,
> extends IVoidFieldFactoryProps<D, C> {
  children?: RenderPropsChildren<Field>
  decoratorContent?: DecoratorContent
  decorator?: [] | [D] | [D, React.ComponentProps<D>] | any[]
  component?: [] | [C] | [C, React.ComponentProps<C>] | any[]
}
```

## `IFormSpyProps`

The props of `FormConsumer`; `children` must be a render function that receives the `Form`:

```ts
interface IFormSpyProps {
  children?: (form: Form) => ReactChild
}
```

## `IComponentMapper<T>`

The mapper signature of `connect`, converting one component into another:

```ts
interface IComponentMapper<T extends JSXComponent> {
  (target: T): JSXComponent
}
```

## `IStateMapper<Props>`

It describes "how to project field state onto component props". It can be a key-mapping object, or a function:

```ts
type IStateMapper<Props>
  = | {
    [key in keyof FieldType]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)
```

If you need to understand the full attributes of `Field` or `GeneralField`, go back to the [Core Field documentation](https://core.silver-formily.org/api/models/Field). This page only keeps the information about how the React side consumes these models.
