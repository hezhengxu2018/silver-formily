<script setup lang="ts">
import { createForm, onFormSubmitValidateEnd } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitValidateEnd(() => {
      setResponse('表单提交校验结束')
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
          required: true,
        })
        form.submit()
      }"
    >
      Submit
    </ElButton>
  </ActionResponse>
</template>
