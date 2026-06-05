<script setup lang="ts">
import { createForm, onFieldValidateStart } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldValidateStart('target', () => {
      setResponse('target校验开始')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'target', required: true })
        field.onInput('')
      }"
    >
      触发校验
    </ElButton>
  </ActionResponse>
</template>
