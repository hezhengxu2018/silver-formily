<script setup lang="ts">
import { createForm, onFieldMount } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onFieldMount('target', () => {
      setResponse('target已挂载')
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.createField({ name: 'target' }).onMount()
      }"
    >
      创建并挂载字段
    </ElButton>
  </ActionResponse>
</template>
