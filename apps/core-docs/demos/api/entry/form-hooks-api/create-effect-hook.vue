<script setup lang="ts">
import { createEffectHook, createForm } from '@silver-formily/core'
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import ActionResponse from '../shared/ActionResponse.vue'

const onCustomEvent = createEffectHook(
  'custom-event',
  (payload, form) => (listener) => {
    listener(payload, form)
  },
)

const response = ref('')
function setResponse(value: string) {
  response.value = value
}
const form = createForm({
  effects() {
    onCustomEvent((payload, form) => {
      setResponse(`${payload} Form: ${form.id}`)
    })
  },
})
</script>

<template>
  <ActionResponse :response="response">
    <ElButton
      @click="() => {
        form.notify('custom-event', 'This is Custom Event')
      }"
    >
      Notify
    </ElButton>
  </ActionResponse>
</template>
