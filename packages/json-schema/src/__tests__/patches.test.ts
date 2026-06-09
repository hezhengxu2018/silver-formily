import { beforeEach, describe, expect, it, vi } from 'vitest'

async function loadSchemaModules() {
  const [{ Schema }, polyfills] = await Promise.all([
    import('../schema'),
    import('../polyfills/SPECIFICATION_1_0'),
  ])
  return {
    Schema,
    ...polyfills,
  }
}

describe('patches and polyfills', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('migrates the upstream v1 polyfill behavior and removes legacy x-props', async () => {
    const { Schema, registerTypeDefaultComponents, registerVoidComponents } = await loadSchemaModules()

    registerVoidComponents(['MyCard'])
    registerTypeDefaultComponents({
      string: 'Input',
    })
    Schema.enablePolyfills(['1.0'])

    const schema = new Schema({
      'type': 'string',
      'editable': true,
      'visible': true,
      'display': false,
      'x-props': {
        labelCol: 3,
        wrapperCol: 4,
      },
      'x-linkages': [
        {
          type: 'value:visible',
          condition: '{{$value == 123}}',
        },
      ],
      'x-rules': ['phone'],
    } as any)

    expect(schema['x-editable']).toBe(true)
    expect(schema['x-visible']).toBe(true)
    expect(schema['x-display']).toBe('hidden')
    expect(schema['x-component']).toBe('Input')
    expect(schema['x-decorator']).toBe('FormItem')
    expect(schema['x-decorator-props']).toEqual({
      labelCol: 3,
      wrapperCol: 4,
    })
    expect(schema['x-props']).toBeUndefined()
    expect(schema['x-validator']).toEqual(['phone'])
    expect(schema['x-reactions']).toEqual([
      {
        when: '{{$self.value == 123}}',
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
      },
    ])

    const voidSchema = new Schema({
      'type': 'object',
      'x-component': 'MyCard',
    } as any)

    expect(voidSchema.type).toBe('void')
  })

  it('keeps enablePolyfills idempotent across repeated calls', async () => {
    const { Schema } = await loadSchemaModules()

    Schema.enablePolyfills(['1.0'])
    Schema.enablePolyfills(['1.0'])

    const schema = new Schema({
      'type': 'string',
      'x-rules': ['phone'],
    } as any)

    expect(schema['x-validator']).toEqual(['phone'])
  })
})
