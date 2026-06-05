<script setup lang="ts">
import { createEffectContext, createForm, useEffectForm } from '@silver-formily/core'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const { provide, consume } = createEffectContext()

function useMyHook() {
  const form = useEffectForm()
  const setResponse = consume()
  setResponse(`通讯成功：${form.id}`)
}

const response = ref('')
function setResponse(value: string) {
  response.value = value
}

createForm({
  effects() {
    provide(setResponse)
    useMyHook()
  },
})
</script>

<template>
  <ActionResponse :response="response" />
</template>
