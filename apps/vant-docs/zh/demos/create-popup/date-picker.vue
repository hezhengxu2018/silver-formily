<script setup lang="ts">
import { createPopup } from '@silver-formily/vant'
import { Button as VanButton, DatePicker as VanDatePicker } from 'vant'
import { h } from 'vue'
import { showDemoResult } from '../shared'

const minDate = new Date(2025, 0, 1)
const maxDate = new Date(2027, 11, 31)

const datePickerPopup = createPopup(
  {},
  VanDatePicker,
  {
    title: () => h('span', '自定义日期标题'),
  },
)

async function handleOpen() {
  try {
    const result = await datePickerPopup.open({
      minDate,
      maxDate,
      modelValue: ['2026', '03', '20'],
      title: '选择日期',
    })

    await showDemoResult(result, 'VanDatePicker confirm payload')
  }
  catch {
  }
}
</script>

<template>
  <div class="demo-block">
    <VanButton block type="primary" @click="handleOpen">
      打开官方 DatePicker
    </VanButton>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
}
</style>
