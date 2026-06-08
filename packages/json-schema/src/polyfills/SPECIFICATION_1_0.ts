import type { ISchema } from '../types'
import { isArr, isStr, isValid, lowerCase, toArr } from '@silver-formily/shared'
import { registerPolyfills } from '../patches'

const VOID_COMPONENTS = [
  'card',
  'block',
  'grid-col',
  'grid-row',
  'grid',
  'layout',
  'step',
  'tab',
  'text-box',
]

const TYPE_DEFAULT_COMPONENTS = {}

function transformCondition(condition: string) {
  if (isStr(condition)) {
    return condition.replace(/\$value/, '$self.value')
  }
}

function transformXLinkage(linkages: any[]) {
  if (isArr(linkages)) {
    return linkages.reduce((buf, item) => {
      if (!item)
        return buf
      if (item.type === 'value:visible') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            state: {
              visible: true,
            },
          },
          otherwise: {
            state: {
              visible: false,
            },
          },
        })
      }
      else if (item.type === 'value:schema') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            schema: SpecificationV1Polyfill({ version: '1.0', ...item.schema }),
          },
          otherwise: {
            schema: SpecificationV1Polyfill({
              version: '1.0',
              ...item.otherwise,
            }),
          },
        })
      }
      else if (item.type === 'value:state') {
        return buf.concat({
          target: item.target,
          when: transformCondition(item.condition),
          fulfill: {
            state: item.state,
          },
          otherwise: {
            state: item.otherwise,
          },
        })
      }
      return buf
    }, [])
  }
  return []
}

function SpecificationV1Polyfill(schema: ISchema) {
  if (isValid(schema.editable)) {
    schema['x-editable'] = schema['x-editable'] || schema.editable
    delete schema.editable
  }
  if (isValid(schema.visible)) {
    schema['x-visible'] = schema['x-visible'] || schema.visible
    delete schema.visible
  }
  if (isValid(schema.display)) {
    schema['x-display']
      = schema['x-display'] || (schema.display ? 'visible' : 'hidden')
    delete schema.display
  }
  if (isValid(schema['x-props'])) {
    schema['x-decorator-props']
      = schema['x-decorator-props'] || schema['x-props']
    delete schema['x-props']
  }
  if (schema['x-linkages']) {
    schema['x-reactions'] = toArr(schema['x-reactions'] as any).concat(
      transformXLinkage(schema['x-linkages'] as any[]) as any[],
    )
    delete schema['x-linkages']
  }
  if (schema['x-component']) {
    if (
      VOID_COMPONENTS.some(
        component => lowerCase(component) === lowerCase(schema['x-component']),
      )
    ) {
      schema.type = 'void'
    }
  }
  else {
    if (TYPE_DEFAULT_COMPONENTS[schema.type]) {
      schema['x-component'] = TYPE_DEFAULT_COMPONENTS[schema.type]
    }
  }
  if (
    !schema['x-decorator']
    && schema.type !== 'void'
    && schema.type !== 'object'
  ) {
    schema['x-decorator'] = schema['x-decorator'] || 'FormItem'
  }
  if (schema['x-rules']) {
    schema['x-validator'] = []
      .concat(schema['x-validator'] || [])
      .concat(schema['x-rules'])
  }
  return schema
}

registerPolyfills('1.0', SpecificationV1Polyfill)

export function registerVoidComponents(components: string[]) {
  VOID_COMPONENTS.push(...components)
}

export function registerTypeDefaultComponents(maps: Record<string, string>) {
  Object.assign(TYPE_DEFAULT_COMPONENTS, maps)
}
