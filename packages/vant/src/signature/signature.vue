<script setup lang="ts">
import type { Field as FormilyField } from '@formily/core'
import type { SignatureInstance, SignatureProps, SignatureSlots } from './types'
import { useField } from '@silver-formily/vue'
import { Button as VanButton, Image as VanImage, Signature as VanSignature } from 'vant'
import { computed, ref, watch } from 'vue'
import { createNamespace, useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FSignature',
  inheritAttrs: false,
})

const props = defineProps<SignatureProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
const slots = defineSlots<SignatureSlots>()

const { b } = createNamespace('signature')
const { props: attrs } = useCleanAttrs()
const fieldRef = useField<FormilyField | undefined>()
const signatureRef = ref<SignatureInstance>()
const previewValue = ref(normalizeModelValue(props.modelValue))

const isInteractive = computed(() => {
  return !props.disabled && !props.readonly
})

const hasPreviewValue = computed(() => {
  return Boolean(previewValue.value)
})

const showPreview = computed(() => {
  return props.readonly || hasPreviewValue.value
})

const rootClass = computed(() => {
  return [
    b(),
    b({
      disabled: props.disabled,
      readonly: props.readonly,
    }),
  ]
})

const innerSignatureProps = computed(() => {
  return {
    ...attrs.value,
    backgroundColor: props.backgroundColor,
    lineWidth: props.lineWidth,
    penColor: props.penColor,
    tips: props.tips,
    type: props.type,
  }
})

const clearButtonText = computed(() => {
  return props.clearButtonText || '清空'
})

const confirmButtonText = computed(() => {
  return props.confirmButtonText || '确认'
})

function normalizeModelValue(value: SignatureProps['modelValue']) {
  return typeof value === 'string' ? value : ''
}

function handleSubmit(payload: { image: string }) {
  if (!isInteractive.value) {
    return
  }

  previewValue.value = payload.image
  emit('update:modelValue', payload.image)
}

function handleClear() {
  if (!isInteractive.value) {
    return
  }

  previewValue.value = ''
  signatureRef.value?.clear()
  emit('update:modelValue', '')
}

function resize() {
  signatureRef.value?.resize()
}

function clear() {
  previewValue.value = ''
  signatureRef.value?.clear()
}

function submit() {
  if (previewValue.value) {
    emit('update:modelValue', previewValue.value)
    return
  }

  signatureRef.value?.submit()
}

fieldRef.value?.inject({
  getSignatureRef: () => signatureRef,
  resizeSignature: resize,
  clearSignature: clear,
  submitSignature: submit,
})

watch(
  () => props.modelValue,
  (value) => {
    previewValue.value = normalizeModelValue(value)

    if (!previewValue.value) {
      signatureRef.value?.clear()
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div :class="rootClass">
    <VanSignature
      v-show="!showPreview"
      ref="signatureRef"
      v-bind="innerSignatureProps"
      @submit="handleSubmit"
    >
      <template v-if="slots.tips" #tips>
        <slot name="tips" />
      </template>
    </VanSignature>

    <div v-if="!isInteractive && !showPreview" :class="b('mask')" />

    <div v-if="showPreview" :class="b('preview')">
      <VanImage
        v-if="hasPreviewValue"
        :class="b('image')"
        :src="previewValue"
        fit="contain"
      />
    </div>

    <div v-if="isInteractive" :class="b('footer')">
      <VanButton
        plain
        size="small"
        @click="handleClear"
      >
        {{ clearButtonText }}
      </VanButton>

      <VanButton
        v-if="!showPreview"
        type="primary"
        size="small"
        @click="submit"
      >
        {{ confirmButtonText }}
      </VanButton>
    </div>
  </div>
</template>
