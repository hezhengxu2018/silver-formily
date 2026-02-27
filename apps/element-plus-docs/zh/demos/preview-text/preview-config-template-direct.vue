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
import { Field } from '@silver-formily/vue'
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
    <PreviewText
      placeholder="自定义空值占位字符"
      :text-props="{
        class: 'preview-text-muted',
      }"
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
    </PreviewText>

    <PreviewText
      :text-props="{
        size: 'large',
        type: 'primary',
        class: 'preview-text-strong',
      }"
      :tag-props="{
        type: 'success',
        effect: 'dark',
      }"
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
    </PreviewText>

    <PreviewText
      :space-props="{
        direction: 'vertical',
      }"
      :tag-props="{
        type: 'primary',
        effect: 'dark',
        style: {
          color: '#409EFF',
          fontWeight: 600,
          background: 'white',
        },
      }"
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
    </PreviewText>

    <FormButtonGroup align-form-item>
      <ElButton @click="toggleEditable">
        切换阅读态
      </ElButton>
    </FormButtonGroup>
  </Form>
</template>

<style>
.preview-text-muted {
  color: var(--el-text-color-secondary, #909399);
  font-style: italic;
}

.preview-text-strong {
  letter-spacing: 0.08em;
  text-decoration: underline;
}

.custom-tag {
  background-color: rgba(82, 196, 26, 0.15);
  border-color: rgba(82, 196, 26, 0.6);
}
</style>
