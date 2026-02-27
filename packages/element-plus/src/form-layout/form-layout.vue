<script lang="ts" setup>
import type { FormContext } from 'element-plus'
import type { IFormLayoutProps } from './types'
import { isEmpty, isValid } from '@formily/shared'
import { useThrottleFn } from '@vueuse/core'
import { formContextKey, useId } from 'element-plus'
import { computed, provide, reactive, ref, toRef, watch } from 'vue'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { filterValidFormLayoutProps, formLayoutDeepContext, formLayoutIdContext, formLayoutShallowContext, useFormDeepLayout, useResponsiveFormLayout } from './utils'

defineOptions({
  name: 'FFormLayout',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IFormLayoutProps>(), {
  tag: 'form',
  colon: undefined,
  labelWrap: undefined,
  fullness: undefined,
  size: 'default',
  layout: 'horizontal',
  shallow: true,
  statusIcon: true,
  asterisk: undefined,
})
const formPrefixCls = `${stylePrefix}-form`
const { props: attrs } = useCleanAttrs()
const rootHTMLRef = ref<HTMLElement>()
const isFormTag = props.tag === 'form'
const formLayoutBaseId = useId()
const formLayoutId = computed(() => attrs.value.id ?? `formily-${formLayoutBaseId.value}`)
const formLayoutDomId = computed(() => (isFormTag ? formLayoutId.value : attrs.value.id))
if (isFormTag) {
  provide(formLayoutIdContext, formLayoutId)
}

const formLayoutDeepConfig = useFormDeepLayout()
const { props: responsiveProps } = useResponsiveFormLayout(props, rootHTMLRef)

const deepLayout = ref({
  ...formLayoutDeepConfig.value,
  ...(props.shallow
    ? {
        size: props.size,
        ...(isValid(props.colon) && { colon: props.colon }),
      }
    : filterValidFormLayoutProps(props)),
})
provide(formLayoutDeepContext, deepLayout)

const shallowLayout = ref(props.shallow ? filterValidFormLayoutProps(props) : {})
provide(formLayoutShallowContext, shallowLayout)

const updateLayout = useThrottleFn(() => {
  if (!isEmpty(responsiveProps.value)) {
    const _responsiveProps = filterValidFormLayoutProps(responsiveProps.value)
    shallowLayout.value = filterValidFormLayoutProps({ ...props, ..._responsiveProps })
  }
}, 200, true)

watch(() => [props, responsiveProps], updateLayout, {
  deep: true,
  immediate: true,
})

const formContext = reactive({
  size: toRef(props, 'size'),
  statusIcon: toRef(props, 'statusIcon'),
  hideRequiredAsterisk: toRef(props, 'hideRequiredAsterisk'),
  requireAsteriskPosition: toRef(props, 'requireAsteriskPosition'),
})
provide(formContextKey, formContext as FormContext)
</script>

<template>
  <component
    :is="props.tag"
    :id="formLayoutDomId"
    ref="rootHTMLRef"
    :class="formPrefixCls"
    v-bind="attrs"
    @submit.prevent.stop
  >
    <slot />
  </component>
</template>
