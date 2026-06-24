import { KeyCode } from '@silver-formily/designer-shared'
import { Shortcut } from '../models/Shortcut'

export const UndoMutation = new Shortcut({
  codes: [
    [KeyCode.Meta, KeyCode.Z],
    [KeyCode.Control, KeyCode.Z],
  ],
  handler(context) {
    const workspace = context?.workspace
    if (workspace) {
      workspace.history.undo()
    }
    workspace.operation.hover.clear()
  },
})

export const RedoMutation = new Shortcut({
  codes: [
    [KeyCode.Meta, KeyCode.Shift, KeyCode.Z],
    [KeyCode.Control, KeyCode.Shift, KeyCode.Z],
  ],
  handler(context) {
    const workspace = context?.workspace
    if (workspace) {
      workspace.history.redo()
    }
    workspace.operation.hover.clear()
  },
})
