<script setup lang="ts">
import { createEffectContext, createForm, onFormSubmit } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const { provide, consume } = createEffectContext()

function useMyHook() {
  const setResponse = consume()
  onFormSubmit(() => {
    setResponse('上下文通讯成功')
  })
}

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    provide(setResponse)
    useMyHook()
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.submit()
      }"
    >
      提交
    </ElButton>
  </ActionResponse>
</template>
