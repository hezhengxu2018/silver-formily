# VoidField Model

> Void field model for layout, grouping, and presentation — carries no data

## Description

`VoidField` is a special field model that **does not carry data**. It is typically used for:

- Form layout grouping (e.g., Card, Tab containers)
- Pure presentation content
- Container for other fields

Unlike `Field`, VoidField has no `value`, `validator`, or other data-related properties.

## Constructor

```ts
const voidField = form.createVoidField({
  name: 'layout',
  title: 'Basic Info',
})
```

## Properties

VoidField only inherits `BaseField` properties:

| Property                           | Type                | Description         |
| ---------------------------------- | ------------------- | ------------------- |
| `name`                             | `string`            | Field name          |
| `path`                             | `string`            | Full path           |
| `title` / `description`            | `any`               | Title / description |
| `display`                          | `FieldDisplayTypes` | Display mode        |
| `pattern`                          | `FieldPatternTypes` | Pattern mode        |
| `mounted` / `hidden` / `visible`   | `boolean`           | State flags         |
| `editable` / `disabled`            | `boolean`           | Pattern flags       |
| `form`                             | `Form`              | Parent form         |
| `parent`                           | `GeneralField`      | Parent field        |
| `componentType` / `componentProps` | —                   | Component config    |
| `decoratorType` / `decoratorProps` | —                   | Decorator config    |

**No `value`, `inputValue`, `validator`, or `errors`.**

## Methods

Shares base methods but excludes value/validation-related methods:

| Method                 | Description     |
| ---------------------- | --------------- |
| `setPattern(pattern)`  | Set pattern     |
| `setDisplay(display)`  | Set display     |
| `setTitle(title)`      | Set title       |
| `setDescription(desc)` | Set description |
| `getState(selector?)`  | Get state       |
| `setState(setter)`     | Set state       |

## Usage

### Layout Container

```ts
const layout = form.createVoidField({
  name: 'basicInfo',
  title: 'Basic Information',
  component: [CardComponent],
})

const username = form.createField({
  name: 'basicInfo.username',
  value: '',
})
```

### Conditional Visibility

```ts
const voidField = form.createVoidField({
  name: 'advancedSection',
  title: 'Advanced Options',
})

voidField.visible = form.values.showAdvanced
```

### With Type Checking

```ts
import { isField, isVoidField } from '@silver-formily/core'

form.query('*').forEach((node) => {
  if (isVoidField(node))
    return // skip void fields
  if (isField(node)) {
    console.log('data field:', node.path)
  }
})
```
