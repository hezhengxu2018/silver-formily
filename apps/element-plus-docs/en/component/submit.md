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

| Prop              | Type                                                | Description                                        | Default |
| ----------------- | --------------------------------------------------- | -------------------------------------------------- | ------- |
| `onClick`         | ^[Function]`(event: MouseEvent) => void \| boolean` | Click handler. Return `false` to block submission. | -       |
| `onSubmit`        | ^[Function]`(values: any) => Promise<any> \| any`   | Submit callback                                    | -       |
| `onSubmitSuccess` | ^[Function]`(payload: any) => void`                 | Submit success callback                            | -       |
| `onSubmitFailed`  | ^[Function]`(feedbacks: IFormFeedback[]) => void`   | Submit validation failure callback                 | -       |
| `submit`          | `boolean`                                           | Whether to render as a native submit button        | `true`  |

### IFormFeedback

See [IFormFeedback](https://core.silver-formily.org/api/models/Form#iformfeedback).
