<script setup lang="ts">
import { createForm, onFormReact } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormReact((form) => {
      if (form.values.input === 'Hello') {
        setResponse('响应Hello')
      }
      else if (form.values.input === 'World') {
        setResponse('响应World')
      }
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.setValuesIn('input', 'Hello')
      }"
    >
      Hello
    </ElButton>
    <ElButton
      @click="() => {
        form.setValuesIn('input', 'World')
      }"
    >
      World
    </ElButton>
  </ActionResponse>
</template>
