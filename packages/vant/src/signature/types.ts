import type {
  SignatureThemeVars,
  SignatureInstance as VanSignatureInstance,
  SignatureProps as VanSignatureProps,
} from 'vant'

export type SignatureModelValue = string | null | undefined

export type SignatureType = VanSignatureProps['type']

export interface SignatureSubmitPayload {
  image: string
  canvas: HTMLCanvasElement
}

export interface SignatureProps extends Pick<VanSignatureProps, 'backgroundColor' | 'clearButtonText' | 'confirmButtonText' | 'lineWidth' | 'penColor' | 'tips' | 'type'> {
  modelValue?: SignatureModelValue
  disabled?: boolean
  readonly?: boolean
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
