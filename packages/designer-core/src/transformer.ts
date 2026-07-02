import type { ISchema, SchemaKey } from '@silver-formily/json-schema'
import type { ITreeNode } from './models'
import { clone, uid } from '@silver-formily/designer-shared'
import { Schema } from '@silver-formily/json-schema'

export interface IFormilyTransformerOptions {
  designableFieldName?: string
  designableFormName?: string
}

export interface IFormilySchemaDocument {
  form?: Record<string, any>
  schema?: ISchema
}

function createOptions(options: IFormilyTransformerOptions = {}): Required<IFormilyTransformerOptions> {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Form',
    ...options,
  }
}

function findNode(node: ITreeNode | undefined, finder: (node: ITreeNode) => boolean): ITreeNode | undefined {
  if (!node)
    return
  if (finder(node))
    return node
  for (const child of node.children ?? []) {
    const matched = findNode(child, finder)
    if (matched)
      return matched
  }
}

function getSchemaProperties(schema: ISchema): Record<string, ISchema> {
  if (!schema.properties || typeof schema.properties !== 'object')
    schema.properties = {}
  return schema.properties as Record<string, ISchema>
}

export function transformToSchema(
  node: ITreeNode,
  options?: IFormilyTransformerOptions,
): IFormilySchemaDocument {
  const realOptions = createOptions(options)
  const root = findNode(node, child => child.componentName === realOptions.designableFormName)
  const schema: ISchema = {
    type: 'object',
    properties: {},
  }

  if (!root)
    return { schema }

  const createSchema = (current: ITreeNode, currentSchema: ISchema = {}): ISchema => {
    if (current !== root)
      Object.assign(currentSchema, clone(current.props ?? {}))

    currentSchema['x-designable-id'] = current.id

    if (currentSchema.type === 'array') {
      const [itemsNode, ...propertyNodes] = current.children ?? []
      if (itemsNode?.componentName === realOptions.designableFieldName) {
        currentSchema.items = createSchema(itemsNode)
        currentSchema['x-index'] = 0
      }

      propertyNodes.forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName)
          return
        const key = String(child.props?.name ?? child.id)
        const properties = getSchemaProperties(currentSchema)
        properties[key] = createSchema(child)
        properties[key]['x-index'] = index
      })
      return currentSchema
    }

    current.children?.forEach((child, index) => {
      if (child.componentName !== realOptions.designableFieldName)
        return
      const key = String(child.props?.name ?? child.id)
      const properties = getSchemaProperties(currentSchema)
      properties[key] = createSchema(child)
      properties[key]['x-index'] = index
    })

    return currentSchema
  }

  return {
    form: clone(root.props ?? {}),
    schema: createSchema(root, schema),
  }
}

function cleanSchemaProps(props: Record<string, any>) {
  if (props.name === props['x-designable-id'])
    delete props.name
  delete props.version
  delete props._isJSONSchemaObject
  return props
}

export function transformToTreeNode(
  formily: IFormilySchemaDocument = {},
  options?: IFormilyTransformerOptions,
): ITreeNode {
  const realOptions = createOptions(options)
  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: clone(formily.form ?? {}),
    children: [],
  }
  const schema = new Schema(formily.schema ?? {})

  const appendTreeNode = (parent: ITreeNode, currentSchema?: Schema) => {
    if (!currentSchema)
      return

    const current: ITreeNode = {
      id: currentSchema['x-designable-id'] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanSchemaProps(currentSchema.toJSON(false) as Record<string, any>),
      children: [],
    }
    parent.children!.push(current)

    if (currentSchema.items && !Array.isArray(currentSchema.items))
      appendTreeNode(current, currentSchema.items)

    currentSchema.mapProperties((propertySchema) => {
      propertySchema['x-designable-id'] = propertySchema['x-designable-id'] || uid()
      appendTreeNode(current, propertySchema)
    })
  }

  schema.mapProperties((propertySchema: Schema, _key: SchemaKey) => {
    propertySchema['x-designable-id'] = propertySchema['x-designable-id'] || uid()
    appendTreeNode(root, propertySchema)
  })

  return root
}
