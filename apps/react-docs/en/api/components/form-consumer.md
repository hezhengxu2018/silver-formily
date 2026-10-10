# FormConsumer

## Description

A form reactive consumer, a component dedicated to implementing various UI responses by listening to form model data changes. It is used with render props.

The callback function re-renders whenever the data it depends on changes.

See [Form](https://core.silver-formily.org/api/models/Form) for Form.

## Usage

:::demo
api/components/form-consumer.tsx
:::

## API

### FormConsumer children

| Attribute | Description                                         | Type                                            |
| --------- | --------------------------------------------------- | ----------------------------------------------- |
| children  | Render function, receives the current Form instance | ^[Function]`(form: Form) => React.ReactElement` |
