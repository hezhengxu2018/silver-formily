import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Rate as VanRate } from 'vant'
import { PreviewText } from '../preview-text'

export const Rate = connect<typeof VanRate>(
  VanRate,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Rate),
)

export default Rate
