# Values & State

Understanding the value and state management mechanism in Form and Field is key to using the core package correctly.

## Three Kinds of Values

In Formily Core, every field has three core values:

| Value          | Description             | When Updated                      |
| -------------- | ----------------------- | --------------------------------- |
| `value`        | Current committed value | On blur, programmatic set, submit |
| `inputValue`   | Input value             | Real-time on every keystroke      |
| `initialValue` | Initial default value   | On field creation or manual reset |

### value vs inputValue

```ts
const field = form.createField({
  name: 'name',
  value: '',
})

// Simulating user input — updates inputValue in real time
field.onInput('a')
console.log(field.inputValue) // 'a'
console.log(field.value) // '' (not yet committed)

field.onInput('ab')
console.log(field.inputValue) // 'ab'
console.log(field.value) // '' (not yet committed)

// Programmatic set — directly updates value
field.setValue('silver')
console.log(field.inputValue) // 'silver'
console.log(field.value) // 'silver'
```

The purpose of this design:

- **inputValue**: users see the input content in real time, and you can perform input-level validation and instant feedback against it
- **value**: only updated after confirmation (blur, submit, etc.), keeping form values stable

## Value Hierarchy

Form values are an aggregated view of all field values:

```
Form.values = {
  username: 'silver',          // ← Field(name: 'username').value
  email: 'a@b.com',            // ← Field(name: 'email').value
  profile: {                   // ← ObjectField(name: 'profile')
    name: 'Silver',
    age: 18,                   // ← Field(name: 'profile.age').value
  },
  items: [                     // ← ArrayField(name: 'items')
    { title: 'Item 1' },       // ← Field(name: 'items.0.title').value
    { title: 'Item 2' },       // ← Field(name: 'items.1.title').value
  ],
}
```

### Deep Value Operations

```ts
// Set a nested value
form.setValuesIn('profile.name', 'New Name')

// Get a nested value
const name = form.getValuesIn('profile.name')

// Delete a nested value
form.deleteValuesIn('profile.temp')

// Check whether a path exists
const exists = form.existValuesIn('profile.name')
```

## Merge Strategies

Form provides multiple merge strategies:

```ts
// Overwrite (default) — completely replaces the target value
form.setValues({ username: 'new' }) // values = { username: 'new' }

// Shallow merge
form.setValues({ username: 'new' }, 'shallowMerge')

// Deep merge
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
// Result: { profile: { name: 'new', age: 18 } }
```

## Form State

### Key FormState Fields

| State           | Type              | Description                |
| --------------- | ----------------- | -------------------------- |
| `values`        | `T`               | Current form values        |
| `initialValues` | `T`               | Initial form values        |
| `modified`      | `boolean`         | Whether any field modified |
| `valid`         | `boolean`         | Validation passed          |
| `invalid`       | `boolean`         | Validation failed          |
| `submitting`    | `boolean`         | Submitting in progress     |
| `validating`    | `boolean`         | Validating in progress     |
| `loading`       | `boolean`         | Loading state              |
| `errors`        | `IFormFeedback[]` | Form-level errors          |
| `warnings`      | `IFormFeedback[]` | Form-level warnings        |

### self-prefix vs Aggregated

Field state with the `self` prefix only represents the **current field**; without the prefix it aggregates **self + all descendants**:

```ts
// selfErrors — only this field's own validation errors
console.log(field.selfErrors)

// errors — this field + all descendant fields' validation errors
console.log(field.errors)

// Similarly
console.log(field.selfValid) // Only this field's own validity
console.log(field.valid) // Self + all descendants' validity
```

This design allows parent fields (e.g., ObjectField) to aggregate the validation state of child fields.

## Reactive State Reading

Reading state inside effects or `autorun` automatically subscribes to changes:

```ts
import { autorun } from '@silver-formily/reactive'

autorun(() => {
  // Auto-subscribes to changes in field.value and form.values
  if (field.value !== form.values.username) {
    console.log('Values out of sync')
  }
})
```

## State Snapshots

```ts
// Get a form state snapshot (no subscription)
const state = form.getFormGraph()

// Get a field state snapshot
const fieldState = field.getState()
```

## Batch Updates

Multiple state updates should use `batch` to avoid unnecessary intermediate notifications:

```ts
import { batch } from '@silver-formily/reactive'

batch(() => {
  field.setState({ value: 'a' })
  field.setState({ visible: false })
  field.setState({ loading: true })
  // Only one update notification
})
```

## Direct Assignment vs Setters

Most field states can be updated by direct assignment or via the corresponding `setXxx` method, but they are not always fully equivalent.

### Generally Equivalent Cases

The following direct assignments usually forward to the corresponding setter and can be treated as regular properties:

- `field.value = x` is equivalent to `field.setValue(x)`
- `field.initialValue = x` is equivalent to `field.setInitialValue(x)`
- `field.required = x` is equivalent to `field.setRequired(x)`
- `field.selfErrors = []` is equivalent to `field.setSelfErrors([])`
- `field.selfWarnings = []` is equivalent to `field.setSelfWarnings([])`
- `field.selfSuccesses = []` is equivalent to `field.setSelfSuccesses([])`

### Not Fully Equivalent Process States

For these states, prefer setters over direct assignment:

- `loading`
- `validating`
- `submitting`

The reason is that these setters carry additional runtime semantics beyond just changing the state value, for example:

- Cleaning up the previous async timer
- Delaying certain state transitions to avoid flickering
- Triggering the corresponding lifecycle events

For example:

```ts
field.loading = true
field.setLoading(true)
```

Both may result in `field.loading` being `true`, but only `setLoading(true)` goes through the full runtime flow.

Similarly:

```ts
form.validating = true
form.setValidating(true)
```

Should not be treated as fully equivalent.

### Recommended Rules

- Plain values, default values, and feedback states can be assigned directly
- Process states like `loading`, `validating`, and `submitting` should use `setXxx`
- When updating multiple states at once, prefer `setState` / `setFieldState` / `setFormState` combined with `batch`

## Related Mechanisms

Values and state are the foundation for other mechanisms, but their detailed rules are covered in standalone pages:

- Reading and writing nested data through field paths: [Path System](/en/guide/path)
- Updating other fields after state changes: [Linkage System](/en/guide/linkage)
- Reading and writing error, warning, and success feedback: [Validation System](/en/guide/validation)
