<script setup lang="ts">
import { createForm, onFormValidateFailed } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormValidateFailed(() => {
      setResponse('表单校验失败')
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
        form.validate()
      }"
    >
      Submit
    </ElButton>
  </ActionResponse>
</template>
