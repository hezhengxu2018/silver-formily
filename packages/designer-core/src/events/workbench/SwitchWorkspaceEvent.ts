import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent {
  type = 'switch:workspace'
}
