import { beforeEach, describe, expect, it, vi } from 'vitest'
import { autorunEffect } from '../src/hooks/autorunEffect'
import { reactionWatch } from '../src/hooks/reactionWatch'

const vueMocks = vi.hoisted(() => ({
  getCurrentScope: vi.fn(),
  onScopeDispose: vi.fn(),
}))

const autorunDispose = vi.hoisted(() => vi.fn())
const reactionDispose = vi.hoisted(() => vi.fn())

const autorunMock = vi.hoisted(() => vi.fn(() => autorunDispose))
const reactionMock = vi.hoisted(() => vi.fn(() => reactionDispose))

vi.mock('vue', () => vueMocks)
vi.mock('@formily/reactive', () => ({
  autorun: autorunMock,
  reaction: reactionMock,
}))

describe('effect hooks', () => {
  beforeEach(() => {
    vueMocks.getCurrentScope.mockReset()
    vueMocks.onScopeDispose.mockReset()
    autorunDispose.mockReset()
    reactionDispose.mockReset()
    autorunMock.mockClear()
    reactionMock.mockClear()
  })

  describe('autorunEffect', () => {
    it('throws when called without an active effect scope', () => {
      vueMocks.getCurrentScope.mockReturnValue(undefined)

      expect(() => autorunEffect(vi.fn())).toThrowError(
        'autorunEffect must be called within setup() or an active effect scope.',
      )
    })

    it('registers dispose on scope cleanup and returns a manual stopper', () => {
      vueMocks.getCurrentScope.mockReturnValue({})
      const tracker = vi.fn()
      const stop = autorunEffect(tracker, 'DemoAutorun')

      expect(autorunMock).toHaveBeenCalledTimes(1)
      expect(autorunMock).toHaveBeenCalledWith(tracker, 'DemoAutorun')
      expect(vueMocks.onScopeDispose).toHaveBeenCalledTimes(1)

      stop()
      expect(autorunDispose).toHaveBeenCalledTimes(1)

      const cleanup = vueMocks.onScopeDispose.mock.calls[0][0] as () => void
      cleanup()
      expect(autorunDispose).toHaveBeenCalledTimes(1)
    })
  })

  describe('reactionWatch', () => {
    it('throws when called without an active effect scope', () => {
      vueMocks.getCurrentScope.mockReturnValue(undefined)

      expect(() => reactionWatch(() => 1)).toThrowError(
        'reactionWatch must be called within setup() or an active effect scope.',
      )
    })

    it('registers reaction cleanup on scope cleanup and returns a manual stopper', () => {
      vueMocks.getCurrentScope.mockReturnValue({})
      const tracker = vi.fn(() => 3)
      const subscriber = vi.fn()
      const options = { fireImmediately: true }
      const stop = reactionWatch(tracker, subscriber, options)

      expect(reactionMock).toHaveBeenCalledTimes(1)
      expect(reactionMock).toHaveBeenCalledWith(tracker, subscriber, options)
      expect(vueMocks.onScopeDispose).toHaveBeenCalledTimes(1)

      const cleanup = vueMocks.onScopeDispose.mock.calls[0][0] as () => void
      cleanup()
      stop()

      expect(reactionDispose).toHaveBeenCalledTimes(1)
    })
  })
})
