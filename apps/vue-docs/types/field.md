# Field

完整的Field类型声明请参考官方文档

## GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

## FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```
