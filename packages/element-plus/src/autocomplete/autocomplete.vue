<script setup lang="ts">
import type { Field } from '@formily/core'
import type { AutocompleteInstance } from 'element-plus'
import type { AutocompleteData, AutocompleteFetchSuggestions } from 'element-plus/es/components/autocomplete'
import { useField } from '@silver-formily/vue'
import { ElAutocomplete } from 'element-plus'
import { computed, ref } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FAutocomplete',
  inheritAttrs: false,
})

const props = defineProps<{
  options?: AutocompleteData
}>()

const slots = defineSlots<{
  default?: (scope: { item: AutocompleteData[number], field: Field | undefined }) => any
  header?: (scope: { field: Field | undefined }) => any
  footer?: (scope: { field: Field | undefined }) => any
  loading?: () => any
  prefix?: () => any
  suffix?: () => any
  prepend?: () => any
  append?: () => any
}>()

const { props: attrs } = useCleanAttrs()
const fieldRef = useField<Field>()
const autocompleteRef = ref<AutocompleteInstance>()

fieldRef.value?.inject({
  getElAutocompleteRef: () => autocompleteRef,
})

const normalizedFetchSuggestions = computed<AutocompleteFetchSuggestions | undefined>(() => {
  const attrFetch = attrs.value.fetchSuggestions as AutocompleteFetchSuggestions | undefined
  if (attrFetch) {
    return ((queryString, cb) => {
      return (attrFetch as (...args: any[]) => any)(queryString, cb, fieldRef.value)
    }) as AutocompleteFetchSuggestions
  }

  /* istanbul ignore next -- @preserve defensive: allow autocomplete to run without options and remote fetch */
  if (!props.options) {
    return
  }

  return (queryString: string, cb) => {
    fieldRef.value.loading = true
    const keyword = (queryString ?? '').toLowerCase()
    const valueKey = (attrs.value.valueKey ?? 'value') as string
    const results = keyword
      ? props.options!.filter(option => matchOption(option, valueKey, keyword))
      : props.options!
    cb(results)
    fieldRef.value.loading = false
  }
})

function matchOption(option: AutocompleteData[number], valueKey: string, keyword: string) {
  const target = option?.[valueKey]
  /* istanbul ignore next -- @preserve defensive: tolerate invalid option shape from external data source */
  if (target === undefined || target === null) {
    return false
  }
  return String(target).toLowerCase().includes(keyword)
}

const autocompleteProps = computed(() => ({
  ...attrs.value,
  loading: attrs.value.loading ?? fieldRef.value?.loading,
  fetchSuggestions: normalizedFetchSuggestions.value,
}))
</script>

<template>
  <ElAutocomplete ref="autocompleteRef" v-bind="autocompleteProps">
    <template v-if="slots.default" #default="slotProps">
      <slot name="default" v-bind="{ ...slotProps, field: fieldRef }" />
    </template>
    <template v-if="slots.header" #header>
      <slot name="header" :field="fieldRef" />
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer" :field="fieldRef" />
    </template>
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
  </ElAutocomplete>
</template>
