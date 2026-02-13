<script setup>
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, RecursionField } from '@silver-formily/vue'
import { ElInput } from 'element-plus'
import { defineComponent, h } from 'vue'

const Custom = defineComponent({
  name: 'Custom',
  props: {
    name: String,
    schema: Object,
  },
  setup(props) {
    return () =>
      h(RecursionField, {
        name: props.name,
        schema: props.schema,
        onlyRenderProperties: true,
      })
  },
})

const { SchemaField, SchemaObjectField } = createSchemaField({
  components: {
    Custom,
    ElInput,
  },
})

const form = createForm()
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
                'x-component': 'ElInput',
              },
            },
          },
        }"
      />
    </SchemaField>
  </FormProvider>
</template>
