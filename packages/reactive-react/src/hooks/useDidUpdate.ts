import { useRef } from 'react'
import { immediate } from '../shared'
import { useLayoutEffect } from './useLayoutEffect'

export function useDidUpdate(callback?: () => void) {
  const request = useRef<(() => void) | undefined>(undefined)
  request.current = immediate(callback)
  useLayoutEffect(() => {
    request.current?.()
    callback?.()
  })
}
