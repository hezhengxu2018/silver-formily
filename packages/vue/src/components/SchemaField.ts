import type { ISchema, SchemaTypes } from '@formily/json-schema'
import type { VNode } from 'vue'
import type {
  ISchemaFieldVueFactoryOptions,
  SchemaExpressionScope,
  SchemaVueComponents,
} from '../types'
import { Schema } from '@formily/json-schema'
import { lazyMerge } from '@formily/shared'
import { computed, defineComponent, Fragment, h, inject, provide, shallowRef, watch } from 'vue'
import { SchemaExpressionScopeSymbol, SchemaMarkupSymbol, SchemaOptionsSymbol } from '../shared'
import { resolveSchemaProps } from '../utils/resolveSchemaProps'
import { markupSchemaProps, schemaFieldProps } from '../utils/schemaFieldProps'
import RecursionField from './RecursionField'

type SchemaFieldProps = import('../utils/schemaFieldProps').SchemaFieldProps
type MarkupSchemaProps = import('../utils/schemaFieldProps').MarkupSchemaProps

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
    setup(props: SchemaFieldProps, { slots }) {
      const schemaRef = computed<Schema>(() =>
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

      const optionsRef = computed<ISchemaFieldVueFactoryOptions>(() => ({
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

        const normalizedSlots = slots.default?.() ?? []

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
      let render: () => VNode | null = () => null

      if (parentRef?.value) {
        const name = props.name || getRandomName()
        const appendArraySchema = (schema: ISchema) => {
          if (parentRef.value.items) {
            return parentRef.value.addProperty(name, schema)
          }
          else {
            return parentRef.value.setItems(resolveSchemaProps(props))
          }
        }

        const schemaRef = shallowRef<Schema>(parentRef.value)

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

        render = () => h(Fragment, null, slots.default?.() ?? [])
      }

      return render
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
