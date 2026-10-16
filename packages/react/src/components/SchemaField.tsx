import type { ISchema, SchemaKey } from '@silver-formily/json-schema'
import type { ReactNode } from 'react'
import type {
  ISchemaFieldProps,
  ISchemaFieldReactFactoryOptions,
  ISchemaMarkupFieldProps,
  ISchemaTypeFieldProps,
  JSXComponent,
  ReactComponentPath,
  SchemaReactComponents,
} from '../types'
import { Schema } from '@silver-formily/json-schema'
import { lazyMerge } from '@silver-formily/shared'
import { Fragment, useContext } from 'react'
import {
  SchemaComponentsContext,
  SchemaMarkupContext,
  SchemaOptionsContext,
} from '../shared'
import { render } from '../shared/render'
import { ExpressionScope } from './ExpressionScope'
import { RecursionField } from './RecursionField'

const env = {
  nonameId: 0,
}

function getRandomName() {
  return `NO_NAME_FIELD_$${env.nonameId++}`
}

export function createSchemaField<Components extends SchemaReactComponents>(
  options: ISchemaFieldReactFactoryOptions<Components> = {},
) {
  function SchemaField<
    Decorator extends JSXComponent,
    Component extends JSXComponent,
  >(props: ISchemaFieldProps<Decorator, Component>) {
    const schema = Schema.isSchemaInstance(props.schema)
      ? props.schema
      : new Schema({
          type: 'object',
          ...props.schema,
        })
    const renderMarkup = () => {
      env.nonameId = 0
      if (props.schema)
        return null
      return render(
        <SchemaMarkupContext.Provider value={schema}>
          {props.children}
        </SchemaMarkupContext.Provider>,
      )
    }

    return (
      <SchemaOptionsContext.Provider value={options}>
        <SchemaComponentsContext.Provider
          value={lazyMerge(options.components ?? {}, props.components ?? {})}
        >
          <ExpressionScope value={lazyMerge(options.scope, props.scope)}>
            {renderMarkup()}
            <RecursionField {...props} schema={schema} />
          </ExpressionScope>
        </SchemaComponentsContext.Provider>
      </SchemaOptionsContext.Provider>
    )
  }

  SchemaField.displayName = 'SchemaField'

  function MarkupRender(props: ISchema & { name: SchemaKey, children?: ReactNode }) {
    const parent = useContext(SchemaMarkupContext)
    if (!parent)
      return <Fragment />
    const appendArraySchema = (schema: ISchema) => {
      const items = parent.items as Schema
      if (items && items.name !== props.name) {
        return parent.addProperty(props.name, schema)
      }
      else {
        return parent.setItems(schema)
      }
    }
    if (parent.type === 'object' || parent.type === 'void') {
      const schema = parent.addProperty(props.name, props)
      return (
        <SchemaMarkupContext.Provider value={schema}>
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    }
    else if (parent.type === 'array') {
      const schema = appendArraySchema(props)
      return (
        <SchemaMarkupContext.Provider
          value={Array.isArray(schema) ? schema[0] : schema}
        >
          {props.children}
        </SchemaMarkupContext.Provider>
      )
    }
    else {
      return <Fragment>{props.children}</Fragment>
    }
  }

  function MarkupField<
    Decorator extends ReactComponentPath<Components>,
    Component extends ReactComponentPath<Components>,
  >(props: ISchemaMarkupFieldProps<Components, Decorator, Component>) {
    return <MarkupRender {...props} name={props.name || getRandomName()} />
  }

  MarkupField.displayName = 'MarkupField'

  function createTypedField(type: ISchema['type'], displayName: string) {
    function TypedField<
      Decorator extends ReactComponentPath<Components>,
      Component extends ReactComponentPath<Components>,
    >(props: ISchemaTypeFieldProps<Components, Decorator, Component>) {
      return <MarkupField {...props} type={type} />
    }
    TypedField.displayName = displayName
    return TypedField
  }

  SchemaField.Markup = MarkupField
  SchemaField.String = createTypedField('string', 'StringField')
  SchemaField.Object = createTypedField('object', 'ObjectField')
  SchemaField.Array = createTypedField('array', 'ArrayField')
  SchemaField.Boolean = createTypedField('boolean', 'BooleanField')
  SchemaField.Date = createTypedField('date', 'DateField')
  SchemaField.DateTime = createTypedField('datetime', 'DateTimeField')
  SchemaField.Void = createTypedField('void', 'VoidField')
  SchemaField.Number = createTypedField('number', 'NumberField')

  return SchemaField
}
