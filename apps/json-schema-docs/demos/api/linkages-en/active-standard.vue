<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { InputBox } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
  },
})

const schema = { // [!code focus:34]
  type: 'object',
  properties: {
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Type 123 to hide target',
      },
      'x-reactions': {
        target: 'target',
        when: '{{$self.value === "123"}}',
        fulfill: {
          state: {
            visible: false,
          },
        },
        otherwise: {
          state: {
            visible: true,
          },
        },
      },
    },
    target: {
      'type': 'string',
      'title': 'target',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Visibility is controlled by source in active mode',
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
