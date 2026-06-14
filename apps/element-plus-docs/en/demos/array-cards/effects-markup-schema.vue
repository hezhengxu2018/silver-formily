<script lang="ts" setup>
import { createForm, isField, onFieldChange, onFieldReact } from '@silver-formily/core'
import { ArrayCards, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const {
  SchemaField,
  SchemaArrayField,
  SchemaVoidField,
  SchemaStringField,
  SchemaObjectField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCards,
  },
})

const form = createForm({
  effects: () => {
    // Active linkage mode
    onFieldChange('array.*.aa', ['value'], (field, form) => {
      form.setFieldState(field.query('.bb'), (state) => {
        if (isField(field)) {
          state.visible = field.value !== '123'
        }
      })
    })
    // Passive linkage mode
    onFieldReact('array.*.dd', (field) => {
      field.visible = field.query('.cc').get('value') !== '123'
    })
  },
})

async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="array"
        :max-items="3"
        x-component="ArrayCards"
        x-decorator="FormItem"
        :x-component-props="{
          title: 'Object Array',
        }"
      >
        <SchemaObjectField>
          <SchemaVoidField x-component="ArrayCards.Index" />
          <SchemaStringField
            name="aa"
            x-decorator="FormItem"
            title="AA"
            required
            description="Hide BB when AA is 123"
            x-component="Input"
          />
          <SchemaStringField
            name="bb"
            x-decorator="FormItem"
            title="BB"
            required
            x-component="Input"
          />
          <SchemaStringField
            name="cc"
            x-decorator="FormItem"
            title="CC"
            required
            description="Hide DD when CC is 123"
            x-component="Input"
          />
          <SchemaStringField
            name="dd"
            x-decorator="FormItem"
            title="DD"
            required
            x-component="Input"
          />
          <SchemaVoidField x-component="ArrayCards.Remove" />
          <SchemaVoidField x-component="ArrayCards.MoveUp" />
          <SchemaVoidField x-component="ArrayCards.MoveDown" />
        </SchemaObjectField>
        <SchemaVoidField x-component="ArrayCards.Addition" title="Add Item" />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



