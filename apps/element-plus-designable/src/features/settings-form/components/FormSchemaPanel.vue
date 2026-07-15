<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import { createNamespace } from '@/lib/utils'
import SettingsSchemaForm from './SettingsSchemaForm.vue'

defineProps<{
  isEmpty?: boolean
  node?: any
  schema?: Record<string, any>
  sourceKey?: string
}>()

const { b } = createNamespace('settings-form')
</script>

<template>
  <section :class="[b('panel'), b('panel', { base: true })]">
    <div :class="b('panel-header')">
      <span :class="b('panel-title')">Form</span>
    </div>
    <div v-if="!isEmpty" :class="b('form')">
      <SettingsSchemaForm
        :node="node"
        :schema="schema"
        :source-key="sourceKey"
      />
    </div>
    <div
      v-else
      :class="b('empty')"
    >
      <ElEmpty description="暂无表单配置" />
    </div>
  </section>
</template>
