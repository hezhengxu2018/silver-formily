import type { RefObject } from 'react'
import { createContext } from 'react'

export const FormRootContext = createContext<RefObject<HTMLDivElement | null> | null>(null)
