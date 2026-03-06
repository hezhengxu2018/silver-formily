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
      ? 'myReaction 命中：target 可见'
      : 'myReaction 未命中：target 隐藏',
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
        placeholder: '输入 123 触发外部 myReaction',
      },
    },
    target: {
      'type': 'void',
      'title': 'target',
      'x-component': 'PreviewBlock',
      'x-component-props': {
        text: 'myReaction 初始状态',
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
