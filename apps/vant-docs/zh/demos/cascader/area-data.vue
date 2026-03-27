<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, Form, FormButtonGroup, FormItem, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { useCascaderAreaData } from '@vant/area-data'

const form = createForm({
  values: {
    areaCode: null,
  },
})

const areaOptions = useCascaderAreaData()

async function handleSubmit(values: typeof form.values) {
  await Prompts.alert(`提交结果\n\n${JSON.stringify(values, null, 2)}`)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="areaCode"
      title="省市区"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Cascader]"
      :data-source="areaOptions"
    />

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
