import type { GeneralField } from '@formily/core'
import type { Slots, VNode } from 'vue'
import type { IRecursionFieldProps, SchemaExpressionScope } from '../types'
import { Schema } from '@formily/json-schema'
import { isFn, isValid, lazyMerge } from '@formily/shared'
import { computed, defineComponent, Fragment, h, inject, markRaw, provide, shallowRef, watch } from 'vue'
import { useField } from '../hooks'
import { SchemaExpressionScopeSymbol, SchemaOptionsSymbol, SchemaSymbol } from '../shared'
import { recursionFieldProps } from '../utils/recursionFieldProps'
import ArrayField from './ArrayField'
import Field from './Field'

import ObjectField from './ObjectField'
import VoidField from './VoidField'

type PropertyRenderFn = (field?: GeneralField) => VNode
interface ScopedSlotPayload { field?: GeneralField }
type SlotRender = (payload?: ScopedSlotPayload) => VNode[] | undefined
type SlotMap = Record<string, SlotRender>

function resolveEmptySlot(slots: SlotMap) {
  const slotKeys = Object.keys(slots)
  if (!slotKeys.length)
    return undefined
  const children = slotKeys.reduce<VNode[]>((acc, key) => {
    const slot = slots[key]
    if (!slot)
      return acc
    const result = slot()
    if (!result?.length)
      return acc
    const validChildren = result.filter(child => isValid(child))
    acc.push(...validChildren)
    return acc
  }, [])
  if (!children.length)
    return undefined
  return h(Fragment, null, children)
}

const RecursionField = defineComponent({
  name: 'RecursionField',
  inheritAttrs: false,
  props: recursionFieldProps,
  setup(props: IRecursionFieldProps) {
    const parentRef = useField()
    const optionsRef = inject(SchemaOptionsSymbol)
    const scopeRef = inject(SchemaExpressionScopeSymbol)

    if (!optionsRef || !scopeRef) {
      throw new Error('RecursionField must be used under SchemaField.')
    }
    const createSchema = (schemaProp: IRecursionFieldProps['schema']) =>
      markRaw(Schema.isSchemaInstance(schemaProp) ? schemaProp : new Schema(schemaProp))
    const fieldSchemaRef = computed(() => createSchema(props.schema))

    const getPropsFromSchema = (schema: Schema) =>
      schema?.toFieldProps?.({
        ...optionsRef.value,
        get scope() {
          return lazyMerge(
            {} as SchemaExpressionScope,
            optionsRef.value.scope ?? {},
            scopeRef.value,
          )
        },
      })
    const fieldPropsRef = shallowRef(getPropsFromSchema(fieldSchemaRef.value))

    watch([fieldSchemaRef, optionsRef], () => {
      fieldPropsRef.value = getPropsFromSchema(fieldSchemaRef.value)
    })

    const getBasePath = () => {
      if (props.onlyRenderProperties) {
        return props.basePath ?? parentRef?.value?.address.concat(props.name!)
      }
      return props.basePath ?? parentRef?.value?.address
    }

    provide(SchemaSymbol, fieldSchemaRef)

    return () => {
      const basePath = getBasePath()
      const fieldProps = fieldPropsRef.value

      const generateSlotsByProperties = (scoped = false): SlotMap => {
        if (props.onlyRenderSelf)
          return {}
        const properties = Schema.getOrderProperties(fieldSchemaRef.value)
        if (!properties.length)
          return {}
        const renderMap: Record<string, PropertyRenderFn[]> = {}
        const setRender = (key: string, value: PropertyRenderFn) => {
          if (!renderMap[key]) {
            renderMap[key] = []
          }
          renderMap[key].push(value)
        }
        for (const [index, { schema: item, key: name }] of properties.entries()) {
          let schema: Schema = item
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties) && props.filterProperties(schema, name) === false) {
            continue
          }
          setRender(schema['x-slot'] ?? 'default', (field?: GeneralField) =>
            h(RecursionField, {
              key: `${index}-${name}`,
              schema,
              name,
              basePath: field?.address ?? basePath,
              slot: schema['x-slot'],
            }))
        }
        const slots: SlotMap = {}
        for (const key of Object.keys(renderMap)) {
          const renderFns = renderMap[key]
          const slotRender: SlotRender = scoped
            ? payload => renderFns!.map(fn => fn(payload?.field))
            : () => renderFns!.map(fn => fn())
          slots[key] = slotRender
        }
        return slots
      }

      const render = () => {
        if (!isValid(props.name))
          return resolveEmptySlot(generateSlotsByProperties())
        if (fieldSchemaRef.value.type === 'object') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          return h(
            ObjectField,
            {
              ...fieldProps,
              name: props.name!,
              basePath,
            },
            generateSlotsByProperties(true) as Slots,
          )
        }
        else if (fieldSchemaRef.value.type === 'array') {
          return h(ArrayField, {
            ...fieldProps,
            name: props.name!,
            basePath,
          })
        }
        else if (fieldSchemaRef.value.type === 'void') {
          if (props.onlyRenderProperties)
            return resolveEmptySlot(generateSlotsByProperties())
          const slots = generateSlotsByProperties(true)
          return h(
            VoidField,
            {
              ...fieldProps,
              name: props.name!,
              basePath,
            },
            slots as Slots,
          )
        }

        return h(Field, {
          ...fieldProps,
          name: props.name!,
          basePath,
        })
      }

      if (!fieldSchemaRef.value)
        return

      return render()
    }
  },
})

export default RecursionField
