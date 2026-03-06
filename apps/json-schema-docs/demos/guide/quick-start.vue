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
      'title': '昵称',
      'required': true,
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '例如：Silver',
      },
    },
    bio: {
      'type': 'string',
      'title': '简介',
      'x-component': 'TextAreaBox',
      'x-component-props': {
        rows: 4,
        placeholder: '简单介绍一下你自己',
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
