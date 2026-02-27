<script>
import { createForm } from '@formily/core'
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
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
        <SchemaStringField
          required
          title="输入框"
          x-decorator="FormItem"
          x-component="Input"
        />
      </SchemaField>
      <FormButtonGroup align-form-item>
        <Submit @submit="log">
          提交
        </Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>
