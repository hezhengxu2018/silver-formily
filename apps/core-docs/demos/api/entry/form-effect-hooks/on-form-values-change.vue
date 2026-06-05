<script setup lang="ts">
import { createForm, onFormValuesChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormValuesChange((form) => {
      setResponse(`表单值变化: ${form.values.input}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.setValuesIn('input', 'Hello World')
      }"
    >
      Hello World
    </ElButton>
  </ActionResponse>
</template>
