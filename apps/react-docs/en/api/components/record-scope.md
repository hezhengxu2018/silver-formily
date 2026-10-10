# RecordScope

## Description

Injects the `$record` and `$index` variables into the Schema expressions of the subtree, mainly used for scenarios such as self-incrementing lists that need to render recursively with row data.

## Usage

:::demo
api/components/record-scope.tsx
:::

## API

| Attribute | Description                                  | Type                      | Default |
| --------- | -------------------------------------------- | ------------------------- | ------- |
| getRecord | Function that returns the current row record | ^[Function]`() => any`    | -       |
| getIndex  | Function that returns the current row index  | ^[Function]`() => number` | -       |
| children  | Child nodes                                  | `React.ReactNode`         | -       |

Injected expression variables:

| Variable  | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| `$record` | Return value of `getRecord()`; object records also carry `$lookup` and `$index` |
| `$index`  | Return value of `getIndex()`                                                    |
| `$lookup` | The `$record` of the outer scope, used for nested lists                         |
