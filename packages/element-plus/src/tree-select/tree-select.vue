<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import { useField } from '@silver-formily/vue'
import { ElTreeSelect } from 'element-plus'
import { ref, useAttrs, useSlots } from 'vue'

defineOptions({
  name: 'FSelectTree',
  inheritAttrs: false,
})

const slots = useSlots()

const attrs = useAttrs()

const treeSelectRef = ref()

const fieldRef = useField<Field>()

fieldRef.value?.inject({
  getTreeSelectRef: () => {
    return treeSelectRef
  },
})
</script>

<template>
  <ElTreeSelect
    ref="treeSelectRef"
    :loading="fieldRef.value?.loading"
    v-bind="attrs"
  >
    <template v-for="(_, name) of slots" #[name]="slotData">
      <slot :name="name" v-bind="{ field: fieldRef, ...slotData }" />
    </template>
  </ElTreeSelect>
</template>
