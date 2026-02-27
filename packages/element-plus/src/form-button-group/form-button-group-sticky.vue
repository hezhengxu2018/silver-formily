<script setup lang="ts">
import type { AffixProps } from 'element-plus'
import type { ComputedRef } from 'vue'
import { useForm } from '@silver-formily/vue'
import { ElAffix, useAttrs } from 'element-plus'
import { computed } from 'vue'
import { useFormLayoutId } from '../form-layout/utils'
import { prefixCls } from './utils'

const attrs = useAttrs() as ComputedRef<Partial<AffixProps>>
const formRef = useForm()
const formLayoutId = useFormLayoutId()

const target = computed(() => {
  if (attrs.value.target) {
    return attrs.value.target
  }
  if (formLayoutId.value) {
    return `#${formLayoutId.value}`
  }
  /* istanbul ignore next -- @preserve */
  return formRef.value?.id ? `#formily-${formRef.value.id}` : undefined
})
</script>

<template>
  <ElAffix
    :class="`${prefixCls}__sticky`"
    v-bind="attrs"
    :position="attrs.position ?? 'bottom'"
    :target="target"
  >
    <slot />
  </ElAffix>
</template>
