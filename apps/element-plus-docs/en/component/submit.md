# Submit

> Submit button

## Basic Submit

::: demo

submit/base

:::

## Duplicate-Submission Guard

::: demo

submit/loading

:::

## API

Most props are inherited from the [Button component](https://element-plus.org/en-US/component/button.html). The following are Submit-specific API props.

| Prop              | Type                                                                                                    | Description                                        | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- |
| `onClick`         | `(event: MouseEvent) => void \| boolean`                                                                | Click handler. Return `false` to block submission. | -       |
| `onSubmit`        | `(values: any) => Promise<any> \| any`                                                                  | Submit callback                                    | -       |
| `onSubmitSuccess` | `(payload: any) => void`                                                                                | Submit success callback                            | -       |
| `onSubmitFailed`  | `(feedbacks: [IFormFeedback](https://core.silver-formily.org/api/models/Form#iformfeedback)[]) => void` | Submit validation failure callback                 | -       |
