# FormDialog

> Dialog-based form component, mainly used when a form is opened from a simple event trigger.

::: warning Note
This component has been refactored and no longer passes context by `id`. Pay close attention to the function signature changes. Similar capabilities are now implemented with Vue's [JSX slot syntax](https://vuejs.org/guide/extras/render-function.html#passing-slots).
:::

::: tip Tip
When using function components, you can access `form` conveniently through destructuring. See the template example for details.
:::

## Markup Schema Example

:::demo

form-dialog/markup-schema

:::

## JSON Schema Example

:::demo

form-dialog/json-schema

:::

## Template Example

:::demo

form-dialog/template

:::

## Template Slot Example

:::demo

form-dialog/template-slot

:::

## Using Generics

`FormDialog` now supports generics for both form value types and dynamic middleware names. The two most common patterns are:

1. Declare only the form value type so `form.values`, `open({ values })`, and `forConfirm` all get precise typing.
2. Declare dynamic middleware names as well so methods such as `forSaveDraft` get type hints, and pair them with `resolve('saveDraft')` to trigger the corresponding logic.

```tsx
type UserFormValues = {
  name: string
  age: number
}

FormDialog<UserFormValues>('Edit User', ({ form }) => {
  form.values.name
  form.values.age
  return <UserForm />
})

FormDialog<UserFormValues, ['save-draft']>(
  'Edit User',
  {
    footer: ({ resolve, reject, form }) => {
      form.values.name
      resolve('saveDraft')
      resolve()
      reject()
      return []
    },
  },
  ['save-draft'] as const,
)
  .forSaveDraft((form) => {
    return form.values
  })
```

::: tip Tip
If you pass `dynamicMiddlewareNames`, prefer a readonly literal such as `['save-draft'] as const` so return methods like `forSaveDraft` can be inferred correctly.
:::

## Enter-to-Submit Configuration

By default, FormDialog listens for the Enter key inside active inputs and triggers `resolve`. If you need to disable that behavior, pass `enterSubmit: false`.

FormDialog also closes automatically when the browser URL changes, including Back, Forward, and application-side `pushState` / `replaceState`. If you want the dialog to stay open across route changes, set `closeOnUrlChange: false` explicitly.

:::demo

form-dialog/enter-submit

:::

### Nested Popup Example

You can call `FormDialog` again from inside an existing FormDialog to open a nested dialog. The component automatically ensures that only the top-most instance responds to shortcuts and submission.

:::demo

form-dialog/nested

:::

## API

### FormDialog Function Arguments

| Parameter                    | Description                                                                   | Type                                                    |
| ---------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- |
| `title` or `formDialogProps` | Dialog title or Dialog props                                                  | `string` `FormDialogProps`                              |
| `formDialogSlots`            | Dialog content, supporting components, VNodes, and slot-style authoring       | `Component` `VNode[]` `() => VNode[]` `FormDialogSlots` |
| `dynamicMiddlewareNames`     | List of dynamic middleware names. They are normalized to camelCase when used. | `string[]` except `cancel`, `confirm`, `open`           |

::: warning Note
`formDialogProps` has reserved fields. Passing `modelValue` or `onUpdate:modelValue` has no effect because they are already used internally by FormDialog.
:::

Complete function type declaration:

```ts
interface FormDialog {
  <TValues extends object = any, DynamicMiddlewareNames extends readonly string[] = []>(
    title: IFormDialogProps | string,
    content?: Component | FormDialogSlotContent<TValues, DynamicMiddlewareNames[number]>,
    dynamicMiddlewareNames?: DynamicMiddlewareNames
  ): IFormDialog<TValues, DynamicMiddlewareNames[number]>
}
```

#### title

The first argument. When a string is passed, it is displayed as the dialog title. You can also pass `IFormDialogProps` for customization. Prefer middleware such as `forOpen`, `forConfirm`, and `forCancel` when you need to control the dialog lifecycle.

