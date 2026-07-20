import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class InsertBeforeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'insert:before'
}
