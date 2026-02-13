import type { ComponentObjectPropsOptions, ExtractPropTypes } from 'vue'
import type { IRecursionFieldProps } from '../types'
import { createBooleanProp, createProp } from './runtimeProps'

export const recursionFieldProps = {
  schema: createProp<IRecursionFieldProps['schema']>({ required: true }),
  name: createProp<IRecursionFieldProps['name']>(),
  basePath: createProp<IRecursionFieldProps['basePath']>(),
  onlyRenderProperties: createBooleanProp(),
  onlyRenderSelf: createBooleanProp(),
  mapProperties: createProp<IRecursionFieldProps['mapProperties']>(),
  filterProperties: createProp<IRecursionFieldProps['filterProperties']>(),
} as const satisfies ComponentObjectPropsOptions<IRecursionFieldProps>

export type RecursionFieldProps = ExtractPropTypes<typeof recursionFieldProps>
