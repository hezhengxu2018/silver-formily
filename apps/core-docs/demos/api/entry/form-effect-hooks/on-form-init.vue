<script setup lang="ts">
import { createForm, onFormInit } from '@silver-formily/core'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}

createForm({
  effects() {
    onFormInit(() => {
      setResponse('表单已初始化')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response" />
</template>
