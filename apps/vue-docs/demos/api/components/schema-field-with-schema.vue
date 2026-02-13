<script>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElInput } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    ElInput,
  },
})

export default {
  components: { FormProvider, SchemaField },
  data() {
    return {
      form: createForm(),
    }
  },
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField
      :schema="{
        type: 'object',
        properties: {
          input: {
            'type': 'string',
            'x-component': 'ElInput',
          },
        },
      }"
    />
  </FormProvider>
</template>
