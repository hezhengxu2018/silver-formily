<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { InputBox } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
  },
})

const schema = { // [!code focus:29]
  type: 'object',
  properties: {
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Type 123 to show target (expression is written in state.visible)',
      },
      'x-reactions': {
        target: 'target',
        fulfill: {
          state: {
            visible: '{{$self.value === "123"}}',
          },
        },
      },
    },
    target: {
      'type': 'string',
      'title': 'target',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Visibility is decided by the expression',
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormConsumer>
      <template #default="{ form: currentForm }">
        <pre style="margin-top: 10px; white-space: pre-wrap;">{{ JSON.stringify(currentForm.values, null, 2) }}</pre>
      </template>
    </FormConsumer>
  </FormProvider>
</template>
