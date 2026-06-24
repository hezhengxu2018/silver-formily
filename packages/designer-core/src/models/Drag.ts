import type { ICursorEventOriginData } from '../events/cursor/AbstractCursorEvent'
import type { IEngineContext } from '../types'
import type { Engine } from './Engine'
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'

export interface IDesignerDragInput extends ICursorEventOriginData {}

export class DragController {
  engine: Engine

  constructor(engine: Engine) {
    this.engine = engine
  }

  start(input: IDesignerDragInput, context?: IEngineContext) {
    return this.engine.dispatch(new DragStartEvent(input), context)
  }

  move(input: IDesignerDragInput, context?: IEngineContext) {
    return this.engine.dispatch(new DragMoveEvent(input), context)
  }

  stop(input: IDesignerDragInput = {}, context?: IEngineContext) {
    return this.engine.dispatch(new DragStopEvent(input), context)
  }
}
