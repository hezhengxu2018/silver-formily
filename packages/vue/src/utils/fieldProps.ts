import type { ComponentObjectPropsOptions, ExtractPropTypes } from 'vue'
import type { IFieldProps, IVoidFieldProps } from '../types'
import { createBooleanProp, createProp } from './runtimeProps'

export const fieldProps = {
  name: createProp<IFieldProps['name']>({ required: true }),
  title: createProp<IFieldProps['title']>(),
  description: createProp<IFieldProps['description']>(),
  value: createProp<IFieldProps['value']>(),
  initialValue: createProp<IFieldProps['initialValue']>(),
  basePath: createProp<IFieldProps['basePath']>(),
  decorator: createProp<IFieldProps['decorator']>(),
  decoratorContent: createProp<IFieldProps['decoratorContent']>(),
  component: createProp<IFieldProps['component']>(),
  display: createProp<IFieldProps['display']>(),
  pattern: createProp<IFieldProps['pattern']>(),
  required: createBooleanProp(),
  validateFirst: createBooleanProp(),
  hidden: createBooleanProp(),
  visible: createBooleanProp(),
  editable: createBooleanProp(),
  disabled: createBooleanProp(),
  readOnly: createBooleanProp(),
  readPretty: createBooleanProp(),
  dataSource: createProp<IFieldProps['dataSource']>(),
  validatePattern: createProp<IFieldProps['validatePattern']>(),
  validateDisplay: createProp<IFieldProps['validateDisplay']>(),
  validator: createProp<IFieldProps['validator']>(),
  reactions: createProp<IFieldProps['reactions']>(),
  content: createProp<IFieldProps['content']>(),
  data: createProp<IFieldProps['data']>(),
} as const satisfies ComponentObjectPropsOptions<IFieldProps>

export const voidFieldProps = {
  name: createProp<IVoidFieldProps['name']>({ required: true }),
  title: createProp<IVoidFieldProps['title']>(),
  description: createProp<IVoidFieldProps['description']>(),
  basePath: createProp<IVoidFieldProps['basePath']>(),
  decorator: createProp<IVoidFieldProps['decorator']>(),
  decoratorContent: createProp<IVoidFieldProps['decoratorContent']>(),
  component: createProp<IVoidFieldProps['component']>(),
  display: createProp<IVoidFieldProps['display']>(),
  pattern: createProp<IVoidFieldProps['pattern']>(),
  hidden: createBooleanProp(),
  visible: createBooleanProp(),
  editable: createBooleanProp(),
  disabled: createBooleanProp(),
  readOnly: createBooleanProp(),
  readPretty: createBooleanProp(),
  reactions: createProp<IVoidFieldProps['reactions']>(),
  content: createProp<IVoidFieldProps['content']>(),
  data: createProp<IVoidFieldProps['data']>(),
} as const satisfies ComponentObjectPropsOptions<IVoidFieldProps>

export type FieldProps = ExtractPropTypes<typeof fieldProps>
export type VoidFieldProps = ExtractPropTypes<typeof voidFieldProps>
