import { beforeEach, describe, expect, it, vi } from 'vitest'

async function loadModules() {
  const [{ observable }, { createDataSource, isNoNeedCompileObject }, { Schema }] = await Promise.all([
    import('@silver-formily/reactive'),
    import('../shared'),
    import('../schema'),
  ])
  return {
    observable,
    createDataSource,
    isNoNeedCompileObject,
    Schema,
  }
}

describe('shared helpers', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('matches upstream no-compile object guards', async () => {
    const { Schema, isNoNeedCompileObject, observable } = await loadModules()

    expect(isNoNeedCompileObject({})).toBe(false)
    expect(isNoNeedCompileObject({ $$typeof: null, _owner: null })).toBe(true)
    expect(isNoNeedCompileObject({ _isAMomentObject: true })).toBe(true)
    expect(isNoNeedCompileObject({ [Symbol.for('__REVA_ACTIONS')]: true })).toBe(true)
    expect(isNoNeedCompileObject({ toJSON: () => {} })).toBe(true)
    expect(isNoNeedCompileObject({ toJS: () => {} })).toBe(true)
    expect(isNoNeedCompileObject(observable({}))).toBe(true)
    expect(isNoNeedCompileObject(new Schema({}))).toBe(true)
  })

  it('creates a normalized dataSource shape', async () => {
    const { createDataSource } = await loadModules()

    expect(createDataSource(['111'])).toEqual([{ label: '111', value: '111' }])
    expect(createDataSource([{ label: '111', value: '111' }])).toEqual([
      { label: '111', value: '111' },
    ])
  })
})
