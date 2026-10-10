# RecordsScope

## Description

Injects the `$records` variable into the Schema expressions of the subtree, usually used together with [RecordScope](/en/api/components/record-scope) to provide the data source for a whole list.

## Usage

:::demo
api/components/records-scope.tsx
:::

## API

| Attribute  | Description                                         | Type                     | Default |
| ---------- | --------------------------------------------------- | ------------------------ | ------- |
| getRecords | Function that returns the current record collection | ^[Function]`() => any[]` | -       |
| children   | Child nodes                                         | `React.ReactNode`        | -       |

Injected expression variables:

| Variable   | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| `$records` | Return value of `getRecords()`, defaults to `[]` when not provided |
