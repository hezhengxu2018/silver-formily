<script lang="ts" setup>
import type { PropType } from 'vue'
import type { IFormCollapse } from './utils'
import { isFn } from '@formily/shared'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElBadge, ElCollapse, ElCollapseItem } from 'element-plus'
import { computed } from 'vue'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { createFormCollapse, usePanels } from './utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  formCollapse: { type: Object as PropType<IFormCollapse> },
  activeKey: {
    type: [String, Number],
  },
})
const prefixCls = `${stylePrefix}-form-collapse`
const { props: collapseAttrs } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])

const field = useField()
const schema = useFieldSchema()
const panels = formilyComputed(() => usePanels(field.value, schema.value))
const formCollapseRef = computed(
  () => props.formCollapse ?? createFormCollapse(),
)

function takeActiveKeys(panelList) {
  if (props.activeKey)
    return props.activeKey
  if (formCollapseRef.value?.activeKeys)
    return formCollapseRef.value?.activeKeys
  return panelList.map(item => item.name)
}

const panelErrorCounts = formilyComputed(() => {
  return panels.value.map((item) => {
    const panelErrors = field.value.form.queryFeedbacks({
      type: 'error',
      address: `${field.value.address.concat(item.name)}.*`,
    })
    return panelErrors.length
  })
})
</script>

<template>
  <ElCollapse
    :class="prefixCls"
    :model-value="takeActiveKeys(panels)"
    v-bind="collapseAttrs"
    @change="(key) => {
      formCollapseRef.setActiveKeys(key)
    }"
  >
    <template v-for="({ props: itemProps, schema: itemSchema, name }, index) of panels" :key="name">
      <ElCollapseItem v-bind="itemProps" :name="name">
        <template #default>
          <RecursionField :schema="itemSchema" :name="name" />
        </template>
        <template #title>
          <ElBadge
            v-if="panelErrorCounts[index] !== 0"
            :class="`${prefixCls}-errors-badge`"
            :value="panelErrorCounts[index]"
          >
            <component
              :is="() => isFn(itemSchema['x-content']?.title)
                ? itemSchema['x-content']?.title(panelErrorCounts[index])
                : itemSchema['x-content']?.title"
              v-if="itemSchema['x-content']?.title"
            />
            <span v-else>{{ itemSchema['x-component-props']?.title }}</span>
          </ElBadge>
          <template v-else>
            <component
              :is="() => isFn(itemSchema['x-content']?.title)
                ? itemSchema['x-content']?.title(panelErrorCounts[index])
                : itemSchema['x-content']?.title"
              v-if="itemSchema['x-content']?.title"
            />
            <template v-else>
              {{ itemSchema['x-component-props']?.title }}
            </template>
          </template>
        </template>
      </ElCollapseItem>
    </template>
  </ElCollapse>
</template>
