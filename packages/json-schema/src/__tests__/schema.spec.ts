import { beforeEach, describe, expect, it, vi } from 'vitest'

async function loadSchema() {
  const mod = await import('../schema')
  return mod.Schema
}

describe('schema', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('resolves definitions for properties via $ref like upstream', async () => {
    const Schema = await loadSchema()

    const schema = new Schema({
      definitions: {
        address: {
          type: 'object',
          properties: {
            street_address: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
            },
          },
          required: ['street_address', 'city', 'state'],
        },
      },
      type: 'object',
      properties: {
        billing_address: {
          title: 'Billing address',
          $ref: '#/definitions/address',
        },
      },
    })

    expect(schema.properties).toBeDefined()
    expect(schema.properties?.billing_address).toBeDefined()
    expect(schema.properties?.billing_address?.required).toEqual([
      'street_address',
      'city',
      'state',
    ])
  })

  it('resolves definitions for additionalProperties via $ref', async () => {
    const Schema = await loadSchema()

    const schema = new Schema({
      definitions: {
        scalar: {
          type: 'string',
          title: 'scalar',
        },
      },
      type: 'object',
      additionalProperties: {
        $ref: '#/definitions/scalar',
      },
    })

    expect(schema.additionalProperties?.parent).toBe(schema)
    expect(schema.additionalProperties?.root).toBe(schema)
    expect(schema.additionalProperties?.type).toBe('string')
    expect(schema.additionalProperties?.title).toBe('scalar')
  })

  it('exposes core schema methods from the upstream API surface', async () => {
    const Schema = await loadSchema()
    const schema = new Schema({
      type: 'object',
      properties: {
        aa: {
          type: 'string',
        },
      },
    })

    expect(typeof schema.setAdditionalItems).toBe('function')
    expect(typeof schema.setAdditionalProperties).toBe('function')
    expect(typeof schema.setItems).toBe('function')
    expect(typeof schema.setPatternProperties).toBe('function')
    expect(typeof schema.setProperties).toBe('function')
    expect(typeof schema.addPatternProperty).toBe('function')
    expect(typeof schema.addProperty).toBe('function')
    expect(typeof schema.fromJSON).toBe('function')
    expect(typeof schema.toJSON).toBe('function')
    expect(typeof schema.reducePatternProperties).toBe('function')
    expect(typeof schema.reduceProperties).toBe('function')
    expect(typeof schema.removeProperty).toBe('function')
    expect(typeof schema.removePatternProperty).toBe('function')
    expect(typeof schema.mapPatternProperties).toBe('function')
    expect(typeof schema.mapProperties).toBe('function')

    expect(typeof Schema.isSchemaInstance).toBe('function')
    expect(typeof Schema.registerCompiler).toBe('function')
    expect(typeof Schema.registerPatches).toBe('function')
    expect(typeof Schema.shallowCompile).toBe('function')
    expect(typeof Schema.compile).toBe('function')
    expect(typeof Schema.getOrderProperties).toBe('function')
  })

  it('keeps unordered properties when x-index is absent', async () => {
    const Schema = await loadSchema()
    const schema = new Schema({
      type: 'object',
      properties: {
        first: {
          type: 'string',
        },
        second: {
          type: 'string',
        },
      },
    })

    expect(Schema.getOrderProperties(schema).map(item => item.key)).toEqual([
      'first',
      'second',
    ])
  })
})
