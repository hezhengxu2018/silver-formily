# FormConsumer

## Description

Reactive consumer that listens to Formily form state changes via a scoped slot. Whenever the data accessed inside the slot changes, the slot re-renders.

Refer to [Form](https://core.formilyjs.org/api/models/form) for the exposed API surface.

## Usage

::: demo
api/components/form-consumer
:::

## API

### Slots

| Slot    | Description                            | Type                      |
| ------- | -------------------------------------- | ------------------------- |
| default | Scoped slot receiving the current form | ^[object]`{ form: Form }` |
