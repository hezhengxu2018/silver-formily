<script setup lang="ts">
import type { Form as FormType, IFormFeedback } from '@formily/core'
import type { PropType } from 'vue'
import { paramCase } from '@formily/shared'
import { FormProvider, useForm } from '@silver-formily/vue'
import { isNil } from 'lodash-es'
import { formProps } from 'vant'
import { computed, getCurrentInstance, nextTick, provide, ref } from 'vue'
import { vantFormContextKey, vantFormInheritedPropKeys } from './context'
import { useVantFormScroll } from './hooks'

defineOptions({
  name: 'FForm',
  inheritAttrs: false,
})

const props = defineProps({
  ...formProps,
  form: {
    type: Object as PropType<FormType>,
    default: undefined,
  },
  onAutoSubmit: {
    type: Function as PropType<(values: FormType['values']) => Promise<any> | any>,
    default: undefined,
  },
  onAutoSubmitFailed: {
    type: Function as PropType<(error: IFormFeedback[]) => void>,
    default: undefined,
  },
})

const instance = getCurrentInstance()
const top = useForm()
const currentForm = computed(() => props.form ?? top.value)
const formElementRef = ref<HTMLFormElement>()
const { scrollToFirstError } = useVantFormScroll({
  formElementRef,
  scrollToError: () => props.scrollToError,
  scrollToErrorPosition: () => props.scrollToErrorPosition as ScrollLogicalPosition | undefined,
})

function hasExplicitFormProp(key: string) {
  const vnodeProps = instance?.vnode.props
  if (!vnodeProps) {
    return false
  }

  return key in vnodeProps || paramCase(key) in vnodeProps
}

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
