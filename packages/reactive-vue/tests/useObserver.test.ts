/* eslint-disable prefer-arrow-callback */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useObserver } from '../src/hooks/useObserver'

interface TrackerInstance {
  scheduler: () => void
  track: ReturnType<typeof vi.fn>
  dispose: ReturnType<typeof vi.fn>
}

const vueMocks = vi.hoisted(() => ({
  getCurrentInstance: vi.fn(),
  onBeforeUnmount: vi.fn(),
}))

const trackerInstances = vi.hoisted(() => [] as TrackerInstance[])

const trackerMockFactory = vi.hoisted(() =>
  vi.fn(function (this: TrackerInstance, scheduler: () => void) {
    const instance: TrackerInstance = {
      scheduler,
      track: vi.fn((runner?: () => unknown) => runner?.()),
      dispose: vi.fn(),
    }
    trackerInstances.push(instance)
    return instance
  }),
)

vi.mock('vue', () => vueMocks)
vi.mock('@formily/reactive', () => ({
  Tracker: trackerMockFactory,
}))

function createMockInstance() {
  return {
    proxy: {
      $forceUpdate: vi.fn(),
    },
  } as Record<string, any>
}

describe('useObserver', () => {
  beforeEach(() => {
    trackerInstances.length = 0
    trackerMockFactory.mockClear()
    vueMocks.getCurrentInstance.mockReset()
    vueMocks.onBeforeUnmount.mockReset()
  })

  it('throws when called without an active component instance', () => {
    vueMocks.getCurrentInstance.mockReturnValue(null)
    expect(() => useObserver()).toThrowError(
      'useObserver must be called within a setup function.',
    )
  })

  it('wraps the effect run method and schedules updates', () => {
    const vm = createMockInstance()
    vueMocks.getCurrentInstance.mockReturnValue(vm)

    useObserver()

    expect(vueMocks.onBeforeUnmount).toHaveBeenCalledTimes(1)
    const effectDescriptor = Object.getOwnPropertyDescriptor(vm, 'effect')
    expect(effectDescriptor?.set).toBeTypeOf('function')
    expect(effectDescriptor?.get).toBeTypeOf('function')

    const originalRun = vi.fn().mockReturnValue('tracked result')
    const effectPayload = { run: originalRun }
    vm.effect = effectPayload

    const tracker = trackerInstances[0]
    expect(tracker).toBeDefined()
    expect(vm._updateEffectRun).toBe(originalRun)
    expect(vm.effect).toBe(effectPayload)

    const result = vm.effect.run()
    expect(tracker.track).toHaveBeenCalledTimes(1)
    expect(originalRun).toHaveBeenCalledTimes(1)
    expect(result).toBe('tracked result')

    tracker.scheduler()
    expect(vm.proxy.$forceUpdate).toHaveBeenCalledTimes(1)
  })

  it('respects a custom scheduler option', () => {
    const vm = createMockInstance()
    const schedulerSpy = vi.fn()
    vueMocks.getCurrentInstance.mockReturnValue(vm)

    useObserver({ scheduler: schedulerSpy })
    vm.effect = { run: vi.fn() }

    const tracker = trackerInstances[0]
    tracker.scheduler()
    expect(schedulerSpy).toHaveBeenCalledTimes(1)

    const scheduledUpdate = schedulerSpy.mock.calls[0][0]
    expect(scheduledUpdate).toBeTypeOf('function')
    scheduledUpdate()
    expect(vm.proxy.$forceUpdate).toHaveBeenCalledTimes(1)
  })

  it('disposes the tracker when the component unmounts', () => {
    const vm = createMockInstance()
    vueMocks.getCurrentInstance.mockReturnValue(vm)

    useObserver()
    vm.effect = { run: vi.fn() }

    const cleanup = vueMocks.onBeforeUnmount.mock.calls[0][0] as () => void
    cleanup()

    const tracker = trackerInstances[0]
    expect(tracker.dispose).toHaveBeenCalledTimes(1)
  })

  it('disposes the previous tracker before creating a new one', () => {
    const vm = createMockInstance()
    vueMocks.getCurrentInstance.mockReturnValue(vm)

    useObserver()
    vm.effect = { run: vi.fn() }
    const firstTracker = trackerInstances[0]

    vm.effect = { run: vi.fn() }
    expect(firstTracker.dispose).toHaveBeenCalledTimes(1)
    expect(trackerInstances).toHaveLength(2)
  })
})
