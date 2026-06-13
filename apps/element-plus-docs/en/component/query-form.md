# QueryForm

> Search form component built on top of FormGrid, Submit, and Reset, with built-in expand and collapse behavior.

::: tip Tip

- `QueryForm` sets `:fullness="true"` by default, and you can override it by passing props supported by `Form`.
- `QueryForm` and `QueryForm.Light` register common input components and `FormItem` by default, so most JSON Schema scenarios do not need a manual `components` map.

:::

::: warning Note
Because this component eagerly registers almost every common input component, tree shaking may become ineffective. Use it only when bundle size is not a major concern. The components not registered by default are `DatePickerPanel`, `Upload`, `ColorPickerPanel`, `SelectTable`, `Transfer`, `Mention`, and `Tree`. In addition, `Segmented` and `InputTag` are not registered yet because they require relatively new dependency versions and could throw during registration in older environments.
:::

## Markup Schema Example

::: tip Tip
To span columns, you can use the `data-grid-span` prop from `@silver-formily/grid` and avoid extra `GridColumn` nesting.
:::

:::demo

query-form/markup-schema

:::

## JSON Schema Example

:::demo

query-form/json-schema

:::

## External Form Initial Values Example

:::demo

query-form/external-form-initial-values

:::

## Vertical Layout Example

:::demo

query-form/vertical-layout

:::

## Expand All Search Items by Default Example

:::demo

query-form/default-expanded

:::

## Hide the Toggle Button and Show All Search Items Example

:::demo

query-form/hide-toggle-show-all

:::

## Light Mode with Auto Submit on Value Change Example

:::demo

query-form/light

:::

## Light Mode with Immediate Submit and No Throttling Example

::: tip Tip

- `QueryForm.Light` uses an independent compact flex layout and does not rely on Grid collapse logic, so `gridProps`, `visibleWhen`, and expand/collapse-related configuration do not apply in Light mode.

- After Element Plus `2.5.0`, `Select` no longer has a default width. In Light mode you should set a width manually.

- If you need an even more compact layout, consider `Editable`.

:::

:::demo

query-form/light-immediate

:::

## Action Area Fixed to the End of the Row Example

:::demo

query-form/actions-at-row-end

:::

## Action Slot Example

This example inserts an Export button after Query and Reset, but before the expand/collapse toggle.

::: tip Tip
The action area currently occupies only one grid cell. If the content is too wide, it will wrap, so configure breakpoints carefully to leave enough room for action buttons.
:::

:::demo

query-form/actions-slot-export

:::

## `visibleWhen` Example by Field Name

:::demo

query-form/visible-when

:::

## `visibleWhen` Example with the First Two Rows Visible When Collapsed

:::demo

query-form/visible-when-two-rows

:::

## `visibleWhen` Example with the First N Items Visible When Collapsed

:::demo

query-form/visible-when-top-n

:::

## API

::: tip Tip
Both `QueryForm` and `QueryForm.Light` inherit and forward props from `Form`, such as `form`, `layout`, `labelAlign`, `size`, and events like `onAutoSubmit`, so they are not repeated here.
:::

### QueryForm Props

| Prop              | Description                                                                                                  | Type                                                | Default    |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ---------- |
| `schema`          | JSON Schema rendering                                                                                        | `ISchema`                                           | -          |
| `schemaField`     | Custom SchemaField                                                                                           | `Component`                                         | -          |
| `components`      | JSON Schema component mapping. Merged with the built-in mapping, and duplicate names override the built-ins. | `Record<string, Component>`                         | `{}`       |
| `gridProps`       | Parameters used to create the Grid, excluding `shouldVisible` and `maxRows`                                  | `Omit<IGridOptions, 'shouldVisible' \| 'maxRows'>`  | `{}`       |
| `defaultExpanded` | Whether the form is expanded initially                                                                       | `boolean`                                           | `false`    |
| `showToggle`      | Whether to show the expand/collapse toggle button. When `false`, all search items are always shown.          | `boolean`                                           | `true`     |
| `actionsAtRowEnd` | Whether the action area is fixed to the right end of the row                                                 | `boolean`                                           | `false`    |
| `visibleWhen`     | Field visibility predicate                                                                                   | [QueryFormVisibleContext](#queryformvisiblecontext) | -          |
| `submitText`      | Submit button text                                                                                           | `string`                                            | `Search`   |
| `resetText`       | Reset button text                                                                                            | `string`                                            | `Reset`    |
| `expandText`      | Expand button text                                                                                           | `string`                                            | `Expand`   |
| `collapseText`    | Collapse button text                                                                                         | `string`                                            | `Collapse` |
| `showSubmit`      | Whether to show the submit button                                                                            | `boolean`                                           | `true`     |
| `showReset`       | Whether to show the reset button                                                                             | `boolean`                                           | `true`     |
| `submitProps`     | Props forwarded to Submit                                                                                    | `Record<string, any>`                               | -          |
| `resetProps`      | Props forwarded to Reset                                                                                     | `Record<string, any>`                               | -          |

### Slots

| Slot       | Description                             | Slot Props                   |
| ---------- | --------------------------------------- | ---------------------------- |
| `default`  | Form content in Markup Schema scenarios | -                            |
| `actions`  | Custom action-button area               | `{ expanded, toggle, type }` |
| `collapse` | Custom expand/collapse trigger          | `{ expanded, toggle, type }` |

::: tip Tip
Possible values for `type` are `'incomplete-wrap' | 'collapsible' | 'complete-wrap'`.
:::

### QueryForm.Light Props

| Prop           | Description                                                           | Type                        | Default                                      |
| -------------- | --------------------------------------------------------------------- | --------------------------- | -------------------------------------------- |
| `schema`       | JSON Schema rendering                                                 | `ISchema`                   | -                                            |
| `schemaField`  | Custom SchemaField                                                    | `Component`                 | -                                            |
| `components`   | Components used by JSON Schema. Merged with the default registration. | `Record<string, Component>` | Most commonly used QueryForm-friendly inputs |
| `throttleWait` | Throttle duration in milliseconds for auto submission on value change | `number`                    | `300`                                        |

### QueryForm.Light Slots

| Slot      | Description                             | Slot Props |
| --------- | --------------------------------------- | ---------- |
| `default` | Form content in Markup Schema scenarios | -          |

::: tip Tip
`QueryForm.Light` does not support the `actions` / `collapse` slots and does not support Grid-collapse-related configuration.
:::

### visibleWhen Context

#### QueryFormVisibleContext

<<< @/../../packages/element-plus/src/query-form/types.ts#visible
