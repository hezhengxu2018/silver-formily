<script setup lang="ts">
import type { PickerGroupResolvedValue } from '@silver-formily/vant'
import { PickerGroupPanel, PickerPanel } from '@silver-formily/vant'
import { ref } from 'vue'
import { appointmentOptions } from '../picker-group/shared'
import { showDemoResult } from '../shared'

const value = ref<PickerGroupResolvedValue>(['hz', 'am'])

async function handleConfirm(nextValue: PickerGroupResolvedValue) {
  await showDemoResult(nextValue)
}
</script>

<template>
  <PickerGroupPanel
    v-model="value"
    title="预约信息"
    :data-source="appointmentOptions"
    @confirm="handleConfirm"
  >
    <template #default="{ dataSource, panelProps }">
      <PickerPanel
        v-bind="panelProps[0]"
        :columns="dataSource[0].options"
      />
      <PickerPanel
        v-bind="panelProps[1]"
        :columns="dataSource[1].options"
      />
    </template>
  </PickerGroupPanel>
</template>
