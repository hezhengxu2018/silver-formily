# FormStep

> Step form component

::: warning Note
This component is intended for Schema-based scenarios only.
:::

## Markup Schema Example

::: tip Tip
Objects created by `createFormStep` are reactive values from `@silver-formily/reactive`. In the example, `FormConsumer` is used to make updates render correctly.
:::

:::demo

../../en/demos/form-step/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/form-step/json-schema

:::

## API

### FormStep

| Prop       | Type        | Description                                | Default |
| ---------- | ----------- | ------------------------------------------ | ------- |
| `formStep` | `IFormStep` | Model instance created by `createFormStep` | -       |

For the rest, see [https://element-plus.org/en-US/component/steps.html](https://element-plus.org/en-US/component/steps.html)

### FormStep.StepPane

See [https://element-plus.org/en-US/component/steps.html](https://element-plus.org/en-US/component/steps.html)

### FormStep.createFormStep

```ts pure
interface createFormStep {
  (current?: number): IFormStep
}

interface IFormStep {
  // Current index
  current: number
  // Whether moving forward is allowed
  allowNext: boolean
  // Whether moving backward is allowed
  allowBack: boolean
  // Set the current index
  setCurrent: (key: number) => void
  // Submit the form
  submit: Formily.Core.Models.Form['submit']
  // Move forward
  next: () => void
  // Move backward
  back: () => void
}
```
