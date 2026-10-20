import type { ListRef } from 'antd-mobile/es/components/list'
import type { RefObject } from 'react'
import { createContext } from 'react'

export const FormLayoutRootContext = createContext<RefObject<ListRef | null> | null>(null)
