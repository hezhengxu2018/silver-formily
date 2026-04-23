<script setup lang="ts">
import type { Field as FormilyField } from '@formily/core'
import type { SwitchProps, SwitchValue } from './types'
import { useField } from '@silver-formily/vue'
import { isPromise } from 'es-toolkit'
import { Switch as VanSwitch } from 'vant'
import { computed, ref } from 'vue'

defineOptions({
  name: 'FSwitch',
})

const props = defineProps<SwitchProps>()

const emit = defineEmits<{
  'update:modelValue': [value: SwitchValue]
}>()

const fieldRef = useField<FormilyField | undefined>()
const pending = ref(false)

const isLoading = computed(() => {
  return Boolean(props.loading || pending.value)
})

async function resolveBeforeChange(value: SwitchValue) {
  if (!props.beforeChange) {
    return true
  }

  try {
    const result = props.beforeChange(value, {
      currentValue: props.modelValue,
      field: fieldRef.value,
    })

    if (!isPromise(result)) {
      return result !== false
    }

    pending.value = true
    const resolved = await result
    return resolved !== false
  }
  catch {
    return false
  }
  finally {
    pending.value = false
  }
}

async function handleUpdateModelValue(value: SwitchValue) {
  if (props.disabled || props.loading) {
    return
  }

  const canChange = await resolveBeforeChange(value)
  if (!canChange) {
    return
  }

  emit('update:modelValue', value)
}
</script>

<template>
  <VanSwitch
    v-bind="props"
    :loading="isLoading"
    @update:model-value="handleUpdateModelValue"
  >
    <template #node>
      <slot name="node" />
    </template>
    <template #background>
      <slot name="background" />
    </template>
  </VanSwitch>
</template>
