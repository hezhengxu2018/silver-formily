<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, useFieldSchema } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

const Custom = defineComponent({
  setup() {
    const schemaRef = useFieldSchema()
    return () => {
      const schema = schemaRef.value
      return h(
        'div',
        {
          style: { whiteSpace: 'pre' },
        },
        [JSON.stringify(schema.toJSON(), null, 4)],
      )
    }
  },
})

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
  },
})
const form = createForm({ validateFirst: true })
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaObjectField
        name="custom"
        x-component="Custom"
        :x-component-props="{
          schema: {
            type: 'object',
            properties: {
              input: {
                'type': 'string',
                'x-component': 'Custom',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>
