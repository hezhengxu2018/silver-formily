<script setup lang="ts">
import type { GeneralField } from '@formily/core'
import { createForm, isField } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { InputBox, PreviewBlock } from './shared'

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
    PreviewBlock,
  },
})

function myReaction(field: GeneralField) {
  const sourceField = field.query('source').take()
  const sourceValue = isField(sourceField) ? sourceField.value : undefined
  field.visible = sourceValue === '123'
  field.componentProps = {
    ...(field.componentProps || {}),
    text: sourceValue === '123'
      ? 'myReaction matched: target is visible'
      : 'myReaction not matched: target is hidden',
  }
}

const schema = {
  type: 'object',
  properties: {
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: 'Type 123 to trigger external myReaction',
      },
    },
    target: {
      'type': 'void',
      'title': 'target',
      'x-component': 'PreviewBlock',
      'x-component-props': {
        text: 'myReaction initial state',
      },
      'x-reactions': '{{myReaction}}',
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ myReaction }" />
    <FormConsumer>
      <template #default="{ form: currentForm }">
        <pre style="margin-top: 10px; white-space: pre-wrap;">{{ JSON.stringify(currentForm.values, null, 2) }}</pre>
      </template>
    </FormConsumer>
  </FormProvider>
</template>
