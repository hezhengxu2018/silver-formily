import type { Form } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import type { Component, ComputedRef, MaybeRefOrGetter, Slots } from 'vue'
import { isFn } from '@formily/shared'
import { createSchemaField } from '@silver-formily/vue'
import { computed, toValue } from 'vue'
import { mergeQueryFormComponents } from './default-components'

function resolveExternalForm(form: unknown): Form | undefined {
  if (isFn(form))
    return (form as () => Form | undefined)()
  return form as Form | undefined
}

interface UseQueryFormFormOptions {
  formProps: MaybeRefOrGetter<{ form?: unknown }>
  fallbackForm?: MaybeRefOrGetter<Form | undefined>
}

export function useQueryFormForm(options: UseQueryFormFormOptions) {
  const externalForm = computed<Form | undefined>(() => resolveExternalForm(toValue(options.formProps)?.form))
  const activeForm = computed<Form | undefined>(() => externalForm.value ?? toValue(options.fallbackForm))

  return {
    externalForm,
    activeForm,
  }
}

interface UseQueryFormSchemaFieldOptions {
  slots: Slots
  schema: ComputedRef<ISchema | undefined>
  schemaField: ComputedRef<Component | undefined>
  components: ComputedRef<Record<string, Component> | undefined>
  scope?: ComputedRef<Record<string, any> | undefined>
}

export function useQueryFormSchemaField(options: UseQueryFormSchemaFieldOptions) {
  const hasDefaultSlot = computed(() => Boolean(options.slots.default))
  const mergedComponents = computed(() => mergeQueryFormComponents(options.components.value))
  const schemaField = computed<Component | null>(() => {
    if (hasDefaultSlot.value || !options.schema.value)
      return null
    return options.schemaField.value ?? createSchemaField({
      components: mergedComponents.value,
      scope: options.scope?.value,
    }).SchemaField
  })

  return {
    hasDefaultSlot,
    schemaField,
  }
}
