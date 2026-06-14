<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
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

function log(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="16">
      <VoidField
        name="name"
        title="Name"
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
        title="Text Sequence"
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
              addonAfter: 'Unit',
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
              addonAfter: 'Unit',
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
              addonAfter: 'Unit',
            },
          ]"
          :component="[Input]"
          required
        />
      </VoidField>
      <Field
        name="textarea"
        title="Text Input"
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
        <Submit @submit="log">
          Submit
        </Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>



