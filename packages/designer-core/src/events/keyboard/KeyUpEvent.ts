import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'

export class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
  type = 'key:up'
}
