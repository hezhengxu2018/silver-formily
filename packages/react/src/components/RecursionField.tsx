import type { GeneralField } from '@silver-formily/core'
import type { IRecursionFieldProps } from '../types'
import { Schema } from '@silver-formily/json-schema'
import { Path as FormPath } from '@silver-formily/path'
import { observable } from '@silver-formily/reactive'
import { isBool, isFn, isValid } from '@silver-formily/shared'
import { Fragment, useMemo } from 'react'
import { useExpressionScope, useField } from '../hooks'
import { SchemaContext } from '../shared'
import { ArrayField } from './ArrayField'
import { ExpressionScope } from './ExpressionScope'
import { Field } from './Field'
import { ObjectField } from './ObjectField'
import { VoidField } from './VoidField'

function useFieldProps(schema: Schema) {
  const scope = useExpressionScope()
  return schema.toFieldProps({
    scope,
  }) as any
}

function useBasePath(props: IRecursionFieldProps) {
  const parent = useField()
  if (props.onlyRenderProperties) {
    return props.basePath || parent?.address.concat(props.name as any)
  }
  return props.basePath || parent?.address
}

export function RecursionField(props: IRecursionFieldProps) {
  const basePath = useBasePath(props)
  const fieldSchema = useMemo(() => new Schema(props.schema), [props.schema])
  const fieldProps = useFieldProps(fieldSchema)

  const renderSlots = (innerSchema: any, key: any) => {
    const slot = innerSchema['x-slot-node']
    const { target, isRenderProp } = slot
    if (isRenderProp) {
      const args = observable({ $slotArgs: [] as any[] })
      FormPath.setIn(fieldSchema.properties, target, (..._args: any[]) => {
        args.$slotArgs = _args
        return (
          <ExpressionScope value={args}>
            <RecursionField schema={innerSchema} name={key} />
          </ExpressionScope>
        )
      })
    }
    else {
      FormPath.setIn(
        fieldSchema.properties,
        target,
        <RecursionField schema={innerSchema} name={key} />,
      )
    }
  }

  const renderProperties = (field?: GeneralField) => {
    if (props.onlyRenderSelf)
      return
    const properties = Schema.getOrderProperties(fieldSchema)
    if (!properties.length)
      return
    return (
      <Fragment>
        {properties.map(({ schema: item, key: name }, index) => {
          const base = field?.address || basePath
          let schema: Schema = item
          if (schema['x-slot-node']) {
            renderSlots(schema, name)
            return null
          }

          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name)
            if (mapped) {
              schema = mapped
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null
            }
          }
          if (isBool(props.propsRecursion) && props.propsRecursion) {
            return (
              <RecursionField
                propsRecursion={true}
                filterProperties={props.filterProperties}
                mapProperties={props.mapProperties}
                schema={schema}
                key={`${index}-${name}`}
                name={name}
                basePath={base}
              />
            )
          }
          return (
            <RecursionField
              schema={schema}
              key={`${index}-${name}`}
              name={name}
              basePath={base}
            />
          )
        })}
      </Fragment>
    )
  }

  const render = () => {
    if (!isValid(props.name))
      return renderProperties()
    if (fieldSchema.type === 'object') {
      if (props.onlyRenderProperties)
        return renderProperties()
      return (
        <ObjectField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </ObjectField>
      )
    }
    else if (fieldSchema.type === 'array') {
      return (
        <ArrayField {...fieldProps} name={props.name} basePath={basePath} />
      )
    }
    else if (fieldSchema.type === 'void') {
      if (props.onlyRenderProperties)
        return renderProperties()
      return (
        <VoidField {...fieldProps} name={props.name} basePath={basePath}>
          {renderProperties}
        </VoidField>
      )
    }
    return <Field {...fieldProps} name={props.name} basePath={basePath} />
  }

  if (!fieldSchema)
    return <Fragment />

  return (
    <SchemaContext.Provider value={fieldSchema}>
      {render()}
    </SchemaContext.Provider>
  )
}
