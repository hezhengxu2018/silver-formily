import type { ISchema, SchemaTypes } from '@formily/json-schema'
import type {
  ISchemaFieldProps,
  ISchemaFieldVueFactoryOptions,
  SchemaExpressionScope,
  SchemaVueComponents,
} from '../types'
import type { MarkupSchemaProps } from '../utils/schemaFieldProps'
import { Schema } from '@formily/json-schema'
import { lazyMerge } from '@formily/shared'
import { computed, defineComponent, Fragment, h, inject, provide, shallowRef, watch } from 'vue'
import { SchemaExpressionScopeSymbol, SchemaMarkupSymbol, SchemaOptionsSymbol } from '../shared'
import { resolveSchemaProps } from '../utils/resolveSchemaProps'
import { markupSchemaProps, schemaFieldProps } from '../utils/schemaFieldProps'
import RecursionField from './RecursionField'

const env = {
  nonameId: 0,
}

function getRandomName() {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export function createSchemaField<Components extends SchemaVueComponents = SchemaVueComponents>(
  options: ISchemaFieldVueFactoryOptions<Components> = {},
) {
  const SchemaField = defineComponent({
    name: 'SchemaField',
    inheritAttrs: false,
    props: schemaFieldProps,
    setup(props: ISchemaFieldProps, { slots }) {
      const schemaRef = computed(() =>
        Schema.isSchemaInstance(props.schema)
          ? props.schema
          : new Schema({
              type: 'object',
              ...props.schema,
            }),
      )

      const scopeRef = computed<SchemaExpressionScope>(() =>
        lazyMerge({} as SchemaExpressionScope, options.scope ?? {}, props.scope ?? {}),
      )

      const optionsRef = computed(() => ({
        ...options,
        components: {
          ...options.components,
          ...props.components,
        },
      }))

      provide(SchemaMarkupSymbol, schemaRef)
      provide(SchemaOptionsSymbol, optionsRef)
      provide(SchemaExpressionScopeSymbol, scopeRef)

      return () => {
        env.nonameId = 0

        const slotContent = slots.default?.()
        const normalizedSlots = Array.isArray(slotContent)
          ? slotContent
          : slotContent
            ? [slotContent]
            : []

        const recursionNode = h(RecursionField, {
          ...props,
          schema: schemaRef.value,
        })

        return h(Fragment, null, [...normalizedSlots, recursionNode])
      }
    },
  })

  const MarkupField = defineComponent({
    name: 'MarkupField',
    props: {
      type: String,
      ...markupSchemaProps,
    },
    setup(props: MarkupSchemaProps, { slots }) {
      const parentRef = inject(SchemaMarkupSymbol, null)
      if (!parentRef || !parentRef.value)
        return () => null

      const name = props.name || getRandomName()
      const appendArraySchema = (schema: ISchema) => {
        if (parentRef.value.items) {
          return parentRef.value.addProperty(name, schema)
        }
        else {
          return parentRef.value.setItems(resolveSchemaProps(props))
        }
      }

      const schemaRef = shallowRef()

      watch(
        parentRef,
        () => {
          if (parentRef.value.type === 'object' || parentRef.value.type === 'void') {
            schemaRef.value = parentRef.value.addProperty(name, resolveSchemaProps(props))
          }
          else if (parentRef.value.type === 'array') {
            const schema = appendArraySchema(resolveSchemaProps(props))
            schemaRef.value = Array.isArray(schema) ? schema[0] : schema
          }
        },
        { immediate: true, flush: 'sync' },
      )
      provide(SchemaMarkupSymbol, schemaRef)

      return () => h(Fragment, null, slots.default?.() ?? [])
    },
  })

  const SchemaFieldFactory = (type: SchemaTypes, name: string) => {
    return defineComponent({
      name,
      props: { ...markupSchemaProps },
      setup(props, { slots }) {
        return () =>
          h(
            MarkupField,
            {
              ...props,
              type,
            },
            slots,
          )
      },
    })
  }

  return {
    SchemaField,
    SchemaMarkupField: MarkupField,
    SchemaStringField: SchemaFieldFactory('string', 'SchemaStringField'),
    SchemaObjectField: SchemaFieldFactory('object', 'SchemaObjectField'),
    SchemaArrayField: SchemaFieldFactory('array', 'SchemaArrayField'),
    SchemaBooleanField: SchemaFieldFactory('boolean', 'SchemaBooleanField'),
    SchemaDateField: SchemaFieldFactory('date', 'SchemaDateField'),
    SchemaDateTimeField: SchemaFieldFactory('datetime', 'SchemaDatetimeField'),
    SchemaVoidField: SchemaFieldFactory('void', 'SchemaVoidField'),
    SchemaNumberField: SchemaFieldFactory('number', 'SchemaNumberField'),
  }
}
