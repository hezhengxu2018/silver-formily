import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Rate as VanRate } from 'vant'
import { PreviewText } from '../preview-text'

export type RateProps = VueComponentProps<typeof VanRate>
export type RateComponent = typeof VanRate

export const Rate = connect<typeof VanRate, RateProps>(
  VanRate,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Rate),
)

export default Rate
