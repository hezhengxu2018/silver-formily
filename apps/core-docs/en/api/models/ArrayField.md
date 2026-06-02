# ArrayField Model

> Array field model for managing list items and their child fields

## Description

`ArrayField` is designed for managing array lists. It inherits all capabilities from `Field` and adds array manipulation methods (add, remove, move).

Unlike a plain array, each element in an ArrayField can have its own child field structure.

## Constructor

```ts
const arrayField = form.createArrayField({
  name: 'items',
  value: [],
})
```

## Properties

Inherits all properties from `Field`.

## Array Methods

| Method     | Signature                         | Description            |
| ---------- | --------------------------------- | ---------------------- |
| `push`     | `(item?)`                         | Append item            |
| `pop`      | `()`                              | Remove and return last |
| `insert`   | `(index, item?)`                  | Insert at index        |
| `remove`   | `(index)`                         | Remove at index        |
| `shift`    | `()`                              | Remove first           |
| `unshift`  | `(item?)`                         | Prepend item           |
| `move`     | `(from, to)`                      | Move item              |
| `moveUp`   | `(index)`                         | Move item up           |
| `moveDown` | `(index)`                         | Move item down         |
| `splice`   | `(start, deleteCount?, ...items)` | Generic splice         |

## Usage

### Basic Array Operations

```ts
const form = createForm()
const list = form.createArrayField({
  name: 'todoList',
  value: [],
})

list.push({ title: 'Task 1' })
list.push({ title: 'Task 2' })
list.insert(0, { title: 'New Task' })
list.move(0, 1)
list.remove(1)

console.log(list.value)
// [{ title: 'Task 1' }, { title: 'New Task' }]
```

### With Child Fields

```ts
const usersField = form.createArrayField({
  name: 'users',
})

usersField.push({ name: '', age: 0 })
form.createField({ name: 'users.0.name', value: 'Charlie' })
form.createField({ name: 'users.0.age', value: 28 })
```

### Batch Operations

```ts
list.splice(0, 2, { title: 'A' }, { title: 'B' })
```
