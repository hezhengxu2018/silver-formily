<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, InputTag, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const form = createForm()
const { SchemaField, SchemaArrayField } = createSchemaField({
  components: {
    FormItem,
    InputTag,
  },
})

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaArrayField
        name="roles"
        title="Limit Count"
        x-decorator="FormItem"
        x-component="InputTag"
        :default="['Frontend', 'Experience Design']"
        :x-component-props="{
          placeholder: 'Up to 3 tags',
          max: 3,
          clearable: true,
          collapseTags: true,
          collapseTagsTooltip: true,
          maxCollapseTags: 1,
        }"
      />
      <SchemaArrayField
        name="shortcuts"
        title="Custom Trigger"
        x-decorator="FormItem"
        x-component="InputTag"
        :x-component-props="{
          placeholder: 'Press Space or enter a comma to add',
          trigger: 'Space',
          delimiter: ',',
          saveOnBlur: true,
          draggable: true,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



