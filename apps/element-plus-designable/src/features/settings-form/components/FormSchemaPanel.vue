<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import { createNamespace } from '@/lib/utils'

defineProps<{
  isEmpty?: boolean
  json: string
  sourceKey?: string
}>()

const { b } = createNamespace('settings-form')
</script>

<template>
  <section :class="[b('panel'), b('panel', { base: true })]">
    <div :class="b('panel-header')">
      <span :class="b('panel-title')">Form</span>
    </div>
    <div
      v-if="!isEmpty"
      :key="sourceKey"
      :class="b('code')"
    >
      <pre>{{ json }}</pre>
    </div>
    <div
      v-else
      :class="b('empty')"
    >
      <ElEmpty description="暂无表单配置" />
    </div>
  </section>
</template>
