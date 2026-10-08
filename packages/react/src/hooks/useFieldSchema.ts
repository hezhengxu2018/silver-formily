import type { Schema } from '@silver-formily/json-schema'
import { useContext } from 'react'
import { SchemaContext } from '../shared'

export function useFieldSchema(): Schema {
  return useContext(SchemaContext)
}
