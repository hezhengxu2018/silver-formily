import type { IBatch } from './types'
import { isFn } from './checkers'
import { BatchCount, BatchEndpoints } from './environment'
import { createBoundaryAnnotation } from './internals'
import {
  batchEnd,
  batchScopeEnd,
  batchScopeStart,
  batchStart,
} from './reaction'

export const batch: IBatch = createBoundaryAnnotation(batchStart, batchEnd) as IBatch
batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd) as IBatch['scope']
batch.endpoint = (callback?: () => void) => {
  if (!isFn(callback))
    return
  if (BatchCount.value === 0) {
    callback()
  }
  else {
    BatchEndpoints.add(callback)
  }
}
