<script setup lang="ts">
import type { Field as FormilyField } from '@formily/core'
import type { SignatureInstance, SignatureProps, SignatureSlots, SignatureSubmitPayload } from './types'
import { useField } from '@silver-formily/vue'
import { Signature as VanSignature } from 'vant'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { createNamespace, useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FSignature',
  inheritAttrs: false,
})

const props = defineProps<SignatureProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [payload: SignatureSubmitPayload]
  'clear': []
  'start': []
  'end': []
  'signing': [event: TouchEvent]
}>()
const slots = defineSlots<SignatureSlots>()

const { b } = createNamespace('signature')
const { props: attrs } = useCleanAttrs()
const fieldRef = useField<FormilyField | undefined>()
const rootRef = ref<HTMLElement>()
const signatureRef = ref<SignatureInstance>()
let syncToken = 0

const isInteractive = computed(() => {
  return !props.disabled && !props.readonly
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
    clearButtonText: props.clearButtonText,
    confirmButtonText: props.confirmButtonText,
    lineWidth: props.lineWidth,
    penColor: props.penColor,
    tips: props.tips,
    type: props.type,
  }
})

function getCanvas() {
  const rootElement = (rootRef.value ?? signatureRef.value?.$el) as Element | undefined

  return rootElement?.querySelector('canvas') as HTMLCanvasElement | null
}

function clearCanvas(canvas = getCanvas()) {
  if (!canvas) {
    return
  }

  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.height)

  if (!props.backgroundColor) {
    return
  }

  context.save()
  context.fillStyle = props.backgroundColor
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.restore()
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load signature image: ${src.slice(0, 32)}`))
    image.src = src
  })
}

async function syncCanvasFromModelValue() {
  await nextTick()

  const canvas = getCanvas()

  if (!canvas) {
    return
  }

  const currentToken = ++syncToken

  clearCanvas(canvas)

  if (!props.modelValue) {
    return
  }

  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  try {
    const image = await loadImage(props.modelValue)

    if (currentToken !== syncToken) {
      return
    }

    const renderWidth = canvas.clientWidth || canvas.width
    const renderHeight = canvas.clientHeight || canvas.height

    if (!renderWidth || !renderHeight) {
      return
    }

    const imageWidth = image.naturalWidth || image.width
    const imageHeight = image.naturalHeight || image.height

    if (!imageWidth || !imageHeight) {
      return
    }

    const ratio = Math.min(renderWidth / imageWidth, renderHeight / imageHeight)
    const width = imageWidth * ratio
    const height = imageHeight * ratio
    const x = (renderWidth - width) / 2
    const y = (renderHeight - height) / 2

    context.drawImage(image, x, y, width, height)
  }
  catch {
    if (currentToken !== syncToken) {
      return
    }

    clearCanvas(canvas)
  }
}

function emitModelValue(value: string) {
  emit('update:modelValue', value)
}

function handleSubmit(payload: SignatureSubmitPayload) {
  if (!isInteractive.value) {
    return
  }

  emitModelValue(payload.image)
  emit('submit', payload)
}

function handleClear() {
  if (!isInteractive.value) {
    return
  }

  emitModelValue('')
  emit('clear')
}

function handleStart() {
  if (!isInteractive.value) {
    return
  }

  emit('start')
}

function handleEnd() {
  if (!isInteractive.value) {
    return
  }

  emit('end')
}

function handleSigning(event: TouchEvent) {
  if (!isInteractive.value) {
    return
  }

  emit('signing', event)
}

function resize() {
  signatureRef.value?.resize()
}

function clear() {
  signatureRef.value?.clear()
}

function submit() {
  signatureRef.value?.submit()
}

fieldRef.value?.inject({
  getSignatureRef: () => signatureRef,
  resizeSignature: resize,
  clearSignature: clear,
  submitSignature: submit,
})

watch(
  () => [props.modelValue, props.backgroundColor] as const,
  () => {
    void syncCanvasFromModelValue()
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  void syncCanvasFromModelValue()
})
</script>

<template>
  <div ref="rootRef" :class="rootClass">
    <VanSignature
      ref="signatureRef"
      v-bind="innerSignatureProps"
      @submit="handleSubmit"
      @clear="handleClear"
      @start="handleStart"
      @end="handleEnd"
      @signing="handleSigning"
    >
      <template v-if="slots.tips" #tips>
        <slot name="tips" />
      </template>
    </VanSignature>

    <div v-if="!isInteractive" :class="b('mask')" />
  </div>
</template>
