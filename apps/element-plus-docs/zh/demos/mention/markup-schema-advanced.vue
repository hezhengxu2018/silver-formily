<script lang="ts" setup>
import { createForm } from '@formily/core'
import { FormItem, Mention, Submit } from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ref } from 'vue'

const form = createForm()
const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})

const reviewerPool = [
  { value: 'Elena', label: 'Elena · 设计评审' },
  { value: 'Kingsley', label: 'Kingsley · 开发评审' },
  { value: 'Doris', label: 'Doris · QA' },
  { value: 'Nico', label: 'Nico · 产品' },
]

const reviewerOptions = ref([...reviewerPool])
const mentionLoading = ref(false)

const aliasOptions = [
  { id: 'u1001', nickname: 'Alex (后端)', inactive: false },
  { id: 'u1002', nickname: 'Becca (客户端)', inactive: true },
  { id: 'u1003', nickname: 'Chloe (视觉)', inactive: false },
]

function handleSearch(pattern: string) {
  mentionLoading.value = true
  const keyword = pattern.trim().toLowerCase()
  setTimeout(() => {
    reviewerOptions.value = keyword ? reviewerPool.filter(option => option.value.toLowerCase().includes(keyword)) : [...reviewerPool]
    mentionLoading.value = false
  }, 400)
}

function checkReviewer(pattern: string) {
  return reviewerPool.some(option => option.value === pattern)
}

async function log(value: any) {
  console.log(value)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="review"
        title="评审记录"
        x-decorator="FormItem"
        x-component="Mention"
        default="@Elena 帮忙看下交互动效，@Kingsley 关注一下性能回归。"
        :x-component-props="{
          rows: 3,
          placeholder: '输入 @ 选择评审人，支持 Backspace 整体删除',
          options: reviewerOptions,
          loading: mentionLoading,
          whole: true,
          checkIsWhole: checkReviewer,
          onSearch: handleSearch,
        }"
      />
      <SchemaStringField
        name="alias"
        title="别名配置"
        x-decorator="FormItem"
        x-component="Mention"
        :x-component-props="{
          rows: 2,
          placeholder: '通过 props 映射任意字段，自定义禁用规则',
          options: aliasOptions,
          props: { value: 'id', label: 'nickname', disabled: 'inactive' },
          showArrow: true,
        }"
      />
    </SchemaField>
    <Submit style="margin-top: 12px" @submit="log">
      保存
    </Submit>
  </FormProvider>
</template>
