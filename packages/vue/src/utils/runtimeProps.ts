import type { PropType } from 'vue'

export interface RuntimeProp<T> {
  type: PropType<T> | null
  required?: boolean
  default?: T | (() => T)
}

export function createProp<T>(options: Partial<RuntimeProp<T>> = {}): RuntimeProp<T> {
  return {
    type: options.type ?? (null as unknown as PropType<T>),
    ...options,
  }
}

export function createBooleanProp() {
  return createProp<boolean>({
    type: Boolean as PropType<boolean>,
    default: undefined,
  })
}
