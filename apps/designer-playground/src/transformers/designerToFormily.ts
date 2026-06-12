import type { DesignerSchemaNode } from '@silver-formily/designer-core'

const fieldTypeMap: Record<string, string> = {
  Input: 'string',
  Select: 'string',
}

function normalizePropertyName(node: DesignerSchemaNode, index: number) {
  const preferred = node.metadata?.name || node.id || `${node.componentName}_${index + 1}`
  return String(preferred)
    .replace(/^dn_/, '')
    .replace(/\W+/g, '_')
    .replace(/^(\d)/, 'field_$1')
}

function toFieldSchema(node: DesignerSchemaNode, index: number) {
  return [
    normalizePropertyName(node, index),
    {
      'type': fieldTypeMap[node.componentName] || 'string',
      'title': node.title || node.componentName,
      'x-decorator': 'FormItem',
      'x-component': node.componentName,
      'x-component-props': node.props || {},
    },
  ] as const
}

export function transformDesignerSchemaToFormilySchema(schema: DesignerSchemaNode) {
  const fields = (schema.children || []).filter(node => ['Input', 'Select'].includes(node.componentName))

  return {
    type: 'object',
    properties: Object.fromEntries(fields.map(toFieldSchema)),
  }
}
