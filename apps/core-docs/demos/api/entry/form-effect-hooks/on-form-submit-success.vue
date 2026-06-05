<script setup lang="ts">
import { createForm, onFormSubmitSuccess } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitSuccess(() => {
      setResponse('表单提交成功')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.submit()
      }"
    >
      Submit
    </ElButton>
  </ActionResponse>
</template>
