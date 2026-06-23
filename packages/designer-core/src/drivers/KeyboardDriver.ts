import { EventDriver } from '@silver-formily/designer-shared'
import { KeyDownEvent, KeyUpEvent } from '../events'

function filter(event: KeyboardEvent) {
  const target = event.target
  if (!(target instanceof HTMLElement))
    return true
  const { tagName } = target
  const isMutableFormControl = target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    ? !target.readOnly
    : tagName === 'SELECT'
  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>、Web Components
  return !(
    target.isContentEditable
    || ((tagName === 'INPUT'
      || tagName === 'TEXTAREA'
      || tagName === 'SELECT'
      || customElements.get(tagName.toLocaleLowerCase()))
    && isMutableFormControl)
  )
}

export class KeyboardDriver extends EventDriver {
  onKeyDown = (e: KeyboardEvent) => {
    if (!filter(e))
      return
    this.dispatch(new KeyDownEvent(e))
  }

  onKeyUp = (e: KeyboardEvent) => {
    this.dispatch(new KeyUpEvent(e))
  }

  attach() {
    this.addEventListener('keydown', this.onKeyDown, {
      mode: 'onlyParent',
    })
    this.addEventListener('keyup', this.onKeyUp, {
      mode: 'onlyParent',
    })
  }

  detach() {
    this.removeEventListener('keydown', this.onKeyDown, {
      mode: 'onlyParent',
    })
    this.removeEventListener('keyup', this.onKeyUp, {
      mode: 'onlyParent',
    })
  }
}
