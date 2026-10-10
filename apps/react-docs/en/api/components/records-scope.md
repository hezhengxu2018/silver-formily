# RecordsScope

## Description

Standard scoped injection component, injecting the following built-in variable into the Schema expressions of the subtree:

- `$records` current record list data

Usually used together with [RecordScope](/en/api/components/record-scope): RecordsScope provides the data source for the whole list, and RecordScope injects the current row record when each row is rendered.

## Usage Convention

Any auto-incrementing list extension component should use RecordsScope internally to pass record scope variables.

## Usage

:::demo
api/components/records-scope.tsx
:::

## API

| Attribute  | Description                                         | Type                     | Default |
| ---------- | --------------------------------------------------- | ------------------------ | ------- |
| getRecords | Function that returns the current record collection | ^[Function]`() => any[]` | -       |
| children   | Child nodes                                         | `React.ReactNode`        | -       |
