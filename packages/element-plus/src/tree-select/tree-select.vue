<script setup lang="ts">
import type { Field } from '@formily/core'
import { useField } from '@silver-formily/vue'
import { ElTreeSelect } from 'element-plus'
import { ref, useSlots } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FSelectTree',
  inheritAttrs: false,
})

const slots = useSlots()

const { props: attrs } = useCleanAttrs()

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
