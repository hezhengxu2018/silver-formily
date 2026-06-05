<script setup lang="ts">
import { createForm, onFormSubmitStart } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitStart(() => {
      setResponse('表单提交开始')
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
