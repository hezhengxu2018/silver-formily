<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import type { IArrayBaseProps } from './types'
import { useField, useFieldSchema } from '@silver-formily/vue'
import { provide, useAttrs } from 'vue'
import { ArrayBaseSymbol } from './symbols'

defineOptions({
  name: 'ArrayBaseInner',
  inheritAttrs: false,
})

const props = defineProps<IArrayBaseProps>()

const field = useField<ArrayField>()
const schema = useFieldSchema()

provide(ArrayBaseSymbol, {
  field,
  schema,
  props,
  attrs: useAttrs(),
  keyMap: props.keyMap,
})
</script>

<template>
  <slot />
</template>
