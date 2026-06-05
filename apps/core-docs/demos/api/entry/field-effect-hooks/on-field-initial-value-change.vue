<script setup lang="ts">
import { createForm, onFieldInitialValueChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldInitialValueChange('target', (field) => {
      setResponse(`target默认值变化：${field.value}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'target' })
        field.setInitialValue(field.value ? field.value + 1 : 1)
      }"
    >
      设置值
    </ElButton>
  </ActionResponse>
</template>
