import type { DesignerSelectionOptions, DesignerSelectionState } from '../types'
import { isSameSelection } from '../shared'

export class DesignerSelection {
  selectedId?: string
  hoveredId?: string

  get state(): DesignerSelectionState {
    return {
      selectedId: this.selectedId,
      hoveredId: this.hoveredId,
    }
  }

  restore(selection: DesignerSelectionState) {
    this.selectedId = selection.selectedId
    this.hoveredId = selection.hoveredId
  }

  select(nodeId?: string, _options: DesignerSelectionOptions = {}) {
    this.selectedId = nodeId
    return this.state
  }

  hover(nodeId?: string, _options: DesignerSelectionOptions = {}) {
    this.hoveredId = nodeId
    return this.state
  }

  clear() {
    this.selectedId = undefined
    this.hoveredId = undefined
    return this.state
  }

  equals(next: DesignerSelectionState) {
    return isSameSelection(this.state, next)
  }
}
