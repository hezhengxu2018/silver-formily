import type { SignatureProps } from './types'
import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FSignature from './signature.vue'
import './style.scss'

export const Signature = connect<typeof FSignature, Partial<SignatureProps>>(
  FSignature,
  mapProps({
    disabled: true,
  }),
  mapReadPretty(PreviewText.Signature),
)

export default Signature

export type {
  SignatureInstance,
  SignatureProps,
  SignatureSlots,
  SignatureThemeVars,
  SignatureType,
  VanSignatureInstance,
  VanSignatureProps,
} from './types'

export type SignatureComponent = typeof Signature
