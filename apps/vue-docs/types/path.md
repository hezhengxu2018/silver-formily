# Path

`@silver-formily/vue` 没有定义自己的路径协议。Vue 包里涉及路径的类型都直接复用 `@silver-formily/path`。

本包最常见的入口是 `IRecursionFieldProps['basePath']`：

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

这里的 `FormPathPattern` 只是从 `@silver-formily/path` 引入的别名来源，不是 Vue 包额外扩展出来的新类型。

如果你要了解：

- 路径字符串和数组路径如何互转
- 通配符、别名组、正则匹配如何工作
- `Path` 类与访问器 API

请直接查看 [Path 文档](https://path.silver-formily.org/)。
