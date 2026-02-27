<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, InputNumber, Space } from '@silver-formily/element-plus'
import { Field, FormConsumer, FormProvider } from '@silver-formily/vue'

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <Space>
      <Field
        name="price"
        title="价格"
        :initial-value="5.2"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormItem>×</FormItem>
      <Field
        name="count"
        title="数量"
        :initial-value="100"
        :decorator="[FormItem]"
        :component="[
          InputNumber,
          {
            placeholder: '请输入',
            style: {
              width: 100,
            },
          },
        ]"
      />
      <FormConsumer>
        <template #default="{ form: consumerForm }">
          <FormItem>
            = {{ `${consumerForm.values.price * consumerForm.values.count} 元` }}
          </FormItem>
        </template>
      </FormConsumer>
    </Space>
  </FormProvider>
</template>
