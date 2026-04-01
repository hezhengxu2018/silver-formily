<script setup lang="ts">
import type { Field } from '@formily/core'
import type {
  CascaderChangeEvent,
  CascaderOptionValue,
  CascaderProps,
  CascaderResolvedValue,
} from './types'
import { useField } from '@silver-formily/vue'
import { Cascader as VanCascader, Popup as VanPopup } from 'vant'
import { computed, ref, useSlots } from 'vue'
import { PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs, usePopupState } from '../__builtins__'
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
const { props: triggerInputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'options'])
const innerValue = ref<CascaderOptionValue>()
const forwardedSlotNames = computed(() => {
  return Object.keys(slots).filter((slotName) => {
    return slotName !== 'default' && !slotName.startsWith('_')
  })
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

function resetInnerValue() {
  innerValue.value = getCascaderLeafValue(props.modelValue, props.options, props.fieldNames)
}

function emitVisibilityChange(value: boolean) {
  emit('update:show', value)

  if (value) {
    emit('open')
    return
  }

  emit('close')
}

const { popupVisible, open, close, onPopupShowChange } = usePopupState({
  disabled: () => props.disabled || props.readonly || props.readOnly,
  onBeforeOpen: resetInnerValue,
  onRestore: resetInnerValue,
  onVisibilityChange: emitVisibilityChange,
})

const popupProps = computed(() => {
  return {
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
    show: popupVisible.value,
    teleport: props.teleport,
    transition: props.transition,
    zIndex: props.zIndex,
  }
})

const cascaderProps = computed(() => {
  return {
    activeColor: props.activeColor,
    closeIcon: props.closeIcon,
    closeable: props.closeable,
    fieldNames: props.fieldNames,
    modelValue: innerValue.value,
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
    field: fieldRef.value,
    selectedOptions: [...payload.selectedOptions],
  }
}

function onChange(payload: CascaderChangeEvent) {
  innerValue.value = payload.value
  emit('change', createEventPayload(payload))
}

function onFinish(payload: CascaderChangeEvent) {
  const nextValue = mapSelectedOptionsToValues(payload.selectedOptions, props.fieldNames)
  const eventPayload = createEventPayload(payload)

  innerValue.value = payload.value
  emit('update:modelValue', nextValue)
  emit('finish', eventPayload)
  close(false)
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="props.disabled"
    :value="displayText"
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />

  <VanPopup
    v-bind="popupProps"
    @update:show="onPopupShowChange"
    @click-overlay="(event) => emit('clickOverlay', event)"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <VanCascader
      v-bind="cascaderProps"
      @change="onChange"
      @finish="onFinish"
      @close="close"
      @click-tab="(tabIndex, title) => emit('clickTab', tabIndex, title)"
    >
      <template
        v-for="slotName in forwardedSlotNames"
        :key="slotName"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps ?? {}" />
      </template>
    </VanCascader>
  </VanPopup>
</template>
