<script setup lang="tsx">
import { User } from '@element-plus/icons-vue'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElIcon, ElInput } from 'element-plus'
import { defineComponent } from 'vue'

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

const PrefixIcon = defineComponent({
  name: 'PrefixIcon',
  setup() {
    return () => <ElIcon><User /></ElIcon>
  },
})

const schema = {
  type: 'object',
  properties: {
    input: {
      'type': 'string',
      'x-component': 'ElInput',
      'x-content': {
        prefix: PrefixIcon,
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
