# Values & State

Understanding the value and state management mechanism is key to using the core package correctly.

## Three Kinds of Values

| Value          | Description             | When Updated                      |
| -------------- | ----------------------- | --------------------------------- |
| `value`        | Current committed value | On blur, programmatic set, submit |
| `inputValue`   | Input value             | Real-time on every keystroke      |
| `initialValue` | Initial default value   | On field creation or manual reset |

### value vs inputValue

```ts
field.onInput('a')
console.log(field.inputValue) // 'a'
console.log(field.value) // '' (not yet committed)

field.setValue('silver')
console.log(field.inputValue) // 'silver'
console.log(field.value) // 'silver'
```

## Value Hierarchy

Form values are an aggregated view of all field values:

```
Form.values = {
  username: 'silver',          // ← Field(name: 'username').value
  profile: {                   // ← ObjectField(name: 'profile')
    name: 'Silver',            // ← Field(name: 'profile.name').value
  },
  items: [                     // ← ArrayField(name: 'items')
    { title: 'Item 1' },       // ← Field(name: 'items.0.title').value
  ],
}
```

### Deep Value Operations

```ts
form.setValuesIn('profile.name', 'New Name')
form.getValuesIn('profile.name')
form.deleteValuesIn('profile.temp')
form.existValuesIn('profile.name')
```

## Merge Strategies

```ts
// Overwrite (default)
form.setValues({ username: 'new' })

// Shallow merge
form.setValues({ username: 'new' }, 'shallowMerge')

// Deep merge
form.setValues({ profile: { name: 'new' } }, 'deepMerge')
```

## self-prefix vs Aggregated

States with `self` prefix only represent the **current field**; without the prefix they aggregate **self + all descendants**:

```ts
field.selfErrors // Only this field's own validation errors
field.errors // This field + all descendant fields' errors

field.selfValid // Only this field's own validity
field.valid // Self + all descendants' validity
```

## Batch Updates

```ts
import { batch } from '@silver-formily/reactive'

batch(() => {
  field.setState({ value: 'a' })
  field.setState({ visible: false })
  // Only one notification
})
```

## Related Mechanisms

Values and state are the foundation for other mechanisms, but their detailed rules are covered in standalone pages:

- Reading and writing nested data through field paths: [Path System](/en/guide/path)
- Updating other fields after state changes: [Linkage System](/en/guide/linkage)
- Reading and writing error, warning, and success feedback: [Validation System](/en/guide/validation)
