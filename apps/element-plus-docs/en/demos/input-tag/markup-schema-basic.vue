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
        name="skills"
        title="Tech Tags"
        x-decorator="FormItem"
        x-component="InputTag"
        :default="['Vue', 'TypeScript']"
        :x-component-props="{
          placeholder: 'Enter text and press Enter to add',
        }"
      />
      <SchemaArrayField
        name="frameworks"
        title="Frameworks of Interest"
        x-decorator="FormItem"
        x-component="InputTag"
        :x-component-props="{
          placeholder: 'Duplicates allowed, whitespace trimmed automatically',
          saveOnBlur: false,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      Submit
    </Submit>
  </FormProvider>
</template>



