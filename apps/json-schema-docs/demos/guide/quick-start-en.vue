<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { InputBox, TextAreaBox } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
    TextAreaBox,
  },
})

const schema = {
  type: 'object',
  properties: {
    nickname: {
      'type': 'string',
      'title': 'Nickname',
      'required': true,
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'For example: Silver',
      },
    },
    bio: {
      'type': 'string',
      'title': 'Bio',
      'x-component': 'TextAreaBox',
      'x-component-props': {
        rows: 4,
        placeholder: 'Write a short introduction',
      },
    },
  },
}

const form = createForm({
  values: {
    nickname: 'Silver',
    bio: 'Hello Formily',
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
