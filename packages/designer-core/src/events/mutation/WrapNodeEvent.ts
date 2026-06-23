import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'wrap:node'
}
