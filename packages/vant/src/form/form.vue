<script setup lang="ts">
import type { VantFormProps } from './types'
import { FormProvider, useForm } from '@silver-formily/vue'
import { isNil } from 'lodash-es'
import { computed, nextTick, provide, ref } from 'vue'
import { useHasExplicitVNodeProp } from '../__builtins__'
import { vantFormContextKey, vantFormInheritedPropKeys } from './context'
import { useVantFormScroll } from './hooks'

defineOptions({
  name: 'FForm',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<VantFormProps>(), {
  submitOnEnter: true,
  showErrorMessage: true,
  validateTrigger: 'onBlur',
})

const top = useForm()
const currentForm = computed(() => props.form ?? top.value)
const formElementRef = ref<HTMLFormElement>()
const { scrollToFirstError } = useVantFormScroll({
  formElementRef,
  scrollToError: () => props.scrollToError,
  scrollToErrorPosition: () => props.scrollToErrorPosition as ScrollLogicalPosition | undefined,
})
const hasExplicitFormProp = useHasExplicitVNodeProp()

const inheritedProps = computed(() => {
  const form = currentForm.value
  return Object.fromEntries(
    vantFormInheritedPropKeys.flatMap((key) => {
      if (hasExplicitFormProp(key)) {
        return [[key, props[key]]] as const
      }

      const inheritedValue = key === 'disabled'
        ? form?.disabled
        : key === 'readonly'
          ? form?.readOnly
          : undefined

      return isNil(inheritedValue) ? [] : [[key, inheritedValue]] as const
    }),
  )
})

provide(vantFormContextKey, inheritedProps)

async function handleSubmit(event: Event) {
  event.preventDefault()

  const form = currentForm.value
  if (!form) {
    return
  }

  try {
    await form.submit(values => props.onAutoSubmit?.(values))
  }
  catch (error) {
    props.onAutoSubmitFailed?.(error)
    await nextTick()
    scrollToFirstError(error)
  }
}
</script>

<template>
  <FormProvider v-if="props.form" :form="props.form">
    <form ref="formElementRef" class="van-form" v-bind="$attrs" @submit="handleSubmit">
      <slot />
    </form>
  </FormProvider>
  <form v-else ref="formElementRef" class="van-form" v-bind="$attrs" @submit="handleSubmit">
    <slot />
  </form>
</template>
