# Form

> A composite wrapper built from FormProvider, FormLayout, and a native `form` tag. It helps you assemble forms quickly while preserving Enter-to-submit behavior and centralized layout control.

::: warning Note
The `component` prop has been renamed to `tag` and moved to the FormLayout component.
:::

## Form Example

:::demo

../../en/demos/form/form

:::

> Note: If you want Enter-to-submit behavior, do not attach a `submit` handler directly to the Submit component. Doing so bypasses the Form-level auto-submit flow. This constraint prevents submit logic from being scattered across multiple places and becoming inconsistent or hard to debug.

## API

Most props are inherited from [FormLayout](./form-layout). The following are the extra props exposed by the Form component.

| Prop                     | Type                                                    | Description                                     | Default |
| ------------------------ | ------------------------------------------------------- | ----------------------------------------------- | ------- |
| `form`                   | [Form](https://core.silver-formily.org/api/models/Form) | Form instance                                   | -       |
| `previewTextPlaceholder` | `string`                                                | Placeholder shown in read-pretty mode           | `N/A`   |
| `onAutoSubmit`           | `(values: any) => any`                                  | Callback triggered by Enter-to-submit           | -       |
| `onAutoSubmitFailed`     | `(feedbacks) => void`                                   | Validation failure callback for Enter-to-submit | -       |
