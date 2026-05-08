<script setup lang="ts">
import { createForm } from '@formily/core'
import { Field } from '@silver-formily/vue'
import { Form, FormButtonGroup, FormItem, Rate, Submit } from '@sliver/formily-vant'
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
      title="满意度"
      :decorator="[FormItem]"
      :component="[
        Rate,
        {
          color: '#ffd21e',
          size: 25,
          voidColor: '#eee',
          voidIcon: 'star',
        },
      ]"
    />

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
