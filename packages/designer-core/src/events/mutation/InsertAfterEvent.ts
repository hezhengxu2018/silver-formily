import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class InsertAfterEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'insert:after'
}
