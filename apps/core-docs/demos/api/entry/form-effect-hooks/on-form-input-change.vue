<script setup lang="ts">
import { createForm, onFormInputChange } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormInputChange((form) => {
      setResponse(`字符输入变化: ${form.values.input}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form
          .createField({
            name: 'input',
          })
          .onInput('Hello World')
      }"
    >
      Hello World
    </ElButton>
  </ActionResponse>
</template>
