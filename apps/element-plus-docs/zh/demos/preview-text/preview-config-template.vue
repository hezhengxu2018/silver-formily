<script lang="ts" setup>
import { createForm } from '@formily/core'
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
          placeholder: '自定义空值占位字符',
        },
      ]"
    >
      <Field
        name="textPreview"
        title="文本预览"
        :decorator="[FormItem]"
        :component="[Input]"
        initial-value="Hello world"
      />
      <Field
        name="textPreviewEmpty"
        title="文本预览空值"
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
        title="选择项预览"
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
        title="选择项预览空值"
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
        title="日期预览"
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
        title="年份多选预览"
        :decorator="[FormItem]"
        :component="[
          DatePicker,
          {
            type: 'years',
            format: 'YYYY年',
          },
        ]"
        :initial-value="['2020', '2021']"
      />
    </VoidField>

    <FormButtonGroup align-form-item>
      <ElButton @click="toggleEditable">
        切换阅读态
      </ElButton>
    </FormButtonGroup>
  </Form>
</template>
