import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'

export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent {
  type = 'add:workspace'
}
