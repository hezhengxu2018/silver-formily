import { connect, mapProps } from '@silver-formily/vue'
import { ElRate } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type RateProps = typeof ElRate

export const Rate = connect<typeof ElRate>(
  ElRate,
  mapProps({ readOnly: 'readonly', disabled: true }),
  mapReadPretty(PreviewText.Rate),
)

export default Rate
