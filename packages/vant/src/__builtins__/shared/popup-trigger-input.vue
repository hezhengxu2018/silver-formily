<script setup lang="ts">
defineOptions({
  name: 'PopupTriggerInput',
  inheritAttrs: false,
})

const props = defineProps<{
  inputProps?: Record<string, any>
  disabled?: boolean
  value?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <input
    v-bind="props.inputProps"
    type="text"
    class="van-field__control"
    :disabled="props.disabled"
    readonly
    :value="props.value"
    :placeholder="props.placeholder"
    @click="(event) => emit('click', event)"
  >
</template>
