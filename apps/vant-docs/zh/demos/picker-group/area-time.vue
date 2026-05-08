<script setup lang="ts">
import type { PickerGroupResolvedValue } from '@silver-formily/vant'
import { createForm } from '@formily/core'
import { AreaPanel, Form, FormButtonGroup, FormItem, PickerGroup, Submit, TimePickerPanel } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { areaList } from '@vant/area-data'
import { showDemoResult } from '../shared'
import { deliveryTabs } from './shared'

const form = createForm({
  values: {
    delivery: ['330106', '19:30'],
  },
})

function resolveAreaText(code: string) {
  if (!code)
    return ''

  const province = areaList.province_list[`${code.slice(0, 2)}0000`]
  const city = areaList.city_list[`${code.slice(0, 4)}00`]
  const county = areaList.county_list[code]

  return [province, city, county]
    .filter(Boolean)
    .join(' / ')
}

function formatDelivery(value: PickerGroupResolvedValue) {
  const [areaCode = '', time = ''] = value ?? []
  const areaText = typeof areaCode === 'string'
    ? resolveAreaText(areaCode)
    : ''
  const timeText = String(time ?? '')

  return [areaText, timeText]
    .filter(Boolean)
    .join(' | ')
}

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values)
}
</script>

<template>
  <Form :form="form">
    <Field
      name="delivery"
      title="配送时间"
      :decorator="[FormItem, { isLink: true }]"
      :component="[PickerGroup, { displayFormatter: formatDelivery }]"
      :data-source="deliveryTabs"
    >
      <template #default="{ panelProps }">
        <AreaPanel
          v-bind="panelProps[0]"
          :area-list="areaList"
        />
        <TimePickerPanel v-bind="panelProps[1]" />
      </template>
    </Field>

    <FormButtonGroup>
      <Submit @submit="handleSubmit">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>
