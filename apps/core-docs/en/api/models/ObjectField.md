# ObjectField Model

> Object field model for managing nested object structures and their child fields

## Description

`ObjectField` manages nested object structures. Unlike `Field`, it typically acts as a container, with specific properties managed by child `Field` instances.

## Constructor

```ts
const objectField = form.createObjectField({
  name: 'profile',
  value: {},
})
```

## Properties

Inherits all properties from `Field`. Key characteristic: it **aggregates** child field validation state:

```ts
// profile is an ObjectField
// profile.name and profile.age are child fields

// objectField.valid aggregates all children's valid state
// objectField.errors includes all children's errors
// objectField.selfErrors contains only the object field's own errors
```

## Usage

### Basic Nested Structure

```ts
const form = createForm({
  values: {
    profile: { name: 'Silver', age: 25 },
  },
})

const profile = form.createObjectField({ name: 'profile' })

const nameField = form.createField({
  name: 'profile.name',
  value: 'Silver',
})

const ageField = form.createField({
  name: 'profile.age',
  value: 25,
})

console.log(profile.value) // { name: 'Silver', age: 25 }
```

### Aggregated Validation

```ts
nameField.setValidator({ required: true })
ageField.setValidator({ min: 18 })

await form.validate()
console.log(profile.valid) // Aggregated from children
console.log(profile.errors) // Includes all children's errors
console.log(profile.selfErrors) // ObjectField's own errors (usually empty)
```

### With ArrayField

```ts
const form = createForm({
  values: {
    users: [
      { profile: { name: 'Alice', age: 25 } },
    ],
  },
})

const user0Profile = form.createObjectField({
  name: 'users.0.profile',
})
```
