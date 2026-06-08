import { Path as FormPath } from '@silver-formily/path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

async function loadShared() {
  return import('../shared')
}

describe('traverse helpers', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('keeps upstream traverseSchema behavior for omitted compile fields', async () => {
    const { traverseSchema } = await loadShared()
    const visited: Array<Array<string | number>> = []
    const omitted: any[] = []

    traverseSchema(
      {
        'type': 'string',
        'title': '{{aa}}',
        'required': true,
        'x-validator': 'phone',
        'x-compile-omitted': ['title'],
        'default': {
          input: 123,
        },
      } as any,
      (value, path, omitCompile) => {
        if (omitCompile) {
          omitted.push(value)
        }
        else {
          visited.push(path)
        }
      },
    )

    expect(visited).toEqual([
      ['x-validator'],
      ['type'],
      ['required'],
      ['default'],
    ])
    expect(omitted).toEqual(['{{aa}}'])
  })

  it('supports circular and shared references during traversal', async () => {
    const { traverse, traverseSchema } = await loadShared()
    const circular: any = {
      dd: {
        mm: null,
      },
      bb: {
        cc: {
          dd: 123,
        },
      },
      kk: {
        toJS() {},
      },
    }
    circular.dd.mm = circular

    expect(() => traverse(circular, () => {})).not.toThrow()
    expect(() => traverseSchema(circular, () => {})).not.toThrow()

    const dd = {
      mm: null,
    }
    const shared = {
      dd,
      bb: {
        dd,
      },
    }

    const paths: Array<Array<string | number>> = []

    traverse(shared, (_value, path) => {
      paths.push(path)
    })

    expect(
      paths.some(path => FormPath.parse(path).includes('dd.mm')),
    ).toBe(true)
    expect(
      paths.some(path => FormPath.parse(path).includes('bb.dd.mm')),
    ).toBe(true)
  })
})
