import {
  DragDropDriver,
  KeyboardDriver,
  MouseClickDriver,
  MouseMoveDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
} from './drivers'
import {
  useAutoScrollEffect,
  useContentEditableEffect,
  useCursorEffect,
  useDragDropEffect,
  useFreeSelectionEffect,
  useKeyboardEffect,
  useResizeEffect,
  useSelectionEffect,
  useTranslateEffect,
  useViewportEffect,
  useWorkspaceEffect,
} from './effects'
import {
  CopyNodes,
  CursorSwitchSelection,
  DeleteNodes,
  PasteNodes,
  PreventCommandX,
  RedoMutation,
  SelectAllNodes,
  SelectNextNode,
  SelectNodes,
  SelectPrevNode,
  SelectSameTypeNodes,
  UndoMutation,
} from './shortcuts'

export const DEFAULT_EFFECTS = [
  useCursorEffect,
  useViewportEffect,
  useDragDropEffect,
  useResizeEffect,
  useSelectionEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useWorkspaceEffect,
  useFreeSelectionEffect,
  useContentEditableEffect,
  useTranslateEffect,
]

export const DEFAULT_DRIVERS = [
  DragDropDriver,
  MouseClickDriver,
  MouseMoveDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
  KeyboardDriver,
]

export const DEFAULT_SHORTCUTS = [
  PreventCommandX,
  SelectNodes,
  SelectAllNodes,
  SelectSameTypeNodes,
  DeleteNodes,
  CopyNodes,
  PasteNodes,
  SelectPrevNode,
  SelectNextNode,
  UndoMutation,
  RedoMutation,
  CursorSwitchSelection,
]
