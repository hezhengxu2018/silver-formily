import type { Reaction, TrackerTrack } from './types'
import { isFn } from './checkers'
import { ReactionStack } from './environment'
import {
  batchEnd,
  batchStart,
  disposeBindingReactions,
  releaseBindingReactions,
} from './reaction'

export class Tracker {
  private results: unknown
  constructor(
    scheduler?: (reaction: Reaction) => void,
    name = 'TrackerReaction',
  ) {
    this.track._scheduler = (callback) => {
      if (this.track._boundary === 0)
        this.dispose()
      if (isFn(callback))
        scheduler?.(callback)
    }
    this.track._name = name
    this.track._boundary = 0
  }

  track: TrackerTrack = ((tracker: () => unknown) => {
    if (!isFn(tracker))
      return this.results
    if (this.track._boundary > 0)
      return
    if (!ReactionStack.includes(this.track)) {
      releaseBindingReactions(this.track)
      try {
        batchStart()
        ReactionStack.push(this.track)
        this.results = tracker()
      }
      finally {
        ReactionStack.pop()
        this.track._boundary++
        batchEnd()
        this.track._boundary = 0
      }
    }
    return this.results
  }) as TrackerTrack

  dispose = () => {
    disposeBindingReactions(this.track)
  }
}
