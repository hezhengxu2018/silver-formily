<script setup lang="ts">
import {
  createForm,
  onFieldValidateFailed,
  onFieldValidateSuccess,
} from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldValidateFailed('target', () => {
      setResponse('target校验失败')
    })
    onFieldValidateSuccess('target', () => {
      setResponse('target校验成功')
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
      触发失败
    </ElButton>
    <ElButton
      @click="() => {
        const field = form.createField({ name: 'target', required: true })
        field.onInput('123')
      }"
    >
      触发成功
    </ElButton>
  </ActionResponse>
</template>
