import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class UpdateNodePropsEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'update:node:props'
}
