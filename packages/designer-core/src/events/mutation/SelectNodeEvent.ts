import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'select:node'
}
