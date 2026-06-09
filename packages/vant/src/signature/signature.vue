<script setup lang="ts">
import type { Field as FormilyField } from '@silver-formily/core'
import type { SignatureInstance, SignatureProps, SignatureSlots } from './types'
import { useField } from '@silver-formily/vue'
import { Button as VanButton, Image as VanImage, Signature as VanSignature } from 'vant'
import { computed, ref, watch } from 'vue'
import { createNamespace, useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FSignature',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SignatureProps>(), {
  clearButtonText: '清空',
  confirmButtonText: '确认',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
const slots = defineSlots<SignatureSlots>()

const { b } = createNamespace('signature')
const { props: attrs } = useCleanAttrs()
const fieldRef = useField<FormilyField | undefined>()
const signatureRef = ref<SignatureInstance>()
const previewValue = ref(props.modelValue)

const isInteractive = computed(() => {
  return !props.disabled
})

const hasPreviewValue = computed(() => {
  return Boolean(previewValue.value)
})

const showPreview = computed(() => {
  return props.disabled || hasPreviewValue.value
})

const previewText = computed(() => {
  return hasPreviewValue.value ? '' : '暂无签名'
})

const rootClass = computed(() => {
  return [
    b(),
    b({
      disabled: props.disabled,
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

function handleSubmit(payload: { image: string }) {
  previewValue.value = payload.image
  emit('update:modelValue', payload.image)
}

function handleClear() {
  previewValue.value = ''
  signatureRef.value?.clear()
  emit('update:modelValue', '')
}

fieldRef.value?.inject({
  getSignatureRef: () => signatureRef,
})

watch(
  () => props.modelValue,
  (value) => {
    previewValue.value = value

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
      v-if="!showPreview"
      ref="signatureRef"
      v-bind="innerSignatureProps"
      @submit="handleSubmit"
    >
      <template v-if="slots.tips" #tips>
        <slot name="tips" />
      </template>
    </VanSignature>

    <div v-if="showPreview" :class="b('preview')">
      <VanImage
        v-if="hasPreviewValue"
        :class="b('image')"
        :src="previewValue"
        fit="contain"
      />
      <span v-else :class="b('placeholder')">
        {{ previewText }}
      </span>
    </div>

    <div v-if="isInteractive" :class="b('footer')">
      <VanButton
        plain
        size="small"
        @click="handleClear"
      >
        {{ props.clearButtonText }}
      </VanButton>

      <VanButton
        v-if="!showPreview"
        type="primary"
        size="small"
        @click="() => signatureRef?.submit()"
      >
        {{ props.confirmButtonText }}
      </VanButton>
    </div>
  </div>
</template>
