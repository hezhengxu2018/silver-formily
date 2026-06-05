<script setup lang="ts">
import { createForm, onFormInitialValuesChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormInitialValuesChange((form) => {
      setResponse(`表单默认值变化: ${form.values.input}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.setInitialValuesIn('input', 'Hello World')
      }"
    >
      Hello World
    </ElButton>
  </ActionResponse>
</template>
