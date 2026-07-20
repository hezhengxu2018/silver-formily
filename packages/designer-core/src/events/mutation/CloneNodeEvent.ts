import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class CloneNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'clone:node'
}
