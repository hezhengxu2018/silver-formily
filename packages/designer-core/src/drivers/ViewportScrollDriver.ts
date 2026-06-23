import type { Engine } from '../models/Engine'
import { EventDriver } from '@silver-formily/designer-shared'
import { ViewportScrollEvent } from '../events'

export class ViewportScrollDriver extends EventDriver<Engine> {
  request: number | null = null

  onScroll = (e: UIEvent) => {
    e.preventDefault()
    this.request = this.contentWindow.requestAnimationFrame(() => {
      const body = this.contentWindow.document.body
      this.dispatch(
        new ViewportScrollEvent({
          scrollX: this.contentWindow.scrollX,
          scrollY: this.contentWindow.scrollY,
          width: body?.clientWidth || this.contentWindow.innerWidth,
          height: body?.clientHeight || this.contentWindow.innerHeight,
          innerHeight: this.contentWindow.innerHeight,
          innerWidth: this.contentWindow.innerWidth,
          view: this.contentWindow,
          target: e.target,
        }),
      )
      this.contentWindow.cancelAnimationFrame(this.request!)
      this.request = null
    })
  }

  attach() {
    this.addEventListener('scroll', this.onScroll)
  }

  detach() {
    this.removeEventListener('scroll', this.onScroll)
  }
}
