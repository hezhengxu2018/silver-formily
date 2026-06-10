# Field

This page only covers the field-related types that `@silver-formily/vue` adds or reshapes on top of Core.

The actual field and form models such as `Field`, `ArrayField`, `ObjectField`, `VoidField`, `GeneralField`, and `Form` belong to `@silver-formily/core`. Read the source docs directly in the [Field model docs](https://core.silver-formily.org/en/api/models/Field) and the [Form model docs](https://core.silver-formily.org/en/api/models/Form).

## `IProviderProps`

`FormProvider` keeps its props intentionally small and only exposes a `Form` instance to descendants:

```ts
interface IProviderProps {
  form: Form
}
```

## `IFieldProps`

The Vue-facing field props start from `CoreFieldProps` and only make two adjustments:

- replace `validator` with the Vue-side alias `SchemaFieldValidator`
- add `decoratorContent` for decorator-centric render trees

```ts
interface IFieldProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}
```

## `IFieldFactoryProps`

Factory components such as `Field`, `ArrayField`, and `ObjectField` share the same factory props contract, derived from `CoreFieldFactoryProps`:

```ts
interface IFieldFactoryProps<
  D extends Component = Component,
  C extends Component = Component,
  TextType = any,
  ValueType = any,
> extends Omit<CoreFieldFactoryProps<D, C, TextType, ValueType>, 'validator'> {
  validator?: SchemaFieldValidator
  decoratorContent?: any
}
```

## `IVoidFieldProps`

`VoidField` does not carry a value, so the Vue package keeps the Core factory contract and only adds `decoratorContent`:

```ts
type IVoidFieldProps<
  D extends Component = Component,
  C extends Component = Component,
> = IVoidFieldFactoryProps<D, C> & {
  decoratorContent?: any
}
```

## `IArrayFieldProps` and `IObjectFieldProps`

These two are aliases today:

```ts
type IArrayFieldProps = IFieldProps
type IObjectFieldProps = IFieldProps
```

That keeps component signatures readable without introducing a brand-new field protocol.

## `IReactiveFieldProps`

The internal reactive renderer normalizes the field kind and its props into one payload:

```ts
interface IReactiveFieldProps {
  fieldType: 'Field' | 'ArrayField' | 'ObjectField' | 'VoidField'
  fieldProps: IFieldProps | IVoidFieldProps
}
```

## `IStateMapper<Props>`

This type describes how field state is projected into component props. It supports either a property map or a function:

```ts
type IStateMapper<Props>
  = | {
    [key in keyof Field]?: keyof Props | boolean
  }
  | ((props: Props, field: GeneralField) => Props)
```

If you need the full shape of `Field` or `GeneralField`, return to the [Core Field docs](https://core.silver-formily.org/en/api/models/Field). This page only keeps the Vue-side integration surface.
