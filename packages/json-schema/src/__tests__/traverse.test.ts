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

it('preserves React 19 production elements with empty props during schema compilation', async () => {
  const { traverse, traverseSchema } = await loadShared()
  const { compile } = await import('../compiler')
  const element = {
    $$typeof: Symbol.for('react.transitional.element'),
    type: () => null,
    key: null,
    props: {},
  }
  for (const visit of [traverse, traverseSchema]) {
    const props: Record<string, unknown> = {}
    visit({ 'x-component-props': { title: element, extra: element } }, (value, path) => {
      FormPath.setIn(props, path, compile(value))
    })
    expect(FormPath.getIn(props, 'x-component-props.title')).toBe(element)
    expect(FormPath.getIn(props, 'x-component-props.extra')).toBe(element)
  }
  expect(compile(element)).toBe(element)
})

it('preserves Vue 3 VNodes and leaves their internal expressions untouched', async () => {
  const { traverse, traverseSchema } = await loadShared()
  const { compile } = await import('../compiler')
  const vnode = {
    __v_isVNode: true,
    type: 'span',
    props: { title: '{{ username }}' },
    children: '{{ username }}',
  }
  const scope = { username: 'Alice' }
  const source = {
    'x-component-props': {
      title: vnode,
      extra: vnode,
      label: '{{ username }}',
      config: { props: { title: '{{ username }}' } },
    },
  }
  const compiled = compile(source, scope)
  expect(compiled['x-component-props'].title).toBe(vnode)
  expect(compiled['x-component-props'].extra).toBe(vnode)
  expect(compile(vnode, scope)).toBe(vnode)
  for (const visit of [traverse, traverseSchema]) {
    const result: Record<string, unknown> = {}
    visit(source, (value, path) => {
      FormPath.setIn(result, path, compile(value, scope))
    })
    expect(FormPath.getIn(result, 'x-component-props.title')).toBe(vnode)
    expect(FormPath.getIn(result, 'x-component-props.extra')).toBe(vnode)
    expect(FormPath.getIn(result, 'x-component-props.label')).toBe('Alice')
    expect(FormPath.getIn(result, 'x-component-props.config.props.title')).toBe('Alice')
  }
  expect(vnode.props.title).toBe('{{ username }}')
  expect(vnode.children).toBe('{{ username }}')
})
