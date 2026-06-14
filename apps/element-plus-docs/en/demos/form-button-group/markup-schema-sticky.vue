<script>
import { createForm } from '@silver-formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Reset,
  Select,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const fields = createSchemaField({ components: { FormItem, Input, Select } })

export default {
  components: {
    FormProvider,
    FormLayout,
    Submit,
    Reset,
    FormButtonGroup,
    FormButtonGroupSticky: FormButtonGroup.Sticky,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
  methods: {
    log(v) {
      console.log(v)
    },
  },
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="10">
      <SchemaField>
        <SchemaStringField required title="Input 1" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 2" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 3" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 4" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 5" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 6" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 7" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 8" x-decorator="FormItem" x-component="Input" />
        <SchemaStringField required title="Input 9" x-decorator="FormItem" x-component="Input" />
      </SchemaField>
      <FormButtonGroupSticky>
        <FormButtonGroup align-form-item>
          <Submit @submit="log">
            Submit
          </Submit>
          <Reset>Reset</Reset>
        </FormButtonGroup>
      </FormButtonGroupSticky>
    </FormLayout>
  </FormProvider>
</template>



