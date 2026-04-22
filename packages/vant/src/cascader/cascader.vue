<script setup lang="ts">
import type { Field } from '@formily/core'
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  CascaderChangeEvent,
  CascaderPopupCascaderProps,
  CascaderPopupContentProps,
  CascaderPopupProps,
  CascaderProps,
  CascaderResolvedValue,
} from './types'
import { useField } from '@silver-formily/vue'
import { computed, useSlots } from 'vue'
import { callListener, PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import CascaderPopupContent from './cascader-popup-content.vue'
import {
  cloneCascaderValue,
  formatCascaderValue,
  getCascaderLeafValue,
  mapSelectedOptionsToValues,
  normalizeCascaderValue,
  resolveCascaderSelectedOptions,
} from './utils'

defineOptions({
  name: 'FCascader',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  popupProps: () => ({}),
  separator: ' / ',
  position: 'bottom',
  round: true,
  overlay: true,
  swipeable: true,
  closeable: true,
  showHeader: true,
  lockScroll: true,
  lazyRender: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: CascaderResolvedValue]
  'update:show': [value: boolean]
  'change': [payload: CascaderChangeEvent]
  'finish': [payload: CascaderChangeEvent]
  'clickTab': [tabIndex: string | number, title: string]
  'clickOverlay': [event: MouseEvent]
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const fieldRef = useField<Field>()
const { props: triggerInputProps } = useCleanAttrs()

const isReadonly = computed(() => {
  return Boolean(props.readonly || props.readOnly)
})
const isTriggerDisabled = computed(() => {
  return Boolean(props.disabled || isReadonly.value)
})

const normalizedValue = computed(() => {
  return normalizeCascaderValue(props.modelValue, props.options, props.fieldNames)
})

const selectedOptions = computed(() => {
  return resolveCascaderSelectedOptions(normalizedValue.value, props.options, props.fieldNames)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      cloneCascaderValue(normalizedValue.value),
      selectedOptions.value,
    )
  }

  return formatCascaderValue(
    normalizedValue.value,
    selectedOptions.value,
    props.fieldNames,
    props.separator,
  )
})

const popupBindings = computed(() => {
  const popupProps = props.popupProps as Record<string, unknown>
  const legacyPopupProps = {
    closeOnClickOverlay: props.closeOnClickOverlay,
    closeOnPopstate: props.closeOnPopstate,
    duration: props.duration,
    lazyRender: props.lazyRender,
    lockScroll: props.lockScroll,
    overlay: props.overlay,
    position: props.position,
    round: props.round,
    safeAreaInsetBottom: props.safeAreaInsetBottom,
    safeAreaInsetTop: props.safeAreaInsetTop,
    teleport: props.teleport,
    transition: props.transition,
    zIndex: props.zIndex,
  } satisfies CascaderPopupProps

  return {
    ...legacyPopupProps,
    ...props.popupProps,
    onClickOverlay: (event: MouseEvent) => {
      emit('clickOverlay', event)
      callListener(popupProps.onClickOverlay, event)
    },
    onOpened: () => {
      emit('opened')
      callListener(popupProps.onOpened)
    },
    onClosed: () => {
      emit('closed')
      callListener(popupProps.onClosed)
    },
  } satisfies CascaderPopupProps & Record<string, unknown>
})

const cascaderProps = computed<CascaderPopupCascaderProps>(() => {
  return {
    activeColor: props.activeColor,
    closeIcon: props.closeIcon,
    closeable: props.closeable,
    fieldNames: props.fieldNames,
    modelValue: getCascaderLeafValue(props.modelValue, props.options, props.fieldNames),
    options: props.options,
    placeholder: resolveSelectionPlaceholder(props.placeholder),
    showHeader: props.showHeader,
    swipeable: props.swipeable,
    title: props.title,
  }
})

function createEventPayload(payload: CascaderChangeEvent): CascaderChangeEvent {
  return {
    ...payload,
    currentValue: mapSelectedOptionsToValues(payload.selectedOptions, props.fieldNames),
    field: fieldRef.value,
    selectedOptions: [...payload.selectedOptions],
  }
}

const popupContentProps = computed<CascaderPopupContentProps>(() => {
  return {
    cascaderProps: cascaderProps.value,
    onChange(payload) {
      emit('change', createEventPayload(payload))
    },
    onClickTab(tabIndex, title) {
      emit('clickTab', tabIndex, title)
    },
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof CascaderPopupContent, CascaderChangeEvent>(
    popupBindings.value,
    CascaderPopupContent,
    slots as FunctionalPopupSlots,
  )

  emit('update:show', true)
  emit('open')

  try {
    const payload = await popupController.open(popupContentProps)
    const eventPayload = createEventPayload(payload)
    const nextValue = mapSelectedOptionsToValues(payload.selectedOptions, props.fieldNames)

    emit('update:modelValue', nextValue)
    emit('finish', eventPayload)
  }
  catch {
  }
  finally {
    emit('update:show', false)
    emit('close')
  }
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="isTriggerDisabled"
    :value="displayText"
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />
</template>
