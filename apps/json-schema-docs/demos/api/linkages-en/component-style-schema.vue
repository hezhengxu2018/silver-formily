<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { InputBox } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
  },
})

const schema = {
  type: 'object',
  properties: {
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Enter any CSS color, e.g. mistyrose or lightblue',
      },
      'x-reactions': {
        target: 'target',
        fulfill: {
          schema: {
            'x-component-props.style.backgroundColor': '{{$self.value || "white"}}',
          },
        },
      },
    },
    target: {
      'type': 'string',
      'title': 'target',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Observe background color changes (schema path)',
      },
    },
  },
}

const form = createForm({
  values: {
    target: 'target preview',
  },
})
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
