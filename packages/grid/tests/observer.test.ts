import { describe, expect, it, vi } from 'vitest'
import { ChildListMutationObserver } from '../src/observer'

describe('childListMutationObserver', () => {
  it('adds/removes observers and avoids duplicates', () => {
    const callback = vi.fn()
    const observer = new ChildListMutationObserver(callback)
    const container = document.createElement('div')
    const first = document.createElement('div')
    const second = document.createElement('div')
    const text = document.createTextNode('text-node')

    container.append(first, second, text)
    observer.observe(container)

    expect(observer.childList).toHaveLength(2)

    observer.addObserver(first)
    expect(observer.childList).toHaveLength(2)

    observer.removeObserver(first)
    expect(observer.childList).toHaveLength(1)

    observer.removeObserver(first)
    expect(observer.childList).toHaveLength(1)

    observer.disconnect()
    expect(observer.childList).toHaveLength(0)
  })

  it('handles childList mutations and ignores non-element nodes', () => {
    const callback = vi.fn()
    const observer = new ChildListMutationObserver(callback)
    const container = document.createElement('div')
    const existing = document.createElement('div')
    const added = document.createElement('div')
    const text = document.createTextNode('ignore-me')

    container.append(existing)
    observer.observe(container, {
      attributes: true,
      attributeFilter: ['data-grid-span'],
    })

    observer.handler([
      {
        type: 'childList',
        addedNodes: [added, text] as unknown as NodeList,
        removedNodes: [existing, text] as unknown as NodeList,
      } as MutationRecord,
      {
        type: 'attributes',
        addedNodes: [] as unknown as NodeList,
        removedNodes: [] as unknown as NodeList,
      } as MutationRecord,
    ])

    const observedElements = observer.childList.map(node => node.element)
    expect(observedElements.includes(added)).toBe(true)
    expect(observedElements.includes(existing)).toBe(false)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
