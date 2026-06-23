import type { ICustomEvent } from '@silver-formily/designer-shared'
import { AbstractViewportEvent } from './AbstractViewportEvent'

export class ViewportResizeEvent
  extends AbstractViewportEvent
  implements ICustomEvent {
  type = 'viewport:resize'
}
