<script setup lang="ts">
import { createForm, onFieldInit } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldInit('target', () => {
      setResponse('target已初始化')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.createField({ name: 'target' })
      }"
    >
      创建字段
    </ElButton>
  </ActionResponse>
</template>
