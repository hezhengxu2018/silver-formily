import type { IAction } from './types'
import { createBoundaryAnnotation } from './internals'
import {
  batchEnd,
  batchScopeEnd,
  batchScopeStart,
  batchStart,
  untrackEnd,
  untrackStart,
} from './reaction'

export const action: IAction = createBoundaryAnnotation(
  () => {
    batchStart()
    untrackStart()
  },
  () => {
    untrackEnd()
    batchEnd()
  },
) as IAction

action.scope = createBoundaryAnnotation(
  () => {
    batchScopeStart()
    untrackStart()
  },
  () => {
    untrackEnd()
    batchScopeEnd()
  },
) as IAction['scope']
