---
order: 6
---

# FormProvider

## Description

The entry component, used to distribute the form context down to the field components. It is responsible for the communication of the entire form state, acting as a communication hub.

## Usage

:::demo
api/components/form-provider.tsx
:::

## API

| Attribute | Description                                                  | Type                                                    | Default |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------- | ------- |
| form      | Form instance, the return value of the `createForm` function | [Form](https://core.silver-formily.org/api/models/Form) | -       |
