import type { Engine } from '../models/Engine'
import { EventDriver } from '@silver-formily/designer-shared'
import { MouseMoveEvent } from '../events'

export class MouseMoveDriver extends EventDriver<Engine> {
  request: number | null = null

  onMouseMove = (e: MouseEvent) => {
    this.request = this.contentWindow.requestAnimationFrame(() => {
      this.contentWindow.cancelAnimationFrame(this.request!)
      this.dispatch(
        new MouseMoveEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target,
          view: e.view,
        }),
      )
    })
  }

  attach() {
    this.addEventListener('mousemove', this.onMouseMove, {
      mode: 'onlyOne',
    })
  }

  detach() {
    this.removeEventListener('mousemove', this.onMouseMove, {
      mode: 'onlyOne',
    })
  }
}
