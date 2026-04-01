<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, Radio, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Cell, CellGroup, Tag } from 'vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    plan: 'pro',
  },
})

const planOptions = [
  {
    label: '标准版',
    value: 'basic',
    description: '适合轻量表单，快速接入移动端页面。',
    tag: '推荐新项目',
  },
  {
    label: '专业版',
    value: 'pro',
    description: '适合多步骤提交流程和联动字段较多的场景。',
    tag: '最常用',
  },
]

function selectPlan(value: string) {
  form.setValues({
    plan: value,
  })
}

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field name="plan" :component="[Radio.Group]">
      <CellGroup inset>
        <Cell
          v-for="option in planOptions"
          :key="option.value"
          center
          clickable
          :title="option.label"
          :label="option.description"
          @click="selectPlan(option.value)"
        >
          <template #title>
            <div class="plan-title">
              <span>{{ option.label }}</span>
              <Tag plain type="primary">
                {{ option.tag }}
              </Tag>
            </div>
          </template>

          <template #right-icon>
            <Radio :name="option.value" />
          </template>
        </Cell>
      </CellGroup>
    </Field>

    <FormButtonGroup>
      <Submit :on-submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.plan-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
