<script setup lang="ts">
import type { CalendarDayItem } from 'vant'
import type {
  CalendarModelValue,
  CalendarProps,
  VanCalendarInstance,
} from './types'
import { omit } from 'lodash-es'
import { Calendar as VanCalendar } from 'vant'
import { computed, ref, useSlots } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import {
  cloneCalendarValue,
  formatCalendarValue,
  normalizeCalendarValue,
  resolveCalendarPlaceholder,
  resolveCalendarResetValue,
} from './utils'

defineOptions({
  name: 'FCalendar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CalendarProps>(), {
  type: 'single',
  round: true,
  showMark: true,
  showTitle: true,
  lazyRender: true,
  showConfirm: true,
  showSubtitle: true,
  closeOnPopstate: true,
  showRangePrompt: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | Date[] | null]
  'update:show': [value: boolean]
  'select': [value: Date | Date[] | null]
  'confirm': [value: Date | Date[] | null]
  'unselect': [value: Date]
  'clickOverlay': [event: MouseEvent]
  'clickDisabledDate': [item: CalendarDayItem]
  'clickSubtitle': [event: MouseEvent]
  'monthShow': [payload: { date: Date, title: string }]
  'panelChange': [payload: { date: Date }]
  'overRange': []
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'type'])

const calendarRef = ref<VanCalendarInstance>()
const popupVisible = ref(false)
const innerCalendarExcludedProps = [
  'modelValue',
  'placeholder',
  'displayFormatter',
  'disabled',
  'readonly',
  'defaultDate',
] as const
const forwardedSlotNames = computed(() => {
  return Object.keys(slots).filter((slotName) => {
    return slotName !== 'default' && !slotName.startsWith('_')
  })
})

const normalizedValue = computed(() => normalizeCalendarValue(props.modelValue, props.type))

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(cloneCalendarValue(normalizedValue.value), props.type)
  }

  return formatCalendarValue(normalizedValue.value, props.type)
})

const resolvedPlaceholder = computed(() => resolveCalendarPlaceholder(props.placeholder, props.type))

function getResetValue(value?: CalendarModelValue) {
  if (value !== undefined) {
    return cloneCalendarValue(resolveCalendarResetValue(value, props.type))
  }

  if (normalizedValue.value !== null) {
    return cloneCalendarValue(normalizedValue.value)
  }

  if (props.defaultDate !== undefined) {
    return cloneCalendarValue(resolveCalendarResetValue(props.defaultDate, props.type))
  }

  return undefined
}

const innerCalendarProps = computed(() => {
  const passthroughProps = omit({ ...props }, innerCalendarExcludedProps)

  return {
    ...passthroughProps,
    defaultDate: getResetValue(),
    show: popupVisible.value,
    poppable: true,
    readonly: props.readonly || props.disabled,
  }
})

function reset(date?: CalendarModelValue) {
  calendarRef.value?.reset(getResetValue(date) as any)
}

function resetCalendarSelection() {
  reset()
}

function emitVisibilityChange(value: boolean) {
  emit('update:show', value)

  if (value) {
    emit('open')
    return
  }

  emit('close')
}

function setPopupVisible(value: boolean, restoreSelection = true) {
  if (popupVisible.value === value) {
    if (!value && restoreSelection) {
      resetCalendarSelection()
    }

    return
  }

  popupVisible.value = value
  emitVisibilityChange(value)

  if (!value && restoreSelection) {
    resetCalendarSelection()
  }
}

function open() {
  if (props.disabled || props.readonly) {
    return
  }

  resetCalendarSelection()
  setPopupVisible(true, false)
}

function close(restoreSelection = true) {
  setPopupVisible(false, restoreSelection)
}

function onSelect(value: Date | Date[] | null) {
  emit('select', cloneCalendarValue(value))
}

function onConfirm(value: Date | Date[] | null) {
  const nextValue = cloneCalendarValue(value)

  emit('update:modelValue', nextValue)
  emit('confirm', nextValue)
  close(false)
}

function onUnselect(value: Date) {
  emit('unselect', new Date(value))
}

function onCalendarShowChange(value: boolean) {
  if (value) {
    setPopupVisible(true, false)
    return
  }

  close()
}
</script>

<template>
  <input
    v-bind="triggerInputProps"
    type="text"
    class="van-field__control"
    :disabled="props.disabled"
    readonly
    :value="displayText"
    :placeholder="resolvedPlaceholder"
    @click="open"
  >

  <VanCalendar
    ref="calendarRef"
    v-bind="innerCalendarProps"
    @update:show="onCalendarShowChange"
    @select="onSelect"
    @confirm="onConfirm"
    @unselect="onUnselect"
    @click-overlay="(event) => emit('clickOverlay', event)"
    @click-disabled-date="(item) => emit('clickDisabledDate', item)"
    @click-subtitle="(event) => emit('clickSubtitle', event)"
    @month-show="(payload) => emit('monthShow', payload)"
    @panel-change="(payload) => emit('panelChange', payload)"
    @over-range="emit('overRange')"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <template
      v-for="slotName in forwardedSlotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </VanCalendar>
</template>
