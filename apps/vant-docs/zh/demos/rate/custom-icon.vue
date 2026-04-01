<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Rate, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    score: 3,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="score"
      title="推荐指数"
      :decorator="[FormItem]"
      :component="[
        Rate,
        {
          icon: 'like',
          voidIcon: 'like-o',
        },
      ]"
    />

    <FormButtonGroup>
      <Submit :on-submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
