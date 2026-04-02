import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { PreviewText } from '../preview-text'
import FSignature from './signature.vue'
import './style.scss'

export const Signature = connect<typeof FSignature>(
  FSignature,
  mapProps({
    readOnly: 'readonly',
    disabled: true,
  }),
  mapReadPretty(PreviewText.Signature),
)

export default Signature

export type {
  SignatureInstance,
  SignatureModelValue,
  SignatureProps,
  SignatureSlots,
  SignatureSubmitPayload,
  SignatureThemeVars,
  SignatureType,
  VanSignatureInstance,
  VanSignatureProps,
} from './types'
