# RecordScope

## Description

Standard scoped injection component, injecting the following built-in variables into the Schema expressions of the subtree:

- `$record` current record data
- `$record.$lookup` the parent record of the current record, you can always look up
- `$record.$index` the index of the current record
- `$index` the current record index, equivalent to `$record.$index`, considering that if the record data is not an object, it needs to be read independently
- `$lookup` the parent record of the current record, equivalent to `$record.$lookup`, considering that if the record data is not an object, it needs to be read independently

Mainly used for scenarios such as self-incrementing lists and tables that need to render recursively with row data, usually used together with [RecordsScope](/en/api/components/records-scope).

## Usage Convention

Any auto-incrementing list extension component should use RecordScope internally to pass record scope variables.

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
