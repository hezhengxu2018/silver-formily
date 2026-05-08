<script setup lang="ts">
import { createPopup } from '@silver-formily/vant'
import { Button as VanButton, Picker as VanPicker } from 'vant'
import { h } from 'vue'
import { showDemoResult } from '../shared'

const cityColumns = [
  { text: '杭州', value: 'hz' },
  { text: '宁波', value: 'nb' },
  { text: '苏州', value: 'sz' },
]

const pickerPopup = createPopup(
  {},
  VanPicker,
  {
    title: () => h('span', { class: 'functional-popup-picker-title' }, '自定义标题插槽'),
  },
)

async function handleOpen() {
  try {
    const result = await pickerPopup.open({
      columns: cityColumns,
      modelValue: ['hz'],
      title: '选择城市',
    })

    await showDemoResult(result, 'VanPicker confirm payload')
  }
  catch {
  }
}
</script>

<template>
  <div class="demo-block">
    <VanButton block type="primary" @click="handleOpen">
      打开官方 Picker
    </VanButton>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
}
</style>
