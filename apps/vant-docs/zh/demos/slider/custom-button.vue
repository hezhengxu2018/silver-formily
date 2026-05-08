<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    progress: 50,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="progress"
      title="自定义按钮"
      :decorator="[FormItem]"
      :component="[Slider]"
    >
      <template #button="{ value }">
        <div class="custom-button">
          {{ value }}
        </div>
      </template>
    </Field>

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 999px;
}
</style>
