import type {
  SignatureThemeVars,
  SignatureInstance as VanSignatureInstance,
  SignatureProps as VanSignatureProps,
} from 'vant'

export type SignatureType = VanSignatureProps['type']
export type SignatureModelValue = string

export interface SignatureProps extends Pick<VanSignatureProps, 'backgroundColor' | 'clearButtonText' | 'confirmButtonText' | 'lineWidth' | 'penColor' | 'tips' | 'type'> {
  modelValue?: SignatureModelValue
  disabled?: boolean
}

export interface SignatureSlots {
  tips?: () => any
}

export type SignatureInstance = VanSignatureInstance

export type {
  SignatureThemeVars,
  VanSignatureInstance,
  VanSignatureProps,
}
