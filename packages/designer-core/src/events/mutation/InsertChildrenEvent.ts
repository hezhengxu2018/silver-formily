import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class InsertChildrenEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'insert:children'
}
