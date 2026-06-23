import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractCursorEvent } from './AbstractCursorEvent'

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'mouse:move'
}
