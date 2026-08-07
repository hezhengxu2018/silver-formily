<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import type { PickerSelectOpenPicker, PickerSelectOption, PickerSelectProps } from './types'
import { isArr, isEqual, isValid } from '@silver-formily/shared'
import { useField } from '@silver-formily/vue'
import { ElOption, ElSelect } from 'element-plus'
import { computed, ref } from 'vue'
import { useExcludedAttrs } from '../__builtins__'

defineOptions({
  name: 'FPickerSelect',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerSelectProps>(), {
  options: () => [],
  cacheSelectedOptions: true,
  optionAsValue: false,
  valueKey: 'id',
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

const selectProps = useExcludedAttrs(['optionAsValue', 'valueKey'])
const fieldRef = useField<Field>()
const selectRef = ref<InstanceType<typeof ElSelect>>()
const openingPicker = ref(false)
const selectedOptionCache = ref<PickerSelectOption[]>([])
const ignoreVisibleChangeUntil = ref(0)

const multiple = computed(() => Boolean(selectProps.value.multiple))
const currentValue = computed(() => selectProps.value.modelValue)
const baseOptions = computed<PickerSelectOption[]>(() => props.options ?? [])
const elSelectProps = computed(() => {
  const { modelValue: _modelValue, ...attrs } = selectProps.value
  return attrs
})

function getOptionValue(value: any) {
  if (!props.optionAsValue || !value || typeof value !== 'object') {
    return value
  }
  return isValid(value[props.valueKey]) ? value[props.valueKey] : value.value
}

function getExternalValue(option: PickerSelectOption) {
  return props.optionAsValue ? option.raw ?? option : option.value
}

function resolveInternalValue(value: any) {
  const optionValue = getOptionValue(value)
  if (!props.optionAsValue) {
    return optionValue
  }
  const matchedOption = [...baseOptions.value, ...selectedOptionCache.value].find((option) => {
    return isSameValue(getOptionValue(option.raw), optionValue)
      || isSameValue(option.value, optionValue)
  })
  return matchedOption?.value ?? optionValue
}

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
    return isArr(value) ? value.map(resolveInternalValue).filter(isValid) : []
  }
  const normalizedValue = resolveInternalValue(value)
  return isValid(normalizedValue) ? [normalizedValue] : []
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
      setValue(normalizedResult.map(getExternalValue))
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
    setValue(getExternalValue(normalizedResult))
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
  if (props.optionAsValue) {
    const currentValues = isArr(currentValue.value) ? currentValue.value : []
    setValue(currentValues.filter(item => !isSameValue(resolveInternalValue(item), value)))
    return
  }
  setValue(normalizedValues.value.filter(item => !isSameValue(item, value)))
}
</script>

<template>
  <ElSelect
    ref="selectRef"
    v-bind="elSelectProps"
    :model-value="multiple ? normalizedValues : normalizedValues[0]"
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
