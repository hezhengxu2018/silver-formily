import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryPushEvent
  extends AbstractHistoryEvent
  implements ICustomEvent {
  type = 'history:push'
}
