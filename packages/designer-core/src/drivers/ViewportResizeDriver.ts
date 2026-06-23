import type { Engine } from '../models/Engine'
import { EventDriver } from '@silver-formily/designer-shared'
import { ViewportResizeEvent } from '../events'

export class ViewportResizeDriver extends EventDriver<Engine> {
  request = null

  resizeObserver: ResizeObserver | null = null

  get ResizeObserver() {
    return globalThis.ResizeObserver
  }

  onResize = (e: any) => {
    if (e.preventDefault)
      e.preventDefault()
    this.request = this.contentWindow.requestAnimationFrame(() => {
      this.contentWindow.cancelAnimationFrame(this.request)
      this.dispatch(
        new ViewportResizeEvent({
          scrollX: this.contentWindow.scrollX,
          scrollY: this.contentWindow.scrollY,
          width: this.contentWindow.innerWidth,
          height: this.contentWindow.innerHeight,
          innerHeight: this.contentWindow.innerHeight,
          innerWidth: this.contentWindow.innerWidth,
          view: this.contentWindow,
          target: e.target || this.container,
        }),
      )
    })
  }

  attach() {
    if (this.contentWindow && this.contentWindow !== window) {
      this.addEventListener('resize', this.onResize)
    }
    else {
      if (this.container && this.container !== document && this.ResizeObserver) {
        this.resizeObserver = new this.ResizeObserver(this.onResize)
        this.resizeObserver.observe(this.container as HTMLElement)
      }
    }
  }

  detach() {
    if (this.contentWindow && this.contentWindow !== window) {
      this.removeEventListener('resize', this.onResize)
    }
    else if (this.resizeObserver) {
      if (this.container && this.container !== document) {
        this.resizeObserver.unobserve(this.container as HTMLElement)
        this.resizeObserver.disconnect()
      }
    }
  }
}
