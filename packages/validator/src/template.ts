import type { IValidateResult, IValidatorRules } from './types'
import { Path as FormPath } from '@silver-formily/path'
import { isFn, isStr } from '@silver-formily/shared'
import { getValidateMessageTemplateEngine } from './registry'

export function render(result: IValidateResult, rules: IValidatorRules): IValidateResult {
  const { message } = result
  if (isStr(message)) {
    const template = getValidateMessageTemplateEngine()
    if (isFn(template)) {
      result.message = template(message, rules)
    }
    result.message = result.message.replace(
      /\{\{\s*([\w.]+)\s*\}\}/g,
      (_, $0) => {
        return FormPath.getIn(rules, $0)
      },
    )
  }
  return result
}
