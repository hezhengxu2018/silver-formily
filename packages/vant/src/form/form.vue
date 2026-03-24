<script setup lang="ts">
import type { Form as FormType, IFormFeedback } from '@formily/core'
import type { PropType } from 'vue'
import { FormProvider, useForm } from '@silver-formily/vue'
import { formProps } from 'vant'
import { computed, getCurrentInstance, nextTick, provide, ref } from 'vue'
import { PreviewText } from '../preview-text'
import {
  hasDefinedValue,
  normalizeFormPath,
  vantFormContextKey,
  vantFormInheritedPropKeys,
  vantFormItemRegistryKey,
  vantFormRootKey,
} from './context'

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
  previewTextPlaceholder: {
    type: String,
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
const formItemElements = new Map<string, HTMLElement>()

function toKebabCase(value: string) {
  return value.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function hasExplicitFormProp(key: string) {
  const vnodeProps = instance?.vnode.props
  if (!vnodeProps) {
    return false
  }

  return key in vnodeProps || toKebabCase(key) in vnodeProps
}

const inheritedProps = computed(() => {
  const entries: [string, any][] = []

  vantFormInheritedPropKeys.forEach((key) => {
    if (hasExplicitFormProp(key)) {
      entries.push([key, props[key]])
      return
    }

    if (key === 'disabled' && hasDefinedValue(currentForm.value?.disabled)) {
      entries.push([key, currentForm.value.disabled])
      return
    }

    if (key === 'readonly' && hasDefinedValue(currentForm.value?.readOnly)) {
      entries.push([key, currentForm.value.readOnly])
    }
  })

  return Object.fromEntries(entries)
})

provide(vantFormContextKey, inheritedProps)
provide(vantFormRootKey, formElementRef)

provide(vantFormItemRegistryKey, {
  get(identifier) {
    const key = normalizeFormPath(identifier)
    return key ? formItemElements.get(key) : undefined
  },
  register(entry) {
    ;[entry.address, entry.path].forEach((identifier) => {
      const key = normalizeFormPath(identifier)
      if (key) {
        formItemElements.set(key, entry.el)
      }
    })
  },
  unregister(entry) {
    ;[entry.address, entry.path].forEach((identifier) => {
      const key = normalizeFormPath(identifier)
      if (!key) {
        return
      }

      if (!entry.el || formItemElements.get(key) === entry.el) {
        formItemElements.delete(key)
      }
    })
  },
})

function resolveScrollTarget(errors: IFormFeedback[]) {
  for (const feedback of errors) {
    const candidateIdentifiers = [feedback.address, feedback.path]

    for (const identifier of candidateIdentifiers) {
      const key = normalizeFormPath(identifier)
      const target = key ? formItemElements.get(key) : undefined
      if (target && formElementRef.value?.contains(target)) {
        return target
      }
    }
  }

  return undefined
}

function scrollToFirstError(errors: IFormFeedback[]) {
  if (!props.scrollToError) {
    return
  }

  const target = resolveScrollTarget(errors)
  if (!target) {
    return
  }

  target.scrollIntoView(
    props.scrollToErrorPosition
      ? { block: props.scrollToErrorPosition as ScrollLogicalPosition }
      : undefined,
  )
}

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
    <PreviewText :placeholder="props.previewTextPlaceholder">
      <form ref="formElementRef" class="van-form" v-bind="$attrs" @submit="handleSubmit">
        <slot />
      </form>
    </PreviewText>
  </FormProvider>
  <PreviewText v-else :placeholder="props.previewTextPlaceholder">
    <form ref="formElementRef" class="van-form" v-bind="$attrs" @submit="handleSubmit">
      <slot />
    </form>
  </PreviewText>
</template>
