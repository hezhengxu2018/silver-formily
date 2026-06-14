<script lang="ts" setup>
import { createForm, isField, onFieldChange, onFieldReact } from '@silver-formily/core'
import { ArrayCollapse, FormItem, Input, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const {
  SchemaField,
  SchemaArrayField,
  SchemaObjectField,
  SchemaVoidField,
  SchemaStringField,
} = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayCollapse,
  },
})

const form = createForm({
  effects: () => {
    // Active linkage mode
    onFieldChange('array.*.aa', ['value'], (field, form) => {
      form.setFieldState(field.query('.bb'), (state) => {
        if (!isField(field))
          return
        state.visible = field.value !== '123'
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
        x-component="ArrayCollapse"
        x-decorator="FormItem"
        :x-component-props="{
          title: 'Object Array',
        }"
      >
        <SchemaObjectField
          x-component="ArrayCollapse.Item"
          x-decorator="FormItem"
          :x-component-props="{
            title: 'Object Array',
          }"
        >
          <SchemaVoidField x-component="ArrayCollapse.Index" />
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
          <SchemaVoidField x-component="ArrayCollapse.Remove" />
          <SchemaVoidField x-component="ArrayCollapse.MoveUp" />
          <SchemaVoidField x-component="ArrayCollapse.MoveDown" />
        </SchemaObjectField>
        <SchemaVoidField
          x-component="ArrayCollapse.Addition"
          title="Add Item"
        />
      </SchemaArrayField>
    </SchemaField>
    <Submit @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



