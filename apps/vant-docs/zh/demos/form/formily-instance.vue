<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormItem, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Radio, RadioGroup } from 'vant'
import { ref, watch } from 'vue'

type FormPattern = 'editable' | 'readOnly' | 'disabled'

const form = createForm({
  values: {
    username: 'silver-formily',
    bio: '点击下方单选框切换整个 Formily 实例的状态',
  },
})

const currentPattern = ref<FormPattern>('editable')

watch(currentPattern, (pattern) => {
  form.setPattern(pattern)
})
</script>

<template>
  <Form :form="form" label-width="4.5em">
    <Field
      name="username"
      title="用户名"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="bio"
      title="简介"
      :decorator="[
        FormItem,
        {
          labelAlign: 'top',
        },
      ]"
      :component="[Input.TextArea, { rows: 2 }]"
    />
  </Form>

  <RadioGroup v-model="currentPattern" direction="horizontal" shape="dot">
    <Radio name="editable">
      编辑态
    </Radio>
    <Radio name="readOnly">
      只读态
    </Radio>
    <Radio name="disabled">
      禁用态
    </Radio>
  </RadioGroup>
</template>
