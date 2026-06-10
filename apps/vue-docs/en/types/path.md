# Path

`@silver-formily/vue` does not define its own path protocol. Every path-related type in the Vue package is reused directly from `@silver-formily/path`.

The most visible entry point is `IRecursionFieldProps['basePath']`:

```ts
interface IRecursionFieldProps {
  schema: Schema | ISchema
  name?: SchemaKey
  basePath?: FormPathPattern
  onlyRenderProperties?: boolean
  onlyRenderSelf?: boolean
  mapProperties?: ISchemaMapper
  filterProperties?: ISchemaFilter
}
```

`FormPathPattern` here is just the imported path contract. The Vue package does not extend or reinterpret it.

Go straight to the [Path docs](https://path.silver-formily.org/) for:

- path strings versus array paths
- wildcard and alias-group matching
- the `Path` class and accessor APIs
