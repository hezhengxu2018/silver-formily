<script setup lang="ts">
import { createForm, onFieldReact } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects(form) {
    onFieldReact('target', () => {
      setResponse(
        `target ${form.values.other === 123 ? '显示' : '隐藏'}`,
      )
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.createField({ name: 'target' })
      }"
    >
      初始化target
    </ElButton>
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'other' })
        field.setValue(123)
      }"
    >
      赋值other = 123
    </ElButton>
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'other' })
        field.setValue(null)
      }"
    >
      赋值other = null
    </ElButton>
  </ActionResponse>
</template>
