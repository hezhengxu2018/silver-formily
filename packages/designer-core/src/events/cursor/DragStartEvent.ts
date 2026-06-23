import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractCursorEvent } from './AbstractCursorEvent'

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'drag:start'
}
