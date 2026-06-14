<script lang="ts" setup>
import { createForm } from '@silver-formily/core'
import {
  DatePicker,
  Form,
  FormButtonGroup,
  FormItem,
  Input,
  PreviewText,
  Select,
} from '@silver-formily/element-plus'
import { Field, VoidField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const form = createForm({ readPretty: true })

const selectOptions = [
  { label: 'A111', value: '123' },
  { label: 'A222', value: '222' },
]

function toggleEditable() {
  form.setState((state) => {
    state.editable = !state.editable
  })
}
</script>

<template>
  <Form
    :label-col="6"
    :wrapper-col="10"
    :form="form"
  >
    <VoidField
      name="textPreviewGroup"
      :component="[
        PreviewText,
        {
          placeholder: 'Custom Empty Placeholder',
        },
      ]"
    >
      <Field
        name="textPreview"
        title="Text Preview"
        :decorator="[FormItem]"
        :component="[Input]"
        initial-value="Hello world"
      />
      <Field
        name="textPreviewEmpty"
        title="Text Preview Empty State"
        :decorator="[FormItem]"
        :component="[Input]"
      />
    </VoidField>

    <VoidField
      name="selectPreviewGroup"
      :component="[
        PreviewText,
        {
          textProps: {
            size: 'large',
            type: 'primary',
          },
          tagProps: {
            type: 'success',
            effect: 'dark',
          },
        },
      ]"
    >
      <Field
        name="selectPreview"
        title="Option Preview"
        :decorator="[FormItem]"
        :component="[
          Select,
          {
            multiple: true,
          },
        ]"
        :data-source="selectOptions"
        :initial-value="['123', '222']"
      />
      <Field
        name="selectPreviewEmpty"
        title="Option Preview Empty State"
        :decorator="[FormItem]"
        :component="[
          Select,
          {
            multiple: true,
          },
        ]"
        :data-source="selectOptions"
      />
      <Field
        name="datePreview"
        title="Date Preview"
        :decorator="[FormItem]"
        :component="[DatePicker]"
        initial-value="2020-11-23 22:15:20"
      />
    </VoidField>

    <VoidField
      name="multiYearPreviewGroup"
      :component="[
        PreviewText,
        {
          spaceProps: {
            direction: 'vertical',
          },
          tagProps: {
            type: 'primary',
            effect: 'dark',
          },
        },
      ]"
    >
      <Field
        name="multiYearPreview"
        title="Multi-year Preview"
        :decorator="[FormItem]"
        :component="[
          DatePicker,
          {
            type: 'years',
            format: 'YYYY',
          },
        ]"
        :initial-value="['2020', '2021']"
      />
    </VoidField>

    <FormButtonGroup align-form-item>
      <ElButton @click="toggleEditable">
        Toggle Read Mode
      </ElButton>
    </FormButtonGroup>
  </Form>
</template>



