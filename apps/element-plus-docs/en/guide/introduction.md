# Introduction

Form development has always been one of the biggest pain points in frontend work. Because it is tightly coupled to business requirements, interaction complexity grows as requirements change, and in complex scenarios the cost of building and maintaining forms can become very high.

After working with Formily, I found that although it has a relatively high learning cost, the benefits are very real. It provides a Schema-based DSL that combines domain models with metadata-driven programming, greatly reducing the cost of form development and maintenance while improving maintainability and extensibility.

## Positioning and Use Cases

- Teams that want to continue using the Element Plus visual system while also benefiting from Formily's powerful Schema expressiveness and orchestration capabilities.
- Projects that need a stable, testable form component set in large business systems and want to orchestrate form behavior in a configuration-driven way through a DSL.
- Users already on `@formily/element-plus` who have run into bottlenecks in interaction design, version dependencies, or extensibility and want to migrate to `@silver-formily/element-plus`.

## Quick Start Workflow

The steps below help first-time users quickly move from installation to rendering. For a more detailed walkthrough, see the "Components -> Quick Start" page as well.

### 1. Install Dependencies

This component library has many peer dependencies, so enabling automatic peer dependency installation is recommended.

```bash
pnpm config set auto-install-peers true
pnpm add @silver-formily/element-plus
```

> If your team needs to lock a specific Element Plus or Formily version, declare it explicitly in `package.json` to avoid peer dependency drift.

### 2. Register Components and SchemaField

```ts
import { FormItem, Input, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'

export const { SchemaField } = createSchemaField({
  components: { FormItem, Input, Select, Submit },
})
```

> SchemaField is the hub that hosts the Schema DSL. It is recommended to maintain the component mapping centrally so replacements and extensions stay easy to manage.

### 3. Create a Form Instance

```ts
import { createForm, onFieldValueChange } from '@silver-formily/core'

const form = createForm({
  effects(form) {
    onFieldValueChange('region', (field) => {
      if (field.value === 'remote') {
        form.setFieldState('address', state => (state.display = 'none'))
      }
      else {
        form.setFieldState('address', state => (state.display = 'visible'))
      }
    })
  },
})
```

### 4. Complete Example

```vue
<script setup lang="ts">
import { createForm, onFieldValueChange } from '@silver-formily/core'
import { FormItem, Input, Select, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField } = createSchemaField({
  components: { FormItem, Input, Select, Submit },
})

const form = createForm({
  effects(form) {
    onFieldValueChange('region', (field) => {
      if (field.value === 'remote') {
        form.setFieldState('address', state => (state.display = 'none'))
      }
      else {
        form.setFieldState('address', state => (state.display = 'visible'))
      }
    })
  },
})

const schema = {
  type: 'object',
  properties: {
    name: {
      'type': 'string',
      'title': 'Name',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'required': true,
    },
    address: {
      'type': 'string',
      'title': 'Address',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'required': true,
    },
    region: {
      'type': 'string',
      'title': 'Region',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'Local', value: 'local' },
        { label: 'Remote', value: 'remote' },
      ],
    },
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit>Submit</Submit>
  </FormProvider>
</template>
```

::: tip Tip
Formily provides three different ways to describe forms, so you can choose the one that fits your actual needs. Template-based authoring is usually easier to get started with, but it does not expose the full capability set. A good path is to begin with templates to get familiar with field models, then move gradually into Schema-based authoring.
:::

## Why This Refactor Exists

The Formily ecosystem is already fairly complete, but it still has some issues. The main contributors come from Alibaba, whose stack leans more toward React and has more mature support for Ant Design. In contrast, the Element Plus wrapper can run into a wide range of interaction issues in real production use, which is exactly why this project exists.
