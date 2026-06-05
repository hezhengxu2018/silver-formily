<script setup lang="ts">
import { createForm, onFormMount } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFormMount(() => {
      setResponse('表单已挂载')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.onMount()
      }"
    >
      挂载表单
    </ElButton>
  </ActionResponse>
</template>
