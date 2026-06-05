<script setup lang="ts">
import { createForm, onFormSubmitValidateStart } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormSubmitValidateStart(() => {
      setResponse('表单提交校验开始')
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
