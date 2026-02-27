<script lang="ts" setup>
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormLayout,
  Input,
  Space,
  Submit,
} from '@silver-formily/element-plus'
import { Field, FormProvider, VoidField } from '@silver-formily/vue'

const form = createForm()

async function log(value) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="16">
      <VoidField
        name="name"
        title="姓名"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]"
        :component="[Space]"
      >
        <Field
          name="firstName"
          :decorator="[FormItem]"
          :component="[Input]"
          required
        />
        <Field
          name="lastName"
          :decorator="[FormItem]"
          :component="[Input]"
          required
        />
      </VoidField>
      <VoidField
        name="texts"
        title="文本串联"
        :decorator="[
          FormItem,
          {
            asterisk: true,
            feedbackLayout: 'none',
          },
        ]"
        :component="[Space]"
      >
        <Field
          name="aa"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="bb"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
        <Field
          name="cc"
          :decorator="[
            FormItem,
            {
              addonAfter: '单位',
            },
          ]"
          :component="[Input]"
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="文本框"
        :decorator="[FormItem]"
        :component="[
          Input.TextArea,
          {
            style: {
              width: 400,
            },
          },
        ]"
        required
      />
      <FormButtonGroup align-form-item>
        <Submit :on-submit="log">
          提交
        </Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>
