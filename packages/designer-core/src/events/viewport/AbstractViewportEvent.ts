import type { IEngineContext } from '../../types'

const globalWindow = globalThis as unknown as Window

export interface IViewportEventData {
  scrollX: number
  scrollY: number
  width: number
  height: number
  view: Window
  innerWidth: number
  innerHeight: number
  target: EventTarget
}

export class AbstractViewportEvent {
  data: IViewportEventData
  context: IEngineContext
  constructor(data: IViewportEventData) {
    this.data = data || {
      scrollX: globalWindow.scrollX,
      scrollY: globalWindow.scrollY,
      width: globalWindow.innerWidth,
      height: globalWindow.innerHeight,
      innerWidth: globalWindow.innerWidth,
      innerHeight: globalWindow.innerHeight,
      view: globalWindow,
      target: globalWindow,
    }
  }
}
