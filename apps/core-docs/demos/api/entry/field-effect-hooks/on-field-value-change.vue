<script setup lang="ts">
import { createForm, onFieldValueChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldValueChange('target', (field) => {
      setResponse(`target值变化：${field.value}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'target' })
        field.setValue(field.value ? field.value + 1 : 1)
      }"
    >
      设置值
    </ElButton>
  </ActionResponse>
</template>
