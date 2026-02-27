import { describe, expect, it } from 'vitest'
import { resolveDialogElement, resolveDrawerElement } from '../overlay-elements'

describe('overlay-elements', () => {
  it('resolveDialogElement should use dialogContentRef on instance first', () => {
    const dialog = document.createElement('div')
    const instance = {
      dialogContentRef: { $el: dialog },
      $el: document.createElement('section'),
    } as any

    expect(resolveDialogElement(instance)).toBe(dialog)
  })

  it('resolveDialogElement should fallback to exposed.dialogContentRef.$el', () => {
    const dialog = document.createElement('div')
    const instance = {
      exposed: {
        dialogContentRef: { $el: dialog },
      },
    } as any

    expect(resolveDialogElement(instance)).toBe(dialog)
  })

  it('resolveDialogElement should fallback to instance.$el when no dialogContentRef', () => {
    const host = document.createElement('section')
    const instance = {
      exposed: {},
      $el: host,
    } as any

    expect(resolveDialogElement(instance)).toBe(host)
  })

  it('resolveDialogElement should return null when instance is empty', () => {
    expect(resolveDialogElement(null)).toBeNull()
    expect(resolveDialogElement({} as any)).toBeNull()
  })

  it('resolveDrawerElement should use exposed.drawerRef when it is HTMLElement', () => {
    const drawer = document.createElement('aside')
    const instance = {
      exposed: { drawerRef: drawer },
      $refs: { drawerRef: document.createElement('div') },
      $el: document.createElement('section'),
    } as any

    expect(resolveDrawerElement(instance)).toBe(drawer)
  })

  it('resolveDrawerElement should fallback to $refs.drawerRef when exposed is not HTMLElement', () => {
    const drawer = document.createElement('aside')
    const instance = {
      exposed: { drawerRef: { notElement: true } },
      $refs: { drawerRef: drawer },
      $el: document.createElement('section'),
    } as any

    expect(resolveDrawerElement(instance)).toBe(drawer)
  })

  it('resolveDrawerElement should fallback to instance.$el or null', () => {
    const host = document.createElement('section')
    const instance = {
      exposed: {},
      $refs: {},
      $el: host,
    } as any

    expect(resolveDrawerElement(instance)).toBe(host)
    expect(resolveDrawerElement(null)).toBeNull()
    expect(resolveDrawerElement({} as any)).toBeNull()
  })
})
