import type { ComponentInternalInstance } from 'vue'
import type { IObserverOptions } from '../types'
import { Tracker } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount } from 'vue'

interface InternalRenderEffect {
  run: (this: InternalRenderEffect, ...args: any[]) => any
}

type RenderEffectRunner = InternalRenderEffect['run']

type ObserverComponentInstance = ComponentInternalInstance & {
  effect?: InternalRenderEffect
  _updateEffect?: InternalRenderEffect
  _updateEffectRun?: RenderEffectRunner
}

export function useObserver(options?: IObserverOptions) {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useObserver must be called within a setup function.')
  }
  const vm = instance as ObserverComponentInstance
  let tracker: Tracker | null = null
  const disposeTracker = () => {
    if (tracker) {
      tracker.dispose()
      tracker = null
    }
  }
  const vmUpdate = () => {
    vm?.proxy?.$forceUpdate()
  }

  onBeforeUnmount(disposeTracker)

  Object.defineProperty(vm, 'effect', {
    get() {
      return vm._updateEffect || {}
    },
    set(newValue) {
      vm._updateEffectRun = newValue.run
      disposeTracker()
      const newTracker = () => {
        tracker = new Tracker(() => {
          if (options?.scheduler && typeof options.scheduler === 'function') {
            options.scheduler(vmUpdate)
          }
          else {
            vmUpdate()
          }
        })
      }

      const update = function () {
        let refn = null
        tracker?.track(() => {
          const effectRunner = vm._updateEffectRun
          if (effectRunner) {
            refn = effectRunner.call(newValue)
          }
        })
        return refn
      }
      newTracker()
      newValue.run = update
      vm._updateEffect = newValue
    },
  })
}
