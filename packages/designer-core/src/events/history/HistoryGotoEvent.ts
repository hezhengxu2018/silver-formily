import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryGotoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent {
  type = 'history:goto'
}
