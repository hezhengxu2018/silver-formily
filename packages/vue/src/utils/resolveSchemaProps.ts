import { paramCase } from '@formily/shared'

export function resolveSchemaProps(props: Record<string, unknown>) {
  const newProps = {} as Record<string, unknown>
  Object.keys(props).forEach((key) => {
    if (key.indexOf('x') === 0 && !key.includes('x-')) {
      newProps[paramCase(key)] = props[key]
    }
    else {
      newProps[key] = props[key]
    }
  })
  return newProps
}
