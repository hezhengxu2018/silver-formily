# Path

`@silver-formily/react` does not define its own path protocol. All path-related types in the React package directly reuse `@silver-formily/path`.

The most common entry point in this package is `IRecursionFieldProps['basePath']`:

```ts
interface IRecursionFieldProps {
  schema: ISchema
  name?: SchemaKey
  basePath?: FormPathPattern
  propsRecursion?: boolean
  onlyRenderProperties?: boolean
  onlyRenderSelf?: boolean
  mapProperties?: ISchemaMapper
  filterProperties?: ISchemaFilter
  children?: React.ReactNode
}
```

The `FormPathPattern` here is only an alias imported from `@silver-formily/path`; it is not a new type additionally introduced by the React package.

If you want to understand:

- how path strings and array paths convert to each other
- how wildcards, alias groups and regular expression matching work
- the `Path` class and the accessor API

please refer directly to the [Path documentation](https://path.silver-formily.org/).
