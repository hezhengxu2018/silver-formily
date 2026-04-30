<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  Area,
  Calendar,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  FormButtonGroup,
  FormItem,
  Input,
  Picker,
  PickerGroup,
  Radio,
  Rate,
  Signature,
  Slider,
  Stepper,
  Switch,
  TimePicker,
  Upload,
} from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { areaList } from '@vant/area-data'
import { Button as VanButton } from 'vant'
import { ref } from 'vue'
import { cityOptions as cascaderOptions } from '../cascader/shared'
import { appointmentOptions } from '../picker-group/shared'
import { cityOptions, regionColumns } from '../picker/shared'

const signatureValue = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="96" viewBox="0 0 240 96">
  <path d="M24 58 C58 30, 62 82, 96 48 S152 54, 184 36 S206 44, 216 32" fill="none" stroke="#1989fa" stroke-width="5" stroke-linecap="round" />
  <path d="M36 74 H204" stroke="#dcdee0" stroke-width="2" stroke-linecap="round" />
</svg>
`)}`

const form = createForm({
  readPretty: true,
  values: {
    username: 'Silver Formily',
    deliveryType: 'express',
    features: ['photo', 'location'],
    enabled: true,
    quantity: 6,
    score: 4,
    progress: 68,
    signature: signatureValue,
    attachments: [
      {
        name: '门店照片.jpg',
        url: 'https://cdn.example.com/store-photo.jpg',
      },
      '巡检记录.pdf',
    ],
    cascader: ['330000', '330100', '330106'],
    areaCode: '330102',
    picker: 'hz',
    pickerPath: ['zj', 'hz'],
    pickerGroup: ['hz', 'pm'],
    date: '2026-03-23',
    time: '14:30',
    rangeDate: ['2026-03-24', '2026-03-28'],
  },
})

const isReadPretty = ref(true)

function toggleReadPretty() {
  isReadPretty.value = !isReadPretty.value

  form.setState((state) => {
    state.editable = !isReadPretty.value
  })
}
</script>

<template>
  <Form :form="form">
    <Field
      name="username"
      title="文本"
      :decorator="[FormItem]"
      :component="[Input]"
    />

    <Field
      name="deliveryType"
      title="单选"
      :decorator="[FormItem]"
      :component="[Radio.Group]"
      :data-source="[
        { label: '快递寄送', value: 'express' },
        { label: '门店自提', value: 'pickup' },
        { label: '同城闪送', value: 'instant' },
      ]"
    />

    <Field
      name="features"
      title="多选"
      :decorator="[FormItem]"
      :component="[Checkbox.Group]"
      :data-source="[
        { label: '拍照', value: 'photo' },
        { label: '定位', value: 'location' },
        { label: '扫码', value: 'scan' },
      ]"
    />

    <Field
      name="enabled"
      title="开关"
      :decorator="[FormItem]"
      :component="[Switch]"
    />

    <Field
      name="quantity"
      title="步进器"
      :decorator="[FormItem]"
      :component="[Stepper]"
    />

    <Field
      name="score"
      title="评分"
      :decorator="[FormItem]"
      :component="[Rate]"
    />

    <Field
      name="progress"
      title="进度"
      :decorator="[FormItem]"
      :component="[Slider]"
    />

    <Field
      name="signature"
      title="签名"
      :decorator="[FormItem, { labelAlign: 'top' }]"
      :component="[Signature]"
    />

    <Field
      name="attachments"
      title="附件"
      :decorator="[FormItem, { labelAlign: 'top' }]"
      :component="[Upload]"
    />

    <Field
      name="cascader"
      title="级联"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Cascader]"
      :data-source="cascaderOptions"
    />

    <Field
      name="areaCode"
      title="省市区"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Area, { areaList }]"
    />

    <Field
      name="picker"
      title="选择器"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Picker]"
      :data-source="cityOptions"
    />

    <Field
      name="pickerGroup"
      title="分步选择"
      :decorator="[FormItem, { isLink: true }]"
      :component="[PickerGroup]"
      :data-source="appointmentOptions"
    />

    <Field
      name="date"
      title="日期"
      :decorator="[FormItem, { isLink: true }]"
      :component="[DatePicker]"
    />

    <Field
      name="time"
      title="时间"
      :decorator="[FormItem, { isLink: true }]"
      :component="[TimePicker]"
    />

    <Field
      name="rangeDate"
      title="日历区间"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Calendar, {
        type: 'range',
        minDate: '2026-03-01',
        maxDate: '2026-04-30',
      }]"
    />

    <Field
      name="cascader"
      title="格式化"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Cascader, {
        options: cascaderOptions,
        displayFormatter: (_value, selectedOptions) => selectedOptions.map(option => option?.text).filter(Boolean).join(' -> '),
      }]"
    />

    <Field
      name="pickerPath"
      title="直接列数据"
      :decorator="[FormItem, { isLink: true }]"
      :component="[Picker, {
        columns: regionColumns,
        displayFormatter: (_value, selectedOptions) => selectedOptions.map(option => option?.text || option?.label).filter(Boolean).join(' / '),
      }]"
    />

    <FormButtonGroup>
      <VanButton
        type="primary"
        block
        @click="toggleReadPretty"
      >
        {{ isReadPretty ? '切换到编辑态' : '切换到阅读态' }}
      </VanButton>
    </FormButtonGroup>
  </Form>
</template>
