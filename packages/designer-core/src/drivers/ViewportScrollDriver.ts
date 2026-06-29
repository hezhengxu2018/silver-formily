import type { Engine } from '../models/Engine'
import { EventDriver } from '@silver-formily/designer-shared'
import { ViewportScrollEvent } from '../events'

export class ViewportScrollDriver extends EventDriver<Engine> {
  request = null

  cancelRequest() {
    if (this.request != null) {
      cancelAnimationFrame(this.request)
      this.request = null
    }
  }

  onScroll = (e: UIEvent) => {
    e.preventDefault()
    this.cancelRequest()
    this.request = requestAnimationFrame(() => {
      this.dispatch(
        new ViewportScrollEvent({
          scrollX: this.contentWindow.scrollX,
          scrollY: this.contentWindow.scrollY,
          width: this.contentWindow.document.body.clientWidth,
          height: this.contentWindow.document.body.clientHeight,
          innerHeight: this.contentWindow.innerHeight,
          innerWidth: this.contentWindow.innerWidth,
          view: this.contentWindow,
          target: e.target,
        }),
      )
      this.request = null
    })
  }

  attach() {
    this.addEventListener('scroll', this.onScroll)
  }

  detach() {
    this.removeEventListener('scroll', this.onScroll)
    this.cancelRequest()
  }
}
