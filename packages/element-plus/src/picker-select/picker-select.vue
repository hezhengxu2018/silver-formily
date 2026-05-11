<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PickerSelectOpenPicker, PickerSelectOption, PickerSelectProps } from './types'
import { isArr, isEqual, isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElOption, ElSelect } from 'element-plus'
import { computed, ref } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FPickerSelect',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerSelectProps>(), {
  options: () => [],
  cacheSelectedOptions: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const slots = defineSlots<{
  empty?: () => any
  prefix?: () => any
  tag?: () => any
  loading?: () => any
  label?: () => any
}>()

const ignoredOpenTriggerSelectors = ['.el-select__clear', '.el-tag__close']

const { props: selectProps } = useCleanAttrs()
const fieldRef = useField<Field>()
const selectRef = ref<InstanceType<typeof ElSelect>>()
const openingPicker = ref(false)
const selectedOptionCache = ref<PickerSelectOption[]>([])
const ignoreVisibleChangeUntil = ref(0)

const multiple = computed(() => Boolean(selectProps.value.multiple))
const currentValue = computed(() => selectProps.value.modelValue)
const baseOptions = computed<PickerSelectOption[]>(() => props.options ?? [])

function isSameValue(left: any, right: any) {
  return isEqual(left, right)
}

function hasOption(optionList: PickerSelectOption[], option: PickerSelectOption) {
  return optionList.some(item => isSameValue(item.value, option.value))
}

function createFallbackOption(value: any): PickerSelectOption {
  return {
    label: value,
    value,
  }
}

const normalizedValues = computed(() => {
  const value = currentValue.value
  if (multiple.value) {
    return isArr(value) ? value : []
  }
  return isValid(value) ? [value] : []
})

const displayOptions = computed<PickerSelectOption[]>(() => {
  const merged = [...baseOptions.value]
  for (const item of selectedOptionCache.value) {
    if (!hasOption(merged, item)) {
      merged.push(item)
    }
  }
  for (const value of normalizedValues.value) {
    if (!merged.some(item => isSameValue(item.value, value))) {
      merged.push(createFallbackOption(value))
    }
  }
  return merged
})

function setValue(value: any) {
  fieldRef.value?.setValue?.(value)
  if (!fieldRef.value) {
    emit('update:modelValue', value)
  }
}

function cacheOptions(optionList: PickerSelectOption[]) {
  if (props.cacheSelectedOptions === false) {
    return
  }
  const merged = [...selectedOptionCache.value]
  for (const item of optionList) {
    const index = merged.findIndex(cacheItem => isSameValue(cacheItem.value, item.value))
    if (index >= 0) {
      merged[index] = item
    }
    else {
      merged.push(item)
    }
  }
  selectedOptionCache.value = merged
}

function clearValue() {
  setValue(multiple.value ? [] : undefined)
}

function shouldIgnoreOpenTrigger(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  return ignoredOpenTriggerSelectors.some(selector => target.closest(selector))
}

function ignoreCurrentVisibleChange() {
  ignoreVisibleChangeUntil.value = Date.now() + 200
}

async function handleOpenPicker() {
  if (openingPicker.value || typeof props.openPicker !== 'function') {
    return
  }

  openingPicker.value = true

  try {
    const result = await Promise.resolve(
      (props.openPicker as PickerSelectOpenPicker)({
        field: fieldRef.value,
        dataSource: baseOptions.value,
        multiple: multiple.value,
      }),
    ).catch(() => undefined)

    if (multiple.value) {
      if (!isValid(result)) {
        return
      }
      const normalizedResult = isArr(result) ? result : [result]
      cacheOptions(normalizedResult)
      setValue(normalizedResult.map(item => item.value))
      return
    }

    if (!isValid(result)) {
      return
    }
    const normalizedResult = isArr(result) ? result[0] : result
    if (!normalizedResult) {
      return
    }
    cacheOptions([normalizedResult])
    setValue(normalizedResult.value)
  }
  finally {
    openingPicker.value = false
  }
}

function handleVisibleChange(visible: boolean) {
  if (!visible) {
    return
  }
  selectRef.value?.blur?.()
  if (Date.now() < ignoreVisibleChangeUntil.value) {
    ignoreVisibleChangeUntil.value = 0
    return
  }
  void handleOpenPicker()
}

function handleTriggerClick(event: MouseEvent) {
  if (typeof props.openPicker !== 'function' || selectProps.value.disabled) {
    return
  }
  if (shouldIgnoreOpenTrigger(event.target)) {
    ignoreCurrentVisibleChange()
    return
  }
  ignoreVisibleChangeUntil.value = 0
}

function handleRemoveTag(value: any) {
  if (!multiple.value) {
    return
  }
  setValue(normalizedValues.value.filter(item => !isSameValue(item, value)))
}
</script>

<template>
  <ElSelect
    ref="selectRef"
    v-bind="selectProps"
    @click="handleTriggerClick"
    @clear="clearValue"
    @remove-tag="handleRemoveTag"
    @visible-change="handleVisibleChange"
  >
    <ElOption
      v-for="option of displayOptions"
      :key="typeof option.value === 'object' ? JSON.stringify(option.value) : String(option.value)"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="slots.empty" #empty>
      <slot name="empty" />
    </template>
    <template v-if="slots.tag" #tag>
      <slot name="tag" />
    </template>
    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="slots.label" #label="{ label, value }">
      <slot name="label" :label="label" :value="value" />
    </template>
  </ElSelect>
</template>
