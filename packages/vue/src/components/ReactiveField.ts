import type { GeneralField } from '@formily/core'
import type { Ref, VNode } from 'vue'
import type { IReactiveFieldProps } from '../types'
import { isVoidField } from '@formily/core'
import { toJS } from '@formily/reactive'
import { FormPath } from '@formily/shared'
import { useObserver } from '@silver-formily/reactive-vue'
import { defineComponent, h, inject, provide, ref, shallowRef, watch } from 'vue'
import { useField, useForm } from '../hooks'
import { useAttach } from '../hooks/useAttach'

import { FieldSymbol, SchemaOptionsSymbol, SchemaSymbol } from '../shared'
import { createVNodeProps, extractAttrsAndEvents, mergeSlots, wrapFragment } from '../utils/reactiveFieldHelpers'

type ComponentEventArgs = unknown[]
type ComponentEventHandler = (...args: ComponentEventArgs) => unknown

export default defineComponent({
  name: 'ReactiveField',
  props: {
    fieldType: {
      type: String,
      default: 'Field',
    },
    fieldProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: IReactiveFieldProps, { slots }) {
    const formRef = useForm()
    const parentRef = useField()
    const optionsRef = inject(SchemaOptionsSymbol, ref())
    const schemaRef = inject(SchemaSymbol, ref())

    useObserver()

    const createField = () =>
      formRef?.value?.[`create${props.fieldType}`]?.({
        ...props.fieldProps,
        basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
      })

    const fieldRef = shallowRef(createField()) as Ref<GeneralField>

    watch(
      () => props.fieldProps,
      () => (fieldRef.value = createField()),
    )

    useAttach(fieldRef)
    provide(FieldSymbol, fieldRef)

    return () => {
      const field = fieldRef.value
      const options = optionsRef.value

      if (!field) {
        return slots.default?.()
      }

      if (field.display !== 'visible') {
        return null
      }

      const mergedSlots = mergeSlots(field, slots, field.content)
      const decoratorContent = schemaRef.value?.['x-decorator-content']
        ?? props.fieldProps?.decoratorContent
      const decoratorSlots = mergeSlots(field, slots, decoratorContent)

      const renderDecorator = (childNodes: Array<VNode | null | undefined>) => {
        const normalizedChildren = childNodes.filter(child => child != null) as VNode[]
        if (!field.decoratorType) {
          return wrapFragment(normalizedChildren)
        }

        const finalComponent
          = FormPath.getIn(options?.components, field.decoratorType as string) ?? field.decoratorType
        const decoratorEntry = Array.isArray(field.decorator) ? field.decorator[1] : undefined
        const decoratorAttrs = toJS(decoratorEntry) || {}
        const { attrs, events } = extractAttrsAndEvents(decoratorAttrs)
        const decoratorProps = createVNodeProps(attrs, events)

        return h(finalComponent, decoratorProps, {
          ...decoratorSlots,
          default: () => normalizedChildren,
        })
      }

      const renderComponent = (): VNode | null => {
        if (!field.componentType) {
          return wrapFragment(mergedSlots?.default?.())
        }

        const component
          = FormPath.getIn(options?.components, field.componentType as string) ?? field.componentType

        const componentEntry = Array.isArray(field.component) ? field.component[1] : undefined
        const originData = toJS(componentEntry) || {}
        const fieldValue = !isVoidField(field) ? field.value : undefined
        const composedAttrs = {
          disabled: !isVoidField(field)
            ? field.pattern === 'disabled' || field.pattern === 'readPretty'
            : undefined,
          readOnly: !isVoidField(field) ? field.pattern === 'readOnly' : undefined,
          ...originData,
          modelValue: fieldValue,
        }
        const { attrs, events } = extractAttrsAndEvents(composedAttrs)
        const modelUpdateHandler: ComponentEventHandler | undefined = events['update:modelValue']
        const focusHandler: ComponentEventHandler | undefined = events.focus
        const blurHandler: ComponentEventHandler | undefined = events.blur

        const emitInput = (...args: ComponentEventArgs) => {
          if (!isVoidField(field)) {
            field.onInput(...(args as Parameters<typeof field.onInput>))
          }
        }

        events['update:modelValue'] = (...args: ComponentEventArgs) => {
          emitInput(...args)
          modelUpdateHandler?.(...args)
        }
        events.focus = (...args: ComponentEventArgs) => {
          if (!isVoidField(field)) {
            field.onFocus(...(args as Parameters<typeof field.onFocus>))
          }
          focusHandler?.(...args)
        }
        events.blur = (...args: ComponentEventArgs) => {
          if (!isVoidField(field)) {
            field.onBlur(...(args as Parameters<typeof field.onBlur>))
          }
          blurHandler?.(...args)
        }

        const componentProps = createVNodeProps(attrs, events)
        return h(component, componentProps, mergedSlots)
      }

      return renderDecorator([renderComponent()])
    }
  },
})
