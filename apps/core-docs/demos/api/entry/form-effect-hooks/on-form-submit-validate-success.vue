<script setup lang="ts">
import { createForm, onFormSubmitValidateSuccess } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitValidateSuccess(() => {
      setResponse('表单提交校验成功')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.createField({
          name: 'input',
        })
        form.submit()
      }"
    >
      Submit
    </ElButton>
  </ActionResponse>
</template>
