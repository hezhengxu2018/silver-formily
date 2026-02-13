<script setup>
import { createForm } from '@formily/core'
import { createSchemaField, ExpressionScope, FormProvider } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

const Container = defineComponent({
  setup(_props, { slots }) {
    return () =>
      h(
        ExpressionScope,
        { value: { $innerScope: 'inner scope value' } },
        slots,
      )
  },
})

const Text = defineComponent({
  props: {
    text: String,
  },
  setup(props) {
    return () => h('div', props.text)
  },
})

const { SchemaField, SchemaVoidField } = createSchemaField({
  components: { Container, Text },
})

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :scope="{ $outerScope: 'outer scope value' }">
      <SchemaVoidField x-component="Container">
        <SchemaVoidField
          name="div"
          x-component="Text"
          :x-component-props="{ text: `{{$innerScope + ' ' + $outerScope}}` }"
        />
      </SchemaVoidField>
    </SchemaField>
  </FormProvider>
</template>
