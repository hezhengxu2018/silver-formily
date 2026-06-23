import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent {
  type = 'history:redo'
}
