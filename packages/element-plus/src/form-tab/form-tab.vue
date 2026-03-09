<script setup lang="ts">
import type { IFormTabProps } from './types.ts'
import { formilyComputed, reactionWatch } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElBadge, ElTabPane, ElTabs } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { stylePrefix } from '../__builtins__'
import { useTabs } from './hooks'
import { createFormTab } from './utils'

defineOptions({
  name: 'FFormTab',
})

const props = defineProps<IFormTabProps>()
const emit = defineEmits(['update:modelValue'])

const field = useField()
const schema = useFieldSchema()
const prefixCls = `${stylePrefix}-form-tab`
const formTabRef = computed(() => props.formTab ?? createFormTab())
const tabs = formilyComputed(() => useTabs(field.value, schema.value))
const _activeKey = ref(props?.modelValue ?? formTabRef.value.activeKey ?? tabs.value?.[0]?.name)

reactionWatch(() => {
  return tabs.value.length
}, () => {
  !tabs.value.some(tab => tab.name === _activeKey.value) && (_activeKey.value = tabs.value?.[0]?.name)
}, {
  fireImmediately: true,
})
watch(() => formTabRef.value.activeKey, (val) => {
  _activeKey.value = val
})

const errorList = formilyComputed(() => {
  return tabs.value.map((tab) => {
    return field.value.form.queryFeedbacks({
      type: 'error',
      address: `${field.value.address}.${tab.name}.*`,
    }).length
  })
})

function handleTabChange(key: string) {
  /* istanbul ignore if -- @preserve */
  if (typeof key !== 'string')
    return
  emit('update:modelValue', key)
  formTabRef.value.setActiveKey?.(key)
}
</script>

<template>
  <ElTabs
    :model-value="_activeKey"
    style="width: 100%;"
    @tab-change="handleTabChange"
  >
    <ElTabPane
      v-for="({ props: tabProps, schema: tabSchema, name }, key) in tabs"
      :key="name"
      v-bind="tabProps"
    >
      <template #default>
        <RecursionField :schema="tabSchema" :name="name" />
      </template>
      <template #label>
        <ElBadge
          v-if="errorList[key] !== 0"
          :class="prefixCls"
          :value="errorList[key]"
        >
          {{ tabProps.label }}
        </ElBadge>
        <template v-else>
          {{ tabProps.label }}
        </template>
      </template>
    </ElTabPane>
  </ElTabs>
</template>
