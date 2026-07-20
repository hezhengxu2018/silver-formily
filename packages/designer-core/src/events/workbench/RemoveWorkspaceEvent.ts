import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'

export class RemoveWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent {
  type = 'remove:workspace'
}
