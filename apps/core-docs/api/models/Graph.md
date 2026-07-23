---
order: 6
---

# Graph

::: warning 内部模型
`Graph` 主要供框架内部使用，业务场景几乎不会直接实例化或调用。除非正在开发底层扩展，否则请优先使用 Form 提供的公开 API。
:::

`Graph` 是 Form 内部使用的字段图快照管理器。通常应通过 [Form.getFormGraph](/api/models/Form#getformgraph) 和 [Form.setFormGraph](/api/models/Form#setformgraph) 操作，而不是手动创建实例。

## 构造函数

```ts
interface GraphConstructor {
  new(form: Form): Graph
}
```

## 属性

| 属性 | 描述             | 类型   |
| ---- | ---------------- | ------ |
| form | 关联的 Form 实例 | `Form` |

## getGraph

返回 Form 与全部已注册字段的状态快照。空字符串键 `''` 保存 Form 状态，其他键使用字段的绝对 `address`。

```ts
interface getGraph {
  (): IFormGraph
}
```

## setGraph

恢复字段图快照。已有字段会更新状态，不存在的字段会根据快照中的 `displayName` 创建为 Field、ArrayField、ObjectField 或 VoidField。

```ts
interface setGraph {
  (graph: IFormGraph): void
}
```

:::tip
`setGraph()` 只应用快照中存在的条目，不会自动删除当前 Form 中未出现在快照里的字段。如需先清空字段图，请明确处理 [clearFormGraph](/api/models/Form#clearformgraph) 的 `forceClear` 数据清理语义。
:::
