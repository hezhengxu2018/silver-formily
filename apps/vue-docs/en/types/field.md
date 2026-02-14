# Field

Refer to the upstream docs for the complete type definitions. The two helpers used most often in this site are listed below.

## GeneralField

```ts
type GeneralField = Field | VoidField | ArrayField | ObjectField
```

## FieldReaction

```ts
type FieldReaction = (field: GeneralField) => void
```
