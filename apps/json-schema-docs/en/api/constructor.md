# Constructor

```ts
class Schema {
  constructor(json: ISchema, parent?: ISchema)
}
```

Creates a Schema tree from a plain JSON Schema object, ensuring that every schema node is wrapped as a `Schema` instance with the corresponding instance methods.
