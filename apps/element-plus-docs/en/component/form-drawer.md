# FormDrawer

> Drawer form, mainly used when a form is opened by a simple event trigger.

::: warning Note
This component has been refactored and no longer passes context by `id`. Please pay attention to the function signature changes. Similar capabilities are now implemented with Vue's [JSX slot syntax](https://vuejs.org/guide/extras/render-function.html#passing-slots).
:::

::: tip Tip
When using function components, you can quickly access `form` through destructuring. See the template example for details.
:::

## Markup Schema Example

:::demo

../../en/demos/form-drawer/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/form-drawer/json-schema

:::

## Template Example

:::demo

../../en/demos/form-drawer/template

:::

## Template Slot Example

:::demo

../../en/demos/form-drawer/template-slot

:::

## Using Generics

`FormDrawer` now supports generics for both form value types and dynamic middleware names. The two most common usage patterns are:

1. Declare only the form value type so `form.values`, `open({ values })`, and `forConfirm` all get precise typing.
2. Declare dynamic middleware names as well so methods such as `forSaveDraft` get type hints, and pair them with `resolve('saveDraft')` to trigger the corresponding logic.

```tsx
type UserFormValues = {
  name: string
  age: number
}

FormDrawer<UserFormValues>('Edit User', ({ form }) => {
  form.values.name
  form.values.age
  return <UserForm />
})

FormDrawer<UserFormValues, ['save-draft']>(
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

FormDrawer also listens for the Enter key inside inputs and calls `resolve` by default. If the drawer contains custom shortcuts or nested popup layers, you can disable that behavior with `enterSubmit: false`.

FormDrawer also closes automatically when the browser URL changes, including Back, Forward, and application-side `pushState` / `replaceState`. If you want the drawer to stay open across route changes, explicitly set `closeOnUrlChange: false`.

:::demo

../../en/demos/form-drawer/enter-submit

:::

## API

### FormDrawer Function Arguments

| Parameter                    | Description                                                                 | Type                                                    |
| ---------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| `title` or `formDrawerProps` | Drawer title or Drawer props                                                | `string` `FormDrawerProps`                              |
| `formDrawerSlots`            | Drawer content, supporting components, VNodes, and slot-style authoring     | `Component` `VNode[]` `() => VNode[]` `FormDrawerSlots` |
| `dynamicMiddlewareNames`     | List of dynamic middleware names. They are converted to camelCase on usage. | `string[]` except `cancel`, `confirm`, `open`           |

::: warning Note
`formDrawerProps` has reserved fields. Passing `modelValue` or `onUpdate:modelValue` has no effect because they are already used internally by FormDrawer.
:::

Complete function type declaration:

```ts
interface FormDrawer {
  <TValues extends object = any, DynamicMiddlewareNames extends readonly string[] = []>(
    title: IFormDrawerProps | string,
    content?: Component | FormDrawerSlotContent<TValues, DynamicMiddlewareNames[number]>,
    dynamicMiddlewareNames?: DynamicMiddlewareNames
  ): IFormDrawer<TValues, DynamicMiddlewareNames[number]>
}
```

#### title

The first argument. When a string is passed, it is displayed as the drawer title. You can also pass `IFormDrawerProps` for customization. Prefer middleware such as `forOpen`, `forConfirm`, and `forCancel` to control the drawer lifecycle.

| Parameter           | Description                                                       | Type          | Default   |
| ------------------- | ----------------------------------------------------------------- | ------------- | --------- |
| `cancelText`        | Cancel button text                                                | `string`      | `Cancel`  |
| `cancelButtonProps` | Props for the cancel button                                       | `ButtonProps` | -         |
| `okText`            | Confirm button text                                               | `string`      | `Confirm` |
| `okButtonProps`     | Props for the confirm button                                      | `ButtonProps` | -         |
| `loadingText`       | Loading text                                                      | `string`      | `loading` |
| `enterSubmit`       | Whether pressing Enter in an input immediately triggers `resolve` | `boolean`     | `true`    |
| `closeOnUrlChange`  | Whether the drawer closes automatically on URL change             | `boolean`     | `true`    |

For the rest, see [https://element-plus.org/en-US/component/drawer.html](https://element-plus.org/en-US/component/drawer.html#attributes)

#### content

The second argument. In addition to components and VNodes, it can also accept Vue's [JSX slot syntax](https://vuejs.org/guide/extras/render-function.html#passing-slots) to customize `header` and `footer`.

| Slot      | Description                                                                                                                                | Type                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `default` | Main drawer content. Supports components, VNodes, and scoped-slot style content. Injects `form`, `resolve`, and `reject`.                  | `FormDrawerSlotProps` |
| `header`  | Header slot. Scoped content can call `resolve` or `reject` to close the drawer. `resolve` can receive names from `dynamicMiddlewareNames`. | `FormDrawerSlotProps` |
| `footer`  | Footer slot. Scoped content can call `resolve` or `reject` to close the drawer. `resolve` can receive names from `dynamicMiddlewareNames`. | `FormDrawerSlotProps` |

#### dynamicMiddlewareNames

The third argument. It is a string array used to trigger custom actions from buttons defined in the header or footer.

For example, if you want to add a save-draft action to the drawer, pass `'saveDraft'` in `dynamicMiddlewareNames`, then bind `resolve('saveDraft')` to a button inside `footer`.

After that, you can add business logic with `forSaveDraft` just like `forConfirm`. See the demo for a complete example.

::: tip Tip
Strings passed through `dynamicMiddlewareNames` are converted to camelCase. For example, `'save-draft'` becomes `'saveDraft'`.
:::

::: tip Tip
When used together with generics, literal values in `dynamicMiddlewareNames` affect the method-level type hints on the return value, such as:

- `forSaveDraft`
- `forPublishNow`
  :::

### IFormDrawer Return Value

The return value is a Promise object, so you can `await` it to simplify flow control. You need to call `open` to display the drawer. Chain calls can be used to handle different lifecycle events. Dynamic middleware actions are also supported through `dynamicMiddlewareNames`.

| Method          | Description      | Type                                         |
| --------------- | ---------------- | -------------------------------------------- |
| `open`          | Open drawer      | `(IFormProps) => Promise<IFormProps.values>` |
| `forOpen`       | Drawer open hook | `(IMiddleware<IFormProps>) => IFormDrawer`   |
| `forConfirm`    | Confirm hook     | `(IMiddleware<Form>) => IFormDrawer`         |
| `forCancel`     | Cancel hook      | `(IMiddleware<Form>) => IFormDrawer`         |
| `for${Dynamic}` | Custom hook      | `(IMiddleware<Form>) => IFormDrawer`         |

::: tip Tip
In custom hooks, `Dynamic` corresponds to the values passed into `dynamicMiddlewareNames`. The related action is triggered by calling `resolve` inside scoped slots. When methods are generated, names from `dynamicMiddlewareNames` are converted to PascalCase, so `['save-draft']` becomes `forSaveDraft`.
:::

::: tip Tip
Drawers closed without `resolve` are now thrown as errors. That means in `async/await` flows, any logic after `await FormDrawer(...)` only runs after a successful form submission.
:::

### Type Declarations

#### IFormDrawerProps

<<< @/../../packages/element-plus/src/form-drawer/types.ts#props

#### FormDrawerSlots

<<< @/../../packages/element-plus/src/form-drawer/types.ts#slots

#### IFormDrawer

<<< @/../../packages/element-plus/src/form-drawer/types.ts#iformdrawer
