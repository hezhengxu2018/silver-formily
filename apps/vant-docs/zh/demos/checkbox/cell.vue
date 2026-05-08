<script setup lang="ts">
import { createForm } from '@formily/core'
import { Checkbox, Form, FormButtonGroup, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Cell, CellGroup, Tag } from 'vant'
import { showDemoResult } from '../shared'
import { serviceOptions } from './shared'

const form = createForm({
  values: {
    services: ['install'],
  },
})

function toggleService(value: string) {
  const currentValues = Array.isArray(form.values.services)
    ? [...form.values.services]
    : []
  const nextValues = currentValues.includes(value)
    ? currentValues.filter(item => item !== value)
    : currentValues.concat(value)

  form.setValues({
    services: nextValues,
  })
}

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field name="services" :component="[Checkbox.Group]">
      <CellGroup inset>
        <Cell
          v-for="option in serviceOptions"
          :key="option.value"
          center
          clickable
          :title="option.label"
          :label="option.description"
          @click="toggleService(option.value)"
        >
          <template #title>
            <div class="service-title">
              <span>{{ option.label }}</span>
              <Tag plain type="primary">
                {{ option.tag }}
              </Tag>
            </div>
          </template>

          <template #right-icon>
            <Checkbox :name="option.value" />
          </template>
        </Cell>
      </CellGroup>
    </Field>

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.service-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
