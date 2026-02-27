<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: { FormItem, Input },
})

const form = createForm()

async function log(v) {
  console.log(v)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="input1"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
      />
      <SchemaStringField
        required
        title="输入框"
        name="input2"
        x-decorator="FormItem"
        x-component="Input"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit :on-submit="log">
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>
