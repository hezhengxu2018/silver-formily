<script setup lang="ts">
import { createForm, onFieldInputValueChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldInputValueChange('target', (field) => {
      setResponse(`target 值变化：${field.value}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'target' })
        field.onInput(field.value ? field.value + 1 : 1)
      }"
    >
      调用onInput
    </ElButton>
  </ActionResponse>
</template>
