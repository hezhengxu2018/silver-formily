# 构造器

```ts
class Schema {
  constructor(json: ISchema, parent?: ISchema)
}
```

基于一份 json schema 数据创建一棵 Schema Tree，保证每个 schema 节点都是包含对应方法的
