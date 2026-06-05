<script setup lang="ts">
import { createForm, onFormUnmount } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormUnmount(() => {
      setResponse('表单已卸载')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.onUnmount()
      }"
    >
      卸载表单
    </ElButton>
  </ActionResponse>
</template>
