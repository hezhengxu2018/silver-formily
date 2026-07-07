export class LayoutObserver {
  private mutationObserver: MutationObserver

  private resizeObserver: ResizeObserver

  private connected = false

  constructor(observer: () => void = () => {}) {
    this.resizeObserver = new ResizeObserver(() => observer())
    this.mutationObserver = new MutationObserver(() => observer())
  }

  observe = (target: Element) => {
    this.resizeObserver.observe(target)
    this.mutationObserver.observe(target, {
      attributeFilter: ['style'],
      attributes: true,
    })
    this.connected = true
  }

  disconnect = () => {
    if (this.connected) {
      this.resizeObserver.disconnect()
      this.mutationObserver.disconnect()
    }
    this.connected = false
  }
}
