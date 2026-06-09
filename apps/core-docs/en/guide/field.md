# Field Model

Formily fields are divided into two categories: **data fields** and **void fields**.

- **Data Field (Field)**: maintains field state that maps to submitted form data
- **VoidField**: does not maintain form data and mainly acts as a UI container

The field model explains what state a field owns and how that state affects data and UI. Path matching, validation, and linkage are covered in standalone pages:

- Field tree paths and data paths: [Path System](/en/guide/path)
- Validators, trigger timing, and feedback: [Validation System](/en/guide/validation)
- `effects` and `reactions`: [Linkage System](/en/guide/linkage)

## Data Fields

There are three concrete data field types:

| Type          | Inheritance   | Responsibility                                                |
| ------------- | ------------- | ------------------------------------------------------------- |
| `Field`       | —             | Maintains a non-self-growing data field                       |
| `ArrayField`  | Extends Field | Maintains an array field with insert/remove/move operations   |
| `ObjectField` | Extends Field | Maintains an object field with property add/remove operations |

> Field can store any data type, including arrays and objects. Use ArrayField only when you need item-level array operations (push/pop/insert/remove/move). Use ObjectField only when you need dynamic property operations (addProperty/removeProperty). Otherwise, a normal Field is enough.

<ThemeImage
  light="/architecture/field.png"
  dark="/architecture/field.dark.png"
  alt="Formily Field"
/>

Field and VoidField have a **parent-child inheritance** relationship: when a parent sets `display`, child nodes inherit it by default. There is also an **implicit control** relationship: parent state changes can affect child fields.

## Basic State

Common field state can be grouped as follows:

| State                                                           | Description                          |
| --------------------------------------------------------------- | ------------------------------------ |
| `value` / `initialValue`                                        | Current value and initial value      |
| `inputValue` / `inputValues`                                    | Most recent input values             |
| `display` / `visible` / `hidden`                                | Display state                        |
| `pattern` / `editable` / `disabled` / `readOnly` / `readPretty` | Interaction pattern                  |
| `validator` / `feedbacks`                                       | Validation rules and feedback        |
| `component` / `decorator`                                       | UI component and wrapper proxy state |
| `dataSource`                                                    | Selectable option data               |

Field state is reactive. UI renderers, `reactions`, and effects can all consume it.

## Display Rules

`display` controls whether a field is rendered and whether its value is preserved:

| display   | Meaning       | Data Impact         |
| --------- | ------------- | ------------------- |
| `visible` | UI is visible | Restores field data |
| `hidden`  | UI is hidden  | Keeps field data    |
| `none`    | UI is hidden  | Removes field data  |

Convenience properties are available on top of `display`:

| Property  | Value   | Meaning                      |
| --------- | ------- | ---------------------------- |
| `visible` | `true`  | Same as `display: 'visible'` |
| `visible` | `false` | Same as `display: 'none'`    |
| `hidden`  | `true`  | Same as `display: 'hidden'`  |
| `hidden`  | `false` | Same as `display: 'visible'` |

If a parent explicitly sets `display` and the child does not, the child inherits the parent's display state.

```ts
field.setDisplay('hidden')
field.setDisplay('none')
field.setDisplay(null) // restore inheritance from parent
```

## Interaction Pattern

`pattern` describes the field interaction mode:

| pattern      | Meaning          |
| ------------ | ---------------- |
| `editable`   | Editable         |
| `disabled`   | Disabled         |
| `readOnly`   | Read-only        |
| `readPretty` | Read-pretty mode |

Convenience properties can also be used:

```ts
field.editable = true
field.disabled = true
field.readOnly = true
field.readPretty = true
```

## Data Read/Write

Field is a data field, but it does not keep an independent copy of data. It reads and writes `form.values` through its own `path`.

```ts
console.log(field.value)
console.log(field.initialValue)
console.log(field.inputValue)

field.value = 'new value'
field.initialValue = 'default'

field.onInput('input value')
field.setValue('programmatic value')
```

`onInput()` behaves closer to a real user input. It writes the value, records input values, marks the field as modified, and triggers validation rules with `triggerType: 'onInput'`.

## Data Source

Fields can proxy selectable option data for components such as select, radio, or checkbox groups:

```ts
field.dataSource = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]

field.setDataSource([
  { label: 'Option 3', value: '3' },
])
```

The UI consumer is responsible for mapping and rendering the data source.

## Component Proxy

Field can proxy UI component information so linkage logic can update component props precisely.

`component` is represented as `[Component, ComponentProps]`:

```ts
field.component = [InputComponent, { placeholder: 'Enter value' }]

field.setComponent(InputComponent, { placeholder: 'Enter value' })
field.setComponentProps({ placeholder: 'New placeholder' })
```

## Decorator Proxy

`decorator` describes the wrapper around a field, such as a FormItem or layout component.

```ts
field.decorator = [FormItemComponent, { label: 'Username' }]

field.setDecorator(FormItemComponent, { label: 'Username' })
field.setDecoratorProps({ label: 'New label' })
```

## ArrayField

> For detailed APIs, see [ArrayField API](/en/api/models/ArrayField).

ArrayField extends Field with array operation methods. These methods update field data and also transpose child field state so child order stays aligned with array data.

```ts
const users = form.createArrayField({
  name: 'users',
})

users.push({ name: 'Alice' })
users.insert(0, { name: 'Bob' })
users.move(0, 1)
users.remove(0)
```

Common methods:

| Method                               | Description                      |
| ------------------------------------ | -------------------------------- |
| `push()` / `pop()`                   | Add / remove from the end        |
| `insert()` / `remove()`              | Add / remove at a specific index |
| `move()` / `moveUp()` / `moveDown()` | Move array items                 |
| `unshift()` / `shift()`              | Add / remove from the start      |

## ObjectField

> For detailed APIs, see [ObjectField API](/en/api/models/ObjectField).

ObjectField extends Field and is useful when object properties need to be added or removed dynamically.

```ts
const profile = form.createObjectField({
  name: 'profile',
})

profile.addProperty('nickname', 'Silver')
profile.removeProperty('nickname')
```

If the object shape is fixed, storing an object value in a normal Field is also fine.

## VoidField

> For detailed APIs, see [VoidField API](/en/api/models/VoidField).

VoidField is a virtual data field used mainly for UI structure. It has an `address` and its own `path`, but it does not insert itself into child data field paths.

```ts
form.createVoidField({
  name: 'layout',
  component: [LayoutComponent],
})

form.createField({
  name: 'layout.username',
})
```

In this example, `layout.username` has address `layout.username`, but the data field path is `username`. See [Path System](/en/guide/path) for the full explanation.
