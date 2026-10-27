import { useCallback, useRef, useState } from 'react'

interface PopupPickerOptions<T extends unknown[]> {
  disabled?: boolean
  readOnly?: boolean
  onConfirm: (...args: T) => void
  onClose?: () => void
  afterClose?: () => void
}

export function usePopupPicker<T extends unknown[]>(options: PopupPickerOptions<T>) {
  const button = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const active = useRef(false)
  const latest = useRef(options)
  latest.current = options

  const open = useCallback(() => {
    if (latest.current.disabled || active.current)
      return
    active.current = true
    setVisible(true)
  }, [])

  const onConfirm = useCallback((...args: T) => {
    const current = latest.current
    if (!current.disabled && !current.readOnly)
      current.onConfirm(...args)
  }, [])

  const onClose = useCallback(() => {
    setVisible(false)
    latest.current.onClose?.()
  }, [])

  const afterClose = useCallback(() => {
    active.current = false
    button.current?.focus()
    latest.current.afterClose?.()
  }, [])

  return { button, visible, open, onConfirm, onClose, afterClose }
}
