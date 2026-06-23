import type { KeyCodeValue } from '@silver-formily/designer-shared'
import type { IEngineContext } from '../types'
import { isFn, KeyCode } from '@silver-formily/designer-shared'

export { KeyCode }

export interface IShortcutProps {
  codes?: KeyCodeValue[] | KeyCodeValue[][]
  matcher?: (codes: KeyCodeValue[]) => boolean
  handler?: (context: IEngineContext) => void
}

export class Shortcut {
  codes: KeyCodeValue[][]
  handler?: (context: IEngineContext) => void
  matcher?: (codes: KeyCodeValue[]) => boolean
  constructor(props: IShortcutProps) {
    this.codes = this.parseCodes(props.codes)
    this.handler = props.handler
    this.matcher = props.matcher
  }

  parseCodes(codes: Array<KeyCodeValue | KeyCodeValue[]> = []) {
    const results: KeyCodeValue[][] = []
    codes.forEach((code) => {
      if (Array.isArray(code)) {
        results.push(code)
      }
      else {
        results.push([code])
      }
    })
    return results
  }

  preventCodes(codes: KeyCodeValue[]) {
    if (this.codes.length) {
      for (let i = 0; i < codes.length; i++) {
        const sequence = this.codes[i]
        for (let j = 0; j < sequence.length; j++) {
          if (!Shortcut.matchCode(codes[j], sequence[j])) {
            return false
          }
        }
      }
      return true
    }
    return false
  }

  matched(matched: boolean, context: IEngineContext) {
    if (isFn(this.handler) && matched) {
      this.handler(context)
    }
    return matched
  }

  match(codes: KeyCodeValue[], context: IEngineContext) {
    return this.codes.some((sequence) => {
      const sortedSelf = Shortcut.sortCodes(sequence)
      const sortedTarget: KeyCodeValue[] = Shortcut.sortCodes(codes)
      if (isFn(this.matcher)) {
        return this.matched(this.matcher(sortedTarget), context)
      }
      if (sortedTarget.length !== sortedSelf.length)
        return this.matched(false, context)
      for (let i = 0; i < sortedSelf.length; i++) {
        if (!Shortcut.matchCode(sortedTarget[i], sortedSelf[i])) {
          return this.matched(false, context)
        }
      }
      return this.matched(true, context)
    })
  }

  static matchCode = (code1: KeyCodeValue, code2: KeyCodeValue) => {
    return code1?.toLocaleLowerCase?.() === code2?.toLocaleLowerCase?.()
  }

  static sortCodes = (codes: KeyCodeValue[]): KeyCodeValue[] => {
    return [...codes].sort((code1, code2) =>
      code1.toLocaleLowerCase().localeCompare(code2.toLocaleLowerCase()),
    )
  }
}
