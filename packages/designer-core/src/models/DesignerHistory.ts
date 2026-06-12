import type { DesignerHistoryEntry, DesignerHistoryState, DesignerSnapshot } from '../types'

import { clone } from '@silver-formily/shared'

export class DesignerHistory {
  protected past: DesignerHistoryEntry[] = []
  protected future: DesignerHistoryEntry[] = []
  protected limit: number

  constructor(limit = 50) {
    this.limit = limit
  }

  get state(): DesignerHistoryState {
    return {
      canUndo: this.past.length > 0,
      canRedo: this.future.length > 0,
      past: this.past.length,
      future: this.future.length,
    }
  }

  reset() {
    this.past = []
    this.future = []
  }

  push(snapshot: DesignerSnapshot, label?: string) {
    this.past.push({
      label,
      snapshot: clone(snapshot),
    })

    if (this.past.length > this.limit)
      this.past.shift()

    this.future = []
  }

  undo(current: DesignerSnapshot) {
    const entry = this.past.pop()
    if (!entry)
      return undefined

    this.future.push({
      snapshot: clone(current),
    })

    return clone(entry.snapshot)
  }

  redo(current: DesignerSnapshot) {
    const entry = this.future.pop()
    if (!entry)
      return undefined

    this.past.push({
      snapshot: clone(current),
    })

    return clone(entry.snapshot)
  }
}