| Parameter           | Description                                                       | Type          | Default   |
| ------------------- | ----------------------------------------------------------------- | ------------- | --------- |
| `cancelText`        | Cancel button text                                                | `string`      | `Cancel`  |
| `cancelButtonProps` | Props for the cancel button                                       | `ButtonProps` | -         |
| `okText`            | Confirm button text                                               | `string`      | `Confirm` |
| `okButtonProps`     | Props for the confirm button                                      | `ButtonProps` | -         |
| `loadingText`       | Loading text                                                      | `string`      | `loading` |
| `enterSubmit`       | Whether pressing Enter in an input immediately triggers `resolve` | `boolean`     | `true`    |
| `closeOnUrlChange`  | Whether the dialog closes automatically on URL change             | `boolean`     | `true`    |

For the rest, see [https://element-plus.org/en-US/component/dialog.html](https://element-plus.org/en-US/component/dialog.html#attributes)

#### content

The second argument. In addition to components and VNodes, it can also accept Vue's [JSX slot syntax](https://vuejs.org/guide/extras/render-function.html#passing-slots) for customizing `header` and `footer`.

| Slot      | Description                                                                                                                                | Type                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `default` | Main dialog content. Supports components, VNodes, and scoped-slot style content. Injects `form`, `resolve`, and `reject`.                  | `FormDialogSlotProps` |
| `header`  | Header slot. Scoped content can call `resolve` or `reject` to close the dialog. `resolve` can receive names from `dynamicMiddlewareNames`. | `FormDialogSlotProps` |
| `footer`  | Footer slot. Scoped content can call `resolve` or `reject` to close the dialog. `resolve` can receive names from `dynamicMiddlewareNames`. | `FormDialogSlotProps` |

#### dynamicMiddlewareNames

The third argument. It is a string array used to trigger custom actions from buttons defined in the header or footer.

For example, if you want to add a save-draft action to the dialog, pass `'saveDraft'` in `dynamicMiddlewareNames`, then bind `resolve('saveDraft')` to a button inside `footer`.

After that, you can attach business logic with `forSaveDraft`, just like `forConfirm`. See the demo for a complete example.

::: tip Tip
Strings passed through `dynamicMiddlewareNames` are converted to camelCase. For example, `'save-draft'` becomes `'saveDraft'`.
:::

::: tip Tip
When used together with generics, literal values in `dynamicMiddlewareNames` affect the method-level type hints on the return value, such as:

- `forSaveDraft`
- `forPublishNow`
  :::

### IFormDialog Return Value

The return value is a Promise-like object, so you can `await` it to simplify flow control. You still need to call `open` to display the dialog. Chain calls can be used to handle different lifecycle events, and dynamic middleware actions are also supported through `dynamicMiddlewareNames`.

| Method          | Description      | Type                                         |
| --------------- | ---------------- | -------------------------------------------- |
| `open`          | Open dialog      | `(IFormProps) => Promise<IFormProps.values>` |
| `forOpen`       | Dialog open hook | `(IMiddleware<IFormProps>) => IFormDialog`   |
| `forConfirm`    | Confirm hook     | `(IMiddleware<Form>) => IFormDialog`         |
| `forCancel`     | Cancel hook      | `(IMiddleware<Form>) => IFormDialog`         |
| `for${Dynamic}` | Custom hook      | `(IMiddleware<Form>) => IFormDialog`         |

::: tip Tip
In custom hooks, `Dynamic` corresponds to the values passed into `dynamicMiddlewareNames`. The related action is triggered by calling `resolve` inside scoped slots. When methods are generated, names from `dynamicMiddlewareNames` are converted to PascalCase, so `['save-draft']` becomes `forSaveDraft`.
:::

::: tip Tip
Dialogs that close without calling `resolve` are now surfaced as errors. In `async/await` flows, that means any logic after `await FormDialog(...)` only runs after a successful form submission.
:::

### Type Declarations

#### IFormDialogProps

<<< @/../../packages/element-plus/src/form-dialog/types.ts#props

#### FormDialogSlots

<<< @/../../packages/element-plus/src/form-dialog/types.ts#slots

#### IFormDialog

<<< @/../../packages/element-plus/src/form-dialog/types.ts#iformdialog
