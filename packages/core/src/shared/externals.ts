import type { IFormProps } from '../types'
import { Path as FormPath } from '@silver-formily/path'
import {
  getLocaleByPath,
  getValidateLocaleIOSCode,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEngine,
  registerValidateRules,
  setValidateLanguage,
} from '@silver-formily/validator'
import { Form } from '../models'
import {
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
} from './checkers'
import {
  createEffectContext,
  createEffectHook,
  useEffectForm,
} from './effective'

function createForm<T extends object = any>(options?: IFormProps<T>) {
  return new Form(options)
}

export {
  createEffectContext,
  createEffectHook,
  createForm,
  FormPath,
  getLocaleByPath,
  getValidateLocaleIOSCode,
  isArrayField,
  isArrayFieldState,
  isDataField,
  isDataFieldState,
  isField,
  isFieldState,
  isForm,
  isFormState,
  isGeneralField,
  isGeneralFieldState,
  isObjectField,
  isObjectFieldState,
  isQuery,
  isVoidField,
  isVoidFieldState,
  registerValidateFormats,
  registerValidateLocale,
  registerValidateMessageTemplateEngine,
  registerValidateRules,
  setValidateLanguage,
  useEffectForm,
}
