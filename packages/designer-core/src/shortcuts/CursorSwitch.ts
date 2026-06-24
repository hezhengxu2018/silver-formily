import { KeyCode } from '@silver-formily/designer-shared'
import { CursorType } from '../models/Cursor'
import { Shortcut } from '../models/Shortcut'

export const CursorSwitchSelection = new Shortcut({
  codes: [KeyCode.Shift, KeyCode.S],
  handler(context) {
    const engine = context?.engine
    if (engine) {
      engine.cursor.setType(CursorType.Selection)
    }
  },
})
