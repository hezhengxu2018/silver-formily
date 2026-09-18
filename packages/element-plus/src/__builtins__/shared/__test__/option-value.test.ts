import { describe, expect, it } from 'vitest'
import { findOption, flattenOptions, flattenSelectOptions, getOptionIdentity, pickOptionValue } from '../option-value'

describe('option values', () => {
  it('projects own top-level properties without changing the source', () => {
    const source = Object.freeze({ 'value': 0, 'label': 'Zero', 'nested': { id: 1 }, 'a.b': false })
    expect(pickOptionValue(source)).toBe(source)
    expect(pickOptionValue(source, ['value', 'a.b', 'missing'])).toEqual({ 'value': 0, 'a.b': false })
    expect(pickOptionValue(source, [])).toEqual({})
    expect(source.label).toBe('Zero')
    expect(pickOptionValue(null, ['value'])).toBeNull()
  })

  it('resolves nested and primitive options, including falsy identities', () => {
    const options = flattenOptions([{ value: false, label: 'No' }, { id: 0, nodes: [{ id: 1 }] }, 'text'], 'nodes')
    expect(findOption(options, false)).toEqual({ value: false, label: 'No' })
    expect(findOption(options, 1, 'id')).toEqual({ id: 1 })
    expect(findOption(options, 'text')).toEqual({ label: 'text', value: 'text' })
    expect(getOptionIdentity({ id: 0 }, 'id')).toBe(0)
  })
})

it('only traverses the configured hierarchy and keeps business properties intact', () => {
  const option = { value: 1, options: [{ value: 2 }], children: [{ value: 3 }] }
  expect(flattenOptions([option])).toEqual([option])
  expect(flattenOptions([option], 'options')).toEqual([option, { value: 2 }])
  expect(flattenSelectOptions([{ label: 'Group', options: [option] }])).toEqual([option])
})
