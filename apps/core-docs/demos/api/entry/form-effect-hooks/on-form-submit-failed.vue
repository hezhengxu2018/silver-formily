<script setup lang="ts">
import { createForm, onFormSubmitFailed } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitFailed(() => {
      setResponse('表单提交失败')
    })
  },
})
const form2 = createForm({
  effects() {
    onFormSubmitFailed(() => {
      setResponse('表单校验失败')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.submit(() => {
          return Promise.reject(new Error('Runtime Error'))
        })
      }"
    >
      Submit Runtime Error
    </ElButton>
    <ElButton
      @click="() => {
        form2.createField({
          name: 'input',
          required: true,
        })
        form2.submit()
      }"
    >
      Submit Validate Error
    </ElButton>
  </ActionResponse>
</template>
