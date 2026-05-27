import type { IOperation, PropertyKey, Reaction, ReactionsMap } from './types'
import { ArraySet } from './array'
import { isFn } from './checkers'
import {
  BatchCount,
  BatchEndpoints,
  BatchScope,
  DependencyCollected,
  ObserverListeners,
  PendingReactions,
  PendingScopeReactions,
  RawReactionsMap,
  ReactionStack,
  UntrackCount,
} from './environment'

const ITERATION_KEY = Symbol('iteration key')

function isScopeBatching() {
  return BatchScope.value
}

function isBatching() {
  return BatchCount.value > 0
}

function isUntracking() {
  return UntrackCount.value > 0
}

function executePendingReactions() {
  PendingReactions.batchDelete((reaction) => {
    if (isFn(reaction._scheduler)) {
      reaction._scheduler(reaction)
    }
    else {
      reaction()
    }
  })
}

function executeBatchEndpoints() {
  BatchEndpoints.batchDelete((callback) => {
    callback()
  })
}

function addRawReactionsMap(target: any, key: PropertyKey, reaction: Reaction) {
  const reactionsMap = RawReactionsMap.get(target)
  if (reactionsMap) {
    const reactions = reactionsMap.get(key)
    if (reactions) {
      reactions.add(reaction)
    }
    else {
      reactionsMap.set(key, new ArraySet([reaction]))
    }
    return reactionsMap
  }
  else {
    const reactionsMap: ReactionsMap = new Map([
      [key, new ArraySet([reaction])],
    ])
    RawReactionsMap.set(target, reactionsMap)
    return reactionsMap
  }
}

function addReactionsMapToReaction(reaction: Reaction, reactionsMap: ReactionsMap) {
  const bindSet = reaction._reactionsSet
  if (bindSet) {
    bindSet.add(reactionsMap)
  }
  else {
    reaction._reactionsSet = new ArraySet([reactionsMap])
  }
  return bindSet
}

function getReactionsFromTargetKey(target: any, key: PropertyKey) {
  const reactionsMap = RawReactionsMap.get(target)
  const reactions = []
  if (reactionsMap) {
    const map = reactionsMap.get(key)
    if (map) {
      map.forEach((reaction) => {
        if (!reactions.includes(reaction)) {
          reactions.push(reaction)
        }
      })
    }
  }
  return reactions
}

function runReactions(target: any, key: PropertyKey) {
  const reactions = getReactionsFromTargetKey(target, key)
  const prevUntrackCount = UntrackCount.value
  UntrackCount.value = 0
  for (let i = 0, len = reactions.length; i < len; i++) {
    const reaction = reactions[i]
    if (reaction._isComputed) {
      reaction._scheduler(reaction)
    }
    else if (isScopeBatching()) {
      PendingScopeReactions.add(reaction)
    }
    else if (isBatching()) {
      PendingReactions.add(reaction)
    }
    else {
      // never reach
      if (isFn(reaction._scheduler)) {
        reaction._scheduler(reaction)
      }
      else {
        reaction()
      }
    }
  }
  UntrackCount.value = prevUntrackCount
}

function notifyObservers(operation: IOperation) {
  ObserverListeners.forEach(fn => fn(operation))
}

export function bindTargetKeyWithCurrentReaction(operation: IOperation) {
  let { key, type, target } = operation
  if (type === 'iterate') {
    key = ITERATION_KEY
  }
  const reactionLen = ReactionStack.length
  if (reactionLen === 0)
    return
  const current = ReactionStack[reactionLen - 1]
  if (isUntracking())
    return
  if (current) {
    DependencyCollected.value = true
    addReactionsMapToReaction(current, addRawReactionsMap(target, key, current))
  }
}

export function bindComputedReactions(reaction: Reaction) {
  if (isFn(reaction)) {
    const current = ReactionStack[ReactionStack.length - 1]
    if (current) {
      const computes = current._computesSet
      if (computes) {
        computes.add(reaction)
      }
      else {
        current._computesSet = new ArraySet([reaction])
      }
    }
  }
}

export function runReactionsFromTargetKey(operation: IOperation) {
  const { key, type, target, oldTarget } = operation
  batchStart()
  notifyObservers(operation)
  if (type === 'clear') {
    oldTarget.forEach((_: any, key: PropertyKey) => {
      runReactions(target, key)
    })
  }
  else {
    runReactions(target, key)
  }
  if (type === 'add' || type === 'delete' || type === 'clear') {
    const newKey = Array.isArray(target) ? 'length' : ITERATION_KEY
    runReactions(target, newKey)
  }
  batchEnd()
}

export function hasRunningReaction() {
  return ReactionStack.length > 0
}

export function releaseBindingReactions(reaction: Reaction) {
  reaction._reactionsSet?.forEach((reactionsMap) => {
    reactionsMap.forEach((reactions) => {
      reactions.delete(reaction)
    })
  })
  PendingReactions.delete(reaction)
  PendingScopeReactions.delete(reaction)
  delete reaction._reactionsSet
}

export function suspendComputedReactions(current: Reaction) {
  current._computesSet?.forEach((reaction) => {
    const reactions = getReactionsFromTargetKey(
      reaction._context,
      reaction._property,
    )
    if (reactions.length === 0) {
      disposeBindingReactions(reaction)
      reaction._dirty = true
    }
  })
}

export function disposeBindingReactions(reaction: Reaction) {
  reaction._disposed = true
  releaseBindingReactions(reaction)
  suspendComputedReactions(reaction)
}

export function batchStart() {
  BatchCount.value++
}

export function batchEnd() {
  BatchCount.value--
  if (BatchCount.value === 0) {
    const prevUntrackCount = UntrackCount.value
    UntrackCount.value = 0
    executePendingReactions()
    executeBatchEndpoints()
    UntrackCount.value = prevUntrackCount
  }
}

export function batchScopeStart() {
  BatchScope.value = true
}

export function batchScopeEnd() {
  const prevUntrackCount = UntrackCount.value
  BatchScope.value = false
  UntrackCount.value = 0
  PendingScopeReactions.batchDelete((reaction) => {
    if (isFn(reaction._scheduler)) {
      reaction._scheduler(reaction)
    }
    else {
      reaction()
    }
  })
  UntrackCount.value = prevUntrackCount
}

export function untrackStart() {
  UntrackCount.value++
}

export function untrackEnd() {
  UntrackCount.value--
}

export { isBatching, isScopeBatching, isUntracking }

export function hasDepsChange(newDeps: any[], oldDeps: any[]) {
  if (newDeps === oldDeps)
    return false
  if (newDeps.length !== oldDeps.length)
    return true
  if (newDeps.some((value, index) => value !== oldDeps[index]))
    return true
  return false
}

export function disposeEffects(reaction: Reaction) {
  if (reaction._effects) {
    try {
      batchStart()
      reaction._effects.queue.forEach((item) => {
        if (!item || !item.dispose)
          return
        item.dispose()
      })
    }
    finally {
      batchEnd()
    }
  }
}
