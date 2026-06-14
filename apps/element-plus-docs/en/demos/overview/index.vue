<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import { FormItem, InputNumber, Space } from '@silver-formily/element-plus'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <Space>
      <Field
        name="price"
        title="Price"
        :initial-value="5.2"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: 'Please enter',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormItem>×</FormItem>
      <Field
        name="count"
        title="Quantity"
        :initial-value="100"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: 'Please enter',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormConsumer>
        <template #default="{ form: consumerForm }">
          <FormItem>
            = {{ `${consumerForm.values.price * consumerForm.values.count} CNY` }}
          </FormItem>
        </template>
      </FormConsumer>
    </Space>
  </FormProvider>
</template>



