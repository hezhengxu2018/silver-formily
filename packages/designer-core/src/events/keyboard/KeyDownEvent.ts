import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'

export class KeyDownEvent
  extends AbstractKeyboardEvent
  implements ICustomEvent {
  type = 'key:down'
}
